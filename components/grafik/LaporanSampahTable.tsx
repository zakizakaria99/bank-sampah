"use client"

import { LaporanSampahTable as Row } from "@/types/grafik"

interface Props {
  data: Row[]
}

// ✅ FORMAT RUPIAH
function formatRupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID")
}

// ✅ FORMAT KG (ANTI FLOATING)
function formatKg(value: number) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
}

export default function LaporanSampahTable({ data }: Props) {

  // ✅ HANDLE DATA KOSONG
  const totalKg = data.reduce((a, b) => a + (b.total_kg || 0), 0)
  const totalHarga = data.reduce((a, b) => a + (b.total_harga || 0), 0)

  const bulanList = [
    "Jan","Feb","Mar","Apr","Mei","Jun",
    "Jul","Agu","Sep","Okt","Nov","Des"
  ]

  return (
    <div className="w-full overflow-x-auto">

      <table className="min-w-[900px] w-full text-xs sm:text-sm border border-gray-200 rounded-xl overflow-hidden">

        {/* ===== HEADER ===== */}
        <thead className="bg-green-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Nama Sampah</th>

            {bulanList.map((m)=>(
              <th key={m} className="p-2 text-center">{m}</th>
            ))}

            <th className="p-2">Total (Kg)</th>
            <th className="p-2">Total Harga</th>
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={15} className="text-center py-6 text-gray-500">
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.nama_sampah}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* NAMA */}
                <td className="p-3 font-medium text-gray-800">
                  {row.nama_sampah}
                </td>

                {/* BULAN */}
                {bulanList.map((bulan, i) => {
                  const val = (row as any)[bulan] || 0
                  return (
                    <td key={i} className="p-2 text-center text-gray-600">
                      {val}
                    </td>
                  )
                })}

                {/* TOTAL KG */}
                <td className="p-2 text-center font-semibold text-green-700">
                  {formatKg(row.total_kg)}
                </td>

                {/* TOTAL HARGA */}
                <td className="p-2 text-center font-semibold text-green-700">
                  {formatRupiah(row.total_harga)}
                </td>

              </tr>
            ))
          )}
        </tbody>

        {/* ===== FOOTER ===== */}
        <tfoot className="bg-green-50 font-semibold">
          <tr>
            <td className="p-3">TOTAL</td>
            <td colSpan={12}></td>

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