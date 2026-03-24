"use client"

interface Kas {
  id: string
  tanggal: string
  keterangan: string
  pemasukan: number
  pengeluaran: number
  saldo: number
}

interface Props {
  data: Kas[]
}

export default function LaporanKasTable({ data }: Props) {

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value)
  }

  return (

    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-4 md:p-6 space-y-4">

      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-green-800">
        Laporan Kas
      </h2>

      <div className="overflow-x-auto rounded-xl border border-green-100">

        <table className="w-full min-w-[600px]">

          <thead className="bg-green-100 text-green-900 text-xs md:text-sm">

            <tr>
              <th className="p-3 md:p-4 text-left">Tanggal</th>
              <th className="p-3 md:p-4 text-left">Keterangan</th>
              <th className="p-3 md:p-4 text-left">Masuk</th>
              <th className="p-3 md:p-4 text-left">Keluar</th>
              <th className="p-3 md:p-4 text-left">Saldo</th>
            </tr>

          </thead>

          <tbody className="text-sm md:text-base">

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500 text-sm">
                  Belum ada data kas
                </td>
              </tr>
            )}

            {data.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-green-50 transition"
              >

                <td className="p-3 md:p-4 whitespace-nowrap">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>

                <td className="p-3 md:p-4">
                  {item.keterangan}
                </td>

                <td className="p-3 md:p-4 text-green-600 font-semibold">
                  {formatRupiah(item.pemasukan)}
                </td>

                <td className="p-3 md:p-4 text-red-600 font-semibold">
                  {formatRupiah(item.pengeluaran)}
                </td>

                <td className="p-3 md:p-4 font-semibold">
                  {formatRupiah(item.saldo)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}