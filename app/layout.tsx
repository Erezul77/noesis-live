// app/layout.tsx
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Noēsis',
  description: 'Recursive Collective Intelligence',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <nav className="w-full p-4 border-b border-gray-700 flex justify-center space-x-6 text-sm font-semibold text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/reflect" className="hover:text-white">Reflect</Link>
          <Link href="/feed" className="hover:text-white">Feed</Link>
          <Link href="/swarm" className="hover:text-white">Swarm</Link>
          <Link href="/constitution" className="hover:text-white">Constitution</Link>
          <Link href="/about" className="hover:text-white">About</Link>
        </nav>
        <main className="max-w-3xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  )
}
