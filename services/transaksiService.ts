import { supabase } from "@/lib/supabase"
import { ItemTransaksi, Sampah } from "@/types/transaksi"

/* =========================
   MASTER DATA
========================= */
export async function getMasterData() {
  const { data: nasabah, error: err1 } = await supabase
    .from("nasabah")
    .select("*")

  const { data: sampah, error: err2 } = await supabase
    .from("jenis_sampah")
    .select("*")

  if (err1) console.error("get nasabah:", err1)
  if (err2) console.error("get sampah:", err2)

  return {
    nasabah: nasabah || [],
    sampah: sampah || []
  }
}

/* =========================
   SIMPAN TRANSAKSI
========================= */
export async function simpanTransaksi(
  nasabahId: string,
  items: ItemTransaksi[],
  sampah: Sampah[],
  totalNasabah: number,
  totalPengelola: number
) {

  const validItems = items.filter(
    (item) =>
      item.jenis_sampah_id !== "" &&
      Number(item.berat) > 0
  )

  if (validItems.length === 0) {
    throw new Error("Detail transaksi kosong")
  }

  const { data: transaksiData, error: transaksiError } = await supabase
    .from("transaksi")
    .insert([
      {
        nasabah_id: nasabahId,
        total_nasabah: totalNasabah,
        total_pengelola: totalPengelola
      }
    ])
    .select()
    .single()

  if (transaksiError) {
    console.error("Insert transaksi:", transaksiError)
    throw new Error(transaksiError.message)
  }

  const transaksiId = transaksiData.id

  /* =========================
     🔥 FIX DI SINI (SUBTOTAL 60%)
  ========================== */
  const detailPayload = validItems
    .map((item) => {
      const sampahData = sampah.find(
        (s) => s.id === item.jenis_sampah_id
      )

      if (!sampahData) return null

      const berat = Number(item.berat || 0)

      // 🔥 subtotal kotor (100%)
      const subtotalKotor = sampahData.harga_per_kg * berat

      // 🔥 hanya 60% untuk nasabah
      const subtotal = Math.round(subtotalKotor * 0.6)

      return {
        transaksi_id: transaksiId,
        jenis_sampah_id: item.jenis_sampah_id,
        berat,
        harga: sampahData.harga_per_kg,
        subtotal
      }
    })
    .filter(Boolean)

  if (detailPayload.length === 0) {
    throw new Error("Detail transaksi tidak valid")
  }

  const { error: detailError } = await supabase
    .from("detail_transaksi")
    .insert(detailPayload)

  if (detailError) {
    console.error("Insert detail:", detailError)
    throw new Error(detailError.message)
  }

  /* =========================
     UPDATE SALDO PENGELOLA
  ========================== */
  const { data: pengelola, error: err0 } = await supabase
    .from("pengelola")
    .select("id, saldo")
    .eq("id", 1)
    .maybeSingle()

  if (err0) throw err0

  if (!pengelola) {
    const { error: insertErr } = await supabase
      .from("pengelola")
      .insert([
        {
          id: 1,
          saldo: totalPengelola
        }
      ])

    if (insertErr) throw insertErr
  } else {
    const saldoSekarang = Number(pengelola.saldo || 0)

    const { error: updateErr } = await supabase
      .from("pengelola")
      .update({
        saldo: saldoSekarang + totalPengelola
      })
      .eq("id", 1)

    if (updateErr) throw updateErr
  }

  return transaksiId
}

/* =========================
   RIWAYAT SETOR NASABAH
========================= */
export async function getRiwayatSetorNasabah(
  nasabahId: string,
  page: number,
  limit: number = 10
) {
  const start = (page - 1) * limit
  const end = start + limit - 1

  const { data, error, count } = await supabase
    .from("transaksi")
    .select("*", { count: "exact" })
    .eq("nasabah_id", nasabahId)

    .order("created_at", { ascending: false }) // ✅ fix sorting

    .range(start, end)

  if (error) throw error

  return {
    data: data || [],
    total: count || 0
  }
}

/* =========================
   DETAIL SETOR
========================= */
export async function getDetailSetor(transaksiId: string) {
  const { data, error } = await supabase
    .from("detail_transaksi")
    .select(`
      id,
      transaksi_id,
      berat,
      harga,
      subtotal,
      jenis_sampah!fk_jenis_sampah (
        nama_sampah
      )
    `)
    .eq("transaksi_id", transaksiId)

  if (error) {
    console.error("getDetailSetor FULL:", JSON.stringify(error, null, 2))
    return []
  }

  const formatted = (data || []).map((item: any) => ({
    ...item,
    jenis_sampah: Array.isArray(item.jenis_sampah)
      ? item.jenis_sampah[0]
      : item.jenis_sampah
  }))

  return formatted
}