"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"

type Props = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => Promise<void> | void
  onCancel: () => void
  variant?: "default" | "danger"
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  variant = "default"
}: Props) {

  const [loading, setLoading] = useState(false)

  // ESC to close
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onCancel])

  async function handleConfirm() {
    try {
      setLoading(true)
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          >

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2 rounded-lg ${
                  variant === "danger"
                    ? "bg-red-100 text-red-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <AlertTriangle size={18} />
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {title}
              </h2>
            </div>

            {/* MESSAGE */}
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {message}
            </p>

            {/* ACTION */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">

              <button
                onClick={onCancel}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm disabled:opacity-50"
              >
                Batal
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`px-4 py-2 rounded-xl text-white text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 ${
                  variant === "danger"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Memproses..." : "Ya, Lanjutkan"}
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}