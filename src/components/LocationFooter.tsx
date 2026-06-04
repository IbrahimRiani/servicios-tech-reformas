'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Hammer, Clock } from 'lucide-react'

export default function LocationFooter() {
  return (
    <section className="bg-[#111111] text-white border-t-4 border-[#FF6600]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="text-center mb-6">
          <div className="inline-block bg-[#FF6600] text-white px-3 py-1.5 mb-3 text-xs font-bold uppercase tracking-widest">
            Zona de servicio
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase mb-4">
            <span className="text-[#FF6600]">ReformasPro</span> · Especialistas cerca de ti
          </h2>
        </div>
        
        <p className="text-sm md:text-base text-[#e5e5e5] leading-relaxed text-center max-w-4xl mx-auto">
          <strong className="text-white">ReformasPro:</strong> Especialistas en <strong className="text-[#FF6600]">Pintura</strong>, <strong className="text-[#FF6600]">Alisado de Gotelé</strong>, <strong className="text-[#FF6600]">Limpieza Post-Obra</strong> y <strong className="text-[#FF6600]">Actualizaciones Rápidas</strong>. Damos servicio en <strong className="text-white">Madrid Sur</strong> (<span className="text-white">Parla, Getafe, Leganés, Pinto, Fuenlabrada, Móstoles</span>) y <strong className="text-white">Toledo</strong> (<span className="text-white">Illescas, Yuncos, Chozas de Canales, Olías del Rey</span>).
        </p>
      </div>
    </section>
  )
}
