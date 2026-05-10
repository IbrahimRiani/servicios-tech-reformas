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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative w-full max-w-2xl h-[80vh] bg-[#030712] rounded-3xl border border-white/10 shadow-2xl flex flex-col">
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors border border-red-500/30"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1 overflow-hidden">
          <IAPricingBot />
        </div>
      </div>
    </div>
  )
}