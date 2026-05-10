'use client'

import { ArrowDown, Sparkles, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { usePricingModal } from '@/context/PricingModalContext'

const trustItems = [
  '500+ proyectos entregados',
  '5 años de garantía',
  'Expertos certificado',
]

export default function HeroParallax() {
  const { openModal } = usePricingModal()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Reforma terminada"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-[#030712]/70 to-[#030712]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="mb-8 flex justify-center gap-4">
          {trustItems.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              {item}
            </span>
          ))}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="text-white">El futuro de las</span>
          <br />
          <span className="text-gradient">reformas llegó</span>
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Consigue tu presupuesto en segundos. Inteligencia artificial + profesionales certificados para transformar tu hogar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => openModal()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Calcular presupuesto
          </button>
          <a 
            href="/servicios"
            className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
          >
            Ver servicios
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <ArrowDown className="w-6 h-6 text-blue-400" />
      </div>
    </section>
  )
}