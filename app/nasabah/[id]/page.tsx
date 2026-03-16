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

import {
  User,
  Wallet,
  Recycle,
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

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
      alert("Saldo tidak cukup")
      return
    }

    await tarikSaldo(nasabahId, jumlah)

    setShowTarikModal(false)
    setJumlahTarik("")

    loadNasabah()
    loadPenarikan()

  }

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

  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 md:px-6 py-6 md:py-10">

  <div className="max-w-5xl mx-auto space-y-6">

  {/* HEADER */}

  <div className="flex items-center gap-3">

    <User className="text-green-600 w-7 h-7"/>

    <h1 className="text-2xl md:text-3xl font-bold text-green-800">
      Detail Nasabah
    </h1>

  </div>


  {/* CARD UTAMA */}

  <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 border border-green-100 space-y-8">

    <NasabahInfo nasabah={nasabah} />

    <SaldoCard saldo={saldo} />

{/* CARD TARIK SALDO */}

<div className="border border-green-200 rounded-xl p-5 bg-green-50">

  <TarikSaldoForm
    jumlahTarik={jumlahTarik}
    setJumlahTarik={setJumlahTarik}
    openModal={() => setShowTarikModal(true)}
  />

</div>



    {/* =========================
        RIWAYAT PENARIKAN
    ========================= */}

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

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeft size={16}/>
          Prev
        </button>

        <span className="text-sm">
          Halaman {page} / {totalPage}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
          <ChevronRight size={16}/>
        </button>

      </div>

    </div>


    {/* =========================
        RIWAYAT SETOR
    ========================= */}

    <div className="space-y-4">

      <div className="flex items-center gap-2">

        <Recycle className="text-green-600"/>

        <h2 className="text-lg font-semibold text-green-800">
          Riwayat Setor Sampah
        </h2>

      </div>

      <RiwayatSetorTable
        setor={setor}
        detailSetor={detailSetor}
        openTransaksi={openTransaksi}
        onOpen={handleOpenDetail}
      />

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">

        <button
          disabled={pageSetor === 1}
          onClick={() => setPageSetor(pageSetor - 1)}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeft size={16}/>
          Prev
        </button>

        <span className="text-sm">
          Halaman {pageSetor} / {totalPageSetor}
        </span>

        <button
          disabled={pageSetor === totalPageSetor}
          onClick={() => setPageSetor(pageSetor + 1)}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
          <ChevronRight size={16}/>
        </button>

      </div>

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

</div>

)

}