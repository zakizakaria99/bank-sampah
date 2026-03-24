"use client"

import { useEffect, useState } from "react"
import { Package } from "lucide-react"

import StokSampahTable from "@/components/stok-sampah/StokSampahTable"
import JualSampahModal from "@/components/stok-sampah/JualSampahModal"
import RiwayatPenjualanTable from "@/components/stok-sampah/RiwayatPenjualanTable"
import DetailPenjualanModal from "@/components/stok-sampah/DetailPenjualanModal"

import {
  getStokSampah,
  getRiwayatPenjualan
} from "@/services/stokSampahService"

import { StokSampah } from "@/types/stokSampah"
import { Penjualan } from "@/types/penjualan"

export default function StokSampahPage() {

  const [data, setData] = useState<StokSampah[]>([])
  const [loading, setLoading] = useState(true)

  const [openModal, setOpenModal] = useState(false)

  const [riwayat, setRiwayat] = useState<Penjualan[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedPenjualan, setSelectedPenjualan] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getStokSampah()
      setData(result || [])
    } finally {
      setLoading(false)
    }
  }

  const fetchRiwayat = async (p = 1) => {
    const result = await getRiwayatPenjualan(p)
    setRiwayat(result.data || [])
    setTotal(result.count || 0)
    setPage(p)
  }

  useEffect(() => {
    fetchData()
    fetchRiwayat()
  }, [])

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 md:px-8 py-6">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex items-start gap-3 mb-6">
  <div className="bg-green-600 text-white p-2 rounded-xl">
    <Package size={20} />
  </div>

  <div className="flex flex-col">
    <h1 className="text-2xl md:text-3xl font-bold text-green-800">
      Stok & Penjualan Sampah
    </h1>
    <p className="text-gray-500 text-sm mt-1">
      Kelola stok dan pantau penjualan sampah
    </p>
  </div>
</div>

        {/* STOK */}
        {loading ? (
          <div className="text-gray-500">Memuat data...</div>
        ) : (
          <StokSampahTable
            data={data}
            onJual={() => setOpenModal(true)}
          />
        )}

        {/* RIWAYAT */}
        <RiwayatPenjualanTable
          data={riwayat}
          page={page}
          total={total}
          onPageChange={fetchRiwayat}
          onDetail={(id) => {
            setSelectedPenjualan(id)
            setDetailOpen(true)
          }}
        />

        {/* MODAL */}
        <JualSampahModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          stokData={data}
          onSuccess={fetchData}
        />

        <DetailPenjualanModal
          open={detailOpen}
          penjualanId={selectedPenjualan}
          onClose={() => setDetailOpen(false)}
        />

      </div>

    </div>

  )
}