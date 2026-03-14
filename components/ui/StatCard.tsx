interface Props {
  title: string
  value: string | number
  color: string
}

export default function StatCard({ title, value, color }: Props) {
  return (

    <div className={`${color} text-white p-6 rounded-xl shadow`}>

      <h2 className="text-lg font-semibold mb-2">
        {title}
      </h2>

      <p className="text-2xl font-bold">
        {value}
      </p>

    </div>

  )
}