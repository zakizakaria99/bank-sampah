"use client"

import { useEffect, useState } from "react"
import { getDetailPenjualan } from "@/services/stokSampahService"
import { PenjualanDetail } from "@/types/penjualanDetail"
import { X, Receipt } from "lucide-react"

interface Props {
  open: boolean
  penjualanId: string | null
  onClose: () => void
}

export default function DetailPenjualanModal({
  open,
  penjualanId,
  onClose
}: Props) {

  const [data, setData] = useState<PenjualanDetail[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !penjualanId) return

    const fetchDetail = async () => {
      try {
        setLoading(true)
        const result = await getDetailPenjualan(penjualanId)
        setData(result || [])
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [open, penjualanId])

  if (!open) return null

  const rupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value)

  const totalKeseluruhan = data.reduce(
    (sum, item) => sum + item.total_penjualan,
    0
  )

  return (

    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-4 md:p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">

          <div className="flex items-center gap-3">

            <div className="bg-green-100 text-green-700 p-2 rounded-xl">
              <Receipt size={18} />
            </div>

            <div>
              <h2 className="text-base md:text-lg font-semibold">
                Detail Penjualan
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Rincian transaksi penjualan sampah
              </p>
            </div>

          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>

        </div>

        {/* CONTENT */}
        {loading ? (

          <div className="text-sm text-gray-500">
            Memuat data...
          </div>

        ) : (

          <div className="overflow-x-auto border border-green-200">

            <table className="min-w-full text-sm md:text-base border-collapse">

              <thead className="bg-green-100 text-green-900">
                <tr>
                  <th className="p-3 md:p-4 border text-left text-xs md:text-sm">
                    Jenis Sampah
                  </th>
                  <th className="p-3 md:p-4 border text-left text-xs md:text-sm">
                    Berat
                  </th>
                  <th className="p-3 md:p-4 border text-right text-xs md:text-sm">
                    Harga / Kg
                  </th>
                  <th className="p-3 md:p-4 border text-right text-xs md:text-sm">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>

                {data.map((item) => (

                  <tr key={item.id} className="border-t hover:bg-green-50">

                    <td className="p-3 md:p-4 border text-xs md:text-sm font-medium">
                      {item.nama_sampah}
                    </td>

                    <td className="p-3 md:p-4 border text-xs md:text-sm">
                      {item.berat} kg
                    </td>

                    <td className="p-3 md:p-4 border text-right text-xs md:text-sm">
                      {rupiah(item.harga_jual)}
                    </td>

                    <td className="p-3 md:p-4 border text-right font-semibold text-xs md:text-sm">
                      {rupiah(item.total_penjualan)}
                    </td>

                  </tr>

                ))}

                <tr className="bg-green-50">

                  <td colSpan={3} className="p-3 md:p-4 border text-right font-semibold text-sm md:text-base">
                    Total Penjualan
                  </td>

                  <td className="p-3 md:p-4 border text-right font-bold text-green-700 text-sm md:text-base">
                    {rupiah(totalKeseluruhan)}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  )
}