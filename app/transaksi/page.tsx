"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Save, Recycle } from "lucide-react"

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

  // ✅ useCallback biar aman
  const loadData = useCallback(async () => {
    try {
      const result = await getMasterData()
      setNasabah(result.nasabah || [])
      setSampah(result.sampah || [])
    } catch (error) {
      console.error("Error load master data:", error)
    }
  }, [])

  // ✅ FIX useEffect
  useEffect(() => {
    const fetchData = async () => {
      await loadData()
    }

    fetchData()
  }, [loadData])

  function tambahBaris() {
    setItems([...items, { jenis_sampah_id: "", berat: "" }])
  }

  function updateItem(
    index: number,
    field: keyof ItemTransaksi,
    value: string
  ) {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  function removeItem(index: number) {
    if (items.length === 1) {
      setItems([{ jenis_sampah_id: "", berat: "" }])
      return
    }
    setItems(items.filter((_, i) => i !== index))
  }

  function hitungTotal() {
    let total = 0

    items.forEach((item) => {
      const dataSampah = sampah.find(
        (s) => s.id === item.jenis_sampah_id
      )

      if (dataSampah) {
        const berat = Number(item.berat || 0)
        total += Math.round(dataSampah.harga_per_kg * berat)
      }
    })

    return {
      totalNasabah: Math.round(total * 0.6),
      totalPengelola: Math.round(total * 0.4)
    }
  }

  const { totalNasabah, totalPengelola } = hitungTotal()

  function validasiTransaksi() {
    if (!nasabahId) {
      alert("Pilih nasabah terlebih dahulu")
      return false
    }

    const validItems = items.filter(
      (item) =>
        item.jenis_sampah_id !== "" &&
        Number(item.berat) > 0
    )

    if (validItems.length === 0) {
      alert("Minimal satu item harus diisi")
      return false
    }

    return true
  }

  async function confirmSimpanTransaksi() {
    try {
      await simpanTransaksi(
        nasabahId,
        items,
        sampah,
        totalNasabah,
        totalPengelola
      )

      setNasabahId("")
      setItems([{ jenis_sampah_id: "", berat: "" }])
      setShowSimpanModal(false)

    } catch (error) {
      console.error("Error simpan transaksi:", error)
      alert("Gagal menyimpan transaksi")
    }
  }

  function handleSimpanClick() {
    if (!validasiTransaksi()) return
    setShowSimpanModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 md:px-8 py-6">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-start gap-3 mb-6">
          <div className="bg-green-600 text-white p-2 rounded-xl">
            <Recycle size={20} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              Transaksi Setor Sampah
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Catat dan kelola transaksi penyetoran sampah nasabah
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 mb-6">

          <TransaksiForm
            nasabah={nasabah}
            nasabahId={nasabahId}
            setNasabahId={setNasabahId}
          />

          <div className="space-y-3 mt-4">
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
          </div>

          <button
            onClick={tambahBaris}
            className="mt-4 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
          >
            <Plus size={16} />
            Tambah Sampah
          </button>

        </div>

        <TransaksiTotal
          totalNasabah={totalNasabah}
          totalPengelola={totalPengelola}
        />

        <button
          onClick={handleSimpanClick}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          <Save size={18} />
          Simpan Transaksi
        </button>

        <ConfirmModal
          isOpen={showSimpanModal}
          title="Simpan Transaksi"
          message="Yakin ingin menyimpan transaksi ini?"
          onConfirm={confirmSimpanTransaksi}
          onCancel={() => setShowSimpanModal(false)}
        />

      </div>
    </div>
  )
}