"use client"

import { useState } from "react"
import { Nasabah } from "@/types/transaksi"

interface Props {
  nasabah: Nasabah[]
  nasabahId: string
  setNasabahId: (v: string) => void
}

export default function TransaksiForm({
  nasabah,
  nasabahId,
  setNasabahId
}: Props) {

  // 🔥 state input manual user
  const [inputValue, setInputValue] = useState("")

  // 🔥 cari nasabah terpilih
  const selectedNasabah = nasabah.find(n => n.id === nasabahId)

  return (
    <div className="mb-6">

      <label className="block mb-2 font-semibold text-sm md:text-base">
        Nama Nasabah
      </label>

      <input
        list="nasabah-list"
        className="border border-green-200 rounded-lg p-3 md:p-4 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Ketik nama nasabah..."

        // ✅ PRIORITAS:
        // kalau ada selected → pakai nama dari state global
        // kalau tidak → pakai input manual
        value={selectedNasabah?.nama || inputValue}

        onChange={(e) => {
          const value = e.target.value
          setInputValue(value)

          const found = nasabah.find(
            (n) => n.nama.toLowerCase() === value.toLowerCase()
          )

          if (found) {
            setNasabahId(found.id)
          } else {
            setNasabahId("")
          }
        }}
      />

      <datalist id="nasabah-list">
        {nasabah.map((n) => (
          <option key={n.id} value={n.nama} />
        ))}
      </datalist>

    </div>
  )
}