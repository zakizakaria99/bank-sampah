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

    <div className="bg-blue-50 p-6 rounded-lg mb-6">

      <h2 className="text-lg font-semibold mb-4">
        Tarik Saldo
      </h2>

      <div className="flex gap-4">

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
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-lg"
        >
          Tarik
        </button>

      </div>

    </div>

  )

}