'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Streaming', href: '/streaming' },
  { label: 'Ministerios', href: '/ministerios' },
  { label: 'Donaciones', href: '/donaciones' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-5">
        <Link href="/" className="text-2xl font-bold font-serif text-primary">
          Iglesia Príncipe de Paz
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-x-8">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? 'text-secondary font-bold border-b-2 border-secondary pb-1 transition-all duration-300'
                    : 'text-slate-700 font-medium hover:text-secondary transition-all duration-300'
                }
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/nuevo-visitante"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            ¿Primera vez?
          </Link>
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-outline-variant/20 px-8 py-6 space-y-4">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={isActive ? 'block text-secondary font-bold py-1' : 'block text-on-surface font-medium hover:text-secondary transition-colors py-1'}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
