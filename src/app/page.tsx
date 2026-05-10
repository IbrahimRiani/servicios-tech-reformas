'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Star, Award, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'
import HeroParallax from '@/components/HeroParallax'
import ServiceCards from '@/components/ServiceCards'
import { usePricingModal } from '@/context/PricingModalContext'

const partners = [
  { name: 'BASF', logo: '/logos/basf.svg' },
  { name: 'Fischer', logo: '/logos/fischer.svg' },
  { name: 'Bostik', logo: '/logos/bostik.svg' },
  { name: 'Ceys', logo: '/logos/ceys.svg' },
]

const processSteps = [
  {
    step: 1,
    title: 'Diagnóstico IA',
    description: 'Sube una foto y nuestra IA analiza el estado actual del espacio.',
    icon: '🔍',
  },
  {
    step: 2,
    title: 'Presupuesto Instantáneo',
    description: 'Recibe una estimación detallada en menos de 60 segundos.',
    icon: '⚡',
  },
  {
    step: 3,
    title: 'Ejecución Premium',
    description: 'Nuestro equipo ejecuta el proyecto con garantía de calidad.',
    icon: '🎯',
  },
]

export default function Home() {
  const { openModal } = usePricingModal()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <HeroParallax />

      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale">
            {partners.map((partner) => (
              <div key={partner.name} className="text-xl font-bold text-gray-500">
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestro <span className="text-gradient">Proceso</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tres pasos simples para transformar tu espacio. Sin complicaciones, sin sorpresas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-blue-500/50 to-transparent group-hover:from-blue-500 transition-colors" />
                <div className="glass p-8 rounded-3xl hover:glow-hover transition-all duration-300 ml-4">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCards />

      <section className="py-24 px-6 bg-gradient-to-b from-background to-blue-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Únete a más de 500 clientes satisfechos que han transformado su hogar con nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openModal()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-110 transition-transform"
            >
              Calcula tu presupuesto
            </button>
            <Link href="/proceso" className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
              Ver proceso
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16">
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-blue-400 text-blue-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">4.9/5 en Google</p>
            </div>
            <div>
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">500+ clientes</p>
            </div>
            <div>
              <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">5 años garantía</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-gradient">Reformas</span>
                <span className="text-white">Pro</span>
              </h3>
              <p className="text-gray-400 text-sm">
                El futuro de las reformas llegó. Tecnología IA + calidad premium.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Servicios</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/servicios/reformas-integrales" className="hover:text-blue-400">Reformas Integrales</Link></li>
                <li><Link href="/servicios/pintura-tecnica" className="hover:text-blue-400">Pintura Técnica</Link></li>
                <li><Link href="/servicios/limpieza-industrial" className="hover:text-blue-400">Limpieza Industrial</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/proceso" className="hover:text-blue-400">Proceso</Link></li>
                <li><Link href="/contacto" className="hover:text-blue-400">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/aviso-legal" className="hover:text-blue-400">Aviso Legal</Link></li>
                <li><Link href="/privacidad" className="hover:text-blue-400">Política de Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-500 text-sm">© 2024 ReformasPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}