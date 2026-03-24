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
  transaksi_id: string
  jenis_sampah_id?: string // ✅ optional (tidak selalu ada dari query)
  berat: number
  harga: number
  subtotal: number
  jenis_sampah: {
    nama_sampah: string
  }[] // ✅ FIX: array sesuai Supabase
}

export interface PenarikanSaldo {
  id: string
  nasabah_id: string
  jumlah: number
  created_at: string
}