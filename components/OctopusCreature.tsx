'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import octo from '@/public/octopus.png'

export default function OctopusCreature() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      rotate: [0, 2, -2, 2, -1, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    })
  }, [controls])

  return (
    <div className="flex justify-center mt-20">
      <motion.div animate={controls} className="w-48 h-48">
        <Image
          src={octo}
          alt="Noēsis Zen Octopus"
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </div>
  )
}
