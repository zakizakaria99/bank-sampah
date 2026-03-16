"use client"

import { useEffect, useState } from "react"
import { getDetailPenjualan } from "@/services/stokSampahService"
import { PenjualanDetail } from "@/types/penjualanDetail"

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

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    fetchDetail()

  }, [open, penjualanId])

  if (!open) return null

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value)
  }

  // HITUNG TOTAL PENJUALAN
  const totalKeseluruhan = data.reduce(
    (sum, item) => sum + item.total_penjualan,
    0
  )

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-[600px] rounded-lg p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg font-semibold">
            Detail Penjualan
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>

        </div>

        {loading ? (

          <div className="text-gray-500">
            Memuat data...
          </div>

        ) : (

          <table className="w-full text-sm">

            <thead className="bg-green-100">

              <tr>
                <th className="p-2 text-left">Jenis Sampah</th>
                <th className="p-2 text-left">Berat</th>
                <th className="p-2 text-left">Harga Jual / kg</th>
                <th className="p-2 text-left">Total</th>
              </tr>

            </thead>

            <tbody>

              {data.map((item) => (

                <tr key={item.id} className="border-t">

                  <td className="p-2">
                    {item.nama_sampah}
                  </td>

                  <td className="p-2">
                    {item.berat} kg
                  </td>

                  <td className="p-2">
                    {formatRupiah(item.harga_jual)}
                  </td>

                  <td className="p-2 font-semibold">
                    {formatRupiah(item.total_penjualan)}
                  </td>

                </tr>

              ))}

              {/* TOTAL KESELURUHAN */}

              <tr className="border-t bg-gray-100 font-semibold">

                <td colSpan={3} className="p-2 text-right">
                  Total Penjualan
                </td>

                <td className="p-2">
                  {formatRupiah(totalKeseluruhan)}
                </td>

              </tr>

            </tbody>

          </table>

        )}

      </div>

    </div>

  )
}