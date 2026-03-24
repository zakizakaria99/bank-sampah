/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"



import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Sampah, ItemTransaksi } from "@/types/transaksi"

interface Props {
  item: ItemTransaksi
  index: number
  sampah: Sampah[]
  updateItem: (index: number, field: keyof ItemTransaksi, value: any) => void
  removeItem: (index: number) => void
}

export default function TransaksiItemRow({
  item,
  index,
  sampah,
  updateItem,
  removeItem
}: Props) {

  const dataSampah = sampah.find(
    (s) => s.id === item.jenis_sampah_id
  )

  // ✅ langsung ambil dari data (tanpa useEffect)
  const [namaInput, setNamaInput] = useState(
    dataSampah?.nama_sampah || ""
  )

  const harga = dataSampah?.harga_per_kg || 0
  const berat = Number(item.berat || 0)
  const subtotal = Math.round(harga * berat)

  function handleSampahChange(value: string) {
    setNamaInput(value)

    const found = sampah.find(
      (s) => s.nama_sampah.toLowerCase() === value.toLowerCase()
    )

    if (found) {
      updateItem(index, "jenis_sampah_id", found.id)
    }
  }

  function handleBeratChange(value: string) {
    if (value === "") {
      updateItem(index, "berat", "")
      return
    }

    const angka = Number(value.replace(",", "."))
    if (!isNaN(angka)) {
      updateItem(index, "berat", angka)
    }
  }

  return (
    <div className="border border-green-100 rounded-xl p-3 md:p-4 bg-green-50">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm md:text-base">

        <input
          list={`sampah-list-${index}`}
          placeholder="Jenis sampah"
          className="border border-green-200 rounded-lg p-2 md:p-3 text-sm md:text-base"
          value={namaInput}
          onChange={(e) => handleSampahChange(e.target.value)}
        />

        <datalist id={`sampah-list-${index}`}>
          {sampah.map((s) => (
            <option key={s.id} value={s.nama_sampah} />
          ))}
        </datalist>

        <input
          type="number"
          placeholder="Berat (kg)"
          className="border border-green-200 rounded-lg p-2 md:p-3 text-sm md:text-base"
          value={item.berat === "" ? "" : item.berat}
          onChange={(e) => handleBeratChange(e.target.value)}
        />

        <div className="flex items-center text-sm md:text-base">
          Rp {harga.toLocaleString("id-ID")}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="font-semibold text-sm md:text-base">
            Rp {subtotal.toLocaleString("id-ID")}
          </span>

          <button
            onClick={() => removeItem(index)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>

      </div>

    </div>
  )
}