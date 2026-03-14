interface Props {
  totalNasabah: number
  totalPengelola: number
}

export default function TransaksiTotal({
  totalNasabah,
  totalPengelola
}: Props) {

  return (

    <div className="bg-green-50 p-4 rounded-lg mb-6">

      <p className="font-semibold text-green-800">
        Total Nasabah :
        Rp {totalNasabah.toLocaleString("id-ID")}
      </p>

      <p className="font-semibold text-green-800">
        Total Pengelola :
        Rp {totalPengelola.toLocaleString("id-ID")}
      </p>

    </div>

  )

}