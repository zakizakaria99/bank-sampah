"use client"

import { Penjualan } from "@/types/penjualan"

interface Props {
  data: Penjualan[]
  page: number
  total: number
  onPageChange: (page: number) => void
  onDetail: (id: string) => void
}

export default function RiwayatPenjualanTable({
  data,
  page,
  total,
  onPageChange,
  onDetail
}: Props) {

  const totalPage = Math.ceil(total / 5)

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value)
  }

  return (

    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">

      <h2 className="text-xl font-semibold text-green-800">
        Riwayat Penjualan
      </h2>

      <div className="overflow-hidden rounded-lg border border-green-100">

        <table className="w-full">

          <thead className="bg-green-100 text-green-900">

            <tr>

              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">Total Berat</th>
              <th className="p-4 text-left">Total Penjualan</th>
              <th className="p-4 text-left">Laba / Rugi</th>
              <th className="p-4 text-left">Aksi</th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500"
                >
                  Belum ada riwayat penjualan
                </td>

              </tr>

            )}

            {data.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-green-50 transition"
              >

                <td className="p-4">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>

                <td className="p-4">
                  {item.total_berat} kg
                </td>

                <td className="p-4">
                  {formatRupiah(item.total_penjualan)}
                </td>

                <td
                  className={`p-4 font-semibold ${
                    item.total_laba_rugi >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatRupiah(item.total_laba_rugi)}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => onDetail(item.id)}
                    className="text-green-600 hover:underline"
                  >
                    Detail
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      <div className="flex justify-between items-center pt-2 text-sm">

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-40 hover:bg-gray-50"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Halaman {page} / {totalPage || 1}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-40 hover:bg-gray-50"
        >
          Next
        </button>

      </div>

    </div>

  )

}