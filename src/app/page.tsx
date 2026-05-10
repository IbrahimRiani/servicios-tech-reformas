'use client'

import Link from 'next/link'
import { Star, Award, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'
import HeroParallax from '@/components/HeroParallax'
import ServiceCards from '@/components/ServiceCards'
import SuccessCases from '@/components/SuccessCases'
import { usePricingModal } from '@/context/PricingModalContext'

const partners = [
  { name: 'BASF' },
  { name: 'Fischer' },
  { name: 'Bostik' },
  { name: 'Ceys' },
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

      <section className="py-24 px-6 border-y border-white/5">
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

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestro <span className="text-gradient">Proceso</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Tres pasos simples para transformar tu espacio. Sin complicaciones, sin sorpresas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCards />

      <SuccessCases />

      <section className="py-32 px-6 bg-gradient-to-b from-background to-blue-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="text-gray-400 text-xl mb-10">
            Únete a más de 500 clientes satisfechos que han transformado su hogar con nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => openModal()}
              className="px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
              Calcula tu presupuesto
            </button>
            <Link href="/proceso" className="px-8 py-5 glass text-white font-semibold rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
              Ver proceso
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-12 mt-20">
            <div>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-blue-400 text-blue-400" />
                ))}
              </div>
              <p className="text-gray-400">4.9/5 en Google</p>
            </div>
            <div>
              <Users className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-400">500+ clientes</p>
            </div>
            <div>
              <Award className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-400">5 años garantía</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-gradient">Reformas</span>
                <span className="text-white">Pro</span>
              </h3>
              <p className="text-gray-400">
                El futuro de las reformas llegó. Tecnología IA + calidad premium.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Servicios</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/servicios/reformas-integrales" className="hover:text-blue-400">Reformas Integrales</Link></li>
                <li><Link href="/servicios/pintura-tecnica" className="hover:text-blue-400">Pintura Técnica</Link></li>
                <li><Link href="/servicios/limpieza-industrial" className="hover:text-blue-400">Limpieza Profesional</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/proceso" className="hover:text-blue-400">Proceso</Link></li>
                <li><Link href="/contacto" className="hover:text-blue-400">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/aviso-legal" className="hover:text-blue-400">Aviso Legal</Link></li>
                <li><Link href="/privacidad" className="hover:text-blue-400">Política de Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-500">© 2024 ReformasPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}