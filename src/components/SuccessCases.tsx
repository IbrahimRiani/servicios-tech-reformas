'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const cases = [
  {
    title: 'Reforma integral',
    location: 'Madrid Centro',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Apartamento de 120m² completamente renovado',
  },
  {
    title: 'Pintura técnica',
    location: 'Barajas',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80',
    description: 'Vivienda de 90m² con pintura ecológica',
  },
  {
    title: 'Limpieza industrial',
    location: 'Paseo de la Castellana',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    description: 'Oficina corporativa de 500m²',
  },
  {
    title: 'Reforma baño',
    location: 'Chamberí',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    description: 'Baño completo con platos de ducha',
  },
]

export default function SuccessCases() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-block bg-[#FF6600] text-white px-4 py-2 rounded-full mb-4 text-xs font-bold uppercase tracking-widest">
            Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase">
            Trabajos Realizados
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#d4d4d4] hover:border-[#FF6600] rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1 mb-2 text-[#FF6600]">
                  <MapPin className="w-3 h-3" strokeWidth={3} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">{item.location}</p>
                </div>
                <h3 className="text-base font-extrabold text-[#111111] mb-2 uppercase group-hover:text-[#FF6600] transition-colors">{item.title}</h3>
                <p className="text-xs text-[#333333] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF6600] text-white font-bold uppercase text-sm tracking-wide rounded-xl hover:bg-[#E65100] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Solicitar Presupuesto <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </Link>
        </div>
      </div>
    </section>
  )
}
