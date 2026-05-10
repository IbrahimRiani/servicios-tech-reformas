'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'
import { PricingModalProvider } from '@/context/PricingModalContext'
import PricingModal from './PricingModal'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <PricingModalProvider>
      {children}
      <PricingModal />
    </PricingModalProvider>
  )
}