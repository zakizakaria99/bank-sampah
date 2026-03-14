export interface Nasabah {
  id: string
  nama: string
}

export interface Sampah {
  id: string
  nama_sampah: string
  harga_per_kg: number
}

export interface ItemTransaksi {
  jenis_sampah_id: string
  berat: number | ""
}

export interface Transaksi {
  id: string
  nasabah_id: string
  tanggal: string
  total_nasabah: number
  total_pengelola: number
  created_at: string
}

export interface DetailTransaksi {
  id: string
  berat: number
  harga: number
  subtotal: number

  jenis_sampah: {
    nama_sampah: string
  }
}

export interface PenarikanSaldo {
  id: string
  nasabah_id: string
  jumlah: number
  created_at: string
}