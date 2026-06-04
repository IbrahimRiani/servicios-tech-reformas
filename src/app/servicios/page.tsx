'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Hammer, Palette, Brush } from 'lucide-react'
import { services } from '@/lib/data'
import Navbar from '@/components/Navbar'
import { usePricingModal } from '@/context/PricingModalContext'

const iconMap: Record<string, React.ReactNode> = {
  'reformas-integrales': <Hammer className="w-7 h-7 text-white" strokeWidth={2.5} />,
  'pintura-tecnica': <Palette className="w-7 h-7 text-white" strokeWidth={2.5} />,
  'limpieza-industrial': <Brush className="w-7 h-7 text-white" strokeWidth={2.5} />,
}

export default function ServiciosPage() {
  const { openModal } = usePricingModal()

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-12 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b-2 border-[#111111] pb-6">
            <div className="text-xs font-bold uppercase text-[#E65100] mb-2 tracking-widest">Catálogo completo</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase">
              Nuestros Servicios
            </h1>
            <p className="text-[#333333] mt-3 max-w-2xl">
              Soluciones integrales para transformar tu hogar o negocio. Calidad profesional garantizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group bg-white border-2 border-[#d4d4d4] hover:border-[#E65100] transition-colors overflow-hidden"
              >
                <div className="relative h-48 w-full border-b-2 border-[#d4d4d4]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#E65100] flex items-center justify-center rounded-sm mb-4">
                    {iconMap[service.slug]}
                  </div>
                  <h2 className="text-xl font-extrabold mb-2 text-[#111111] uppercase group-hover:text-[#E65100] transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[#333333] mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-[#F5F5F5]">
                    <span className="text-base font-extrabold text-[#E65100] uppercase">{service.price}</span>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase text-[#111111] group-hover:text-[#E65100] transition-colors">
                      Ver detalles <ArrowRight className="w-4 h-4" strokeWidth={3} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => openModal()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#E65100] border-2 border-[#E65100] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors"
            >
              Solicitar Presupuesto <ArrowRight className="w-5 h-5" strokeWidth={3} />
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
