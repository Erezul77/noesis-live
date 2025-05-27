// components/Navbar.tsx
'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="p-4 bg-black text-white border-b border-gray-700">
      <ul className="flex space-x-4 justify-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/reflect">Reflect</Link></li>
        <li><Link href="/feed">Feed</Link></li>
      </ul>
    </nav>
  )
}
