"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface Props {
  title: string
  value: string | number
  icon?: LucideIcon // tetap ada (biar tidak breaking)
  color?: string
}

export default function StatCard({
  title,
  value,
  color = "bg-green-500"
}: Props) {

  return (

    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`${color} rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-md transition text-white`}
    >

      <div className="leading-tight">

        <p className="text-xs md:text-sm opacity-80 mb-1">
          {title}
        </p>

        <h2 className="text-base md:text-2xl font-bold">
          {value}
        </h2>

      </div>

    </motion.div>

  )
}