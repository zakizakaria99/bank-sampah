"use client"

import { motion } from "framer-motion"

interface Props {
  title: string
  value: string | number
  color: string
}

export default function StatCard({ title, value, color }: Props) {

  return (

    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`${color} text-white p-6 rounded-xl shadow`}
    >

      <h2 className="text-lg font-semibold mb-2">
        {title}
      </h2>

      <p className="text-2xl font-bold">
        {value}
      </p>

    </motion.div>

  )
}