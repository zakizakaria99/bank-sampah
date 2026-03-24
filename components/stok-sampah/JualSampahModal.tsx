/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState, useEffect } from "react"
import { createPenjualan } from "@/services/stokSampahService"
import { StokSampah } from "@/types/stokSampah"
import ConfirmModal from "@/components/ui/ConfirmModal"

interface ItemJual {
  jenis_sampah_id: string
  nama_sampah: string
  harga_nasabah: number
  berat: number
  harga_jual: number
}

interface Props {
  open: boolean
  onClose: () => void
  stokData: StokSampah[]
  onSuccess: () => void
}

export default function JualSampahModal({
  open,
  onClose,
  stokData,
  onSuccess
}: Props) {

  const [items, setItems] = useState<ItemJual[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [displayHarga, setDisplayHarga] = useState<{ [key:number]: string }>({})
  const [openConfirm, setOpenConfirm] = useState(false)

  const [search, setSearch] = useState<{ [key:number]: string }>({})
  const [showSugest, setShowSugest] = useState<{ [key:number]: boolean }>({})

  useEffect(() => {
    if (open) {
      setError("")
    }
  }, [open])

  if (!open) return null

  const formatNumber = (value: string) =>
    new Intl.NumberFormat("id-ID").format(Number(value))

  const parseNumber = (value: string) =>
    Number(value.replace(/\D/g, ""))

  const tambahItem = () => {
    setItems(prev => [
      ...prev,
      {
        jenis_sampah_id: "",
        nama_sampah: "",
        harga_nasabah: 0,
        berat: 0,
        harga_jual: 0
      }
    ])
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]

    if (field === "jenis_sampah_id") {
      const selected = stokData.find(s => s.jenis_sampah_id === value)

      if (selected) {
        newItems[index] = {
          ...newItems[index],
          jenis_sampah_id: selected.jenis_sampah_id,
          nama_sampah: selected.nama_sampah,
          harga_nasabah: selected.harga_per_kg
        }
      }
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value === "" ? 0 : Number(value)
      }
    }

    setItems(newItems)
  }

  const hapusItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const totalPenjualan = items.reduce(
    (sum, i) => sum + i.berat * i.harga_jual,
    0
  )

  const totalModal = items.reduce(
    (sum, i) => sum + i.berat * i.harga_nasabah,
    0
  )

  const labaRugi = totalPenjualan - totalModal

  const handleSubmit = () => {
  if (loading || openConfirm) return

  if (items.length === 0) {
    setError("Tambahkan minimal 1 item")
    return
  }

  // ✅ INI YANG PENTING (penyebab error kamu)
  if (items.some(i => !i.jenis_sampah_id)) {
    setError("Pilih jenis sampah dari daftar (klik sugest)")
    return
  }

  if (items.some(i => i.berat <= 0 || i.harga_jual <= 0)) {
    setError("Berat & harga harus valid")
    return
  }
// 🔥 VALIDASI FINAL (ANTI TEMBUS KE BACKEND)
for (const item of items) {
  const stok = stokData.find(
    s => s.jenis_sampah_id === item.jenis_sampah_id
  )

  if (stok && item.berat > stok.stok) {
    setError(`Stok ${stok.nama_sampah} tidak mencukupi (tersedia ${stok.stok} kg)`)
    return
  }
}
  setOpenConfirm(true)
}

  const confirmSubmit = async () => {
    try {
      setLoading(true)
      setError("")

      await createPenjualan(items)

      setItems([])
      setDisplayHarga({})
      setOpenConfirm(false)
      onSuccess()
      onClose()

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-6">

      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 space-y-5">

        <h2 className="text-lg sm:text-xl font-semibold text-green-800">
          Jual Sampah
        </h2>

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        {/* ================= MOBILE (TETAP) ================= */}
        <div className="space-y-4 md:hidden">
          {items.map((item, index) => {
            const filtered = stokData.filter(s =>
              s.nama_sampah.toLowerCase().includes((search[index] || "").toLowerCase())
            )

            const total = item.berat * item.harga_jual

            return (
              <div key={index} className="border rounded-xl p-3 space-y-3 bg-gray-50 relative">

                <div className="relative">
                  <input
                    placeholder="Ketik jenis sampah..."
                    className="w-full border rounded-lg p-2 text-sm"
                    value={search[index] ?? item.nama_sampah}
                    onChange={(e)=>{
                      setSearch({ ...search, [index]: e.target.value })
                      setShowSugest({ ...showSugest, [index]: true })
                    }}
                    onFocus={() => setShowSugest({ ...showSugest, [index]: true })}
                  />

                  {showSugest[index] && filtered.length > 0 && (
                    <div className="absolute z-10 bg-white border w-full mt-1 rounded-lg max-h-40 overflow-y-auto shadow">
                      {filtered.map(s => (
                        <div
                          key={s.jenis_sampah_id}
                          className="p-2 text-sm hover:bg-green-100 cursor-pointer"
                          onClick={()=>{
                            updateItem(index, "jenis_sampah_id", s.jenis_sampah_id)
                            setSearch({ ...search, [index]: s.nama_sampah })
                            setShowSugest({ ...showSugest, [index]: false })
                          }}
                        >
                          {s.nama_sampah} (stok {s.stok} kg)
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Berat (kg)"
                    className="border rounded-lg p-2 text-sm"
                    value={item.berat || ""}
                    onChange={(e)=>updateItem(index, "berat", e.target.value)}
                  />

                  <input
                    placeholder="Harga jual"
                    className="border rounded-lg p-2 text-sm"
                    value={displayHarga[index] ?? ""}
                    onChange={(e)=>{
                      const raw = e.target.value.replace(/\D/g, "")
                      setDisplayHarga({
                        ...displayHarga,
                        [index]: formatNumber(raw)
                      })
                      updateItem(index, "harga_jual", parseNumber(raw))
                    }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span>Total</span>
                  <span className="font-semibold text-green-700">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  onClick={()=>hapusItem(index)}
                  className="text-red-500 text-sm"
                >
                  Hapus
                </button>

              </div>
            )
          })}
        </div>

        {/* ================= DESKTOP (REVISI TOTAL) ================= */}
        <div className="hidden md:flex flex-col gap-3">

          {items.map((item, index) => {

            const filtered = stokData.filter(s =>
              s.nama_sampah.toLowerCase().includes((search[index] || "").toLowerCase())
            )

            const total = item.berat * item.harga_jual

            return (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">

                {/* JENIS */}
                <div className="col-span-4 relative">
                  <input
                    className="border rounded-lg p-2 w-full"
                    placeholder="Ketik jenis sampah..."
                    value={search[index] ?? item.nama_sampah}
                    onChange={(e)=>{
                      setSearch({ ...search, [index]: e.target.value })
                      setShowSugest({ ...showSugest, [index]: true })
                    }}
                    onFocus={() => setShowSugest({ ...showSugest, [index]: true })}
                  />

                  {showSugest[index] && filtered.length > 0 && (
                    <div className="absolute z-10 bg-white border w-full mt-1 rounded-lg max-h-40 overflow-y-auto shadow">
                      {filtered.map(s => (
                        <div
                          key={s.jenis_sampah_id}
                          className="p-2 hover:bg-green-100 cursor-pointer"
                          onClick={()=>{
                            updateItem(index, "jenis_sampah_id", s.jenis_sampah_id)
                            setSearch({ ...search, [index]: s.nama_sampah })
                            setShowSugest({ ...showSugest, [index]: false })
                          }}
                        >
                          {s.nama_sampah}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* BERAT */}
                <div className="col-span-2">
                  <input
                    type="number"
                    className="border rounded-lg p-2 w-full"
                    placeholder="kg"
                    value={item.berat || ""}
                    onChange={(e)=>updateItem(index, "berat", e.target.value)}
                  />
                </div>

                {/* HARGA */}
                <div className="col-span-3">
                  <input
                    className="border rounded-lg p-2 w-full"
                    placeholder="Harga"
                    value={displayHarga[index] ?? ""}
                    onChange={(e)=>{
                      const raw = e.target.value.replace(/\D/g, "")
                      setDisplayHarga({
                        ...displayHarga,
                        [index]: formatNumber(raw)
                      })
                      updateItem(index, "harga_jual", parseNumber(raw))
                    }}
                  />
                </div>

                {/* TOTAL */}
                <div className="col-span-2 text-green-700 font-semibold">
                  Rp {total.toLocaleString("id-ID")}
                </div>

                {/* DELETE */}
                <div className="col-span-1 text-center">
                  <button
                    onClick={()=>hapusItem(index)}
                    className="text-red-500"
                  >
                    Hapus
                  </button>
                </div>

              </div>
            )
          })}

        </div>

        <button
          onClick={tambahItem}
          className="text-green-600 font-medium text-sm"
        >
          + Tambah item
        </button>

        <div className="border-t pt-4 space-y-1 text-sm sm:text-base">
          <div>
            Total: <b>Rp {totalPenjualan.toLocaleString("id-ID")}</b>
          </div>
          <div>
            Laba/Rugi:{" "}
            <b className={labaRugi >= 0 ? "text-green-600" : "text-red-600"}>
              Rp {labaRugi.toLocaleString("id-ID")}
            </b>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || openConfirm}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Jual Sampah"}
          </button>
        </div>

      </div>

      <ConfirmModal
        isOpen={openConfirm}
        title="Konfirmasi Penjualan"
        message={`Anda akan menjual ${items.length} item dengan total Rp ${totalPenjualan.toLocaleString("id-ID")}. Lanjutkan?`}
        onConfirm={confirmSubmit}
        onCancel={() => setOpenConfirm(false)}
      />
    </div>
  )
}