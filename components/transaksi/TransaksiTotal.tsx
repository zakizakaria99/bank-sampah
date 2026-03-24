import { Wallet, User } from "lucide-react"

interface Props {
  totalNasabah: number
  totalPengelola: number
}

export default function TransaksiTotal({
  totalNasabah,
  totalPengelola
}: Props) {

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">

      <div className="bg-green-100 p-4 md:p-6 rounded-xl flex items-center justify-between">

        <div>
          <p className="text-xs md:text-sm text-green-700">
            Nasabah
          </p>

          <p className="font-bold text-base md:text-lg lg:text-xl text-green-800">
            Rp {totalNasabah.toLocaleString("id-ID")}
          </p>
        </div>

        <User className="text-green-700 w-5 h-5 md:w-6 md:h-6" />
      </div>

      <div className="bg-blue-100 p-4 md:p-6 rounded-xl flex items-center justify-between">

        <div>
          <p className="text-xs md:text-sm text-blue-700">
            Pengelola
          </p>

          <p className="font-bold text-base md:text-lg lg:text-xl text-blue-800">
            Rp {totalPengelola.toLocaleString("id-ID")}
          </p>
        </div>

        <Wallet className="text-blue-700 w-5 h-5 md:w-6 md:h-6" />
      </div>

    </div>
  )
}