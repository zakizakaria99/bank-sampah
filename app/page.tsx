"use client"

import Link from "next/link"

export default function Home() {

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="grid grid-cols-2 gap-6">

        <Link href="/nasabah">
          <div className="bg-green-600 text-white p-10 rounded-xl cursor-pointer text-center text-xl font-bold hover:bg-green-700">
            Nasabah
          </div>
        </Link>

        <Link href="/jenis-sampah">
          <div className="bg-blue-600 text-white p-10 rounded-xl cursor-pointer text-center text-xl font-bold hover:bg-blue-700">
            Jenis Sampah
          </div>
        </Link>

        <Link href="/transaksi">
          <div className="bg-purple-600 text-white p-10 rounded-xl cursor-pointer text-center text-xl font-bold hover:bg-purple-700">
            Transaksi
          </div>
        </Link>

        <Link href="/laporan">
          <div className="bg-orange-600 text-white p-10 rounded-xl cursor-pointer text-center text-xl font-bold hover:bg-orange-700">
            Laporan
          </div>
        </Link>

        <Link href="/stok-sampah">
          <div className="bg-gray-600 text-white p-10 rounded-xl cursor-pointer text-center text-xl font-bold hover:bg-gray-700">
            Stok Sampah
          </div>
        </Link>

        <Link href="/grafik">
          <div className="bg-violet-600 text-white p-10 rounded-xl cursor-pointer text-center text-xl font-bold hover:bg-violet-700">
             Grafik
          </div>
        </Link>

      </div>

    </div>
  )
}