import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/navbar'

const albertSans = localFont({
  src: '../public/fonts/AlbertSans-VariableFont_wght.ttf',
  variable: '--font-albert-sans',
  display: 'swap',
})

const playwrite = localFont({
  src: '../public/fonts/PlaywriteAUNSW-VariableFont_wght.ttf',
  variable: '--font-playwrite',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Love Demonstration',
  description: 'A beautiful love story website',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${albertSans.variable} ${playwrite.variable}`}>
      <body className="font-albert-sans bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
