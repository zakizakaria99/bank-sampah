"use client"

import { useState, useMemo } from "react"
import { Nasabah } from "@/types/nasabah"
import Link from "next/link"
import { Pencil, Eye } from "lucide-react"

interface Props {
  data: Nasabah[]
  onEdit: (n: Nasabah) => void
}

export default function NasabahTable({ data, onEdit }: Props) {

  const [page, setPage] = useState(1)
  const limit = 10

  const totalPage = Math.ceil(data.length / limit)

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit
    const end = start + limit
    return data.slice(start, end)
  }, [data, page])

  return (

    <div className="w-full"> {/* ✅ FIX UTAMA */}

      {paginatedData.length === 0 ? (
        <div className="text-center text-gray-500 py-6 text-sm">
          Data nasabah belum ada
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">

          {paginatedData.map((n) => (

            <div
              key={n.id}
              className="bg-white border border-green-100 shadow-sm p-4 md:p-5 hover:shadow-md transition w-full"
            >

              <h3 className="text-sm md:text-base font-semibold text-green-800 mb-2">
                {n.nama}
              </h3>

              <div className="space-y-1 text-xs md:text-sm text-gray-600 mb-4">

                <p>
                  <span className="font-medium text-gray-700">Alamat:</span><br />
                  {n.alamat}
                </p>

                <p>
                  <span className="font-medium text-gray-700">No HP:</span><br />
                  {n.no_hp}
                </p>

              </div>

              <div className="flex gap-2">

                <Link
                  href={`/nasabah/${n.id}`}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 text-xs md:text-sm"
                >
                  <Eye size={16} />
                  Detail
                </Link>

                <button
                  type="button"
                  onClick={() => onEdit(n)}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white py-1.5 text-xs md:text-sm"
                >
                  <Pencil size={16} />
                  Edit
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6 text-xs md:text-sm">

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