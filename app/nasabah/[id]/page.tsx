"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"

import ConfirmModal from "@/components/ui/ConfirmModal"

import NasabahInfo from "@/components/nasabah/NasabahInfo"
import SaldoCard from "@/components/nasabah/SaldoCard"
import TarikSaldoForm from "@/components/nasabah/TarikSaldoForm"
import RiwayatPenarikanTable from "@/components/penarikan/RiwayatPenarikanTable"
import RiwayatSetorTable from "@/components/transaksi/RiwayatSetorTable"

import {
  getDetailNasabah,
  getSaldoNasabah,
  getRiwayatPenarikan,
  tarikSaldo,
  cancelPenarikan
} from "@/services/nasabahService"

import { getKasBersih } from "@/services/laporanService"

import {
  getRiwayatSetorNasabah,
  getDetailSetor
} from "@/services/transaksiService"

import { User, Wallet } from "lucide-react"

import { Nasabah } from "@/types/nasabah"
import { Transaksi, DetailTransaksi } from "@/types/transaksi"

export default function NasabahDetailPage() {
  const params = useParams()
  const nasabahId = params?.id as string

  const [nasabah, setNasabah] = useState<Nasabah | null>(null)
  const [saldo, setSaldo] = useState(0)
  const [saldoPengelola, setSaldoPengelola] = useState(0)

  // ✅ FIX TYPE
  type Penarikan = {
    id: string
    jumlah: number
    created_at: string
  }

  const [riwayat, setRiwayat] = useState<Penarikan[]>([])
  const [setor, setSetor] = useState<Transaksi[]>([])
  const [detailSetor, setDetailSetor] = useState<DetailTransaksi[]>([])

  const [openTransaksi, setOpenTransaksi] = useState<string | null>(null)

  const [jumlahTarik, setJumlahTarik] = useState("")
  const [showTarikModal, setShowTarikModal] = useState(false)

  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showFinalCancelModal, setShowFinalCancelModal] = useState(false)
  const [cancelId, setCancelId] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState(0)

  const [pageSetor, setPageSetor] = useState(1)
  const [totalSetor, setTotalSetor] = useState(0)

  const limit = 10
  const limitSetor = 10

  const loadNasabah = useCallback(async () => {
    if (!nasabahId) return

    const detail = await getDetailNasabah(nasabahId)
    const saldoData = await getSaldoNasabah(nasabahId)
    const kas = await getKasBersih()

    setNasabah(detail)
    setSaldo(saldoData)
    setSaldoPengelola(kas)
  }, [nasabahId])

  const loadPenarikan = useCallback(async () => {
    if (!nasabahId) return

    const result = await getRiwayatPenarikan(nasabahId, page, limit)
    setRiwayat(result?.data || [])
    setTotalData(result?.total || 0)
  }, [nasabahId, page])

  const loadSetor = useCallback(async () => {
    if (!nasabahId) return

    const result = await getRiwayatSetorNasabah(nasabahId, pageSetor, limitSetor)
    setSetor(result?.data || [])
    setTotalSetor(result?.total || 0)
  }, [nasabahId, pageSetor])

  useEffect(() => {
    if (!nasabahId) return

    const fetchData = async () => {
      await loadNasabah()
      await loadPenarikan()
      await loadSetor()
    }

    fetchData()
  }, [nasabahId, page, pageSetor, loadNasabah, loadPenarikan, loadSetor])

  async function handleOpenDetail(id: string) {
    if (openTransaksi === id) {
      setOpenTransaksi(null)
      return
    }

    const data = await getDetailSetor(id)
    setDetailSetor(data || [])
    setOpenTransaksi(id)
  }

  async function confirmTarikSaldo() {
    const jumlah = Number(jumlahTarik)

    if (!jumlah) return

    if (jumlah > saldo) {
      alert("Saldo nasabah tidak cukup")
      return
    }

    if (jumlah > saldoPengelola) {
      alert("Kas tidak mencukupi")
      return
    }

    try {
      await tarikSaldo(nasabahId, jumlah)

      setShowTarikModal(false)
      setJumlahTarik("")

      await loadNasabah()
      await loadPenarikan()
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert("Terjadi kesalahan")
      }
    }
  }

  async function confirmCancelPenarikan() {
    if (!cancelId) return

    await cancelPenarikan(cancelId)

    setShowFinalCancelModal(false)
    setCancelId(null)

    await loadPenarikan()
    await loadNasabah()
  }

  if (!nasabah) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex items-center gap-3">
          <User className="text-green-600 w-7 h-7"/>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            Detail Nasabah
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 border border-green-100 space-y-8">

          <NasabahInfo nasabah={nasabah} />
          <SaldoCard saldo={saldo} />

          <div className="text-sm text-gray-600">
            Kas tersedia:{" "}
            <span className="font-semibold text-green-700">
              Rp {saldoPengelola.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="border border-green-200 rounded-xl p-5 bg-green-50">
            <TarikSaldoForm
              jumlahTarik={jumlahTarik}
              setJumlahTarik={setJumlahTarik}
              openModal={() => setShowTarikModal(true)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wallet className="text-green-600"/>
              <h2 className="text-lg font-semibold text-green-800">
                Riwayat Penarikan
              </h2>
            </div>

            <RiwayatPenarikanTable
              data={riwayat}
              onCancel={(id) => {
                setCancelId(id)
                setShowCancelModal(true)
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wallet className="text-green-600"/>
              <h2 className="text-lg font-semibold text-green-800">
                Riwayat Setoran
              </h2>
            </div>

            <RiwayatSetorTable
              setor={setor}
              detailSetor={detailSetor}
              openTransaksi={openTransaksi}
              onOpen={handleOpenDetail}
            />
          </div>

        </div>

        <ConfirmModal
          isOpen={showTarikModal}
          title="Konfirmasi Tarik Saldo"
          message={`Yakin menarik Rp ${Number(jumlahTarik || 0).toLocaleString("id-ID")} ?`}
          onConfirm={confirmTarikSaldo}
          onCancel={() => setShowTarikModal(false)}
        />

        <ConfirmModal
          isOpen={showCancelModal}
          variant="danger"
          title="Batalkan Penarikan"
          message="Apakah Anda yakin ingin membatalkan transaksi ini?"
          onConfirm={async () => {
            setShowCancelModal(false)
            setTimeout(() => setShowFinalCancelModal(true), 200)
          }}
          onCancel={() => setShowCancelModal(false)}
        />

        <ConfirmModal
          isOpen={showFinalCancelModal}
          variant="danger"
          title="Konfirmasi Akhir"
          message="Tindakan ini tidak dapat dibatalkan."
          onConfirm={confirmCancelPenarikan}
          onCancel={() => setShowFinalCancelModal(false)}
        />

      </div>
    </div>
  )
}