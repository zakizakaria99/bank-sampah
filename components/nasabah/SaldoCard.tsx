type Props = {
  saldo: number
}

export default function SaldoCard({ saldo }: Props) {

  return (

    <div className="bg-yellow-50 p-6 rounded-lg mb-6">

      <h2 className="text-xl font-semibold text-yellow-700">
        Saldo Nasabah
      </h2>

      <p className="text-2xl font-bold mt-2">
        Rp {saldo.toLocaleString("id-ID")}
      </p>

    </div>

  )

}