import { supabase } from "@/lib/supabase"
import {
  GrafikBulanan,
  GrafikData,
  LaporanSampahRow,
  LaporanSampahTable
} from "@/types/grafik"

const namaBulan = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des"
]

export async function getGrafikSemester(
  tahun: number,
  semester: number
): Promise<GrafikData[]> {

  const { data, error } = await supabase.rpc("grafik_bulanan", {
    tahun_param: tahun
  })

  if (error) {
    throw new Error(error.message)
  }

  const result: GrafikBulanan[] = data ?? []

  const bulanSemester =
    semester === 1
      ? [1,2,3,4,5,6]
      : [7,8,9,10,11,12]

  const grafik: GrafikData[] = bulanSemester.map((b) => {

    const r = result.find((x) => x.bulan === b)

    return {
      bulan: namaBulan[b],
      berat: r ? Number(r.total_berat) : 0,
      pendapatan: r ? Number(r.total_pendapatan) : 0
    }

  })

  return grafik
}

export async function getLaporanSampahTahunan(
  tahun: number
): Promise<LaporanSampahTable[]> {

  const { data, error } = await supabase.rpc("laporan_sampah_tahunan", {
    tahun_param: tahun
  })

  if (error) {
    throw new Error(error.message)
  }

  const rows: LaporanSampahRow[] = data ?? []

  const map: Record<string, LaporanSampahTable> = {}

  for (const r of rows) {

    if (!map[r.nama_sampah]) {

      map[r.nama_sampah] = {
        nama_sampah: r.nama_sampah,
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        Mei: 0,
        Jun: 0,
        Jul: 0,
        Agu: 0,
        Sep: 0,
        Okt: 0,
        Nov: 0,
        Des: 0,
        total_kg: 0,
        total_harga: 0
      }
    }

    const bulan = namaBulan[r.bulan] as
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "Mei"
  | "Jun"
  | "Jul"
  | "Agu"
  | "Sep"
  | "Okt"
  | "Nov"
  | "Des"

    if (bulan in map[r.nama_sampah]) {
      ;(map[r.nama_sampah] as any)[bulan] = Number(r.total_berat)
    }

    map[r.nama_sampah].total_kg += Number(r.total_berat)
    map[r.nama_sampah].total_harga += Number(r.total_harga)
  }

  return Object.values(map)
}