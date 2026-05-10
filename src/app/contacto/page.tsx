'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

function ContactoContent() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam === 'budget-confirmed') {
      setFormData(prev => ({
        ...prev,
        message: 'He calculado un presupuesto con el asistente IA y quiero confirmar la cita.',
        service: 'reforma',
      }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">¡Solicitud enviada!</h1>
            <p className="text-gray-400 text-lg mb-8">
              Gracias por confiar en ReformasPro. Un técnico te contactará en menos de 24 horas para confirmar tu cita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-110 transition-transform"
              >
                Volver al inicio
              </Link>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Nueva solicitud
              </button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Contacto</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-xl mx-auto">
              ¿Tienes preguntas? Nuestro equipo te ayuda. Responemos en menos de 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-8 text-white">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Juan García"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Tipo de servicio</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="reformas">Reformas Integrales</option>
                    <option value="pintura">Pintura Técnica</option>
                    <option value="limpieza">Limpieza Industrial</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Describe tu proyecto o pregunta..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="glass rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-8 text-white">Información de contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Teléfono</p>
                      <p className="text-white font-semibold">+34 900 000 000</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">hola@reformaspro.es</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Dirección</p>
                      <p className="text-white font-semibold">Madrid, España</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-gray-400 text-sm mb-4">Horario de atención</p>
                  <p className="text-white">Lun-Vie: 9:00 - 20:00</p>
                  <p className="text-white">Sáb: 10:00 - 14:00</p>
                </div>
              </div>

              <div className="glass rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-4 text-white">¿Por qué elegirnos?</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    Respuesta en menos de 24h
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    Presupuesto sin compromiso
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    5 años de garantía
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    Materiales de primera calidad
                  </li>
                </ul>
              </div>
            </div>
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
                <li><Link href="/servicios" className="hover:text-blue-400">Servicios</Link></li>
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

export default function ContactoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ContactoContent />
    </Suspense>
  )
}