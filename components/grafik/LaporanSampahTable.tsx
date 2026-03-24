"use client"

import { LaporanSampahTable as Row } from "@/types/grafik"

interface Props {
  data: Row[]
}

function formatRupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID")
}

// ✅ FIX FLOATING POINT KG
function formatKg(value: number) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
}

export default function LaporanSampahTable({ data }: Props) {

  const totalKg = data.reduce((a, b) => a + b.total_kg, 0)
  const totalHarga = data.reduce((a, b) => a + b.total_harga, 0)

  return (
    <div className="w-full overflow-x-auto">

      <table className="min-w-[900px] w-full text-xs sm:text-sm">

        <thead className="bg-green-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Nama Sampah</th>

            {["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"].map((m)=>(
              <th key={m} className="p-2 text-center">{m}</th>
            ))}

            <th className="p-2">Total (Kg)</th>
            <th className="p-2">Total Harga</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.nama_sampah} className="border-b hover:bg-gray-50 transition">

              <td className="p-3 font-medium text-gray-800">
                {row.nama_sampah}
              </td>

              {[
                row.Jan,row.Feb,row.Mar,row.Apr,row.Mei,row.Jun,
                row.Jul,row.Agu,row.Sep,row.Okt,row.Nov,row.Des
              ].map((val,i)=>(
                <td key={i} className="p-2 text-center text-gray-600">
                  {val}
                </td>
              ))}

              {/* ✅ FIX */}
              <td className="p-2 text-center font-semibold text-green-700">
                {formatKg(row.total_kg)}
              </td>

              <td className="p-2 text-center font-semibold text-green-700">
                {formatRupiah(row.total_harga)}
              </td>

            </tr>
          ))}
        </tbody>

        <tfoot className="bg-green-50 font-semibold">
          <tr>
            <td className="p-3">TOTAL</td>
            <td colSpan={12}></td>

            {/* ✅ FIX */}
            <td className="p-2 text-center text-green-800">
              {formatKg(totalKg)}
            </td>

            <td className="p-2 text-center text-green-800">
              {formatRupiah(totalHarga)}
            </td>
          </tr>
        </tfoot>

      </table>

    </div>
  )
}