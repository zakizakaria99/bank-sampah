import { supabase } from "@/lib/supabase"
import { ItemTransaksi, Sampah } from "@/types/transaksi"

export async function getMasterData() {

  const { data: nasabah } = await supabase
    .from("nasabah")
    .select("*")

  const { data: sampah } = await supabase
    .from("jenis_sampah")
    .select("*")

  return {
    nasabah: nasabah || [],
    sampah: sampah || []
  }
}

export async function simpanTransaksi(
  nasabahId: string,
  items: ItemTransaksi[],
  sampah: Sampah[],
  totalNasabah: number,
  totalPengelola: number
) {

  // VALIDASI: harus ada minimal 1 item valid
  const validItems = items.filter(
    (item) =>
      item.jenis_sampah_id !== "" &&
      Number(item.berat) > 0
  )

  if (validItems.length === 0) {
    throw new Error("Detail transaksi kosong")
  }

  const { data, error } = await supabase
    .from("transaksi")
    .insert([
      {
        nasabah_id: nasabahId,
        total_nasabah: totalNasabah,
        total_pengelola: totalPengelola
      }
    ])
    .select()

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  const transaksiId = data[0].id

  for (const item of validItems) {

    const sampahData = sampah.find(
      (s) => s.id === item.jenis_sampah_id
    )

    if (!sampahData) continue

    const berat = Number(item.berat || 0)

    const subtotal =
      Math.round(sampahData.harga_per_kg * berat)

    await supabase
      .from("detail_transaksi")
      .insert([
        {
          transaksi_id: transaksiId,
          jenis_sampah_id: item.jenis_sampah_id,
          berat: berat,
          harga: sampahData.harga_per_kg,
          subtotal
        }
      ])

  }

}

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
    .order("tanggal", { ascending: false })
    .range(start, end)

  if (error) throw error

  return {
    data: data || [],
    total: count || 0
  }
}

export async function getDetailSetor(transaksiId: string) {

  const { data, error } = await supabase
    .from("detail_transaksi")
    .select(`
      berat,
      harga,
      subtotal,
      jenis_sampah (
        nama_sampah
      )
    `)
    .eq("transaksi_id", transaksiId)

  if (error) throw error

  return data || []
}