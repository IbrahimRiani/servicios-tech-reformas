import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'ReformasPro AI - Reformas, Pintura y Limpieza con Inteligencia Artificial',
  description: 'Servicio de reformas integrales, pintura técnica y limpieza industrial con IA. Consigue tu presupuesto instantáneo. Madrid y España.',
  keywords: 'reformas, pintura, limpieza industrial, presupuesto IA, reformas Madrid, servicio técnico',
  openGraph: {
    title: 'ReformasPro AI - El futuro de las reformas',
    description: 'Servicios de reformas integrales, pintura técnica y limpieza industrial con tecnología IA.',
    url: 'https://reformaspro.live',
    siteName: 'ReformasPro',
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://reformaspro.live',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  )
}