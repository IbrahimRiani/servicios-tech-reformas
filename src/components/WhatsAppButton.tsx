'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const waLink = 'https://wa.me/34644702250?text=Hola,%20vengo%20de%20la%20web%20y%20quiero%20información'

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce-slow"
      style={{
        boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
      }}
      aria-label="Chatear en WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
    </a>
  )
}