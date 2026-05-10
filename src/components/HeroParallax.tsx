'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const afterContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        },
      })

      tl.to(afterContainerRef.current, {
        width: '100%',
        ease: 'none',
      })
      .to(textRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power1.out',
      }, 0)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1920&q=80"
          alt="Antes de la reforma"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/40 text-lg font-light tracking-[0.3em] uppercase">Antes</span>
        </div>
      </div>

      <div
        ref={afterContainerRef}
        className="absolute inset-0 w-0 overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Después de la reforma"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-400/60 text-lg font-light tracking-[0.3em] uppercase">Después</span>
        </div>
      </div>

      <div
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-gradient">El futuro</span>
          <br />
          <span className="text-white">de las reformas</span>
          <br />
          <span className="text-white">ha llegado</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-8">
          Transforma tu hogar con tecnología IA. Presupuesto instantáneo en menos de 60 segundos.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-full hover:scale-110 transition-transform">
          Calcula tu presupuesto
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
        <ArrowDown className="w-8 h-8 text-blue-400" />
      </div>
    </section>
  )
}