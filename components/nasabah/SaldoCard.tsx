type Props = {
  saldo: number
}

export default function SaldoCard({ saldo }: Props) {

  return (
    <div className="bg-yellow-50 p-4 md:p-6 rounded-lg mb-6">

      <h2 className="text-base md:text-xl lg:text-2xl font-semibold text-yellow-700">
        Saldo Nasabah
      </h2>

      <p className="text-lg md:text-2xl lg:text-3xl font-bold mt-2">
        Rp {saldo.toLocaleString("id-ID")}
      </p>

    </div>
  )
}