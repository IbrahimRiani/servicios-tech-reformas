'use client'

import { Upload, ArrowDown, CheckCircle, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import { usePricingModal } from '@/context/PricingModalContext'

const trustItems = [
  '+500 proyectos entregados',
  '5 años de garantía',
  'Equipo certificado',
]

export default function HeroParallax() {
  const { openModal } = usePricingModal()

  const handleUpload = () => {
    openModal()
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
          alt="Obra de reforma"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-24 md:py-20">
        <div className="text-center mb-10 md:mb-8">
          <div className="inline-block bg-[#E65100] text-white px-3 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest">
            Presupuesto instantáneo con IA
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] text-[#111111] uppercase max-w-5xl mx-auto">
            ¿Quieres <span className="text-[#FF6600]">pintar</span>, <span className="text-[#FF6600]">alisar</span> o <span className="text-[#FF6600]">renovar</span> tu casa?<br />
            <span className="text-[#111111] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Sube una foto y nuestra IA calcula lo que necesitas en <span className="text-[#FF6600]">30 segundos</span>.</span>
          </h1>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <button 
            onClick={handleUpload}
            className="group w-full px-8 py-6 md:py-8 bg-[#FF6600] border-4 border-[#111111] text-white font-extrabold uppercase text-lg md:text-2xl tracking-wide hover:bg-[#E65100] transition-colors flex items-center justify-center gap-3 md:gap-4 shadow-[6px_6px_0_0_#111111] hover:shadow-[8px_8px_0_0_#111111] hover:-translate-x-1 hover:-translate-y-1"
          >
            <Upload className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />
            <span>SUBE TU FOTO Y CALCULA</span>
          </button>
          
          <p className="text-center text-[#333333] text-sm md:text-base mt-4 font-bold uppercase tracking-wide">
            ✓ Sin compromiso &nbsp; ✓ 100% gratis &nbsp; ✓ Resultado en 30s
          </p>
        </div>

        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="bg-white border-2 border-[#111111] p-6">
            <div className="text-xs font-bold uppercase text-[#E65100] mb-4 tracking-widest text-center">Por qué elegirnos</div>
            <div className="grid grid-cols-3 gap-0">
              {trustItems.map((item, i) => (
                <div key={i} className={`flex items-center justify-center gap-3 ${i !== 2 ? 'border-r-2 border-[#d4d4d4]' : ''}`}>
                  <div className="w-10 h-10 bg-[#E65100] flex items-center justify-center flex-shrink-0 rounded-sm">
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
            <span key={i} className="flex items-center gap-1 text-xs font-bold text-[#111111] bg-white border-2 border-[#d4d4d4] px-3 py-1.5 uppercase">
              <CheckCircle className="w-3 h-3 text-[#E65100]" strokeWidth={3} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
