'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import octo from '@/public/octopus.png'

export default function OctopusCreature() {
  const controls = useAnimation()

  useEffect(() => {
    const loop = async () => {
      while (true) {
        await controls.start({
          rotate: [0, 2, -2, 0],
          transition: { duration: 4, repeat: 0 }
        })
      }
    }

    loop()
  }, [controls])

  return (
    <motion.div
      animate={controls}
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
      style={{
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        zIndex: 50,
        width: '120px',
        opacity: 0.8,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
          transition: { duration: 6, repeat: Infinity },
        }}
      >
        <Image
          src={octo}
          alt="Zen Octopus"
          width={120}
          height={120}
          priority
        />
      </motion.div>
    </motion.div>
  )
}
