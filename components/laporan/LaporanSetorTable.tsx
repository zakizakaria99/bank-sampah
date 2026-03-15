"use client"

interface Props {
  data: any[]
}

export default function LaporanSetorTable({ data }: Props) {

  return (

    <div className="overflow-hidden rounded-lg border border-green-100 mt-8">

      <div className="p-4 bg-green-50 border-b font-semibold">
        Riwayat Setor Sampah
      </div>

      <table className="w-full">

        <thead className="bg-green-100 text-green-900">

          <tr>
            <th className="p-4 text-left">Tanggal</th>
            <th className="p-4 text-left">Nasabah</th>
            <th className="p-4 text-left">Jenis Sampah</th>
            <th className="p-4 text-left">Berat</th>
            <th className="p-4 text-left">Total</th>
          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr
              key={item.id}
              className="border-t hover:bg-green-50 transition"
            >

              <td className="p-4">
                {new Date(item.transaksi.tanggal).toLocaleDateString("id-ID")}
              </td>

              <td className="p-4">
                {item.transaksi.nasabah.nama}
              </td>

              <td className="p-4">
                {item.jenis_sampah.nama_sampah}
              </td>

              <td className="p-4">
                {item.berat} kg
              </td>

              <td className="p-4 font-semibold">
                Rp {item.subtotal.toLocaleString("id-ID")}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}