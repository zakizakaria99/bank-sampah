import { supabase } from "@/lib/supabase"
import { Laporan } from "@/types/laporan"

/* =========================
   LAPORAN
========================= */
export async function getLaporan(): Promise<Laporan[]> {
  const { data, error } = await supabase
    .from("transaksi")
    .select(`
      id,
      tanggal,
      total_nasabah,
      total_pengelola,
      nasabah (
        nama
      )
    `)
    .order("tanggal", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

/* =========================
   SALDO PENGELOLA
========================= */
export async function getSaldoPengelola(): Promise<number> {
  const { data, error } = await supabase
    .from("pengelola")
    .select("saldo")
    .eq("id", 1)
    .maybeSingle()

  if (error) {
    console.error("getSaldoPengelola:", error)
    return 0
  }

  return data?.saldo ?? 0
}

/* =========================
   TOTAL SALDO NASABAH
========================= */
export async function getTotalSaldoNasabah(): Promise<number> {

  const { data: transaksi } = await supabase
    .from("transaksi")
    .select("total_nasabah")

  const { data: penarikan } = await supabase
    .from("penarikan_saldo")
    .select("jumlah")

  const totalSetoran =
    transaksi?.reduce((sum, t) => sum + Number(t.total_nasabah || 0), 0) ?? 0

  const totalPenarikan =
    penarikan?.reduce((sum, p) => sum + Number(p.jumlah || 0), 0) ?? 0

  return totalSetoran - totalPenarikan
}

/* =========================
   TOTAL NASABAH
========================= */
export async function getTotalNasabah(): Promise<number> {
  const { count, error } = await supabase
    .from("nasabah")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error(error)
    return 0
  }

  return count ?? 0
}

/* =========================
   TOTAL SAMPAH
========================= */
export async function getTotalSampah(): Promise<number> {

  const { data: setor } = await supabase
    .from("detail_transaksi")
    .select("berat")

  const { data: jual } = await supabase
    .from("penjualan_detail")
    .select("berat")

  const totalSetor =
    setor?.reduce((acc, item) => acc + Number(item.berat), 0) ?? 0

  const totalTerjual =
    jual?.reduce((acc, item) => acc + Number(item.berat), 0) ?? 0

  return totalSetor - totalTerjual
}

/* =========================
   TOTAL TRANSAKSI
========================= */
export async function getTotalTransaksi(): Promise<number> {
  const { count, error } = await supabase
    .from("transaksi")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error(error)
    return 0
  }

  return count ?? 0
}

/* =========================
   TOTAL JENIS SAMPAH
========================= */
export async function getTotalJenisSampah(): Promise<number> {
  const { count, error } = await supabase
    .from("jenis_sampah")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error(error)
    return 0
  }

  return count ?? 0
}

/* =========================
   LABA RUGI
========================= */
export async function getRingkasanLabaRugi() {

  const { data, error } = await supabase
    .from("penjualan_detail")
    .select(`
      total_penjualan,
      nilai_beli,
      laba_rugi
    `)

  if (error) {
    console.error(error)
    return { totalPenjualan: 0, totalNilaiBeli: 0, totalLaba: 0 }
  }

  const totalPenjualan = data.reduce(
    (acc, item) => acc + Number(item.total_penjualan || 0),
    0
  )

  const totalNilaiBeli = data.reduce(
    (acc, item) => acc + Number(item.nilai_beli || 0),
    0
  )

  const totalLaba = data.reduce(
    (acc, item) => acc + Number(item.laba_rugi || 0),
    0
  )

  return { totalPenjualan, totalNilaiBeli, totalLaba }
}

/* =========================
   KAS MASUK
========================= */
export async function getTotalKasMasuk(): Promise<number> {
  const { data } = await supabase
    .from("penjualan")
    .select("total_penjualan")

  return data?.reduce(
    (acc, item) => acc + Number(item.total_penjualan || 0),
    0
  ) ?? 0
}

/* =========================
   KAS KELUAR
========================= */
export async function getKasKeluar(): Promise<number> {

  const { data: nasabah } = await supabase
    .from("penarikan_saldo")
    .select("jumlah")

  const { data: pengelola } = await supabase
    .from("penarikan_pengelola")
    .select("jumlah")

  const totalNasabah =
    nasabah?.reduce((acc, item) => acc + Number(item.jumlah || 0), 0) ?? 0

  const totalPengelola =
    pengelola?.reduce((acc, item) => acc + Number(item.jumlah || 0), 0) ?? 0

  return totalNasabah + totalPengelola
}

/* =========================
   KAS BERSIH
========================= */
export async function getKasBersih(): Promise<number> {
  const kasMasuk = await getTotalKasMasuk()
  const kasKeluar = await getKasKeluar()

  return kasMasuk - kasKeluar
}

/* =========================
   NILAI STOK
========================= */
export async function getNilaiTotalStok(): Promise<number> {
  const { data } = await supabase
    .from("stok_sampah_view")
    .select("stok, harga_per_kg")

  return data?.reduce(
    (acc, item) =>
      acc + Number(item.stok || 0) * Number(item.harga_per_kg || 0),
    0
  ) ?? 0
}

/* =========================
   TARIK SALDO PENGELOLA
========================= */
export async function tarikSaldoPengelola(jumlah: number) {

  const kasBersih = await getKasBersih()

  if (jumlah > kasBersih) {
    throw new Error("Kas tidak cukup")
  }

  const { data: pengelola } = await supabase
    .from("pengelola")
    .select("saldo")
    .eq("id", 1)
    .maybeSingle()

  const saldoSekarang = Number(pengelola?.saldo || 0)

  const { error: err1 } = await supabase
    .from("penarikan_pengelola")
    .insert([{ jumlah }])

  if (err1) throw err1

  const { error: err2 } = await supabase
    .from("pengelola")
    .update({ saldo: saldoSekarang - jumlah })
    .eq("id", 1)

  if (err2) throw err2
}

/* =========================
   RIWAYAT PENARIKAN
========================= */
export async function getRiwayatPenarikanPengelola(
  page: number,
  limit: number = 10
) {

  const start = (page - 1) * limit
  const end = start + limit - 1

  const { data, error, count } = await supabase
    .from("penarikan_pengelola")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, end)

  if (error) throw error

  return {
    data: data || [],
    total: count || 0
  }
}

/* =========================
   ❌ BATALKAN PENARIKAN (NEW)
========================= */
export async function batalkanPenarikanPengelola(id: number) {

  // ambil data penarikan
  const { data, error } = await supabase
    .from("penarikan_pengelola")
    .select("jumlah")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  if (!data) throw new Error("Data tidak ditemukan")

  const jumlah = Number(data.jumlah)

  // ambil saldo sekarang
  const { data: pengelola } = await supabase
    .from("pengelola")
    .select("saldo")
    .eq("id", 1)
    .maybeSingle()

  const saldoSekarang = Number(pengelola?.saldo || 0)

  // kembalikan saldo
  const { error: err1 } = await supabase
    .from("pengelola")
    .update({ saldo: saldoSekarang + jumlah })
    .eq("id", 1)

  if (err1) throw err1

  // hapus data penarikan
  const { error: err2 } = await supabase
    .from("penarikan_pengelola")
    .delete()
    .eq("id", id)

  if (err2) throw err2
}