// app/layout.tsx
import './globals.css'
// Make sure the file exists at ../components/Navbar.tsx or ../components/Navbar.jsx
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

export const metadata = {
  title: 'Noēsis',
  description: 'Recursive intelligence mirror',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
