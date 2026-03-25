/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase"
import {
  GrafikData,
  LaporanSampahTable
} from "@/types/grafik"

const namaBulan = [
  "",
  "Jan","Feb","Mar","Apr","Mei","Jun",
  "Jul","Agu","Sep","Okt","Nov","Des"
]

/* =========================
   GRAFIK SEMESTER (100%)
========================= */
export async function getGrafikSemester(
  tahun: number,
  semester: number
): Promise<GrafikData[]> {

  const { data, error } = await supabase
    .from("transaksi")
    .select(`
      tanggal,
      detail_transaksi (
        berat,
        harga
      )
    `)

  if (error) {
    throw new Error(error.message)
  }

  const bulanSemester =
    semester === 1
      ? [1,2,3,4,5,6]
      : [7,8,9,10,11,12]

  const map: Record<number, { berat: number; pendapatan: number }> = {}

  bulanSemester.forEach(b => {
    map[b] = { berat: 0, pendapatan: 0 }
  })

  for (const trx of data || []) {

    if (!trx.tanggal) continue

    const date = new Date(trx.tanggal)
    const bulan = date.getMonth() + 1
    const tahunData = date.getFullYear()

    if (tahunData !== tahun) continue
    if (!bulanSemester.includes(bulan)) continue

    for (const d of trx.detail_transaksi || []) {

      const berat = Number(d.berat || 0)

      // 🔥 100% (BUKAN subtotal)
      const pendapatan = Number(d.harga || 0) * berat

      map[bulan].berat += berat
      map[bulan].pendapatan += pendapatan
    }
  }

  return bulanSemester.map((b) => ({
    bulan: namaBulan[b],
    berat: map[b].berat,
    pendapatan: map[b].pendapatan
  }))
}


/* =========================
   LAPORAN TAHUNAN (100%)
========================= */
export async function getLaporanSampahTahunan(
  tahun: number
): Promise<LaporanSampahTable[]> {

  const { data, error } = await supabase
    .from("transaksi")
    .select(`
      tanggal,
      detail_transaksi (
  berat,
  harga,
  jenis_sampah (
    nama_sampah
  )
)
    `)

  if (error) {
    throw new Error(error.message)
  }

  const map: Record<string, LaporanSampahTable> = {}

  for (const trx of data || []) {

    if (!trx.tanggal) continue

    const date = new Date(trx.tanggal)
    const tahunData = date.getFullYear()
    const bulan = date.getMonth() + 1

    if (tahunData !== tahun) continue

    const namaBulanKey = namaBulan[bulan] as keyof LaporanSampahTable

    for (const d of trx.detail_transaksi || []) {

      // 🔥 FIX RELASI (BUKAN ARRAY)
      const jenis = d.jenis_sampah as any
const nama = jenis?.nama_sampah || "Tidak diketahui"

      const berat = Number(d.berat || 0)

      // 🔥 100% (harga × berat)
      const totalHarga = Number(d.harga || 0) * berat

      if (!map[nama]) {
        map[nama] = {
          nama_sampah: nama,
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, Mei: 0, Jun: 0,
          Jul: 0, Agu: 0, Sep: 0, Okt: 0, Nov: 0, Des: 0,
          total_kg: 0,
          total_harga: 0
        }
      }

      if (namaBulanKey in map[nama]) {
        ;(map[nama] as any)[namaBulanKey] += berat
      }

      map[nama].total_kg += berat
      map[nama].total_harga += totalHarga
    }
  }

  return Object.values(map)
}