import { Fragment } from "react"
import { Transaksi, DetailTransaksi } from "@/types/transaksi"

import {
  Calendar,
  Recycle,
  Weight,
  Banknote,
  Receipt
} from "lucide-react"

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

    <div className="w-full overflow-x-auto">

      <table className="w-full border border-green-200 rounded-lg">

        <thead className="bg-green-100 text-green-900">

          <tr>

            <th className="p-3 border text-center">

              <div className="flex items-center justify-center gap-2">
                <Calendar size={16}/>
                Tanggal Setor
              </div>

            </th>

          </tr>

        </thead>

        <tbody>

          {setor.map((t) => {

            const totalSubtotal = detailSetor.reduce(
              (sum, item) => sum + item.subtotal,
              0
            )

            return (

              <Fragment key={`transaksi-${t.id}`}>

                <tr
                  className="cursor-pointer hover:bg-green-50 transition"
                  onClick={() => onOpen(t.id)}
                >

                  <td className="p-3 border text-center font-medium text-green-800">
                    {new Date(t.tanggal).toLocaleDateString("id-ID")}
                  </td>

                </tr>

                {openTransaksi === t.id && (

                  <tr>

                    <td className="p-4 border bg-green-50">

                      <table className="w-full min-w-[500px] border border-green-200 rounded-lg">

                        <thead className="bg-green-100 text-green-900">

                          <tr>

                            <th className="border p-2">
                              <div className="flex items-center gap-2 justify-center">
                                <Recycle size={16}/>
                                Jenis Sampah
                              </div>
                            </th>

                            <th className="border p-2">
                              <div className="flex items-center gap-2 justify-center">
                                <Weight size={16}/>
                                Berat
                              </div>
                            </th>

                            <th className="border p-2">
                              <div className="flex items-center gap-2 justify-center">
                                <Banknote size={16}/>
                                Harga
                              </div>
                            </th>

                            <th className="border p-2">
                              <div className="flex items-center gap-2 justify-center">
                                <Receipt size={16}/>
                                Subtotal
                              </div>
                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {detailSetor.map((d, index) => (

                            <tr
                              key={`detail-${d.id ?? index}`}
                              className="hover:bg-green-50 transition"
                            >

                              <td className="border p-2 text-center">
                                {d.jenis_sampah.nama_sampah}
                              </td>

                              <td className="border p-2 text-center">
                                {d.berat} kg
                              </td>

                              <td className="border p-2 text-center">
                                Rp {d.harga.toLocaleString("id-ID")}
                              </td>

                              <td className="border p-2 text-center">
                                Rp {d.subtotal.toLocaleString("id-ID")}
                              </td>

                            </tr>

                          ))}

                          <tr className="font-semibold bg-green-100 text-green-900">

                            <td colSpan={3} className="border p-2 text-right">
                              Total
                            </td>

                            <td className="border p-2 text-center">
                              Rp {totalSubtotal.toLocaleString("id-ID")}
                            </td>

                          </tr>

                        </tbody>

                      </table>

                    </td>

                  </tr>

                )}

              </Fragment>

            )

          })}

        </tbody>

      </table>

    </div>

  )
}