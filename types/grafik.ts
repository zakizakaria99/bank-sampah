export interface GrafikBulanan {
  bulan: number
  total_berat: number
  total_pendapatan: number
}

export interface GrafikData {
  bulan: string
  berat: number
  pendapatan: number
}

export interface LaporanSampahRow {
  nama_sampah: string
  bulan: number
  total_berat: number
  total_harga: number
}

export interface LaporanSampahTable {
  nama_sampah: string
  Jan: number
  Feb: number
  Mar: number
  Apr: number
  Mei: number
  Jun: number
  Jul: number
  Agu: number
  Sep: number
  Okt: number
  Nov: number
  Des: number
  total_kg: number
  total_harga: number
}