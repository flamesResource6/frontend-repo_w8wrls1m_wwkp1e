import { useEffect, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import DataTicker from './DataTicker'
import ScrollIndicator from './ScrollIndicator'

const lines = [
  'We Engineer',
  'Attention,',
  'Emotion,',
  'Action.'
]

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  const networkScale = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const networkY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7])

  // Subtle mouse parallax for the 3D area
  const mouseParallax = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.3
      const y = (e.clientY / window.innerHeight - 0.5) * 0.3
      mouseParallax.current = { x, y }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const gradientId = useMemo(() => `grad-${Math.random().toString(36).slice(2)}`,[ ])

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#1A1A1A] text-white">
      {/* Fluid background gradient mesh with noise overlay */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" aria-hidden>
          <defs>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
              <feColorMatrix type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.05"/>
              </feComponentTransfer>
            </filter>
            <radialGradient id={gradientId} cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#2C5F4D" stopOpacity="0.5"/>
              <stop offset="60%" stopColor="#1A1A1A" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#0f0f0f" stopOpacity="1"/>
            </radialGradient>
          </defs>
          <motion.rect
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            fill={`url(#${gradientId})`}
            animate={{ x: ['-2%', '0%', '2%', '0%'], y: ['-1%', '1%', '-1%', '0%'] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
          />
          <rect x="0" y="0" width="100%" height="100%" filter="url(#noise)"/>
        </svg>
      </motion.div>

      {/* Spline 3D cover on right side */}
      <motion.div style={{ scale: networkScale, y: networkY }} className="absolute right-0 top-0 h-screen w-[60%]">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      {/* Content left-aligned */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="pl-[6vw] pr-[6vw] w-[55%]">
          <div className="max-w-xl">
            <div aria-label="Headline" className="select-none">
              {lines.map((text, i) => (
                <motion.h1
                  key={text}
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.8, ease: 'easeOut' }}
                  className="font-[\'Playfair Display\',serif] text-[64px] leading-[1.1] tracking-[-0.02em] text-[#FAFAFA]"
                  style={{ fontFamily: 'Playfair Display, ui-serif, Georgia, Cambria, Times New Roman, Times, serif' }}
                >
                  {text}
                </motion.h1>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: lines.length * 0.8 + 1.2, duration: 0.6 }}
              className="mt-6 text-[18px] leading-[1.6] text-[#999999] max-w-[60ch]"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
            >
              Psychology-driven design for brands that demand measurable results.
            </motion.p>

            <div className="mt-10">
              <DataTicker />
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: lines.length * 0.8 + 1.8, duration: 0.6 }}
              className="mt-14 inline-flex items-center bg-[#2C5F4D] text-white text-[16px] font-medium px-9 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(44,95,77,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              Explore The Framework →
            </motion.button>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
