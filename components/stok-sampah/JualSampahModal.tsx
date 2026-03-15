"use client"

import { useState } from "react"
import { createPenjualan } from "@/services/stokSampahService"
import { StokSampah } from "@/types/stokSampah"

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
  const [displayHarga, setDisplayHarga] = useState<{ [key:number]: string }>({})
const formatNumber = (value: string) => {
  const number = value.replace(/\D/g, "")
  return new Intl.NumberFormat("id-ID").format(Number(number))
}

const parseNumber = (value: string) => {
  return Number(value.replace(/\D/g, ""))
}
  if (!open) return null

  const tambahItem = () => {
    setItems([
      ...items,
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

      const selected = stokData.find(
        s => s.jenis_sampah_id === value
      )

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
    setItems(items.filter((_, i) => i !== index))
  }

  const totalPenjualan = items.reduce((sum, i) => {
    return sum + (i.berat * i.harga_jual)
  }, 0)

  const totalNilaiBeli = items.reduce((sum, i) => {
    return sum + (i.berat * i.harga_nasabah)
  }, 0)

  const labaRugi = totalPenjualan - totalNilaiBeli


  const validasiStok = () => {

    for (const item of items) {

      const stokItem = stokData.find(
        s => s.jenis_sampah_id === item.jenis_sampah_id
      )

      if (!stokItem) continue

      if (item.berat > stokItem.stok) {

        alert(
          `Stok ${stokItem.nama_sampah} tidak cukup.
Stok tersedia ${stokItem.stok} kg`
        )

        return false
      }

    }

    return true
  }


  const handleSubmit = async () => {

    if (items.length === 0) return

    if (items.some(i => i.berat <= 0 || i.harga_jual <= 0)) {
      alert("Berat dan harga jual harus lebih dari 0")
      return
    }

    if (!validasiStok()) return

    try {

      setLoading(true)

      await createPenjualan(items)

      setItems([])

      onSuccess()

      onClose()

    } catch (err) {

      alert("Gagal menyimpan penjualan")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-[900px] rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-4">
          Jual Sampah
        </h2>

        <table className="w-full text-sm">

          <thead className="bg-green-100">
            <tr>
              <th className="p-2">Jenis Sampah</th>
              <th className="p-2">Berat (kg)</th>
              <th className="p-2">Harga Jual / kg</th>
              <th className="p-2">Total</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>

            {items.map((item, index) => {

              const total = item.berat * item.harga_jual

              return (

                <tr key={index} className="border-t">

                  <td className="p-2">

                    <input
                      list={`sampah-${index}`}
                      className="border p-1 w-full"
                      placeholder="Ketik nama sampah"
                      value={item.nama_sampah}
                      onChange={(e) => {

                        const selected = stokData.find(
                          s => s.nama_sampah.toLowerCase() === e.target.value.toLowerCase()
                        )

                        if (selected) {

                          updateItem(index, "jenis_sampah_id", selected.jenis_sampah_id)

                        } else {

                          const newItems = [...items]
                          newItems[index].nama_sampah = e.target.value
                          setItems(newItems)

                        }

                      }}
                    />

                    <datalist id={`sampah-${index}`}>

                      {stokData.map((s) => (

                        <option
                          key={s.jenis_sampah_id}
                          value={s.nama_sampah}
                        >
                          {s.nama_sampah} (stok {s.stok} kg)
                        </option>

                      ))}

                    </datalist>

                  </td>

                  <td className="p-2">

                    <input
                      type="number"
                      className="border p-1 w-full"
                      value={item.berat || ""}
                      onChange={(e) =>
                        updateItem(index, "berat", e.target.value)
                      }
                    />

                  </td>

                  <td className="p-2">

                    <div className="flex items-center border px-2 rounded">

  <span className="text-gray-500 mr-1">Rp</span>

  <input
    type="text"
    className="p-1 w-full outline-none"
    value={displayHarga[index] ?? ""}
    onChange={(e) => {

      const raw = e.target.value.replace(/\D/g, "")

      setDisplayHarga({
        ...displayHarga,
        [index]: formatNumber(raw)
      })

      updateItem(index, "harga_jual", parseNumber(raw))

    }}
  />

</div>

                  </td>

                  <td className="p-2">
                    Rp {total.toLocaleString("id-ID")}
                  </td>

                  <td className="p-2">

                    <button
                      onClick={() => hapusItem(index)}
                      className="text-red-500"
                    >
                      Hapus
                    </button>

                  </td>

                </tr>

              )
            })}

          </tbody>

        </table>

        <button
          onClick={tambahItem}
          className="mt-3 text-green-600"
        >
          + Tambah Jenis Sampah
        </button>

        <div className="mt-6 border-t pt-4 text-sm space-y-1">

          <div>
            Total Penjualan : <b>Rp {totalPenjualan.toLocaleString("id-ID")}</b>
          </div>

          

          <div>
            Laba / Rugi :{" "}
            <b className={labaRugi >= 0 ? "text-green-600" : "text-red-600"}>
              Rp {labaRugi.toLocaleString("id-ID")}
            </b>
          </div>

        </div>

        <div className="flex justify-end gap-2 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>

        </div>

      </div>

    </div>

  )
}