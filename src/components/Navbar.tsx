'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Hammer } from 'lucide-react'
import Link from 'next/link'
import { usePricingModal } from '@/context/PricingModalContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openModal } = usePricingModal()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#FF6600]/20 py-3 rounded-b-2xl'
        : 'bg-white py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF6600] flex items-center justify-center rounded-xl shadow-md">
            <Hammer className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold text-[#111111] uppercase tracking-tight">Reformas</span>
            <span className="text-xs font-bold text-[#FF6600] uppercase tracking-widest">Pro</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/servicios" className="text-sm font-bold uppercase text-[#111111] hover:text-[#FF6600] transition-colors">
            Servicios
          </Link>
          <Link href="/proceso" className="text-sm font-bold uppercase text-[#111111] hover:text-[#FF6600] transition-colors">
            Proceso
          </Link>
          <Link href="/contacto" className="text-sm font-bold uppercase text-[#111111] hover:text-[#FF6600] transition-colors">
            Contacto
          </Link>
        </div>

        <button
          onClick={() => openModal()}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6600] text-white font-bold uppercase text-sm tracking-wide rounded-xl hover:bg-[#E65100] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
        >
          Presupuesto IA
        </button>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#111111]">
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#FF6600]/30 mt-2 mx-4 rounded-2xl px-6 py-6 shadow-xl">
          <div className="flex flex-col gap-4">
            <Link href="/servicios" className="text-base font-bold uppercase text-[#111111] py-2 border-b border-[#d4d4d4]" onClick={() => setMobileOpen(false)}>
              Servicios
            </Link>
            <Link href="/proceso" className="text-base font-bold uppercase text-[#111111] py-2 border-b border-[#d4d4d4]" onClick={() => setMobileOpen(false)}>
              Proceso
            </Link>
            <Link href="/contacto" className="text-base font-bold uppercase text-[#111111] py-2 border-b border-[#d4d4d4]" onClick={() => setMobileOpen(false)}>
              Contacto
            </Link>
            <button
              onClick={() => { openModal(); setMobileOpen(false) }}
              className="mt-2 w-full px-5 py-3 bg-[#FF6600] text-white font-bold uppercase text-sm tracking-wide rounded-xl shadow-md"
            >
              Presupuesto IA
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
