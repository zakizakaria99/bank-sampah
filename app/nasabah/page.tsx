"use client"

import { useEffect, useState } from "react"
import { Nasabah } from "@/types/nasabah"

import NasabahForm from "@/components/nasabah/NasabahForm"
import NasabahTable from "@/components/nasabah/NasabahTable"
import StatCard from "@/components/ui/StatCard"

import {
  getNasabah,
  tambahNasabah,
  updateNasabah
} from "@/services/nasabahService"

import { Users, Search } from "lucide-react"

export default function NasabahPage() {

  const [nasabah, setNasabah] = useState<Nasabah[]>([])

  const [nama, setNama] = useState("")
  const [alamat, setAlamat] = useState("")
  const [noHp, setNoHp] = useState("")
  const [editId, setEditId] = useState<string | null>(null)

  const [search, setSearch] = useState("")

  async function loadNasabah() {
    const data = await getNasabah()

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

  // ✅ FIX DI SINI (tanpa ubah logic)
  useEffect(() => {
    const init = async () => {
      await loadNasabah()
    }
    init()
  }, [])

  const filteredNasabah = nasabah.filter((n) =>
    n.nama.toLowerCase().includes(search.toLowerCase()) ||
    n.no_hp.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-3 md:px-6 py-6 md:py-10">

      <div className="max-w-6xl mx-auto w-full space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white p-2 rounded-xl">
            <Users size={20} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              Nasabah
            </h1>
            <p className="text-gray-500 text-sm">
              Kelola data nasabah bank sampah
            </p>
          </div>
        </div>

        {/* STAT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Nasabah"
            value={nasabah.length}
            icon={Users}
          />
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-green-100">

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

        </div>

        {/* LIST */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-green-100 space-y-4">

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Cari nasabah (nama / no hp)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-green-200 rounded-xl p-3 pl-9 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <NasabahTable
            data={filteredNasabah}
            onEdit={editNasabah}
          />

        </div>

      </div>

    </div>
  )
}