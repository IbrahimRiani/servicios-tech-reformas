'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, MessageCircle, Phone, Hammer } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { usePricingModal } from '@/context/PricingModalContext'
import { Service } from '@/lib/data'

interface Props {
  service: Service
  serviceKey: string
}

export default function ServicePageContent({ service, serviceKey }: Props) {
  const { openModal } = usePricingModal()

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden border-b-2 border-[#111111]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-white/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <div className="inline-block bg-[#E65100] text-white px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest">
              Servicio profesional
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-[#111111] uppercase">{service.title}</h1>
            <p className="text-base md:text-lg text-[#333333] max-w-2xl mx-auto">{service.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 border-b-2 border-[#111111] pb-5">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-[#111111] uppercase">¿En qué consiste?</h2>
            <p className="text-[#333333] text-base leading-relaxed">{service.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-white border-2 border-[#111111] p-6">
              <div className="inline-block bg-[#E65100] text-white px-2 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest">
                Incluido
              </div>
              <h3 className="text-xl font-extrabold mb-4 text-[#111111] uppercase">¿Qué incluye?</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#E65100] flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-[#111111] font-medium text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111111] border-2 border-[#111111] p-6 text-white">
              <div className="inline-block bg-[#E65100] text-white px-2 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest">
                Precio
              </div>
              <h3 className="text-xl font-extrabold mb-4 uppercase">Inversión</h3>
              <p className="text-3xl font-extrabold text-[#E65100] mb-3">{service.price}</p>
              <p className="text-[#cccccc] text-sm mb-5">Precio orientativo. El presupuesto final se adapta a tu proyecto.</p>
              <button 
                onClick={() => openModal(serviceKey)}
                className="w-full py-3 bg-[#E65100] border-2 border-[#E65100] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors flex items-center justify-center gap-2"
              >
                Calcular presupuesto <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="bg-white border-2 border-[#111111] p-6 md:p-8 mb-10">
            <div className="inline-block bg-[#E65100] text-white px-2 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest">
              FAQ
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#111111] uppercase">Preguntas Frecuentes</h2>
            <div className="space-y-0 border-2 border-[#d4d4d4]">
              {service.faq.map((item, index) => (
                <div key={index} className={`p-4 ${index !== service.faq.length - 1 ? 'border-b-2 border-[#d4d4d4]' : ''}`}>
                  <h3 className="text-base font-extrabold text-[#111111] mb-2 uppercase flex items-start gap-2">
                    <span className="text-[#E65100]">›</span>
                    {item.question}
                  </h3>
                  <p className="text-sm text-[#333333] leading-relaxed pl-5">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            <a 
              href="https://wa.me/34644702250?text=Hola,%20vengo%20de%20la%20web%20y%20quiero%20hablar%20con%20un%20técnico"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-[#25D366] border-2 border-[#128C7E] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#128C7E] transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={3} />
              Hablar con un técnico
            </a>
            <a 
              href="tel:+34694059232"
              className="px-6 py-4 bg-[#1a2942] border-2 border-[#1a2942] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#0f1a2e] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" strokeWidth={3} />
              Llamar ahora
            </a>
          </div>

          <div className="text-center">
            <button 
              onClick={() => openModal(serviceKey)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#E65100] border-2 border-[#E65100] text-white font-extrabold uppercase text-base tracking-wide hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors"
            >
              <span>Calcular mi presupuesto</span>
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
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
                <span className="text-lg font-extrabold text-[#111111] uppercase">Reformas Pro</span>
              </div>
              <p className="text-sm text-[#333333]">Empresa especializada en reformas, pintura y limpieza profesional.</p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase text-[#111111] mb-4 tracking-wider">Servicios</h4>
              <ul className="space-y-2 text-sm text-[#333333]">
                <li><Link href="/servicios/reformas-integrales" className="hover:text-[#E65100] font-medium">Reformas</Link></li>
                <li><Link href="/servicios/pintura-tecnica" className="hover:text-[#E65100] font-medium">Pintura</Link></li>
                <li><Link href="/servicios/limpieza-industrial" className="hover:text-[#E65100] font-medium">Limpieza</Link></li>
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
