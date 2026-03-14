"use client"

import { useEffect, useState } from "react"
import { Nasabah } from "@/types/nasabah"

import NasabahForm from "@/components/nasabah/NasabahForm"
import NasabahTable from "@/components/nasabah/NasabahTable"

import {
  getNasabah,
  tambahNasabah,
  updateNasabah
} from "@/services/nasabahService"

export default function NasabahPage() {

  const [nasabah, setNasabah] = useState<Nasabah[]>([])

  const [nama, setNama] = useState("")
  const [alamat, setAlamat] = useState("")
  const [noHp, setNoHp] = useState("")
  const [editId, setEditId] = useState<string | null>(null)

  const [search, setSearch] = useState("")

  async function loadNasabah() {

    const data = await getNasabah()

    // SORT A-Z
    const sorted = [...data].sort((a, b) =>
  a.nama.localeCompare(b.nama)
)

    setNasabah(sorted)

  }

  async function simpanNasabah() {

    if (editId) {

      await updateNasabah(editId, {
        nama,
        alamat,
        no_hp: noHp
      })

    } else {

      await tambahNasabah({
        nama,
        alamat,
        no_hp: noHp
      })

    }

    cancelEdit()
    loadNasabah()

  }

  function editNasabah(n: Nasabah) {
    setNama(n.nama)
    setAlamat(n.alamat)
    setNoHp(n.no_hp)
    setEditId(n.id)
  }

  function cancelEdit() {
    setNama("")
    setAlamat("")
    setNoHp("")
    setEditId(null)
  }

  useEffect(() => {
    loadNasabah()
  }, [])

  // FILTER SEARCH
  const filteredNasabah = nasabah.filter((n) =>
    n.nama.toLowerCase().includes(search.toLowerCase()) ||
    n.no_hp.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">

        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Data Nasabah
        </h1>

        <NasabahForm
          nama={nama}
          alamat={alamat}
          noHp={noHp}
          setNama={setNama}
          setAlamat={setAlamat}
          setNoHp={setNoHp}
          simpan={simpanNasabah}
          editId={editId}
          onCancelEdit={cancelEdit}
        />

        {/* SEARCH NASABAH */}

        <div className="mb-6">

          <input
            type="text"
            placeholder="Cari nasabah (nama / no hp)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-green-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />

        </div>

        <NasabahTable
          data={filteredNasabah}
          onEdit={editNasabah}
        />

      </div>

    </div>

  )
}