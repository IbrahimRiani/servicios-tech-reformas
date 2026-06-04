'use client'

import Link from 'next/link'
import { Star, Award, Users, Hammer, HardHat, Wrench } from 'lucide-react'
import Navbar from '@/components/Navbar'
import HeroParallax from '@/components/HeroParallax'
import ServiceCards from '@/components/ServiceCards'
import SuccessCases from '@/components/SuccessCases'
import { usePricingModal } from '@/context/PricingModalContext'

const partners = [
  { name: 'BASF' },
  { name: 'FISCHER' },
  { name: 'BOSTIK' },
  { name: 'CEYS' },
  { name: 'SIKA' },
  { name: 'BEISSIER' },
]

const processSteps = [
  {
    step: 1,
    title: 'Diagnóstico Inicial',
    description: 'Visitas técnicas sin compromiso. Evaluamos el estado actual del espacio y tus necesidades.',
    icon: <HardHat className="w-7 h-7 text-white" strokeWidth={2.5} />,
  },
  {
    step: 2,
    title: 'Presupuesto Detallado',
    description: 'Recibe un presupuesto cerrado por escrito, sin sorpresas ni costes ocultos.',
    icon: <Wrench className="w-7 h-7 text-white" strokeWidth={2.5} />,
  },
  {
    step: 3,
    title: 'Ejecución Profesional',
    description: 'Equipo certificado, materiales de primera y seguimiento diario de la obra.',
    icon: <Hammer className="w-7 h-7 text-white" strokeWidth={2.5} />,
  },
]

export default function Home() {
  const { openModal } = usePricingModal()

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <HeroParallax />

      <section className="py-10 px-6 bg-[#F5F5F5] border-y-2 border-[#d4d4d4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 text-[10px] font-bold uppercase text-[#333333] tracking-widest">
            Trabajamos con las mejores marcas del sector
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div key={partner.name} className="text-lg md:text-xl font-extrabold text-[#333333] tracking-widest uppercase">
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b-2 border-[#111111] pb-6">
            <div className="text-xs font-bold uppercase text-[#E65100] mb-2 tracking-widest">Cómo trabajamos</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase">
              Nuestro Proceso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-[#111111]">
            {processSteps.map((item, index) => (
              <div key={index} className={`bg-white p-8 ${index !== 2 ? 'border-b-2 md:border-b-0 md:border-r-2 border-[#111111]' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#E65100] flex items-center justify-center rounded-sm">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-extrabold text-[#E65100]">0{item.step}</div>
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-[#111111] uppercase">{item.title}</h3>
                <p className="text-sm text-[#333333] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCards />

      <SuccessCases />

      <section className="py-16 md:py-20 px-4 md:px-6 bg-[#111111] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-[#E65100] text-white px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest">
            Empieza hoy
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 uppercase">
            ¿Listo para empezar tu reforma?
          </h2>
          <p className="text-base md:text-lg text-[#cccccc] mb-10 max-w-2xl mx-auto">
            Más de 500 clientes han transformado su hogar con nosotros. Calidad certificada, garantía por escrito.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => openModal()}
              className="px-8 py-4 bg-[#E65100] border-2 border-[#E65100] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors"
            >
              Calcula tu presupuesto
            </button>
            <Link href="/proceso" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase text-sm tracking-wide hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center">
              Ver proceso
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-12 mt-12 pt-12 border-t-2 border-[#E65100]">
            <div>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E65100] text-[#E65100]" />
                ))}
              </div>
              <p className="text-xs font-bold uppercase text-white tracking-wider">4.9/5 Google</p>
            </div>
            <div>
              <Users className="w-8 h-8 text-[#E65100] mx-auto mb-3" strokeWidth={2.5} />
              <p className="text-xs font-bold uppercase text-white tracking-wider">500+ Clientes</p>
            </div>
            <div>
              <Award className="w-8 h-8 text-[#E65100] mx-auto mb-3" strokeWidth={2.5} />
              <p className="text-xs font-bold uppercase text-white tracking-wider">5 Años Garantía</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-[#F5F5F5] border-t-2 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#E65100] flex items-center justify-center rounded-sm">
                  <Hammer className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-extrabold text-[#111111] uppercase">Reformas</span>
                  <span className="text-xs font-bold text-[#E65100] uppercase tracking-widest">Pro</span>
                </div>
              </div>
              <p className="text-sm text-[#333333]">
                Empresa especializada en reformas, pintura y limpieza profesional.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-[#111111] mb-4 tracking-wider">Servicios</h4>
              <ul className="space-y-2 text-sm text-[#333333]">
                <li><Link href="/servicios/reformas-integrales" className="hover:text-[#E65100] font-medium">Reformas Integrales</Link></li>
                <li><Link href="/servicios/pintura-tecnica" className="hover:text-[#E65100] font-medium">Pintura Técnica</Link></li>
                <li><Link href="/servicios/limpieza-industrial" className="hover:text-[#E65100] font-medium">Limpieza Profesional</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-[#111111] mb-4 tracking-wider">Empresa</h4>
              <ul className="space-y-2 text-sm text-[#333333]">
                <li><Link href="/proceso" className="hover:text-[#E65100] font-medium">Proceso</Link></li>
                <li><Link href="/contacto" className="hover:text-[#E65100] font-medium">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-[#111111] mb-4 tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-[#333333]">
                <li><Link href="/aviso-legal" className="hover:text-[#E65100] font-medium">Aviso Legal</Link></li>
                <li><Link href="/privacidad" className="hover:text-[#E65100] font-medium">Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-6 border-t-2 border-[#d4d4d4]">
            <p className="text-xs font-bold uppercase text-[#333333] tracking-wider">© 2024 ReformasPro · Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
