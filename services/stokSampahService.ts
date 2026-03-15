import { supabase } from "@/lib/supabase"

export async function getStokSampah() {
  const { data, error } = await supabase
    .from("stok_sampah_view")
    .select("*")
    .order("nama_sampah")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getRiwayatPenjualan(page: number) {
  const limit = 5
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from("penjualan")
    .select("*", { count: "exact" })
    .order("tanggal", { ascending: false })
    .range(from, to)

  if (error) {
    throw new Error(error.message)
  }

  return {
    data,
    count
  }
}

export async function getDetailPenjualan(penjualanId: string) {

  const { data, error } = await supabase
    .from("penjualan_detail")
    .select(`
      id,
      berat,
      harga_jual,
      total_penjualan,
      laba_rugi,
      jenis_sampah_id
    `)
    .eq("penjualan_id", penjualanId)

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  const jenisIds = data.map((d) => d.jenis_sampah_id)

  const { data: jenisSampah } = await supabase
    .from("jenis_sampah")
    .select("id, nama_sampah")
    .in("id", jenisIds)

  const mapJenis = new Map(
    jenisSampah?.map((j) => [j.id, j.nama_sampah])
  )

  const result = data.map((d) => ({
    ...d,
    nama_sampah: mapJenis.get(d.jenis_sampah_id)
  }))

  return result
}
export async function createPenjualan(items: any[]) {

  const today = new Date().toISOString().split("T")[0]

  let totalBerat = 0
  let totalPenjualan = 0
  let totalLabaRugi = 0

  const details = items.map((item) => {

    const total = item.berat * item.harga_jual
    const nilaiBeli = item.berat * item.harga_nasabah
    const labaRugi = total - nilaiBeli

    totalBerat += item.berat
    totalPenjualan += total
    totalLabaRugi += labaRugi

    return {
      jenis_sampah_id: item.jenis_sampah_id,
      berat: item.berat,
      harga_jual: item.harga_jual,
      total_penjualan: total,
      nilai_beli: nilaiBeli,
      laba_rugi: labaRugi
    }
  })

  const { data: penjualan, error } = await supabase
    .from("penjualan")
    .insert({
      tanggal: today,
      total_berat: totalBerat,
      total_penjualan: totalPenjualan,
      total_laba_rugi: totalLabaRugi
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  const detailInsert = details.map((d) => ({
    ...d,
    penjualan_id: penjualan.id
  }))

  for (const item of items) {

    const { data: cek, error: cekError } = await supabase
      .rpc("cek_stok_sampah", {
        p_jenis_sampah_id: item.jenis_sampah_id,
        p_berat: item.berat
      })

    if (cekError) {
      throw new Error(cekError.message)
    }

    if (!cek) {
      throw new Error("Stok tidak mencukupi")
    }

  }

  const { error: detailError } = await supabase
    .from("penjualan_detail")
    .insert(detailInsert)

  if (detailError) {
    throw new Error(detailError.message)
  }

  return penjualan
}