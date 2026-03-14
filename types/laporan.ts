export interface Laporan {
  id: string
  tanggal: string
  total_nasabah: number
  total_pengelola: number

  nasabah: {
    nama: string
  }[]
}