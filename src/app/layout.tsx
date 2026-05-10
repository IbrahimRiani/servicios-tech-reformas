import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Reformas Premium - El Futuro de las Reformas',
  description: 'Servicios de reformas integrales, pintura técnica y limpieza industrial con tecnología IA. Consigue tu presupuesto en segundos.',
  keywords: 'reformas, pintura, limpieza industrial, presupuesto online, reformas Madrid',
  openGraph: {
    title: 'Reformas Premium - El Futuro de las Reformas',
    description: 'Servicios de reformas integrales, pintura técnica y limpieza industrial con tecnología IA.',
    type: 'website',
    locale: 'es_ES',
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