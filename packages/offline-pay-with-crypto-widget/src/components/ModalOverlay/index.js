import * as React from 'react'
import { motion } from 'framer-motion'
import './index.css'

export const ModalOverlay = ({ onClick, children }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
