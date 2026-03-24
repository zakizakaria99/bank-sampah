"use client"

import { useState, useMemo } from "react"
import { StokSampah } from "@/types/stokSampah"
import { ShoppingCart, Search } from "lucide-react"

interface Props {
  data: StokSampah[]
  onJual: () => void
}

export default function StokSampahTable({ data, onJual }: Props) {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const limit = 10

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value)

  // ✅ FILTER DATA (SEARCH)
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.nama_sampah.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  // ✅ PAGINATION
  const totalPage = Math.ceil(filteredData.length / limit)

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit
    const end = start + limit
    return filteredData.slice(start, end)
  }, [filteredData, page])

  // reset page kalau search berubah
  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 md:p-5">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">

        <h2 className="text-base md:text-lg font-semibold text-green-800">
          Stok Sampah
        </h2>

        <div className="flex gap-2 w-full md:w-auto">

          {/* SEARCH */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari sampah..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-xs md:text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={onJual}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg"
          >
            <ShoppingCart size={16} />
            Jual
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-green-200">

        <table className="min-w-full text-sm md:text-base border-collapse">

          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="p-3 md:p-4 border text-left text-xs md:text-sm">Jenis</th>
              <th className="p-3 md:p-4 border text-left text-xs md:text-sm">Stok</th>
              <th className="p-3 md:p-4 border text-left text-xs md:text-sm">Harga</th>
              <th className="p-3 md:p-4 border text-left text-xs md:text-sm">Nilai</th>
            </tr>
          </thead>

          <tbody>

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 md:p-6 text-center text-gray-500 text-sm border">
                  Tidak ada data ditemukan
                </td>
              </tr>
            )}

            {paginatedData.map((item) => {

              const nilai = item.stok * item.harga_per_kg

              return (
                <tr key={item.jenis_sampah_id} className="border-t hover:bg-green-50 transition">

                  <td className="p-3 md:p-4 border font-medium text-xs md:text-sm">
                    {item.nama_sampah}
                  </td>

                  <td className="p-3 md:p-4 border text-xs md:text-sm">
                    {item.stok} kg
                  </td>

                  <td className="p-3 md:p-4 border text-xs md:text-sm">
                    {formatRupiah(item.harga_per_kg)}
                  </td>

                  <td className="p-3 md:p-4 border font-semibold text-green-700 text-xs md:text-sm">
                    {formatRupiah(nilai)}
                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-xs md:text-sm">

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