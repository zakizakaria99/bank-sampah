import StatCard from "@/components/ui/StatCard"

interface Props {
  totalNasabah: number
  totalSaldoNasabah: number
  saldoPengelola: number
  totalTransaksi: number
  totalSampah: number
  totalJenisSampah: number
}

export default function LaporanCard({
  totalNasabah,
  totalSaldoNasabah,
  saldoPengelola,
  totalTransaksi,
  totalSampah,
  totalJenisSampah
}: Props) {

  return (

    <div className="grid grid-cols-3 gap-6 mb-8">

      <StatCard
        title="Total Nasabah"
        value={totalNasabah}
        color="bg-green-500"
      />

      <StatCard
        title="Total Saldo Nasabah"
        value={`Rp ${totalSaldoNasabah}`}
        color="bg-emerald-500"
      />

      <StatCard
        title="Saldo Pengelola"
        value={`Rp ${saldoPengelola}`}
        color="bg-blue-500"
      />

      <StatCard
        title="Total Transaksi"
        value={totalTransaksi}
        color="bg-purple-500"
      />

      <StatCard
        title="Total Sampah Terkumpul"
        value={`${totalSampah} Kg`}
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