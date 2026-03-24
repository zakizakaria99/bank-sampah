"use client"

import { useState } from "react"
import { tarikSaldoPengelola } from "@/services/laporanService"
import { ArrowDownCircle } from "lucide-react"

interface Props {
  onSuccess: () => void
  kasBersih: number
}

export default function TarikSaldoPengelola({
  onSuccess,
  kasBersih
}: Props) {

  const [jumlah, setJumlah] = useState("")
  const [loading, setLoading] = useState(false)

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0
    }).format(value)

  const handleSubmit = async () => {
    const nilai = Number(jumlah)

    if (!nilai || nilai <= 0) {
      alert("Masukkan jumlah yang valid")
      return
    }

    if (nilai > kasBersih) {
      alert("Kas tidak cukup")
      return
    }

    try {
      setLoading(true)

      await tarikSaldoPengelola(nilai)

      setJumlah("")
      onSuccess()

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert("Terjadi kesalahan")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-blue-50 p-4 md:p-6 rounded-2xl border border-blue-200 shadow-sm">

      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-2 text-blue-700 font-semibold">
          <ArrowDownCircle size={18} />
          <h2 className="text-sm md:text-lg">
            Tarik Saldo Pengelola
          </h2>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">
            Kas tersedia
          </p>
          <p className="text-sm font-semibold text-blue-700">
            Rp {formatRupiah(kasBersih)}
          </p>
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-3">

        <input
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          placeholder="Masukkan jumlah"
          className="flex-1 border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Tarik"}
        </button>

      </div>

      <p className="text-xs text-gray-500 mt-3">
        Penarikan hanya dapat dilakukan sesuai kas yang tersedia
      </p>

    </div>
  )
}