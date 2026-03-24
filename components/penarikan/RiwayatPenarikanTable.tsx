"use client"

import { Trash2 } from "lucide-react"

type Penarikan = {
  id: string
  jumlah: number
  created_at: string
}

type Props = {
  data: Penarikan[]
  onCancel: (id: string) => void
}

export default function RiwayatPenarikanTable({
  data,
  onCancel
}: Props) {

  return (
    <div className="space-y-3">

      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto border border-green-200 bg-white">
        <table className="w-full text-sm border-collapse">

          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="p-3 border text-left">Tanggal</th>
              <th className="p-3 border text-left">Jumlah</th>
              <th className="p-3 border text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center p-6 text-gray-400">
                  Belum ada data penarikan
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-green-50 transition"
                >
                  <td className="p-3 border">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>

                  <td className="p-3 border font-semibold text-green-700">
                    Rp {item.jumlah.toLocaleString("id-ID")}
                  </td>

                  <td className="p-3 border text-center">
                    <button
                      onClick={() => onCancel(item.id)}
                      className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
                    >
                      <Trash2 size={16} />
                      Batal
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-3">
        {data.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-6">
            Belum ada data penarikan
          </p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="border border-green-200 p-4 bg-white"
            >
              <p className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString("id-ID")}
              </p>

              <p className="font-bold text-green-700 mt-1">
                Rp {item.jumlah.toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => onCancel(item.id)}
                className="mt-3 flex items-center gap-2 text-red-500 text-sm"
              >
                <Trash2 size={16} />
                Batalkan Penarikan
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}