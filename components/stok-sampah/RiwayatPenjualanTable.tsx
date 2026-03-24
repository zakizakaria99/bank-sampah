"use client"

import { Penjualan } from "@/types/penjualan"
import { Eye } from "lucide-react"

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

  const rupiah = (v: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(v)

  const formatBerat = (v: number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(v)
  }

  const sortedData = data

  return (

    <div className="bg-white shadow-sm border border-green-100 p-4 md:p-5">

      <h2 className="text-base md:text-lg font-semibold text-green-800 mb-4">
        Riwayat Penjualan
      </h2>

      <div className="overflow-x-auto border border-green-200">

        <table className="min-w-full text-sm md:text-base border-collapse">

          <thead className="bg-green-100 text-green-900">
            <tr>

              <th className="p-3 md:p-4 border text-left text-xs md:text-sm">
                Tanggal
              </th>

              {/* ✅ LEBARKAN KOLOM BERAT */}
              <th className="p-3 md:p-4 border text-left text-xs md:text-sm min-w-[80px] md:min-w-[100px]">
                Berat
              </th>

              <th className="p-3 md:p-4 border text-right text-xs md:text-sm min-w-[120px] md:min-w-[180px]">
                Penjualan
              </th>

              <th className="p-3 md:p-4 border text-right text-xs md:text-sm min-w-[120px] md:min-w-[180px]">
                Laba / Rugi
              </th>

              <th className="p-3 md:p-4 border text-center text-xs md:text-sm">
                Aksi
              </th>

            </tr>
          </thead>

          <tbody>

            {sortedData.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 md:p-6 text-center text-gray-500 text-sm border"
                >
                  Belum ada riwayat penjualan
                </td>
              </tr>
            )}

            {sortedData.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-green-50 transition"
              >

                <td className="p-3 md:p-4 border text-xs md:text-sm">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>

                {/* ✅ LEBARKAN CELL BERAT */}
                <td className="p-3 md:p-4 border text-xs md:text-sm min-w-[80px] md:min-w-[100px]">
                  {formatBerat(item.total_berat)} kg
                </td>

                <td className="p-3 md:p-4 border text-right whitespace-nowrap tabular-nums text-xs md:text-sm font-medium">
                  {rupiah(item.total_penjualan)}
                </td>

                <td
                  className={`p-3 md:p-4 border text-right whitespace-nowrap tabular-nums text-xs md:text-sm font-semibold ${
                    item.total_laba_rugi >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {rupiah(item.total_laba_rugi)}
                </td>

                <td className="p-3 md:p-4 border text-center">
                  <button
                    onClick={() => onDetail(item.id)}
                    className="flex items-center gap-1 text-green-600 hover:underline justify-center text-xs md:text-sm"
                  >
                    <Eye size={14} />
                    Detail
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between items-center mt-4 text-xs md:text-sm">

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border disabled:opacity-40 hover:bg-gray-50"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Halaman {page} / {totalPage || 1}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border disabled:opacity-40 hover:bg-gray-50"
        >
          Next
        </button>

      </div>

    </div>
  )
}