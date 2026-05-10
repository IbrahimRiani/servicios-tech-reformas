'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
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
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{service.description}</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">¿En qué consiste nuestro servicio?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{service.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">¿Qué incluye?</h3>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Precio</h3>
              <p className="text-4xl font-bold text-blue-400 mb-4">{service.price}</p>
              <p className="text-gray-400 mb-6">Precio orientativo. El presupuesto final se adapta a tus necesidades específicas.</p>
              <button 
                onClick={() => openModal(serviceKey)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Calcular {service.title} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Preguntas Frecuentes (FAQ)</h2>
            <div className="space-y-6">
              {service.faq.map((item, index) => (
                <div key={index} className="border-b border-white/10 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-6">¿Tienes dudas? Nuestro equipo te ayuda</p>
            <a 
              href="https://wa.me/34644702250?text=Hola,%20vengo%20de%20la%20web%20y%20quiero%20hablar%20con%20un%20técnico"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:scale-110 transition-transform inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con un técnico
            </a>
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => openModal(serviceKey)}
              className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold text-xl rounded-2xl hover:scale-110 transition-transform"
            >
              <span>Calcular mi presupuesto</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-gradient">Reformas</span>
                <span className="text-white">Pro</span>
              </h3>
              <p className="text-gray-400 text-sm">El futuro de las reformas llegó.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Servicios</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/servicios/reformas-integrales" className="hover:text-blue-400">Reformas</Link></li>
                <li><Link href="/servicios/pintura-tecnica" className="hover:text-blue-400">Pintura</Link></li>
                <li><Link href="/servicios/limpieza-industrial" className="hover:text-blue-400">Limpieza</Link></li>
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
                <li><Link href="/privacidad" className="hover:text-blue-400">Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 mt-8 border-t border-white/5">
            <p className="text-gray-500 text-sm">© 2024 ReformasPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}