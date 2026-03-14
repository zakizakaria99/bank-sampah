import { PenarikanSaldo } from "@/types/transaksi"

type Props = {
  data: PenarikanSaldo[]
  onCancel: (id: string) => void
}

export default function RiwayatPenarikanTable({
  data,
  onCancel
}: Props) {

  return (

    <table className="w-full border">

      <thead className="bg-gray-100">

        <tr>
          <th className="p-2 border">Tanggal</th>
          <th className="p-2 border">Jumlah</th>
          <th className="p-2 border">Aksi</th>
        </tr>

      </thead>

      <tbody>

        {data.map((r) => (

          <tr key={r.id}>

            <td className="p-2 border">
              {new Date(r.created_at).toLocaleDateString("id-ID")}
            </td>

            <td className="p-2 border">
              Rp {(r.jumlah || 0).toLocaleString("id-ID")}
            </td>

            <td className="p-2 border text-center">

              <button
                type="button"
                onClick={() => onCancel(r.id)}
                className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                Cancel
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  )

}