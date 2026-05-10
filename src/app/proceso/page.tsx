'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Scan, Rocket, Award, ArrowRight, CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import { usePricingModal } from '@/context/PricingModalContext'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: 1,
    title: 'Escaneo IA',
    description: 'Subes una foto de tu espacio y nuestro sistema de inteligencia artificial analiza el estado actual, mide dimensiones y detecta áreas que necesitan atención.',
    icon: Scan,
    features: ['Análisis en segundos', 'Detección de problemas', 'Estimación automática', 'Sin visitas presenciales'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    number: 2,
    title: 'Ejecución Profesional',
    description: 'Nuestro equipo de profesionales altamente cualificados ejecuta el proyecto con materiales premium y estándares de calidad rigurosos.',
    icon: Rocket,
    features: ['Equipo especializado', 'Materiales de primera', 'Seguimiento en tiempo real', 'Limpieza diaria'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: 3,
    title: 'Certificado de Calidad',
    description: 'Al finalizar, reciben un certificado de calidad que garantiza el trabajo realizado. 5 años de garantía en reformas integrales.',
    icon: Award,
    features: ['Garantía escrita', 'Inspección final', 'Documentación completa', 'Soporte post-servicio'],
    color: 'from-blue-600 to-cyan-400',
  },
]

export default function ProcesoPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { openModal } = usePricingModal()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section ref={containerRef} className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Nuestro <span className="text-gradient">Proceso</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Tres pasos simples para transformar tu espacio. Sin complicaciones, sin sorpresas.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent hidden md:block" />

            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  <div className="glass rounded-3xl p-8 max-w-lg hover:glow-hover transition-all duration-500">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-blue-400 font-bold text-sm mb-2">Paso {step.number}</div>
                    <h2 className="text-3xl font-bold mb-4 text-white">{step.title}</h2>
                    <p className="text-gray-400 mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`hidden md:flex items-center justify-center ${index % 2 === 1 ? 'md:order-first' : ''}`}>
                  <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-400">{step.number}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={() => openModal()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-110 transition-transform"
            >
              Comenzar mi proyecto <ArrowRight className="w-5 h-5" />
            </button>
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
                <li><Link href="/servicios" className="hover:text-blue-400">Servicios</Link></li>
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
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-500 text-sm">© 2024 ReformasPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}