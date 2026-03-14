import { Fragment } from "react"
import { Transaksi, DetailTransaksi } from "@/types/transaksi"

type Props = {
  setor: Transaksi[]
  detailSetor: DetailTransaksi[]
  openTransaksi: string | null
  onOpen: (id: string) => void
}

export default function RiwayatSetorTable({
  setor,
  detailSetor,
  openTransaksi,
  onOpen
}: Props) {

  return (

    <table className="w-full border">

      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Tanggal Setor</th>
        </tr>
      </thead>

      <tbody>

        {setor.map((t) => (

          <Fragment key={t.id}>

            <tr
              key={`transaksi-${t.id}`}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onOpen(t.id)}
            >
              <td className="p-2 border text-center">
                {new Date(t.tanggal).toLocaleDateString("id-ID")}
              </td>
            </tr>

            {openTransaksi === t.id && (

              <tr key={`detail-${t.id}`}>

                <td className="p-4 border bg-gray-50">

                  <table className="w-full border">

                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2">Jenis Sampah</th>
                        <th className="border p-2">Berat</th>
                        <th className="border p-2">Harga</th>
                        <th className="border p-2">Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>

                      {detailSetor.map((d) => (

                        <tr key={d.id}>

                          <td className="border p-2">
                            {d.jenis_sampah.nama_sampah}
                          </td>

                          <td className="border p-2">
                            {d.berat} kg
                          </td>

                          <td className="border p-2">
                            Rp {d.harga.toLocaleString("id-ID")}
                          </td>

                          <td className="border p-2">
                            Rp {d.subtotal.toLocaleString("id-ID")}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </td>

              </tr>

            )}

          </Fragment>

        ))}

      </tbody>

    </table>

  )

}