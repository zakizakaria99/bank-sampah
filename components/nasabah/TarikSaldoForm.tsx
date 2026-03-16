import { ArrowDownCircle } from "lucide-react"

type Props = {
  jumlahTarik: string
  setJumlahTarik: (v: string) => void
  openModal: () => void
}

export default function TarikSaldoForm({
  jumlahTarik,
  setJumlahTarik,
  openModal
}: Props) {

  return (

    <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">

      <div className="flex items-center gap-2 mb-4 text-blue-800 font-semibold">

        <ArrowDownCircle className="w-5 h-5"/>

        <h2 className="text-lg">
          Tarik Saldo
        </h2>

      </div>

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="number"
          placeholder="Jumlah tarik"
          className="border border-blue-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={jumlahTarik}
          onChange={(e) =>
            setJumlahTarik(e.target.value)
          }
        />

        <button
          type="button"
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Tarik
        </button>

      </div>

    </div>

  )

}