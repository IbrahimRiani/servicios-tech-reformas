'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Menu, X } from 'lucide-react'
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-gradient">Reformas</span>
          <span className="text-white">Pro</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/servicios" className="text-white font-medium drop-shadow-md hover:text-blue-300 transition-colors">
            Servicios
          </Link>
          <Link href="/proceso" className="text-white font-medium drop-shadow-md hover:text-blue-300 transition-colors">
            Proceso
          </Link>
          <Link href="/contacto" className="text-white font-medium drop-shadow-md hover:text-blue-300 transition-colors">
            Contacto
          </Link>
        </div>

        <button 
          onClick={() => openModal()}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 glow-hover"
        >
          <Sparkles className="w-4 h-4" />
          Presupuesto IA
        </button>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-6 rounded-2xl p-6">
          <div className="flex flex-col gap-4">
            <Link href="/servicios" className="text-white font-medium">
              Servicios
            </Link>
            <Link href="/proceso" className="text-white font-medium">
              Proceso
            </Link>
            <Link href="/contacto" className="text-white font-medium">
              Contacto
            </Link>
            <button 
              onClick={() => openModal()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              Presupuesto IA
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}