"use client"

import { useState, useMemo } from "react"
import { JenisSampah } from "@/types/jenisSampah"
import { Pencil, Search } from "lucide-react"

interface Props {
  data: JenisSampah[]
  onEdit: (data: JenisSampah) => void
}

export default function JenisSampahTable({ data, onEdit }: Props) {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const limit = 10

  const filteredData = useMemo(() => {
    return data.filter((s) =>
      s.nama_sampah.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  const totalPage = Math.ceil(filteredData.length / limit)

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit
    const end = start + limit
    return filteredData.slice(start, end)
  }, [filteredData, page])

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return (

    <div className="space-y-4">

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

        <input
          type="text"
          placeholder="Cari nama sampah..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border border-green-200 rounded-xl p-3 pl-9 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto border border-green-200">

        <table className="min-w-full text-sm md:text-base">

          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="p-3 md:p-4 text-left text-xs md:text-sm">
                Nama Sampah
              </th>
              <th className="p-3 md:p-4 text-left text-xs md:text-sm">
                Harga
              </th>
              <th className="p-3 md:p-4 text-center text-xs md:text-sm">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 md:p-6 text-gray-500 text-sm">
                  Data tidak ditemukan
                </td>
              </tr>
            )}

            {paginatedData.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-green-50 transition"
              >
                <td className="p-3 md:p-4 text-xs md:text-sm font-medium text-gray-700">
                  {s.nama_sampah}
                </td>

                <td className="p-3 md:p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                    Rp {s.harga_per_kg.toLocaleString("id-ID")}
                  </span>
                </td>

                <td className="p-3 md:p-4 text-center">
                  <button
                    onClick={() => onEdit(s)}
                    className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center text-xs md:text-sm">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Halaman {page} / {totalPage || 1}
        </span>

        <button
          disabled={page === totalPage || totalPage === 0}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
        >
          Next
        </button>

      </div>

    </div>
  )
}