'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Hammer, Palette, Droplets } from 'lucide-react'
import { services } from '@/lib/data'
import Navbar from '@/components/Navbar'
import { usePricingModal } from '@/context/PricingModalContext'

const iconMap: Record<string, React.ReactNode> = {
  'reformas-integrales': <Hammer className="w-12 h-12 text-blue-400" />,
  'pintura-tecnica': <Palette className="w-12 h-12 text-blue-400" />,
  'limpieza-industrial': <Droplets className="w-12 h-12 text-blue-400" />,
}

export default function ServiciosPage() {
  const { openModal } = usePricingModal()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Nuestros <span className="text-gradient">Servicios</span>
          </h1>
          <p className="text-gray-400 text-xl text-center max-w-2xl mx-auto mb-16">
            Soluciones integrales para transformar tu hogar o negocio. Calidad premium garantizada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group relative glass rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>
                
                <div className="p-8">
                  <div className="mb-4">{iconMap[service.slug]}</div>
                  <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-gradient transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-bold text-lg">{service.price}</span>
                    <span className="flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors">
                      Ver detalles <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => openModal()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-110 transition-transform"
            >
              Solicitar presupuesto <ArrowRight className="w-5 h-5" />
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
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-500 text-sm">© 2024 ReformasPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}