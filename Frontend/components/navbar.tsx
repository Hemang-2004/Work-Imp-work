'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Virtual Tour of my Heart', href: '/virtual-tour' },
    { name: 'Trip to Memory Lane', href: '/memory-lane' },
    { name: 'What to do now', href: '/scribble-pad' },
    { name: "Hemang's mistake counter", href: '/mistake-counter' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/20 border-b border-white/30 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl hover:scale-110 transition-transform duration-300">
            💕
          </Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-rose-500 text-white shadow-lg'
                    : 'text-rose-600 hover:bg-rose-100 hover:text-rose-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
