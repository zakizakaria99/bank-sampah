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

    <div className="max-w-5xl mx-auto mt-10 space-y-4">

      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-green-800">
        Ringkasan Laba / Rugi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white border rounded-2xl p-4 md:p-6 shadow-sm">

          <p className="text-xs md:text-sm text-gray-500">
            Total Penjualan
          </p>

          <p className="text-lg md:text-2xl font-bold text-green-700 mt-1">
            {formatRupiah(totalPenjualan)}
          </p>

        </div>

        <div className="bg-white border rounded-2xl p-4 md:p-6 shadow-sm">

          <p className="text-xs md:text-sm text-gray-500">
            Total Nilai Beli
          </p>

          <p className="text-lg md:text-2xl font-bold text-gray-700 mt-1">
            {formatRupiah(totalNilaiBeli)}
          </p>

        </div>

        <div className="bg-white border rounded-2xl p-4 md:p-6 shadow-sm">

          <p className="text-xs md:text-sm text-gray-500">
            Total Laba Bersih
          </p>

          <p
            className={`text-lg md:text-2xl font-bold mt-1 ${
              totalLaba >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatRupiah(totalLaba)}
          </p>

        </div>

      </div>

    </div>

  )

}