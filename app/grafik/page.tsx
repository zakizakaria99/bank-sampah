"use client"

import { useEffect, useState } from "react"

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

      const grafik = await getGrafikSemester(
        tahunGrafik,
        semester
      )

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

      const laporan = await getLaporanSampahTahunan(
        tahunTabel
      )

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

    <div className="space-y-8">

      {/* FILTER GRAFIK */}

      <div className="bg-white border rounded-lg p-4 space-y-4">

        <h2 className="font-semibold text-lg">
          Grafik Transaksi
        </h2>

        <div className="flex gap-4 items-center">

          <div>
            <label className="text-sm">Tahun</label>

            <select
              value={tahunGrafik}
              onChange={(e)=>setTahunGrafik(Number(e.target.value))}
              className="border rounded px-3 py-2 ml-2"
            >

              {tahunList.map((t)=>(
                <option key={t} value={t}>
                  {t}
                </option>
              ))}

            </select>
          </div>

          <div>
            <label className="text-sm">Semester</label>

            <select
              value={semester}
              onChange={(e)=>setSemester(Number(e.target.value))}
              className="border rounded px-3 py-2 ml-2"
            >

              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2</option>

            </select>
          </div>

        </div>

        {loadingGrafik ? (
          <div className="text-center py-8">
            Memuat grafik...
          </div>
        ) : (
          <GrafikTransaksi data={grafikData} />
        )}

      </div>


      {/* FILTER TABEL */}

      <div className="bg-white border rounded-lg p-4 space-y-4">

        <h2 className="font-semibold text-lg">
          Laporan Sampah Tahunan
        </h2>

        <div>

          <label className="text-sm">Tahun</label>

          <select
            value={tahunTabel}
            onChange={(e)=>setTahunTabel(Number(e.target.value))}
            className="border rounded px-3 py-2 ml-2"
          >

            {tahunList.map((t)=>(
              <option key={t} value={t}>
                {t}
              </option>
            ))}

          </select>

        </div>

        {loadingTabel ? (
          <div className="text-center py-8">
            Memuat laporan...
          </div>
        ) : (
          <LaporanSampahTable data={laporanData} />
        )}

      </div>

    </div>

  )
}