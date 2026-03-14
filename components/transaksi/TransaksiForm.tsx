"use client"

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

  return (

    <div className="mb-6">

      <label className="block mb-2 font-semibold">
        Nama Nasabah
      </label>

      <input
        list="nasabah-list"
        className="border border-green-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Ketik nama nasabah..."
        value={nasabahId}
        onChange={(e) => setNasabahId(e.target.value)}
      />

      <datalist id="nasabah-list">

        {nasabah.map((n) => (

          <option
            key={n.id}
            value={n.nama}
          />

        ))}

      </datalist>

    </div>

  )

}