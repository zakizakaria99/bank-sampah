"use client"

import { useEffect, useState } from "react"
import { JenisSampah } from "@/types/jenisSampah"
import { Recycle } from "lucide-react"

import JenisSampahForm from "@/components/jenis-sampah/JenisSampahForm"
import JenisSampahTable from "@/components/jenis-sampah/JenisSampahTable"

import {
  getJenisSampah,
  tambahJenisSampah,
  updateJenisSampah
} from "@/services/jenisSampahService"

export default function JenisSampahPage() {
  const [sampah, setSampah] = useState<JenisSampah[]>([])

  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState<number | "">("")
  const [editId, setEditId] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  async function loadData() {
    const data = await getJenisSampah()

    const sorted = [...data].sort((a, b) =>
      a.nama_sampah.localeCompare(b.nama_sampah)
    )

    setSampah(sorted)
  }

  async function simpan() {
    if (!nama || harga === "") return

    const payload = {
      nama_sampah: nama,
      harga_per_kg: Number(harga)
    }

    if (editId) {
      await updateJenisSampah(editId, payload)
    } else {
      await tambahJenisSampah(payload)
    }

    cancelEdit()
    loadData()
  }

  function handleSubmitConfirm() {
    setShowConfirm(true)
  }

  function handleConfirmYes() {
    setShowConfirm(false)
    simpan()
  }

  function handleConfirmNo() {
    setShowConfirm(false)
  }

  function editData(data: JenisSampah) {
    setNama(data.nama_sampah)
    setHarga(data.harga_per_kg)
    setEditId(data.id)
  }

  function cancelEdit() {
    setNama("")
    setHarga("")
    setEditId(null)
  }

  // ✅ FIX UTAMA DI SINI (tanpa ubah logic)
  useEffect(() => {
    const init = async () => {
      await loadData()
    }
    init()
  }, [])

  const filteredData = sampah.filter((s) =>
    s.nama_sampah.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 md:px-8 py-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-start gap-3 mb-6">
          <div className="bg-green-600 p-2 rounded-xl text-white">
            <Recycle size={20} />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              Jenis Sampah
            </h1>
            <p className="text-gray-500 text-sm">
              Pengelolaan data sampah
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 mb-6">
          <JenisSampahForm
            nama={nama}
            harga={harga}
            setNama={setNama}
            setHarga={setHarga}
            simpan={handleSubmitConfirm}
            editId={editId}
            onCancelEdit={cancelEdit}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4">
          <JenisSampahTable
            data={filteredData}
            onEdit={editData}
          />
        </div>

        {/* MODAL */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="mb-4 font-medium">
                {editId ? "Update jenis sampah?" : "Tambah jenis sampah?"}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleConfirmNo}
                  className="px-4 py-2 rounded-lg bg-gray-200"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmYes}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white"
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}