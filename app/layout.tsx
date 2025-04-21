import './globals.css'
import { ReactNode } from 'react'
import OctopusCreature from '@/components/OctopusCreature'

export const metadata = {
  title: 'Noēsis',
  description: 'Decentralized Swarm Intelligence',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden min-h-screen bg-white text-black">
        {children}
        <OctopusCreature />
      </body>
    </html>
  )
}
