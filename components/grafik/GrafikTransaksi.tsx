"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts"

import { GrafikData } from "@/types/grafik"

interface Props {
  data: GrafikData[]
}

function formatRupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID")
}

const VerticalLabel = (props: any) => {
  const { x, y, width, value } = props

  if (value === undefined || value === null) return null

  const centerX = x + width / 2
  const labelY = y - 30

  return (
    <text
      x={centerX}
      y={labelY}
      textAnchor="middle"
      transform={`rotate(-90 ${centerX} ${labelY})`}
      style={{
        fontSize: 11,
        fontWeight: 700,
        fill: "#444"
      }}
    >
      {value}
    </text>
  )
}

export default function GrafikTransaksi({ data }: Props) {

  const maxBerat = Math.max(...data.map(d => d.berat), 0)
  const maxPendapatan = Math.max(...data.map(d => d.pendapatan), 0)

  const beratMaxAxis = Math.ceil(maxBerat * 1.6)
const pendapatanMaxAxis = Math.ceil(maxPendapatan * 1.6)

  return (
    <div className="w-full h-[420px] bg-white rounded-lg border border-gray-200 p-4">

      <h2 className="text-lg font-semibold mb-4">
        Grafik Transaksi Setor Sampah
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="bulan" />

          <YAxis
            yAxisId="berat"
            orientation="left"
            domain={[0, beratMaxAxis]}
            tickFormatter={(v) => `${v} Kg`}
          />

          <YAxis
            yAxisId="pendapatan"
            orientation="right"
            domain={[0, pendapatanMaxAxis]}
            tickFormatter={(v) => formatRupiah(Number(v))}
          />

          <Tooltip
            formatter={(value: any, name: any) => {
              const val = Number(value ?? 0)

              if (name === "Pendapatan") {
                return formatRupiah(val)
              }

              return `${val} Kg`
            }}
          />

          <Bar
            yAxisId="berat"
            dataKey="berat"
            fill="#16a34a"
            name="Berat"
            radius={[4, 4, 0, 0]}
          >
            <LabelList
  dataKey="berat"
  content={(props) => (
    <VerticalLabel
      {...props}
      value={`${Number(props.value ?? 0)}kg`}
    />
  )}
/>

          </Bar>

          <Bar
            yAxisId="pendapatan"
            dataKey="pendapatan"
            fill="#2563eb"
            name="Pendapatan"
            radius={[4, 4, 0, 0]}
          >
            <LabelList
  dataKey="pendapatan"
  content={(props) => (
    <VerticalLabel
      {...props}
      value={formatRupiah(Number(props.value ?? 0))}
    />
  )}
/>
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}