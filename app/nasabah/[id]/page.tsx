"use client"

import { useEffect, useState } from "react"
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

import {
  getRiwayatSetorNasabah,
  getDetailSetor
} from "@/services/transaksiService"

export default function NasabahDetailPage() {

  const params = useParams()
  const nasabahId = params?.id as string

  const [nasabah, setNasabah] = useState<any>(null)
  const [saldo, setSaldo] = useState(0)

  const [riwayat, setRiwayat] = useState<any[]>([])
  const [setor, setSetor] = useState<any[]>([])

  const [detailSetor, setDetailSetor] = useState<any[]>([])
  const [openTransaksi, setOpenTransaksi] = useState<string | null>(null)

  const [jumlahTarik, setJumlahTarik] = useState("")

  const [showTarikModal, setShowTarikModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelId, setCancelId] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState(0)

  const [pageSetor, setPageSetor] = useState(1)
  const [totalSetor, setTotalSetor] = useState(0)

  const limit = 10
  const limitSetor = 10

  /* =========================
     LOAD DATA
  ========================= */

  useEffect(() => {

    if (!nasabahId) return

    loadNasabah()
    loadPenarikan()
    loadSetor()

  }, [page, pageSetor, nasabahId])

  async function loadNasabah() {

    const detail = await getDetailNasabah(nasabahId)
    const saldoData = await getSaldoNasabah(nasabahId)

    setNasabah(detail)
    setSaldo(saldoData)

  }

  async function loadPenarikan() {

    const result = await getRiwayatPenarikan(
      nasabahId,
      page,
      limit
    )

    setRiwayat(result?.data || [])
    setTotalData(result?.total || 0)

  }

  async function loadSetor() {

    const result = await getRiwayatSetorNasabah(
      nasabahId,
      pageSetor,
      limitSetor
    )

    setSetor(result?.data || [])
    setTotalSetor(result?.total || 0)

  }

  /* =========================
     DETAIL SETOR
  ========================= */

  async function handleOpenDetail(id: string) {

    if (openTransaksi === id) {
      setOpenTransaksi(null)
      return
    }

    const data = await getDetailSetor(id)

    setDetailSetor(data || [])
    setOpenTransaksi(id)

  }

  /* =========================
     TARIK SALDO
  ========================= */

  async function confirmTarikSaldo() {

    const jumlah = Number(jumlahTarik)

    if (!jumlah) return

    if (jumlah > saldo) {
      alert("Saldo tidak cukup")
      return
    }

    await tarikSaldo(nasabahId, jumlah)

    setShowTarikModal(false)
    setJumlahTarik("")

    loadNasabah()
    loadPenarikan()

  }

  /* =========================
     CANCEL PENARIKAN
  ========================= */

  async function confirmCancelPenarikan() {

    if (!cancelId) return

    await cancelPenarikan(cancelId)

    setShowCancelModal(false)
    setCancelId(null)

    loadPenarikan()

  }

  const totalPage = Math.ceil(totalData / limit) || 1
  const totalPageSetor = Math.ceil(totalSetor / limitSetor) || 1

  if (!nasabah) return null

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">

        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Detail Nasabah
        </h1>

        <NasabahInfo nasabah={nasabah} />

        <SaldoCard saldo={saldo} />

        <TarikSaldoForm
          jumlahTarik={jumlahTarik}
          setJumlahTarik={setJumlahTarik}
          openModal={() => setShowTarikModal(true)}
        />

        {/* RIWAYAT PENARIKAN */}

        <h2 className="text-lg font-semibold mb-4">
          Riwayat Penarikan
        </h2>

        <RiwayatPenarikanTable
          data={riwayat}
          onCancel={(id) => {
            setCancelId(id)
            setShowCancelModal(true)
          }}
        />

        {/* Pagination */}

        <div className="flex justify-center gap-4 mt-4">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Prev
          </button>

          <span>
            Halaman {page} / {totalPage}
          </span>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>

        </div>

        {/* RIWAYAT SETOR */}

        <h2 className="text-lg font-semibold mt-10 mb-4">
          Riwayat Setor Sampah
        </h2>

        <RiwayatSetorTable
          setor={setor}
          detailSetor={detailSetor}
          openTransaksi={openTransaksi}
          onOpen={handleOpenDetail}
        />

        {/* Pagination Setor */}

        <div className="flex justify-center gap-4 mt-4">

          <button
            disabled={pageSetor === 1}
            onClick={() => setPageSetor(pageSetor - 1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Prev
          </button>

          <span>
            Halaman {pageSetor} / {totalPageSetor}
          </span>

          <button
            disabled={pageSetor === totalPageSetor}
            onClick={() => setPageSetor(pageSetor + 1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>

        </div>

      </div>

      {/* MODAL TARIK SALDO */}

      <ConfirmModal
        isOpen={showTarikModal}
        title="Konfirmasi Tarik Saldo"
        message={`Yakin menarik Rp ${Number(jumlahTarik || 0).toLocaleString("id-ID")} ?`}
        onConfirm={confirmTarikSaldo}
        onCancel={() => setShowTarikModal(false)}
      />

      {/* MODAL CANCEL */}

      <ConfirmModal
        isOpen={showCancelModal}
        title="Batalkan Penarikan"
        message="Yakin membatalkan penarikan ini?"
        onConfirm={confirmCancelPenarikan}
        onCancel={() => setShowCancelModal(false)}
      />

    </div>

  )

}