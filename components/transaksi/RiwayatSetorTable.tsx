"use client"

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
    <div className="w-full overflow-x-auto border border-green-200 bg-white">

      <table className="w-full text-sm md:text-base border-collapse">

        <thead className="bg-green-100 text-green-900">
          <tr>
            <th className="p-3 md:p-4 border text-center text-xs md:text-sm">
              Tanggal Setor
            </th>
          </tr>
        </thead>

        <tbody>

          {setor.length === 0 && (
            <tr>
              <td className="text-center p-4 text-gray-500">
                Belum ada data setor
              </td>
            </tr>
          )}

          {setor.map((t) => {

            const detail = detailSetor.filter(
              (d) => d.transaksi_id === t.id
            )

            const totalSubtotal = detail.reduce(
              (sum, item) => sum + item.subtotal,
              0
            )

            return (
              <Fragment key={t.id}>

                <tr
                  className="cursor-pointer hover:bg-green-50"
                  onClick={() => onOpen(t.id)}
                >
                  <td className="p-3 md:p-4 border text-center font-medium text-green-800 text-xs md:text-sm">
                    {new Date(t.tanggal).toLocaleDateString("id-ID")}
                  </td>
                </tr>

                {openTransaksi === t.id && (
                  <tr>
                    <td className="p-3 md:p-4 border bg-green-50">

                      <table className="w-full min-w-[500px] border border-green-200 border-collapse">

                        <thead className="bg-green-100">
                          <tr>
                            <th className="border p-2 text-center">Jenis</th>
                            <th className="border p-2 text-center">Berat</th>
                            <th className="border p-2 text-center">Harga</th>
                            <th className="border p-2 text-center">Subtotal</th>
                          </tr>
                        </thead>

                        <tbody>

                          {detail.map((d) => (
                            <tr key={d.id}>
                              <td className="border p-2 text-center">
  {d.jenis_sampah[0]?.nama_sampah || "-"}
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

                          <tr className="font-semibold bg-green-100">
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