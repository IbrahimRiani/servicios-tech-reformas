'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Casos de <span className="text-gradient">Éxito</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trabajos terminados por nuestro equipo de profesionales. Cada proyecto es único, cada resultado excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cases.map((item, index) => (
            <div 
              key={index}
              className="group glass rounded-3xl overflow-hidden hover:glow-hover transition-all duration-500"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent" />
              </div>
              
              <div className="p-6">
                <p className="text-blue-400 text-sm font-medium mb-2">{item.location}</p>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-transform"
          >
            Solicitar presupuesto <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}