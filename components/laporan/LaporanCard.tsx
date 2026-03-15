import StatCard from "@/components/ui/StatCard"

interface Props {
  totalNasabah: number
  totalSaldoNasabah: number
  saldoPengelola: number
  totalTransaksi: number
  totalSampah: number
  totalJenisSampah: number
  totalKasMasuk: number
  nilaiStok: number
}

export default function LaporanCard({
  totalNasabah,
  totalSaldoNasabah,
  saldoPengelola,
  totalTransaksi,
  totalSampah,
  totalJenisSampah,
  totalKasMasuk,
  nilaiStok
}: Props) {

  const formatRupiah = (value: number) =>
    value.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  return (

    <div className="space-y-6 mb-8">

      <div className="grid grid-cols-3 gap-6">

        <StatCard
          title="Total Nasabah"
          value={totalNasabah}
          color="bg-green-500"
        />

        <StatCard
          title="Total Saldo Nasabah"
          value={`Rp ${formatRupiah(totalSaldoNasabah)}`}
          color="bg-emerald-500"
        />

        <StatCard
          title="Saldo Pengelola"
          value={`Rp ${formatRupiah(saldoPengelola)}`}
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

        <div className="bg-green-50 p-6 rounded-xl border">
          <p className="text-sm text-gray-500">
            Nilai Total Stok Sampah
          </p>

          <p className="text-xl font-bold text-green-700">
            Rp {formatRupiah(nilaiStok)}
          </p>
        </div>

      </div>

      <div className="bg-green-50 p-6 rounded-xl border">
        <p className="text-sm text-gray-500">
          Kas Masuk dari Penjualan
        </p>

        <p className="text-xl font-bold text-green-700">
          Rp {formatRupiah(totalKasMasuk)}
        </p>

      </div>

    </div>

  )

}