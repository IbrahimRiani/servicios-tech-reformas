'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PricingModalContextType {
  isOpen: boolean
  openModal: (service?: string) => void
  closeModal: () => void
  selectedService: string | null
}

const PricingModalContext = createContext<PricingModalContextType | undefined>(undefined)

export function PricingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const openModal = (service?: string) => {
    setSelectedService(service || null)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedService(null)
  }

  return (
    <PricingModalContext.Provider value={{ isOpen, openModal, closeModal, selectedService }}>
      {children}
    </PricingModalContext.Provider>
  )
}

export function usePricingModal() {
  const context = useContext(PricingModalContext)
  if (!context) {
    throw new Error('usePricingModal must be used within PricingModalProvider')
  }
  return context
}