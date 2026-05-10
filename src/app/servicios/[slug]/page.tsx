import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { services, getServiceBySlug } from '@/lib/data'
import Navbar from '@/components/Navbar'
import ServicePageContent from './ServicePageContent'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) return { title: 'Servicio no encontrado' }
  return {
    title: `${service.title} | ReformasPro`,
    description: service.description,
  }
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Servicio no encontrado</h1>
          <p className="text-gray-400">El servicio que buscas no existe.</p>
        </div>
      </div>
    )
  }

  const serviceKey = params.slug === 'reformas-integrales' ? 'reforma' : 
                     params.slug === 'pintura-tecnica' ? 'pintura' : 'limpieza'

  return <ServicePageContent service={service} serviceKey={serviceKey} />
}