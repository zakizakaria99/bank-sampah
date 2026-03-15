"use client"

import { StokSampah } from "@/types/stokSampah"

interface Props {
  data: StokSampah[]
  onJual: () => void
}

export default function StokSampahTable({ data, onJual }: Props) {

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value)
  }

  return (

    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold text-green-800">
          Stok Sampah
        </h2>

        <button
          onClick={onJual}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Jual Sampah
        </button>

      </div>


      <div className="overflow-hidden rounded-lg border border-green-100">

        <table className="w-full">

          <thead className="bg-green-100 text-green-900">

            <tr>
              <th className="p-4 text-left">Jenis Sampah</th>
              <th className="p-4 text-left">Stok</th>
              <th className="p-4 text-left">Harga Nasabah</th>
              <th className="p-4 text-left">Nilai Stok</th>
            </tr>

          </thead>

          <tbody>

            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Belum ada data stok
                </td>
              </tr>
            )}

            {data.map((item) => {

              const nilaiStok = item.stok * item.harga_per_kg

              return (

                <tr
                  key={item.jenis_sampah_id}
                  className="border-t hover:bg-green-50 transition"
                >

                  <td className="p-4">
                    {item.nama_sampah}
                  </td>

                  <td className="p-4 font-semibold">
                    {item.stok} kg
                  </td>

                  <td className="p-4">
                    {formatRupiah(item.harga_per_kg)}
                  </td>

                  <td className="p-4 font-semibold text-green-700">
                    {formatRupiah(nilaiStok)}
                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

    </div>

  )

}