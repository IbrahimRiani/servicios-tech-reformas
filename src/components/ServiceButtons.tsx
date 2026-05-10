'use client'

import { usePricingModal } from '@/context/PricingModalContext'

interface ServiceButtonProps {
  service?: string
  variant?: 'primary' | 'secondary'
  children?: React.ReactNode
}

export default function ServiceButton({ service, variant = 'primary', children }: ServiceButtonProps) {
  const { openModal } = usePricingModal()

  const buttonText = children || (variant === 'primary' ? 'Calcular presupuesto' : 'Hablar con un técnico')

  return (
    <button 
      onClick={() => openModal(service)}
      className={variant === 'primary' 
        ? 'w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2'
        : 'px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-110 transition-transform'
      }
    >
      {buttonText}
    </button>
  )
}