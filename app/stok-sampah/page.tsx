"use client"

import { useEffect, useState } from "react"

import StokSampahTable from "@/components/stok-sampah/StokSampahTable"
import JualSampahModal from "@/components/stok-sampah/JualSampahModal"
import RiwayatPenjualanTable from "@/components/stok-sampah/RiwayatPenjualanTable"

import { getStokSampah, getRiwayatPenjualan } from "@/services/stokSampahService"

import { StokSampah } from "@/types/stokSampah"
import { Penjualan } from "@/types/penjualan"

import DetailPenjualanModal from "@/components/stok-sampah/DetailPenjualanModal"

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

    } catch (err) {

      console.error(err)

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

    <div className="p-6 space-y-6">

      {loading ? (

        <div className="text-gray-500">
          Memuat data...
        </div>

      ) : (

        <StokSampahTable
          data={data}
          onJual={() => setOpenModal(true)}
        />

      )}

      <JualSampahModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        stokData={data}
        onSuccess={fetchData}
      />

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

      <DetailPenjualanModal
  open={detailOpen}
  penjualanId={selectedPenjualan}
  onClose={() => setDetailOpen(false)}
/>

    </div>



  )
}