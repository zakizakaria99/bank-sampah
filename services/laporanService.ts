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
    .single()

  if (error) {
    console.error(error)
    return 0
  }

  return data?.saldo ?? 0

}

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

export async function getTotalSampah(): Promise<number> {

  const { data, error } = await supabase
    .from("detail_transaksi")
    .select("berat")

  if (error) {
    console.error(error)
    return 0
  }

  if (!data) return 0

  const total = data.reduce(
    (acc, item) => acc + Number(item.berat),
    0
  )

  return total

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