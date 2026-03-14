"use client"

import { useEffect, useState } from "react"
import { JenisSampah } from "@/types/jenisSampah"

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

  async function loadData() {

    const data = await getJenisSampah()

    // SORTING A → Z
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

  useEffect(() => {
    loadData()
  }, [])

  // FILTER PENCARIAN
  const filteredData = sampah.filter((s) =>
    s.nama_sampah.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">

        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Data Jenis Sampah
        </h1>

        <JenisSampahForm
          nama={nama}
          harga={harga}
          setNama={setNama}
          setHarga={setHarga}
          simpan={simpan}
          editId={editId}
          onCancelEdit={cancelEdit}
        />

        {/* SEARCH BAR */}

        <div className="mb-6">

          <input
            type="text"
            placeholder="Cari jenis sampah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-green-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />

        </div>

        <JenisSampahTable
          data={filteredData}
          onEdit={editData}
        />

      </div>

    </div>

  )
}