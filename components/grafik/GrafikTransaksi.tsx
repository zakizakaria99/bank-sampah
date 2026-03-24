/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"

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
  const labelY = y - 18

  return (
    <text
      x={centerX}
      y={labelY}
      textAnchor="middle"
      transform={`rotate(-90 ${centerX} ${labelY})`}
      style={{
        fontSize: 10,
        fontWeight: 600,
        fill: "#374151"
      }}
    >
      {value}
    </text>
  )
}

export default function GrafikTransaksi({ data }: Props) {

  const [showBerat, setShowBerat] = useState(true)
  const [showPendapatan, setShowPendapatan] = useState(true)

  const maxBerat = Math.max(...data.map(d => d.berat), 0)
  const maxPendapatan = Math.max(...data.map(d => d.pendapatan), 0)

  const beratMaxAxis = Math.ceil(maxBerat * 1.6)
  const pendapatanMaxAxis = Math.ceil(maxPendapatan * 1.6)

  return (
    <div className="space-y-4">

      {/* ===== LEGEND + TOGGLE ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

  {/* LEFT: TITLE */}
  <div>
    <h3 className="text-sm sm:text-base font-semibold text-gray-800">
      Perbandingan Data
    </h3>
    <p className="text-xs text-gray-500">
      Pilih data yang ingin ditampilkan
    </p>
  </div>

  {/* RIGHT: TOGGLE */}
  <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">

    {/* BERAT */}
    <button
      onClick={() => setShowBerat(!showBerat)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm transition
        ${showBerat
          ? "bg-white shadow-sm text-green-700"
          : "text-gray-500"
        }`}
    >
      <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
      Berat
    </button>

    {/* PENDAPATAN */}
    <button
      onClick={() => setShowPendapatan(!showPendapatan)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm transition
        ${showPendapatan
          ? "bg-white shadow-sm text-green-700"
          : "text-gray-500"
        }`}
    >
      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
      Pendapatan
    </button>

  </div>

</div>

      {/* ===== CHART ===== */}
      <div className="w-full h-[320px] sm:h-[380px] md:h-[420px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="bulan"
              tick={{ fontSize: 10 }}
            />

            {showBerat && (
              <YAxis
                yAxisId="berat"
                orientation="left"
                domain={[0, beratMaxAxis]}
                tickFormatter={(v) => `${v} Kg`}
                tick={{ fontSize: 10 }}
              />
            )}

            {showPendapatan && (
              <YAxis
                yAxisId="pendapatan"
                orientation="right"
                domain={[0, pendapatanMaxAxis]}
                tickFormatter={(v) => formatRupiah(Number(v))}
                tick={{ fontSize: 10 }}
              />
            )}

            <Tooltip
              contentStyle={{ fontSize: 12 }}
              formatter={(value: any, name: any) => {
                const val = Number(value ?? 0)
                return name === "Pendapatan"
                  ? formatRupiah(val)
                  : `${val} Kg`
              }}
            />

            {/* BAR BERAT */}
            {showBerat && (
              <Bar
                yAxisId="berat"
                dataKey="berat"
                fill="#16A34A"
                name="Berat"
                radius={[6, 6, 0, 0]}
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
            )}

            {/* BAR PENDAPATAN */}
            {showPendapatan && (
              <Bar
                yAxisId="pendapatan"
                dataKey="pendapatan"
                fill="#22C55E"
                name="Pendapatan"
                radius={[6, 6, 0, 0]}
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
            )}

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}