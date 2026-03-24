/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { Fragment } from "react"

interface Props {
  data: any[]
}

export default function LaporanSetorTable({ data }: Props) {

  return (

    <div className="overflow-x-auto rounded-xl border border-green-100 mt-8">

      <div className="p-3 md:p-4 bg-green-50 border-b font-semibold text-sm md:text-base">
        Riwayat Setor Sampah
      </div>

      <table className="w-full min-w-[700px]">

        <thead className="bg-green-100 text-green-900 text-xs md:text-sm">
          <tr>
            <th className="p-3 md:p-4 text-left">Tanggal</th>
            <th className="p-3 md:p-4 text-left">Nasabah</th>
            <th className="p-3 md:p-4 text-left">Jenis</th>
            <th className="p-3 md:p-4 text-left">Berat</th>
            <th className="p-3 md:p-4 text-left">Total</th>
          </tr>
        </thead>

        <tbody className="text-sm md:text-base">

          {data.map((item, index) => (

            <Fragment key={item.id ?? index}>

              <tr className="border-t hover:bg-green-50 transition">

                <td className="p-3 md:p-4 whitespace-nowrap">
                  {new Date(item.transaksi.tanggal).toLocaleDateString("id-ID")}
                </td>

                <td className="p-3 md:p-4">
                  {item.transaksi.nasabah.nama}
                </td>

                <td className="p-3 md:p-4">
                  {item.jenis_sampah.nama_sampah}
                </td>

                <td className="p-3 md:p-4">
                  {item.berat} kg
                </td>

                <td className="p-3 md:p-4 font-semibold whitespace-nowrap">
                  Rp {item.subtotal.toLocaleString("id-ID")}
                </td>

              </tr>

            </Fragment>

          ))}

        </tbody>

      </table>

    </div>

  )

}