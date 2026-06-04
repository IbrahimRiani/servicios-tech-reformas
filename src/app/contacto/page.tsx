'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2, Hammer } from 'lucide-react'
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
        message: 'He calculado un presupuesto con el asistente y quiero confirmar la cita.',
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
      <main className="min-h-screen bg-white">
        <Navbar />
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#E65100] flex items-center justify-center mx-auto mb-8 rounded-sm">
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#111111] uppercase">¡Solicitud enviada!</h1>
            <p className="text-[#333333] text-lg mb-8">
              Gracias por confiar en ReformasPro. Un técnico te contactará en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/"
                className="px-8 py-4 bg-[#E65100] border-2 border-[#E65100] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors"
              >
                Volver al inicio
              </Link>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 bg-white border-2 border-[#111111] text-[#111111] font-bold uppercase text-sm tracking-wide hover:bg-[#111111] hover:text-white transition-colors"
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
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b-2 border-[#111111] pb-6">
            <div className="text-xs font-bold uppercase text-[#E65100] mb-2 tracking-widest">Hablemos</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase">
              Contacto
            </h1>
            <p className="text-[#333333] mt-3 max-w-2xl">
              ¿Tienes preguntas? Nuestro equipo te ayuda. Respondemos en menos de 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-[#111111] p-6 md:p-8">
              <h2 className="text-xl font-extrabold mb-6 text-[#111111] uppercase">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#111111] text-xs font-bold uppercase tracking-wider mb-2">Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border-2 border-[#d4d4d4] px-4 py-3 text-[#111111] focus:outline-none focus:border-[#E65100] transition-colors"
                      placeholder="Juan García"
                    />
                  </div>
                  <div>
                    <label className="block text-[#111111] text-xs font-bold uppercase tracking-wider mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border-2 border-[#d4d4d4] px-4 py-3 text-[#111111] focus:outline-none focus:border-[#E65100] transition-colors"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#111111] text-xs font-bold uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-[#d4d4d4] px-4 py-3 text-[#111111] focus:outline-none focus:border-[#E65100] transition-colors"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-[#111111] text-xs font-bold uppercase tracking-wider mb-2">Tipo de servicio</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-[#d4d4d4] px-4 py-3 text-[#111111] focus:outline-none focus:border-[#E65100] transition-colors"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="reformas">Reformas Integrales</option>
                    <option value="pintura">Pintura Técnica</option>
                    <option value="limpieza">Limpieza Profesional</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#111111] text-xs font-bold uppercase tracking-wider mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white border-2 border-[#d4d4d4] px-4 py-3 text-[#111111] focus:outline-none focus:border-[#E65100] transition-colors resize-none"
                    placeholder="Describe tu proyecto o pregunta..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#E65100] border-2 border-[#E65100] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" strokeWidth={3} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-2 border-[#111111] p-6 md:p-8">
                <h2 className="text-xl font-extrabold mb-6 text-[#111111] uppercase">Información</h2>
                
                <div className="space-y-4">
                  <a href="tel:+34694059232" className="flex items-center gap-4 p-3 border-2 border-[#d4d4d4] hover:border-[#E65100] transition-colors">
                    <div className="w-10 h-10 bg-[#E65100] flex items-center justify-center rounded-sm flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#333333] tracking-widest">Teléfono</p>
                      <p className="text-[#111111] font-extrabold">+34 694 059 232</p>
                    </div>
                  </a>

                  <a href="mailto:info@reformaspro.live" className="flex items-center gap-4 p-3 border-2 border-[#d4d4d4] hover:border-[#E65100] transition-colors">
                    <div className="w-10 h-10 bg-[#E65100] flex items-center justify-center rounded-sm flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#333333] tracking-widest">Email</p>
                      <p className="text-[#111111] font-extrabold">info@reformaspro.live</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3 border-2 border-[#d4d4d4]">
                    <div className="w-10 h-10 bg-[#E65100] flex items-center justify-center rounded-sm flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#333333] tracking-widest">Dirección</p>
                      <p className="text-[#111111] font-extrabold">Madrid, España</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-[#d4d4d4]">
                  <p className="text-[10px] font-bold uppercase text-[#E65100] tracking-widest mb-3">Horario</p>
                  <p className="text-[#111111] font-bold text-sm">Lun-Vie: 9:00 - 20:00</p>
                  <p className="text-[#111111] font-bold text-sm">Sáb: 10:00 - 14:00</p>
                </div>
              </div>

              <div className="bg-[#111111] border-2 border-[#111111] p-6 md:p-8">
                <h2 className="text-xl font-extrabold mb-4 text-white uppercase">¿Por qué nosotros?</h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white text-sm font-medium">
                    <CheckCircle className="w-5 h-5 text-[#E65100] flex-shrink-0" strokeWidth={3} />
                    Respuesta en menos de 24h
                  </li>
                  <li className="flex items-center gap-3 text-white text-sm font-medium">
                    <CheckCircle className="w-5 h-5 text-[#E65100] flex-shrink-0" strokeWidth={3} />
                    Presupuesto sin compromiso
                  </li>
                  <li className="flex items-center gap-3 text-white text-sm font-medium">
                    <CheckCircle className="w-5 h-5 text-[#E65100] flex-shrink-0" strokeWidth={3} />
                    5 años de garantía
                  </li>
                  <li className="flex items-center gap-3 text-white text-sm font-medium">
                    <CheckCircle className="w-5 h-5 text-[#E65100] flex-shrink-0" strokeWidth={3} />
                    Materiales de primera calidad
                  </li>
                </ul>
              </div>
            </div>
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
                <li><Link href="/servicios" className="hover:text-[#E65100] font-medium">Servicios</Link></li>
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

export default function ContactoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactoContent />
    </Suspense>
  )
}
