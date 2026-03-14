import { JenisSampah } from "@/types/jenisSampah"

interface Props {
  data: JenisSampah[]
  onEdit: (data: JenisSampah) => void
}

export default function JenisSampahTable({ data, onEdit }: Props) {

  return (

    <div className="overflow-hidden rounded-lg border border-green-100">

      <table className="w-full">

        <thead className="bg-green-100 text-green-900">

          <tr>
            <th className="p-4 text-left">Nama Sampah</th>
            <th className="p-4 text-left">Harga / Kg</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>

        </thead>

        <tbody>

          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                Data jenis sampah belum ada
              </td>
            </tr>
          )}

          {data.map((s) => (

            <tr
              key={s.id}
              className="border-t hover:bg-green-50 transition"
            >

              <td className="p-4">{s.nama_sampah}</td>

              <td className="p-4">
                Rp {s.harga_per_kg.toLocaleString("id-ID")}
              </td>

              <td className="p-4 flex justify-center">

                <button
                  type="button"
                  onClick={() => onEdit(s)}
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