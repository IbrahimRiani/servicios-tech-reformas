'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Scan, Rocket, Award, ArrowRight, CheckCircle, Hammer, Wrench, FileCheck, HardHat, ClipboardList, Truck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { usePricingModal } from '@/context/PricingModalContext'

const steps = [
  {
    number: 1,
    title: 'Diagnóstico y Visita',
    description: 'Visita técnica gratuita. Evaluamos el espacio, tomamos medidas y analizamos tus necesidades reales.',
    icon: ClipboardList,
    features: ['Visita sin compromiso', 'Toma de medidas', 'Asesoramiento técnico', 'Sin costes ocultos'],
  },
  {
    number: 2,
    title: 'Presupuesto Cerrado',
    description: 'Recibes un presupuesto detallado por escrito con plazos, materiales y mano de obra desglosados.',
    icon: FileCheck,
    features: ['Presupuesto por escrito', 'Plazos garantizados', 'Materiales detallados', 'Precio cerrado'],
  },
  {
    number: 3,
    title: 'Ejecución de Obra',
    description: 'Equipo certificado ejecuta el proyecto con limpieza diaria, supervisión constante y materiales premium.',
    icon: HardHat,
    features: ['Equipo especializado', 'Limpieza diaria', 'Materiales premium', 'Supervisión continua'],
  },
  {
    number: 4,
    title: 'Entrega y Garantía',
    description: 'Entrega con inspección final, certificado de calidad y garantía oficial por escrito de 5 años.',
    icon: Award,
    features: ['Inspección final', 'Certificado calidad', 'Garantía 5 años', 'Soporte post-obra'],
  },
]

export default function ProcesoPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { openModal } = usePricingModal()

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section ref={containerRef} className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b-2 border-[#111111] pb-6">
            <div className="text-xs font-bold uppercase text-[#E65100] mb-2 tracking-widest">Metodología</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase">
              Nuestro Proceso
            </h1>
            <p className="text-[#333333] mt-3 max-w-2xl">
              Cuatro pasos claros para transformar tu espacio. Sin sorpresas, con garantía por escrito.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="bg-white border-2 border-[#111111] hover:border-[#E65100] transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  <div className="md:col-span-3 bg-[#E65100] text-white p-6 md:p-8 flex flex-col justify-center">
                    <div className="text-6xl font-extrabold leading-none mb-2">0{step.number}</div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-90">Paso {step.number} de 4</div>
                    <div className="mt-4">
                      <step.icon className="w-12 h-12" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="md:col-span-9 p-6 md:p-8">
                    <h2 className="text-2xl font-extrabold mb-3 text-[#111111] uppercase">{step.title}</h2>
                    <p className="text-[#333333] mb-5 leading-relaxed">{step.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-[#111111] text-sm">
                          <CheckCircle className="w-4 h-4 text-[#E65100] flex-shrink-0" strokeWidth={3} />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-[#F5F5F5] border-2 border-[#111111] p-8">
            <h2 className="text-2xl font-extrabold mb-3 text-[#111111] uppercase">¿Listo para empezar?</h2>
            <p className="text-[#333333] mb-6 max-w-xl mx-auto">
              Solicita tu presupuesto sin compromiso. Un técnico se pondrá en contacto en menos de 24 horas.
            </p>
            <button 
              onClick={() => openModal()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#E65100] border-2 border-[#E65100] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors"
            >
              Comenzar mi proyecto <ArrowRight className="w-5 h-5" strokeWidth={3} />
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
                <li><Link href="/servicios" className="hover:text-[#E65100] font-medium">Servicios</Link></li>
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
