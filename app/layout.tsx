import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Noesis',
  description: 'Reflect. Connect. Evolve.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} bg-white text-black`}>
        {children}
        <div className="fixed bottom-4 right-4 opacity-80">
          <img src="/zen-octopus.png" alt="Zen Octopus" className="w-20 animate-pulse" />
        </div>
      </body>
    </html>
  )
}