
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Laporan } from "@/types/laporan"

import {
  getLaporan,
  getSaldoPengelola,
  getTotalNasabah,
  getTotalTransaksi,
  getTotalSampah,
  getTotalJenisSampah,
  getRingkasanLabaRugi,
  getTotalKasMasuk,
  getNilaiTotalStok,
  getTotalSaldoNasabah,
  getKasBersih,
  getKasKeluar
} from "@/services/laporanService"

import LaporanStatCard from "@/components/laporan/LaporanStatCard"
import LaporanCard from "@/components/laporan/LaporanCard"
import LaporanLabaSummary from "@/components/laporan/LaporanLabaSummary"
import TarikSaldoPengelola from "@/components/laporan/TarikSaldoPengelola"
import RiwayatPenarikanPengelola from "@/components/laporan/RiwayatPenarikanPengelola"

export default function LaporanPage() {
  const [data, setData] = useState<Laporan[]>([])

  const [saldoPengelola, setSaldoPengelola] = useState(0)
  const [totalNasabah, setTotalNasabah] = useState(0)
  const [totalTransaksi, setTotalTransaksi] = useState(0)
  const [totalSampah, setTotalSampah] = useState(0)
  const [totalJenisSampah, setTotalJenisSampah] = useState(0)
  const [totalKasMasuk, setTotalKasMasuk] = useState(0)
  const [nilaiStok, setNilaiStok] = useState(0)

  const [totalSaldoNasabah, setTotalSaldoNasabah] = useState(0)
  const [kasKeluar, setKasKeluar] = useState(0)
  const [kasBersih, setKasBersih] = useState(0)

  const [ringkasan, setRingkasan] = useState({
    totalPenjualan: 0,
    totalNilaiBeli: 0,
    totalLaba: 0
  })

  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)

      const [
        laporan,
        saldo,
        nasabah,
        transaksi,
        sampah,
        jenis,
        ringkasanData,
        kasMasuk,
        nilaiStokData,
        saldoNasabah,
        kasKeluarData,
        kasBersihData
      ] = await Promise.all([
        getLaporan(),
        getSaldoPengelola(),
        getTotalNasabah(),
        getTotalTransaksi(),
        getTotalSampah(),
        getTotalJenisSampah(),
        getRingkasanLabaRugi(),
        getTotalKasMasuk(),
        getNilaiTotalStok(),
        getTotalSaldoNasabah(),
        getKasKeluar(),
        getKasBersih()
      ])

      setData(laporan)
      setSaldoPengelola(saldo)

      setTotalNasabah(nasabah)
      setTotalTransaksi(transaksi)
      setTotalSampah(sampah)
      setTotalJenisSampah(jenis)

      setRingkasan(ringkasanData)
      setTotalKasMasuk(kasMasuk)
      setNilaiStok(nilaiStokData)

      setTotalSaldoNasabah(saldoNasabah)
      setKasKeluar(kasKeluarData)
      setKasBersih(kasBersihData)

    } catch (error) {
      console.error("Error load laporan:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            Laporan Bank Sampah
          </h1>
          <p className="text-gray-500 text-sm">
            Ringkasan data operasional dan keuangan
          </p>
        </motion.div>

        {/* STAT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <LaporanStatCard
            totalNasabah={totalNasabah}
            totalSaldoNasabah={totalSaldoNasabah}
            saldoPengelola={saldoPengelola}
            totalTransaksi={totalTransaksi}
            totalSampah={totalSampah}
            totalJenisSampah={totalJenisSampah}
          />
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border p-4 md:p-8 space-y-6"
        >
          <LaporanCard
            totalKasMasuk={totalKasMasuk}
            nilaiStok={nilaiStok}
            kasKeluar={kasKeluar}
            kasBersih={kasBersih}
          />

          <LaporanLabaSummary
            totalPenjualan={ringkasan.totalPenjualan}
            totalNilaiBeli={ringkasan.totalNilaiBeli}
            totalLaba={ringkasan.totalLaba}
          />
        </motion.div>

        {/* PENGELOLA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >

          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Manajemen Saldo Pengelola
            </h2>
            <p className="text-sm text-gray-500">
              Tarik saldo dan lihat riwayat penarikan
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6 space-y-6">

            <TarikSaldoPengelola
              onSuccess={loadData} // 🔥 sudah benar
              kasBersih={kasBersih}
            />

            <RiwayatPenarikanPengelola />

          </div>

        </motion.div>

      </div>
    </div>
  )
}