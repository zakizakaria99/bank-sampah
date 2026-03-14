"use client"

import { useEffect, useState } from "react"

import {
  Nasabah,
  Sampah,
  ItemTransaksi
} from "@/types/transaksi"

import {
  getMasterData,
  simpanTransaksi
} from "@/services/transaksiService"

import TransaksiForm from "@/components/transaksi/TransaksiForm"
import TransaksiItemRow from "@/components/transaksi/TransaksiItemRow"
import TransaksiTotal from "@/components/transaksi/TransaksiTotal"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function TransaksiPage() {

  const [nasabah, setNasabah] = useState<Nasabah[]>([])
  const [sampah, setSampah] = useState<Sampah[]>([])
  const [nasabahId, setNasabahId] = useState("")

  const [items, setItems] = useState<ItemTransaksi[]>([
    { jenis_sampah_id: "", berat: "" }
  ])

  const [showSimpanModal, setShowSimpanModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {

    const result = await getMasterData()

    setNasabah(result.nasabah)
    setSampah(result.sampah)

  }

  function tambahBaris() {

    setItems([
      ...items,
      { jenis_sampah_id: "", berat: "" }
    ])

  }

  function updateItem(
  index: number,
  field: string,
  value: any
) {

  const newItems = [...items]

  newItems[index] = {
    ...newItems[index],
    [field]: value
  }

  setItems(newItems)

}

function removeItem(index: number) {

  if (items.length === 1) {

    setItems([
      { jenis_sampah_id: "", berat: "" }
    ])

    return
  }

  const newItems = items.filter(
    (_, i) => i !== index
  )

  setItems(newItems)

}

function hitungTotal() {

  let total = 0

  items.forEach((item) => {

    const dataSampah = sampah.find(
  (s) => s.id === item.jenis_sampah_id
)

    if (dataSampah) {

      const berat = Number(item.berat || 0)

      const subtotal =
        Math.round(dataSampah.harga_per_kg * berat)

      total += subtotal

    }

  })

  const totalNasabah = Math.round(total * 0.6)
  const totalPengelola = Math.round(total * 0.4)

  return {
    totalNasabah,
    totalPengelola
  }

}

  const {
    totalNasabah,
    totalPengelola
  } = hitungTotal()

  async function confirmSimpanTransaksi() {

    const nasabahData = nasabah.find(
      (n) => n.nama === nasabahId
    )

    if (!nasabahData) {
      alert("Nasabah tidak ditemukan")
      return
    }

    const nasabahRealId = nasabahData.id

    const fixedItems = items.map((item) => {

      const sampahData = sampah.find(
        (s) => s.nama_sampah === item.jenis_sampah_id
      )

      if (!sampahData) return item

      return {
        ...item,
        jenis_sampah_id: sampahData.id
      }

    })

    await simpanTransaksi(
      nasabahRealId,
      fixedItems,
      sampah,
      totalNasabah,
      totalPengelola
    )

    setNasabahId("")
    setItems([{ jenis_sampah_id: "", berat: "" }])

    setShowSimpanModal(false)

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-10">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">

        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Transaksi Setor Sampah
        </h1>

        <TransaksiForm
          nasabah={nasabah}
          nasabahId={nasabahId}
          setNasabahId={setNasabahId}
        />

        {items.map((item, index) => (

  <TransaksiItemRow
    key={index}
    item={item}
    index={index}
    sampah={sampah}
    updateItem={updateItem}
    removeItem={removeItem}
  />

))}

        <button
          onClick={tambahBaris}
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mb-6"
        >
          Tambah Sampah
        </button>

        <TransaksiTotal
          totalNasabah={totalNasabah}
          totalPengelola={totalPengelola}
        />

        <ConfirmModal
          isOpen={showSimpanModal}
          title="Simpan Transaksi"
          message="Yakin ingin menyimpan transaksi ini?"
          onConfirm={confirmSimpanTransaksi}
          onCancel={() => setShowSimpanModal(false)}
        />

        <button
          onClick={() => setShowSimpanModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Simpan Transaksi
        </button>

      </div>

    </div>

  )
}