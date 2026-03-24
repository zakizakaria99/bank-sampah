"use client"

import { useEffect, useState, useCallback } from "react"
import {
  getRiwayatPenarikanPengelola,
  batalkanPenarikanPengelola
} from "@/services/laporanService"

import ConfirmModal from "@/components/ui/ConfirmModal"

import {
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight,
  XCircle
} from "lucide-react"

import { motion } from "framer-motion"

// ✅ TYPE (ganti any)
type PenarikanPengelola = {
  id: number
  created_at: string
  jumlah: number
}

export default function RiwayatPenarikanPengelola() {

  const [data, setData] = useState<PenarikanPengelola[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const limit = 10

  // ✅ pakai useCallback biar aman
  const load = useCallback(async () => {
    const res = await getRiwayatPenarikanPengelola(page, limit)
    setData(res.data || [])
    setTotal(res.total || 0)
  }, [page])

  // ✅ FIX useEffect
  useEffect(() => {
    const fetchData = async () => {
      await load()
    }

    fetchData()
  }, [load])

  const totalPage = Math.ceil(total / limit)

  const handleBatalClick = (id: number) => {
    setSelectedId(id)
    setOpenModal(true)
  }

  const handleConfirm = async () => {
    if (!selectedId) return

    await batalkanPenarikanPengelola(selectedId)

    setOpenModal(false)
    setSelectedId(null)

    await load()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mt-6"
    >

      <div className="flex items-center gap-2 mb-4">
        <ArrowDownCircle className="text-emerald-600" size={20} />
        <h3 className="font-semibold text-gray-800">
          Riwayat Penarikan Pengelola
        </h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm min-w-[500px] border-collapse">

          <thead className="bg-emerald-50 text-emerald-700">
            <tr>
              <th className="p-3 border-b border-r">Tanggal</th>
              <th className="p-3 border-b border-r">Jumlah</th>
              <th className="p-3 border-b text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-400 border-t">
                  Belum ada data
                </td>
              </tr>
            )}

            {data.map((item, i) => (
              <tr
                key={item.id}
                className={`
                  transition hover:bg-emerald-50
                  ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                `}
              >
                <td className="p-3 border-t border-r text-gray-700">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </td>

                <td className="p-3 border-t border-r">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs">
                    Rp {Number(item.jumlah).toLocaleString("id-ID")}
                  </span>
                </td>

                <td className="p-3 border-t text-center">
                  <button
                    onClick={() => handleBatalClick(item.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <XCircle size={14} />
                    Batal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">

        <span className="text-xs text-gray-500">
          Halaman {page} dari {totalPage || 1}
        </span>

        <div className="flex items-center gap-2">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-40"
          >
            Next
            <ChevronRight size={16} />
          </button>

        </div>
      </div>

      <ConfirmModal
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={handleConfirm}
        title="Batalkan Penarikan?"
        message="Apakah kamu yakin ingin membatalkan penarikan ini? Saldo akan dikembalikan."
        variant="danger"
      />

    </motion.div>
  )
}