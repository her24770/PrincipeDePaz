import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/landing/HeroSection'
import EventosSection from '@/components/landing/EventosSection'
import StreamingSection from '@/components/landing/StreamingSection'
import AnunciosSection from '@/components/landing/AnunciosSection'
import DevotionalBlock from '@/components/landing/DevotionalBlock'
import SedesSection from '@/components/landing/SedesSection'
import NuevoVisitanteSection from '@/components/landing/NuevoVisitanteSection'
import ComunidadSection from '@/components/landing/ComunidadSection'
import {
  getAnunciosActivos,
  getEventosProximos,
  getPromesaDelDia,
  getSedesActivas,
  getHeroImages,
} from '@/lib/queries/landing'

export default async function HomePage() {
  const [anuncios, eventos, promesa, sedes, heroImages] = await Promise.all([
    getAnunciosActivos(),
    getEventosProximos(),
    getPromesaDelDia(),
    getSedesActivas(),
    getHeroImages(),
  ])

  return (
    <>
      <Navbar />
      <main className="pt-0">
        <HeroSection heroImages={heroImages} />
        <EventosSection eventos={eventos} />
        <StreamingSection />
        <AnunciosSection anuncios={anuncios} />
        <DevotionalBlock promesa={promesa} />
        <SedesSection sedes={sedes} />
        <NuevoVisitanteSection />
        <ComunidadSection />
      </main>
      <Footer />
    </>
  )
}
