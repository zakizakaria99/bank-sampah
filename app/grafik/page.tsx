"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import GrafikTransaksi from "@/components/grafik/GrafikTransaksi"
import LaporanSampahTable from "@/components/grafik/LaporanSampahTable"

import {
  getGrafikSemester,
  getLaporanSampahTahunan
} from "@/services/grafikService"

import { GrafikData, LaporanSampahTable as Row } from "@/types/grafik"

export default function GrafikPage() {

  const currentYear = new Date().getFullYear()

  const [tahunGrafik, setTahunGrafik] = useState(currentYear)
  const [semester, setSemester] = useState(1)

  const [tahunTabel, setTahunTabel] = useState(currentYear)

  const [grafikData, setGrafikData] = useState<GrafikData[]>([])
  const [laporanData, setLaporanData] = useState<Row[]>([])

  const [loadingGrafik, setLoadingGrafik] = useState(true)
  const [loadingTabel, setLoadingTabel] = useState(true)

  const tahunList = []

  for (let i = currentYear; i >= currentYear - 5; i--) {
    tahunList.push(i)
  }

  async function loadGrafik() {
    setLoadingGrafik(true)
    try {
      const grafik = await getGrafikSemester(tahunGrafik, semester)
      setGrafikData(grafik)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingGrafik(false)
    }
  }

  async function loadTabel() {
    setLoadingTabel(true)
    try {
      const laporan = await getLaporanSampahTahunan(tahunTabel)
      setLaporanData(laporan)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingTabel(false)
    }
  }

  useEffect(() => {
    loadGrafik()
  }, [tahunGrafik, semester])

  useEffect(() => {
    loadTabel()
  }, [tahunTabel])

  return (

    <div className="px-3 sm:px-6 pb-6 sm:pb-10 space-y-6 sm:space-y-8">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800">
          Grafik & Analitik
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Analisis transaksi dan laporan sampah per periode
        </p>
      </div>

      {/* GRAFIK */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-5"
      >

        <div className="flex flex-wrap items-center justify-between gap-3">

          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            Grafik Transaksi
          </h2>

          {/* FILTER */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-gray-500">
                Tahun
              </label>

              <select
                value={tahunGrafik}
                onChange={(e)=>setTahunGrafik(Number(e.target.value))}
                className="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {tahunList.map((t)=>(
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-gray-500">
                Semester
              </label>

              <select
                value={semester}
                onChange={(e)=>setSemester(Number(e.target.value))}
                className="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={1}>Smt 1</option>
                <option value={2}>Smt 2</option>
              </select>
            </div>

          </div>

        </div>

        {loadingGrafik ? (
          <div className="text-center py-10 text-sm sm:text-base text-gray-500">
            Memuat grafik...
          </div>
        ) : (
          <GrafikTransaksi data={grafikData} />
        )}

      </motion.div>


      {/* TABEL */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-5"
      >

        <div className="flex flex-wrap items-center justify-between gap-3">

          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            Laporan Sampah Tahunan
          </h2>

          <div className="flex items-center gap-2">
            <label className="text-xs sm:text-sm text-gray-500">
              Tahun
            </label>

            <select
              value={tahunTabel}
              onChange={(e)=>setTahunTabel(Number(e.target.value))}
              className="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {tahunList.map((t)=>(
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

        </div>

        {loadingTabel ? (
          <div className="text-center py-10 text-sm sm:text-base text-gray-500">
            Memuat laporan...
          </div>
        ) : (
          <LaporanSampahTable data={laporanData} />
        )}

      </motion.div>

    </div>

  )
}