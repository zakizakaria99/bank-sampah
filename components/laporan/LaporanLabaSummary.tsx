"use client"

interface Props {
  totalPenjualan: number
  totalNilaiBeli: number
  totalLaba: number
}

export default function LaporanLabaSummary({
  totalPenjualan,
  totalNilaiBeli,
  totalLaba
}: Props) {

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value)
  }

  return (

    <div className="max-w-5xl mx-auto mt-10">

      <h2 className="text-xl font-semibold text-green-800 mb-4">
        Ringkasan Laba / Rugi
      </h2>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white border rounded-lg p-6 shadow-sm">

          <p className="text-gray-500 text-sm">
            Total Penjualan
          </p>

          <p className="text-xl font-bold text-green-700">
            {formatRupiah(totalPenjualan)}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            berasal dari total penjualan pada tabel penjualan detail
          </p>

        </div>


        <div className="bg-white border rounded-lg p-6 shadow-sm">

          <p className="text-gray-500 text-sm">
            Total Nilai Beli
          </p>

          <p className="text-xl font-bold text-gray-700">
            {formatRupiah(totalNilaiBeli)}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            berasal dari nilai beli sampah yang dibeli dari nasabah
          </p>

        </div>


        <div className="bg-white border rounded-lg p-6 shadow-sm">

          <p className="text-gray-500 text-sm">
            Total Laba Bersih
          </p>

          <p
            className={`text-xl font-bold ${
              totalLaba >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {formatRupiah(totalLaba)}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            berasal dari laba rugi pada tabel penjualan detail
          </p>

        </div>

      </div>

    </div>

  )

}