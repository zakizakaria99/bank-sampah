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

import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export default function GrafikPage() {

  const currentYear = new Date().getFullYear()

  const [tahunGrafik, setTahunGrafik] = useState(currentYear)
  const [semester, setSemester] = useState(1)

  const [tahunTabel, setTahunTabel] = useState(currentYear)

  const [grafikData, setGrafikData] = useState<GrafikData[]>([])
  const [laporanData, setLaporanData] = useState<Row[]>([])

  const [loadingGrafik, setLoadingGrafik] = useState(true)
  const [loadingTabel, setLoadingTabel] = useState(true)

  const tahunList: number[] = []
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

  // ================= PDF =================
  async function downloadSection(id: string, filename: string, info?: any) {
    const element = document.getElementById(id)
    if (!element) return

    const cloned = element.cloneNode(true) as HTMLElement

    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.left = "-9999px"
    container.appendChild(cloned)
    document.body.appendChild(container)

    if (id === "grafik-area") {
      cloned.style.width = "1200px"
      cloned.style.height = "500px"
      cloned.style.padding = "20px"
    }

    const all = cloned.querySelectorAll("*")
    all.forEach((el) => {
      const e = el as HTMLElement
      e.style.color = "#000"
      e.style.background = "#fff"
      e.style.borderColor = "#e5e7eb"
      e.style.boxShadow = "none"
    })

    const canvas = await html2canvas(cloned, {
      scale: 2,
      backgroundColor: "#ffffff"
    })

    document.body.removeChild(container)

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("l", "mm", "a4")

    pdf.setFontSize(18)
    pdf.text("LAPORAN BANK SAMPAH", 14, 15)

    pdf.setFontSize(11)
    pdf.text(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`, 14, 22)

    if (info?.type === "grafik") {
      pdf.text(`Tahun: ${info.tahun}`, 14, 30)
      pdf.text(`Semester: ${info.semester}`, 14, 36)
    }

    if (info?.type === "tabel") {
      pdf.text(`Tahun: ${info.tahun}`, 14, 30)
    }

    const pageWidth = 297
    const imgWidth = pageWidth - 20
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 10, 45, imgWidth, imgHeight)

    pdf.save(filename)
  }

  // ================= EXCEL =================
  function exportToExcel() {
    if (!laporanData || laporanData.length === 0) return

    const bulanList = [
      "Jan","Feb","Mar","Apr","Mei","Jun",
      "Jul","Agu","Sep","Okt","Nov","Des"
    ]

    const data = laporanData.map((item, index) => {
      const row: any = {
        No: index + 1,
        "Nama Sampah": item.nama_sampah
      }

      bulanList.forEach((b) => {
        row[b] = (item as any)[b] || 0
      })

      row["Total (Kg)"] = item.total_kg
      row["Total Harga"] = item.total_harga

      return row
    })

    const worksheet = XLSX.utils.json_to_sheet(data)

    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 20 },
      ...Array(12).fill({ wch: 10 }),
      { wch: 15 },
      { wch: 20 }
    ]

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan")

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    })

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    })

    saveAs(file, `laporan-sampah-${tahunTabel}.xlsx`)
  }

  return (
    <div className="pt-4 sm:pt-6 px-3 sm:px-6 pb-6 sm:pb-10 space-y-6 sm:space-y-8">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800">
          Grafik & Analitik
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Analisis transaksi dan laporan sampah per periode
        </p>
      </div>

      {/* ================= GRAFIK ================= */}
      <motion.div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 space-y-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">
            Grafik Transaksi
          </h2>

          <button
            onClick={() =>
              downloadSection("grafik-area", `grafik-${tahunGrafik}.pdf`, {
                type: "grafik",
                tahun: tahunGrafik,
                semester
              })
            }
            className="bg-green-600 text-white px-3 py-1.5 rounded-lg"
          >
            Download PDF
          </button>
        </div>

        {/* 🔥 FILTER GRAFIK */}
        <div className="flex gap-2">
          <select
            value={tahunGrafik}
            onChange={(e) => setTahunGrafik(Number(e.target.value))}
            className="border px-2 py-1 rounded text-sm"
          >
            {tahunList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value={1}>Semester 1</option>
            <option value={2}>Semester 2</option>
          </select>
        </div>

        <div id="grafik-area">
          {loadingGrafik ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <GrafikTransaksi data={grafikData} />
          )}
        </div>

      </motion.div>

      {/* ================= TABEL ================= */}
      <motion.div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 space-y-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">
            Laporan Sampah Tahunan
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() =>
                downloadSection("tabel-area", `tabel-${tahunTabel}.pdf`, {
                  type: "tabel",
                  tahun: tahunTabel
                })
              }
              className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg"
            >
              Download PDF
            </button>

            <button
              onClick={exportToExcel}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg"
            >
              Download Excel
            </button>
          </div>
        </div>

        {/* 🔥 FILTER TABEL */}
        <div>
          <select
            value={tahunTabel}
            onChange={(e) => setTahunTabel(Number(e.target.value))}
            className="border px-2 py-1 rounded text-sm"
          >
            {tahunList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div id="tabel-area">
          {loadingTabel ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <LaporanSampahTable data={laporanData} />
          )}
        </div>

      </motion.div>

    </div>
  )
}