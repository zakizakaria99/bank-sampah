"use client"

import { useState } from "react"

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

    const normalized = value.replace(",", ".")
    const angka = Number(normalized)

    if (!isNaN(angka)) {
      setHarga(angka)
    }

  }

  function handleSubmit() {

    // VALIDASI NAMA
    if (!nama.trim()) {
      setError("Nama sampah wajib diisi.")
      return
    }

    // VALIDASI HARGA
    if (harga === "" || harga <= 0) {
      setError("Harga per kg harus diisi dan lebih dari 0.")
      return
    }

    setError("")

    // KONFIRMASI
    const confirm = window.confirm(
      editId
        ? "Apakah yakin ingin memperbarui jenis sampah?"
        : "Apakah yakin ingin menambahkan jenis sampah?"
    )

    if (!confirm) return

    simpan()
  }

  return (

    <div className="grid grid-cols-2 gap-4 mb-6">

      <input
        className="border border-green-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Nama Sampah"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        type="number"
        step="0.01"
        min="0"
        className="border border-green-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Harga per Kg"
        value={harga === "" ? "" : harga}
        onChange={(e) => handleHargaChange(e.target.value)}
      />

      {error && (
        <div className="col-span-2 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="col-span-2 flex gap-3">

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
        >
          {editId ? "Update Sampah" : "Tambah Sampah"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}

      </div>

    </div>

  )
}