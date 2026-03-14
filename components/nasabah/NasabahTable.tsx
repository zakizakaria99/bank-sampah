import { Nasabah } from "@/types/nasabah"
import Link from "next/link"

interface Props {
  data: Nasabah[]
  onEdit: (n: Nasabah) => void
}

export default function NasabahTable({ data, onEdit }: Props) {

  return (

    <div className="overflow-hidden rounded-lg border border-green-100">

      <table className="w-full">

        <thead className="bg-green-100 text-green-900">

          <tr>
            <th className="p-4 text-left">Nama</th>
            <th className="p-4 text-left">Alamat</th>
            <th className="p-4 text-left">No HP</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>

        </thead>

        <tbody>

          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Data nasabah belum ada
              </td>
            </tr>
          )}

          {data.map((n) => (

            <tr
              key={n.id}
              className="border-t hover:bg-green-50 transition"
            >

              <td className="p-4">{n.nama}</td>
              <td className="p-4">{n.alamat}</td>
              <td className="p-4">{n.no_hp}</td>

              <td className="p-4 flex justify-center gap-2">

                <Link
                  href={`/nasabah/${n.id}`}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Detail
                </Link>

                <button
                  type="button"
                  onClick={() => onEdit(n)}
                  className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}