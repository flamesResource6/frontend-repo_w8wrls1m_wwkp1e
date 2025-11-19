import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const hide = () => setHidden(true)
    const timer = setTimeout(hide, 3000)
    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', hide)
    }
  }, [])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center select-none"
        >
          <div className="text-xs text-[#2C5F4D]/80 mb-2">
            Scroll to see psychology in action
          </div>
          <div className="relative h-16 flex flex-col items-center">
            <div className="w-px h-14 bg-[#2C5F4D]/60" />
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#2C5F4D] mt-1"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
