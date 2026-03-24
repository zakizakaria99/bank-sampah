"use client"

import {
  Package,
  Banknote,
  ArrowDownCircle,
  Wallet
} from "lucide-react"

interface Props {
  totalKasMasuk: number
  nilaiStok: number
  kasKeluar: number
  kasBersih: number
}

export default function LaporanCard({
  totalKasMasuk,
  nilaiStok,
  kasKeluar,
  kasBersih
}: Props) {

  const formatRupiah = (value: number) =>
    value.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

  return (

    <div className="space-y-6">

      {/* ================= NILAI STOK ================= */}
      <div className="bg-green-50 p-4 md:p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs md:text-sm text-gray-500">
              Nilai Stok Sampah
            </p>

            <p className="text-lg md:text-2xl font-bold text-green-700 mt-1">
              Rp {formatRupiah(nilaiStok)}
            </p>
          </div>

          <div className="bg-green-500 text-white p-2 md:p-3 rounded-xl">
            <Package size={18} />
          </div>

        </div>

      </div>

      {/* ================= CASH FLOW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* KAS MASUK */}
        <div className="bg-green-50 p-4 md:p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs md:text-sm text-gray-500">
                Kas Masuk
              </p>

              <p className="text-lg md:text-2xl font-bold text-green-700 mt-1">
                Rp {formatRupiah(totalKasMasuk)}
              </p>
            </div>

            <div className="bg-green-600 text-white p-2 md:p-3 rounded-xl">
              <Banknote size={18} />
            </div>

          </div>
        </div>

        {/* KAS KELUAR */}
        <div className="bg-red-50 p-4 md:p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs md:text-sm text-gray-500">
                Kas Keluar
              </p>

              <p className="text-lg md:text-2xl font-bold text-red-600 mt-1">
                Rp {formatRupiah(kasKeluar)}
              </p>

              <p className="text-xs text-red-400 mt-1">
                Penarikan nasabah & pengelola
              </p>
            </div>

            <div className="bg-red-500 text-white p-2 md:p-3 rounded-xl">
              <ArrowDownCircle size={18} />
            </div>

          </div>
        </div>

        {/* KAS BERSIH */}
        <div className="bg-emerald-50 p-4 md:p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs md:text-sm text-gray-500">
                Kas Bersih
              </p>

              <p className="text-lg md:text-2xl font-bold text-emerald-700 mt-1">
                Rp {formatRupiah(kasBersih)}
              </p>
            </div>

            <div className="bg-emerald-500 text-white p-2 md:p-3 rounded-xl">
              <Wallet size={18} />
            </div>

          </div>
        </div>

      </div>

    </div>

  )

}