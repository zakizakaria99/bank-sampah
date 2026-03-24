"use client"

import { useState } from "react"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { motion } from "framer-motion"

interface Props {
  nama: string
  alamat: string
  noHp: string
  setNama: (v: string) => void
  setAlamat: (v: string) => void
  setNoHp: (v: string) => void
  simpan: () => void
  editId: string | null
  onCancelEdit: () => void
}

export default function NasabahForm({
  nama,
  alamat,
  noHp,
  setNama,
  setAlamat,
  setNoHp,
  simpan,
  editId,
  onCancelEdit
}: Props) {

  const [error, setError] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  function handleSubmit() {
    if (!nama.trim() || !alamat.trim() || !noHp.trim()) {
      setError("Nama, alamat, dan no HP wajib diisi.")
      return
    }

    setError("")
    setShowConfirm(true)
  }

  return (
    <>
      <ConfirmModal
        isOpen={showConfirm}
        title={editId ? "Update Nasabah" : "Tambah Nasabah"}
        message={
          editId
            ? "Apakah yakin ingin memperbarui data nasabah?"
            : "Apakah yakin ingin menambahkan nasabah?"
        }
        onConfirm={() => {
          simpan()
          setShowConfirm(false)
        }}
        onCancel={() => setShowConfirm(false)}
      />

      <div className="space-y-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            className="w-full border border-green-200 rounded-lg p-3 md:p-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <input
            className="w-full border border-green-200 rounded-lg p-3 md:p-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />

          <input
            className="w-full border border-green-200 rounded-lg p-3 md:p-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="No HP"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
          />

        </div>

        {error && (
          <div className="text-red-500 text-xs md:text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">

          <button
            onClick={handleSubmit}
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition text-sm md:text-base"
          >
            {editId ? "Update Nasabah" : "Tambah Nasabah"}
          </button>

          {editId && (
            <button
              onClick={onCancelEdit}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg text-sm md:text-base"
            >
              Cancel
            </button>
          )}

        </div>

      </div>
    </>
  )
}