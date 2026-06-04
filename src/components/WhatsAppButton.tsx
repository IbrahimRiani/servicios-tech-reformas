'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const waLink = 'https://wa.me/34644702250?text=Hola,%20vengo%20de%20la%20web%20y%20quiero%20información'

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] border-2 border-[#128C7E] flex items-center justify-center hover:bg-[#128C7E] transition-colors"
      aria-label="Chatear en WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
    </a>
  )
}
