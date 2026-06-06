'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { usePricingModal } from '@/context/PricingModalContext'
import IAPricingBot from './IAPricingBot'

export default function PricingModal() {
  const { isOpen, closeModal } = usePricingModal()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
      <div 
        className="absolute inset-0 bg-black/70"
        onClick={closeModal}
      />
      <div className="relative w-full max-w-2xl h-[90vh] md:h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 z-20 p-2 bg-white hover:bg-[#FF6600] hover:text-white transition-colors border border-[#d4d4d4] hover:border-[#FF6600] rounded-full shadow-md"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-[#111111]" strokeWidth={3} />
        </button>
        <div className="flex-1 min-h-0 overflow-hidden">
          <IAPricingBot />
        </div>
      </div>
    </div>
  )
}
