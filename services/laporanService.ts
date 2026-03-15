import { supabase } from "@/lib/supabase"
import { Laporan } from "@/types/laporan"

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

export async function getTotalNasabah(): Promise<number> {

  const { count, error } = await supabase
    .from("nasabah")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error("getTotalNasabah:", error)
    return 0
  }

  return count ?? 0
}

export async function getTotalSampah(): Promise<number> {

  // total sampah masuk
  const { data: setor, error: errorSetor } = await supabase
    .from("detail_transaksi")
    .select("berat")

  if (errorSetor) {
    console.error(errorSetor)
    return 0
  }

  const totalSetor = setor?.reduce(
    (acc, item) => acc + Number(item.berat),
    0
  ) ?? 0

  // total sampah yang sudah dijual
  const { data: jual, error: errorJual } = await supabase
    .from("penjualan_detail")
    .select("berat")

  if (errorJual) {
    console.error(errorJual)
    return totalSetor
  }

  const totalTerjual = jual?.reduce(
    (acc, item) => acc + Number(item.berat),
    0
  ) ?? 0

  // stok tersisa
  const stok = totalSetor - totalTerjual

  return stok
}

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

export async function getRingkasanLabaRugi() {

  const { data, error } = await supabase
    .from("penjualan_detail")
    .select(`
      total_penjualan,
      nilai_beli,
      laba_rugi
    `)

  if (error) {
    console.error("getRingkasanLabaRugi:", error)
    return {
      totalPenjualan: 0,
      totalNilaiBeli: 0,
      totalLaba: 0
    }
  }

  const totalPenjualan = data.reduce(
    (acc, item) => acc + Number(item.total_penjualan),
    0
  )

  const totalNilaiBeli = data.reduce(
    (acc, item) => acc + Number(item.nilai_beli),
    0
  )

  const totalLaba = data.reduce(
    (acc, item) => acc + Number(item.laba_rugi),
    0
  )

  return {
    totalPenjualan,
    totalNilaiBeli,
    totalLaba
  }
}

export async function getTotalKasMasuk(): Promise<number> {

  const { data, error } = await supabase
    .from("penjualan")
    .select("total_penjualan")

  if (error) {
    console.error(error)
    return 0
  }

  if (!data) return 0

  const total = data.reduce(
    (acc, item) => acc + Number(item.total_penjualan),
    0
  )

  return total
}

export async function getNilaiTotalStok(): Promise<number> {

  const { data, error } = await supabase
    .from("stok_sampah_view")
    .select("stok, harga_per_kg")

  if (error) {
    console.error("getNilaiTotalStok:", error)
    return 0
  }

  if (!data) return 0

  const total = data.reduce(
    (acc, item) =>
      acc + Number(item.stok) * Number(item.harga_per_kg),
    0
  )

  return total
}

export async function getTotalSampahMasuk(): Promise<number> {

  const { data, error } = await supabase
    .from("detail_transaksi")
    .select("berat")

  if (error) {
    console.error("getTotalSampahMasuk:", error)
    return 0
  }

  if (!data) return 0

  const total = data.reduce(
    (acc, item) => acc + Number(item.berat),
    0
  )

  return total
}

export async function getTotalSampahTerjual(): Promise<number> {

  const { data, error } = await supabase
    .from("penjualan_detail")
    .select("berat")

  if (error) {
    console.error("getTotalSampahTerjual:", error)
    return 0
  }

  if (!data) return 0

  const total = data.reduce(
    (acc, item) => acc + Number(item.berat),
    0
  )

  return total
}