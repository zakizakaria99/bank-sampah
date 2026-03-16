"use client"

import { LaporanSampahTable as Row } from "@/types/grafik"

interface Props {
  data: Row[]
}

function formatRupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID")
}

export default function LaporanSampahTable({ data }: Props) {

  const totalKg = data.reduce((a, b) => a + b.total_kg, 0)
  const totalHarga = data.reduce((a, b) => a + b.total_harga, 0)

  return (

    <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-x-auto">

      <h2 className="text-lg font-semibold mb-4">
        Laporan Sampah Per Bulan
      </h2>

      <table className="w-full text-sm">

        <thead className="bg-green-100">

          <tr>

            <th className="p-2 text-left">Nama Sampah</th>

            <th className="p-2">Jan</th>
            <th className="p-2">Feb</th>
            <th className="p-2">Mar</th>
            <th className="p-2">Apr</th>
            <th className="p-2">Mei</th>
            <th className="p-2">Jun</th>
            <th className="p-2">Jul</th>
            <th className="p-2">Agu</th>
            <th className="p-2">Sep</th>
            <th className="p-2">Okt</th>
            <th className="p-2">Nov</th>
            <th className="p-2">Des</th>

            <th className="p-2">Total (Kg)</th>
            <th className="p-2">Total Harga</th>

          </tr>

        </thead>

        <tbody>

          {data.map((row) => (

            <tr key={row.nama_sampah} className="border-b">

              <td className="p-2 font-medium">
                {row.nama_sampah}
              </td>

              <td className="p-2 text-center">{row.Jan}</td>
              <td className="p-2 text-center">{row.Feb}</td>
              <td className="p-2 text-center">{row.Mar}</td>
              <td className="p-2 text-center">{row.Apr}</td>
              <td className="p-2 text-center">{row.Mei}</td>
              <td className="p-2 text-center">{row.Jun}</td>
              <td className="p-2 text-center">{row.Jul}</td>
              <td className="p-2 text-center">{row.Agu}</td>
              <td className="p-2 text-center">{row.Sep}</td>
              <td className="p-2 text-center">{row.Okt}</td>
              <td className="p-2 text-center">{row.Nov}</td>
              <td className="p-2 text-center">{row.Des}</td>

              <td className="p-2 text-center font-semibold">
                {row.total_kg}
              </td>

              <td className="p-2 text-center font-semibold">
                {formatRupiah(row.total_harga)}
              </td>

            </tr>

          ))}

        </tbody>

        <tfoot className="bg-green-50 font-semibold">

          <tr>

            <td className="p-2">
              TOTAL
            </td>

            <td colSpan={12}></td>

            <td className="p-2 text-center">
              {totalKg}
            </td>

            <td className="p-2 text-center">
              {formatRupiah(totalHarga)}
            </td>

          </tr>

        </tfoot>

      </table>

    </div>

  )
}