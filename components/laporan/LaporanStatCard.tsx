"use client"

import StatCard from "@/components/ui/StatCard"

interface Props {
  totalNasabah: number
  totalSaldoNasabah: number
  saldoPengelola: number
  totalTransaksi: number
  totalSampah: number
  totalJenisSampah: number
}

export default function LaporanStatCard({
  totalNasabah,
  totalSaldoNasabah,
  saldoPengelola,
  totalTransaksi,
  totalSampah,
  totalJenisSampah
}: Props) {

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0
    }).format(value)

  const formatKg = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 2
    }).format(value)

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

      <StatCard
        title="Transaksi"
        value={totalTransaksi}
        color="bg-purple-500"
      />

      <StatCard
        title="Nasabah"
        value={totalNasabah}
        color="bg-green-500"
      />

      <StatCard
        title="Saldo Nasabah"
        value={`Rp ${formatRupiah(totalSaldoNasabah)}`}
        color="bg-emerald-500"
      />

      <StatCard
        title="Saldo Pengelola"
        value={`Rp ${formatRupiah(saldoPengelola)}`}
        color="bg-blue-500"
      />

      <StatCard
        title="Total Sampah"
        value={`${formatKg(totalSampah)} Kg`}
        color="bg-orange-500"
      />

      <StatCard
        title="Jenis Sampah"
        value={totalJenisSampah}
        color="bg-gray-700"
      />

    </div>
  )
}