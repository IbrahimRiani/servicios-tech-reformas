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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative w-full max-w-2xl h-[90vh] md:h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <button 
          onClick={closeModal}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors border border-red-200"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
        <div className="flex-1 min-h-0 overflow-hidden">
          <IAPricingBot />
        </div>
      </div>
    </div>
  )
}