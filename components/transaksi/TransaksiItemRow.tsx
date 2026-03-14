"use client"

import { useState, useEffect } from "react"
import { Sampah, ItemTransaksi } from "@/types/transaksi"

interface Props {
  item: ItemTransaksi
  index: number
  sampah: Sampah[]
  updateItem: (
    index: number,
    field: keyof ItemTransaksi,
    value: string | number | ""
  ) => void
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

  const [namaInput, setNamaInput] = useState("")

  useEffect(() => {

  if (dataSampah) {
    setNamaInput(dataSampah.nama_sampah)
  } else {
    setNamaInput("")
  }

}, [item.jenis_sampah_id])
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

    const normalized = value.replace(",", ".")
    const angka = Number(normalized)

    if (!isNaN(angka)) {
      updateItem(index, "berat", angka)
    }

  }

  return (

    <div className="grid grid-cols-5 gap-4 mb-4">

      {/* Jenis Sampah */}

      <input
        list={`sampah-list-${index}`}
        placeholder="Ketik jenis sampah..."
        className="border border-green-200 rounded-lg p-3"
        value={namaInput}
        onChange={(e) => handleSampahChange(e.target.value)}
      />

      <datalist id={`sampah-list-${index}`}>

        {sampah.map((s) => (

          <option
            key={s.id}
            value={s.nama_sampah}
          />

        ))}

      </datalist>

      {/* Berat */}

      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Berat (kg)"
        className="border border-green-200 rounded-lg p-3"
        value={item.berat === "" ? "" : item.berat}
        onChange={(e) =>
          handleBeratChange(e.target.value)
        }
      />

      {/* Harga */}

      <div className="flex items-center">
        Rp {harga.toLocaleString("id-ID")}
      </div>

      {/* Subtotal */}

      <div className="flex items-center font-semibold">
        Rp {subtotal.toLocaleString("id-ID")}
      </div>

      {/* Hapus */}

      <button
        type="button"
        onClick={() => removeItem(index)}
        className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded"
      >
        Hapus
      </button>

    </div>

  )

}