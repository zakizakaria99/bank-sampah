import { supabase } from "@/lib/supabase"
import { getKasBersih } from "./laporanService"

/* =========================
   NASABAH CRUD
========================= */

export async function getNasabah() {
  const { data, error } = await supabase
    .from("nasabah")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function tambahNasabah(nasabah: {
  nama: string
  alamat: string
  no_hp: string
}) {
  const { error } = await supabase
    .from("nasabah")
    .insert([nasabah])

  if (error) throw error
}

export async function updateNasabah(
  id: string,
  nasabah: {
    nama: string
    alamat: string
    no_hp: string
  }
) {
  const { error } = await supabase
    .from("nasabah")
    .update(nasabah)
    .eq("id", id)

  if (error) throw error
}

/* =========================
   DETAIL NASABAH
========================= */

export async function getDetailNasabah(nasabahId: string) {
  const { data, error } = await supabase
    .from("nasabah")
    .select("*")
    .eq("id", nasabahId)
    .single()

  if (error) throw error
  return data
}

/* =========================
   SALDO NASABAH (REAL)
========================= */

export async function getSaldoNasabah(nasabahId: string) {
  const { data: transaksi } = await supabase
    .from("transaksi")
    .select("total_nasabah")
    .eq("nasabah_id", nasabahId)

  const { data: penarikan } = await supabase
    .from("penarikan_saldo")
    .select("jumlah")
    .eq("nasabah_id", nasabahId)

  const totalSetoran =
    transaksi?.reduce((sum, t) => sum + Number(t.total_nasabah || 0), 0) || 0

  const totalPenarikan =
    penarikan?.reduce((sum, p) => sum + Number(p.jumlah || 0), 0) || 0

  return totalSetoran - totalPenarikan
}

/* =========================
   RIWAYAT PENARIKAN
========================= */

export async function getRiwayatPenarikan(
  nasabahId: string,
  page: number,
  limit: number = 10
) {
  const start = (page - 1) * limit
  const end = start + limit - 1

  const { data, error, count } = await supabase
    .from("penarikan_saldo")
    .select("*", { count: "exact" })
    .eq("nasabah_id", nasabahId)
    .order("created_at", { ascending: false })
    .range(start, end)

  if (error) throw error

  return {
    data: data || [],
    total: count || 0
  }
}

/* =========================
   TARIK SALDO NASABAH (FIXED & SAFE)
========================= */

export async function tarikSaldo(
  nasabahId: string,
  jumlah: number
) {
  if (jumlah <= 0) {
    throw new Error("Jumlah tidak valid")
  }

  /* =========================
     1. CEK SALDO NASABAH (REAL-TIME)
  ========================= */
  const saldoNasabah = await getSaldoNasabah(nasabahId)

  if (saldoNasabah < jumlah) {
    throw new Error("Saldo nasabah tidak cukup")
  }

  /* =========================
     2. CEK KAS BERSIH
  ========================= */
  const kasBersih = await getKasBersih()

  if (kasBersih < jumlah) {
    throw new Error("Kas tidak mencukupi")
  }

  /* =========================
     3. DOUBLE CHECK (ANTI RACE CONDITION)
  ========================= */
  const kasCheckLagi = await getKasBersih()

  if (kasCheckLagi < jumlah) {
    throw new Error("Kas tidak mencukupi (update terbaru)")
  }

  /* =========================
     4. INSERT PENARIKAN
  ========================= */
  const { error } = await supabase
    .from("penarikan_saldo")
    .insert([
      {
        nasabah_id: nasabahId,
        jumlah
      }
    ])

  if (error) throw error

  return true
}

/* =========================
   CANCEL PENARIKAN
========================= */

export async function cancelPenarikan(id: string) {
  const { error } = await supabase
    .from("penarikan_saldo")
    .delete()
    .eq("id", id)

  if (error) throw error

  return true
}