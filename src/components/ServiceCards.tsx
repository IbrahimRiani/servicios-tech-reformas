'use client'

import { useState } from 'react'
import { Hammer, Palette, Droplets, CheckCircle, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

interface ServiceCard {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  price: string
  slug: string
  stat: string
}

const services: ServiceCard[] = [
  {
    title: 'Reformas Integrales',
    description: 'Transformación completa de tu espacio con materiales premium y ejecución impecable.',
    icon: <Hammer className="w-8 h-8 text-blue-400" />,
    features: ['Diseño 3D incluido', 'Materiales de primera', 'Equipo especializado', 'Garantía 5 años'],
    price: 'Desde 8.500€',
    slug: 'reformas-integrales',
    stat: '150+ proyectos',
  },
  {
    title: 'Pintura Técnica',
    description: 'Acabados profesionales con pinturas ecológicas y técnicas avanzadas de aplicación.',
    icon: <Palette className="w-8 h-8 text-blue-400" />,
    features: ['Pinturas ecológicas', 'Acabados mate/satinado', 'Técnica airless', 'Sin olores'],
    price: 'Desde 450€',
    slug: 'pintura-tecnica',
    stat: '500+ fachadas',
  },
  {
    title: 'Limpieza Industrial',
    description: 'Servicios de limpieza profesional para comunidades, oficinas y espacios comerciales.',
    icon: <Droplets className="w-8 h-8 text-blue-400" />,
    features: ['Equipos industriales', 'Productos biodegradables', 'Personal cualificado', 'Disponibilidad 24h'],
    price: 'Desde 90€/mes',
    slug: 'limpieza-industrial',
    stat: '80+ empresas',
  },
]

const stats = [
  { label: 'Proyectos completados', value: '500+', icon: <CheckCircle className="w-5 h-5" /> },
  { label: 'Tiempo medio', value: '12 días', icon: <Clock className="w-5 h-5" /> },
  { label: 'Garantía', value: '5 años', icon: <Shield className="w-5 h-5" /> },
]

export default function ServiceCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
           Nuestros <span className="text-gradient">Servicios</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Soluciones integrales para cada necesidad. Calidad premium con precios transparentes.
          </p>
        </div>

        <div className="bento-grid">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className={`relative p-8 rounded-3xl glass transition-all duration-500 cursor-pointer group ${hoveredIndex === index ? 'glow-hover' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <div className="absolute inset-0 rounded-3xl bg-blue-500/5" />
              )}

              <div className="relative z-10">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gradient transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-blue-400 font-bold text-lg">{service.price}</p>
                    <p className="text-gray-500 text-sm">{service.stat}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-3 text-blue-400">{stat.icon}</div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}