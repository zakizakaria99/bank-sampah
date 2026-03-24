"use client"

import { ArrowDownCircle } from "lucide-react"
import { motion } from "framer-motion"

type Props = {
  jumlahTarik: string
  setJumlahTarik: (v: string) => void
  openModal: () => void
}

export default function TarikSaldoForm({
  jumlahTarik,
  setJumlahTarik,
  openModal
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 md:p-6 rounded-2xl mb-6 border border-gray-200 shadow-sm"
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
        <div className="bg-green-100 text-green-600 p-2 rounded-lg">
          <ArrowDownCircle className="w-5 h-5" />
        </div>

        <h2 className="text-sm md:text-lg lg:text-xl">
          Tarik Saldo
        </h2>
      </div>

      {/* FORM */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="number"
          placeholder="Masukkan jumlah tarik"
          className="
            w-full 
            border border-gray-300 
            rounded-lg 
            px-4 py-3 
            text-sm md:text-base 
            focus:ring-2 focus:ring-green-500 
            focus:border-green-500 
            outline-none
            transition
          "
          value={jumlahTarik}
          onChange={(e) => setJumlahTarik(e.target.value)}
        />

        <button
          type="button"
          onClick={openModal}
          className="
            bg-green-600 
            hover:bg-green-700 
            text-white 
            px-6 py-3 
            rounded-lg 
            text-sm md:text-base 
            transition 
            active:scale-95
            shadow-sm
          "
        >
          Tarik
        </button>
      </div>
    </motion.div>
  )
}