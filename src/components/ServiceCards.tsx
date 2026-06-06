'use client'

import { Hammer, Palette, Brush, CheckCircle, Clock, Shield } from 'lucide-react'
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
    icon: <Hammer className="w-7 h-7 text-white" strokeWidth={2.5} />,
    features: ['Diseño 3D incluido', 'Materiales de primera', 'Equipo especializado', 'Garantía 5 años'],
    price: 'Desde 8.500€',
    slug: 'reformas-integrales',
    stat: '150+ proyectos',
  },
  {
    title: 'Pintura Técnica',
    description: 'Acabados profesionales con pinturas ecológicas y técnicas avanzadas de aplicación.',
    icon: <Palette className="w-7 h-7 text-white" strokeWidth={2.5} />,
    features: ['Pinturas ecológicas', 'Acabados mate/satinado', 'Técnica airless', 'Sin olores'],
    price: 'Desde 450€',
    slug: 'pintura-tecnica',
    stat: '500+ fachadas',
  },
  {
    title: 'Limpieza Profesional',
    description: 'Servicios de limpieza profesional para comunidades, oficinas y espacios comerciales.',
    icon: <Brush className="w-7 h-7 text-white" strokeWidth={2.5} />,
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
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-block bg-[#FF6600] text-white px-4 py-2 rounded-full mb-4 text-xs font-bold uppercase tracking-widest">
            Catálogo
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase">
            Nuestros Servicios
          </h2>
        </div>

        <div className="bento-grid">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className="group relative bg-white border border-[#d4d4d4] hover:border-[#FF6600] rounded-2xl transition-all duration-300 p-6 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#F5F5F5]">
                <div className="w-12 h-12 bg-[#FF6600] flex items-center justify-center rounded-xl shadow-md">
                  {service.icon}
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-[#333333] tracking-widest">{service.stat}</p>
                </div>
              </div>

              <h3 className="text-xl font-extrabold mb-3 text-[#111111] uppercase group-hover:text-[#FF6600] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-[#333333] mb-5 leading-relaxed">{service.description}</p>

              <ul className="space-y-2 mb-5">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#111111]">
                    <CheckCircle className="w-4 h-4 text-[#FF6600] flex-shrink-0" strokeWidth={3} />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#F5F5F5] flex items-center justify-between">
                <p className="text-base font-extrabold text-[#FF6600] uppercase">{service.price}</p>
                <span className="text-xs font-bold uppercase text-[#111111] group-hover:text-[#FF6600] transition-colors">
                  Ver más →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-[#d4d4d4] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-3 text-[#FF6600]">{stat.icon}</div>
              <p className="text-3xl font-extrabold text-[#111111] mb-1 uppercase">{stat.value}</p>
              <p className="text-xs font-bold uppercase text-[#333333] tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
