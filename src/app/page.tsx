'use client'

import Link from 'next/link'
import { Star, Award, Users, Hammer, HardHat, Wrench, ShieldCheck, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import HeroParallax from '@/components/HeroParallax'
import ServiceCards from '@/components/ServiceCards'
import SuccessCases from '@/components/SuccessCases'
import ParallaxImage from '@/components/ParallaxImage'
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

      <section className="py-10 px-6 bg-[#F5F5F5]">
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

      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=85"
            alt="Profesionales trabajando en una reforma"
            height="h-[50vh] md:h-[60vh]"
            overlayOpacity={55}
          >
            <div className="text-center max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="inline-block bg-[#FF6600] text-white px-4 py-2 rounded-full mb-4 text-xs font-bold uppercase tracking-widest">
                Equipo profesional
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] uppercase mb-4">
                Profesionales con experiencia<br />
                <span className="text-[#FF6600]">trabajando en tu reforma</span>
              </h2>
              <p className="text-base md:text-lg text-[#333333]">
                Más de 15 años ejecutando obras en Madrid Sur y Toledo.
              </p>
            </div>
          </ParallaxImage>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block bg-[#FF6600] text-white px-4 py-2 rounded-full mb-4 text-xs font-bold uppercase tracking-widest">
              Cómo trabajamos
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase">
              Nuestro Proceso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {processSteps.map((item, index) => (
              <div
                key={index}
                className="bg-white border-2 border-[#d4d4d4] hover:border-[#FF6600] rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-[#FF6600] flex items-center justify-center rounded-xl shadow-lg">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-extrabold text-[#FF6600]">0{item.step}</div>
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-[#111111] uppercase">{item.title}</h3>
                <p className="text-sm text-[#333333] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
            <div className="bg-gradient-to-br from-[#FF6600] to-[#E65100] text-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-2xl font-extrabold">5 Años</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-90">Garantía por escrito</p>
              </div>
            </div>
            <div className="bg-[#111111] text-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
              <div className="w-12 h-12 bg-[#FF6600] rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-2xl font-extrabold">12 días</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-90">Plazo medio de obra</p>
              </div>
            </div>
            <div className="bg-white border-2 border-[#FF6600] text-[#111111] rounded-2xl p-6 flex items-center gap-4 shadow-lg">
              <div className="w-12 h-12 bg-[#FF6600] rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-2xl font-extrabold">+500</p>
                <p className="text-xs font-bold uppercase tracking-wider">Proyectos finalizados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCards />

      <SuccessCases />

      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85"
            alt="Acabado de diseño moderno en reforma"
            height="h-[50vh] md:h-[55vh]"
            overlayOpacity={50}
          >
            <div className="text-center max-w-2xl mx-auto bg-white/95 rounded-2xl p-8 md:p-10 shadow-2xl">
              <div className="inline-block bg-[#FF6600] text-white px-4 py-2 rounded-full mb-4 text-xs font-bold uppercase tracking-widest">
                Resultados reales
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] uppercase mb-4">
                Acabados que <span className="text-[#FF6600]">revalorizan</span><br />
                tu vivienda
              </h2>
              <p className="text-base text-[#333333] mb-6">
                Cada proyecto entregado con calidad certificada y garantía.
              </p>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6600] text-white font-bold uppercase text-sm tracking-wide rounded-xl hover:bg-[#E65100] transition-colors"
              >
                Ver nuestros trabajos
              </Link>
            </div>
          </ParallaxImage>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6600] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6600] opacity-10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block bg-[#FF6600] text-white px-4 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest">
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
              className="px-8 py-4 bg-[#FF6600] text-white font-bold uppercase text-sm tracking-wide rounded-xl hover:bg-[#E65100] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Calcula tu presupuesto
            </button>
            <Link
              href="/proceso"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold uppercase text-sm tracking-wide rounded-xl hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center"
            >
              Ver proceso
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-12 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF6600] text-[#FF6600]" />
                ))}
              </div>
              <p className="text-xs font-bold uppercase text-white tracking-wider">4.9/5 Google</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
              <Users className="w-8 h-8 text-[#FF6600] mx-auto mb-2" strokeWidth={2.5} />
              <p className="text-xs font-bold uppercase text-white tracking-wider">500+ Clientes</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
              <Award className="w-8 h-8 text-[#FF6600] mx-auto mb-2" strokeWidth={2.5} />
              <p className="text-xs font-bold uppercase text-white tracking-wider">5 Años Garantía</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-[#F5F5F5] rounded-t-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#FF6600] flex items-center justify-center rounded-xl shadow-md">
                  <Hammer className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-extrabold text-[#111111] uppercase">Reformas</span>
                  <span className="text-xs font-bold text-[#FF6600] uppercase tracking-widest">Pro</span>
                </div>
              </div>
              <p className="text-sm text-[#333333]">
                Empresa especializada en reformas, pintura y limpieza profesional.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-[#111111] mb-4 tracking-wider">Servicios</h4>
              <ul className="space-y-2 text-sm text-[#333333]">
                <li><Link href="/servicios/reformas-integrales" className="hover:text-[#FF6600] font-medium">Reformas Integrales</Link></li>
                <li><Link href="/servicios/pintura-tecnica" className="hover:text-[#FF6600] font-medium">Pintura Técnica</Link></li>
                <li><Link href="/servicios/limpieza-industrial" className="hover:text-[#FF6600] font-medium">Limpieza Profesional</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-[#111111] mb-4 tracking-wider">Empresa</h4>
              <ul className="space-y-2 text-sm text-[#333333]">
                <li><Link href="/proceso" className="hover:text-[#FF6600] font-medium">Proceso</Link></li>
                <li><Link href="/contacto" className="hover:text-[#FF6600] font-medium">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-[#111111] mb-4 tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-[#333333]">
                <li><Link href="/aviso-legal" className="hover:text-[#FF6600] font-medium">Aviso Legal</Link></li>
                <li><Link href="/privacidad" className="hover:text-[#FF6600] font-medium">Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-[#d4d4d4]">
            <p className="text-xs font-bold uppercase text-[#333333] tracking-wider">© 2024 ReformasPro · Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
