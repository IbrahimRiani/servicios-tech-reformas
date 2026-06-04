'use client'

import { ArrowDown, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { usePricingModal } from '@/context/PricingModalContext'

const trustItems = [
  '+500 proyectos entregados',
  '5 años de garantía',
  'Equipo certificado',
]

export default function HeroParallax() {
  const { openModal } = usePricingModal()

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
          alt="Obra de reforma"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-[#E65100] text-white px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest">
              Servicio profesional
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.05] text-[#111111] uppercase">
              Reformas,<br />
              Pintura y<br />
              <span className="text-[#E65100]">Limpieza</span>
            </h1>
            <p className="text-lg text-[#333333] mb-8 max-w-md">
              Presupuesto con IA en 60 segundos. Equipo certificado, materiales de primera y garantía por escrito.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => openModal()}
                className="px-6 py-4 bg-[#E65100] text-white font-bold uppercase text-sm tracking-wide border-2 border-[#E65100] rounded-sm hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors"
              >
                Calcular presupuesto
              </button>
              <a 
                href="https://wa.me/34644702250"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#25D366] text-white font-bold uppercase text-sm tracking-wide border-2 border-[#25D366] rounded-sm hover:bg-[#128C7E] hover:border-[#128C7E] transition-colors text-center"
              >
                WhatsApp directo
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-[#F5F5F5] border-2 border-[#d4d4d4] p-6">
              <div className="text-xs font-bold uppercase text-[#E65100] mb-4 tracking-widest">Por qué elegirnos</div>
              <ul className="space-y-4">
                {trustItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 pb-4 border-b border-[#d4d4d4] last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-[#E65100] flex items-center justify-center flex-shrink-0 rounded-sm">
                      <CheckCircle className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                    <span className="font-bold text-[#111111] uppercase text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t-2 border-[#111111]">
                <div className="text-3xl font-extrabold text-[#111111]">+15</div>
                <div className="text-xs font-bold uppercase text-[#333333] tracking-wide">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
