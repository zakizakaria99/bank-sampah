"use client"

import { useEffect, useState } from "react"

import { Laporan } from "@/types/laporan"

import {
  getLaporan,
  getSaldoPengelola,
  getTotalNasabah,
  getTotalTransaksi,
  getTotalSampah,
  getTotalJenisSampah
} from "@/services/laporanService"

import LaporanCard from "@/components/laporan/LaporanCard"

export default function LaporanPage() {

  const [data, setData] = useState<Laporan[]>([])

  const [saldoPengelola, setSaldoPengelola] = useState(0)
  const [totalNasabah, setTotalNasabah] = useState(0)
  const [totalTransaksi, setTotalTransaksi] = useState(0)
  const [totalSampah, setTotalSampah] = useState(0)
  const [totalJenisSampah, setTotalJenisSampah] = useState(0)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {

    const laporan = await getLaporan()
    const saldo = await getSaldoPengelola()

    const nasabah = await getTotalNasabah()
    const transaksi = await getTotalTransaksi()
    const sampah = await getTotalSampah()
    const jenis = await getTotalJenisSampah()

    setData(laporan)
    setSaldoPengelola(saldo)

    setTotalNasabah(nasabah)
    setTotalTransaksi(transaksi)
    setTotalSampah(sampah)
    setTotalJenisSampah(jenis)

  }

  const totalSaldoNasabah = data.reduce(
    (acc, item) => acc + item.total_nasabah,
    0
  )

  const keuntunganTransaksi = data.reduce(
    (acc, item) => acc + item.total_pengelola,
    0
  )

  const totalKeuntungan = saldoPengelola + keuntunganTransaksi

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">

        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Laporan Bank Sampah
        </h1>

        <LaporanCard
          totalNasabah={totalNasabah}
          totalSaldoNasabah={totalSaldoNasabah}
          saldoPengelola={totalKeuntungan}
          totalTransaksi={totalTransaksi}
          totalSampah={totalSampah}
          totalJenisSampah={totalJenisSampah}
        />

      </div>

    </div>

  )

}