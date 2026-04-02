'use client'

import { useState, useEffect } from 'react'

interface HeroSectionProps {
  heroImages: string[]
}

export default function HeroSection({ heroImages }: HeroSectionProps) {
  const [current, setCurrent] = useState(0)
  const hasImages = heroImages.length > 0

  useEffect(() => {
    if (!hasImages || heroImages.length < 2) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length, hasImages])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/45 z-10" />

        {hasImages ? (
          heroImages.map((url, i) => (
            <div
              key={url}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url('${url}')`,
                opacity: i === current ? 1 : 0,
              }}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg mb-8 border border-white/30">
            <span className="w-2 h-2 bg-secondary-fixed rounded-full animate-pulse" />
            <span className="text-white font-bold tracking-widest uppercase text-xs">
              Bienvenido a nuestra familia
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="block text-secondary-fixed drop-shadow-lg">Todos</span>
            <span className="block italic font-serif">Haciendo el bien.</span>
          </h1>

          <div className="hero-accent-bar h-1.5 w-32 mb-8 rounded-full" />

          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light text-shadow max-w-xl">
            Compartiendo tus riquezas con alegría. Un refugio de paz y esperanza en
            el corazón de Guatemala.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-secondary-fixed text-on-secondary-fixed px-10 py-5 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
              Únete a nosotros
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/40 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Horarios de servicios
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
