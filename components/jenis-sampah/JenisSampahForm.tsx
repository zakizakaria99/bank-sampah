"use client"

import { useState } from "react"
import { Plus, Save, X } from "lucide-react"

interface Props {
  nama: string
  harga: number | ""
  setNama: (v: string) => void
  setHarga: (v: number | "") => void
  simpan: () => void
  editId: string | null
  onCancelEdit: () => void
}

export default function JenisSampahForm({
  nama,
  harga,
  setNama,
  setHarga,
  simpan,
  editId,
  onCancelEdit
}: Props) {

  const [error, setError] = useState("")

  const handleHargaChange = (value: string) => {
    if (value === "") {
      setHarga("")
      return
    }

    const angka = Number(value.replace(",", "."))
    if (!isNaN(angka)) {
      setHarga(angka)
    }
  }

  function handleSubmit() {
    if (!nama.trim()) {
      setError("Nama sampah wajib diisi.")
      return
    }

    if (harga === "" || harga <= 0) {
      setError("Harga harus lebih dari 0.")
      return
    }

    setError("")
    simpan()
  }

  return (
    <div className="flex flex-col gap-4">

      {/* INPUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          className="border border-green-200 rounded-xl p-3 md:p-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Nama Sampah"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <input
          type="number"
          className="border border-green-200 rounded-xl p-3 md:p-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Harga per Kg"
          value={harga === "" ? "" : harga}
          onChange={(e) => handleHargaChange(e.target.value)}
        />

      </div>

      {/* ERROR */}
      {error && (
        <p className="text-xs md:text-sm text-red-500">
          {error}
        </p>
      )}

      {/* BUTTON */}
      <div className="flex flex-wrap gap-3">

        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm md:text-base font-semibold shadow-sm"
        >
          {editId ? <Save size={16} /> : <Plus size={16} />}
          {editId ? "Update" : "Tambah"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-5 py-2.5 rounded-xl text-sm md:text-base"
          >
            <X size={16} />
            Batal
          </button>
        )}

      </div>

    </div>
  )
}