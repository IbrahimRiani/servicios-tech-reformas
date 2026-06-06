'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  height?: string
  overlay?: boolean
  overlayOpacity?: number
  children?: React.ReactNode
}

export default function ParallaxImage({
  src,
  alt,
  height = 'h-[60vh] md:h-[70vh]',
  overlay = true,
  overlayOpacity = 50,
  children,
}: ParallaxImageProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
        const translateY = (scrollProgress - 0.5) * 80
        imageRef.current.style.transform = `translateY(${translateY}px) scale(1.1)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative ${height} overflow-hidden rounded-3xl`}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/60"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          {children}
        </div>
      )}
    </section>
  )
}
