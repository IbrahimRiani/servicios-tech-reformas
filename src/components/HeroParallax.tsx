'use client'

import { useEffect, useRef, useState } from 'react'
import { Upload, CheckCircle, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import { usePricingModal } from '@/context/PricingModalContext'

const trustItems = [
  '+500 proyectos entregados',
  '5 años de garantía',
  'Equipo certificado',
]

export default function HeroParallax() {
  const { openModal } = usePricingModal()
  const bgRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.05)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleUpload = () => {
    openModal()
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85"
          alt="Obra de reforma"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-24 md:py-20">
        <div className="text-center mb-10 md:mb-8">
          <div className="inline-block bg-[#FF6600] text-white px-5 py-2 rounded-full mb-5 text-xs font-bold uppercase tracking-widest shadow-lg">
            Presupuesto instantáneo con IA
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] text-[#111111] max-w-5xl mx-auto">
            Consigue el <span className="text-[#FF6600]">diagnóstico técnico</span> y <span className="text-[#FF6600]">presupuesto estimado</span><br />
            <span className="text-[#111111] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">de tu reforma en <span className="text-[#FF6600]">2 minutos</span> con IA</span>
          </h1>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <button
            onClick={handleUpload}
            className="group w-full px-8 py-6 md:py-8 bg-[#FF6600] text-white font-extrabold uppercase text-lg md:text-2xl tracking-wide rounded-2xl hover:bg-[#E65100] transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 shadow-2xl hover:shadow-[#FF6600]/50 hover:scale-[1.02]"
          >
            <Upload className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />
            <span>SUBE TU FOTO Y CALCULA</span>
          </button>

          <p className="text-center text-[#333333] text-sm md:text-base mt-4 font-bold uppercase tracking-wide">
            ✓ Sin compromiso &nbsp; ✓ 100% gratis &nbsp; ✓ Resultado en 30s
          </p>
        </div>

        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-xl">
            <div className="text-xs font-bold uppercase text-[#FF6600] mb-4 tracking-widest text-center">Por qué elegirnos</div>
            <div className="grid grid-cols-3 gap-0">
              {trustItems.map((item, i) => (
                <div key={i} className={`flex items-center justify-center gap-3 ${i !== 2 ? 'border-r border-[#d4d4d4]' : ''}`}>
                  <div className="w-10 h-10 bg-[#FF6600] flex items-center justify-center flex-shrink-0 rounded-xl shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <span className="font-extrabold text-[#111111] uppercase text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-wrap items-center justify-center gap-2 mt-6">
          {trustItems.map((item, i) => (
            <span key={i} className="flex items-center gap-1 text-xs font-bold text-[#111111] bg-white/90 backdrop-blur-sm border border-white/40 px-3 py-1.5 uppercase rounded-full">
              <CheckCircle className="w-3 h-3 text-[#FF6600]" strokeWidth={3} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
