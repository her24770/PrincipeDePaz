import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getMinisteriosActivos, getHeroImages, MinisterioRow } from '@/lib/queries/landing'

export const revalidate = 600

function MinisterioCard({
  ministerio,
  index,
}: {
  ministerio: MinisterioRow
  index: number
}) {
  const imageLeft = index % 2 === 0
  const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
  const textAlign = imageLeft ? 'text-left items-start' : 'text-right items-end'

  return (
    <div
      className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-[420px] ${bgClass}`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-14">
        <div className="relative w-full min-h-[300px] md:min-h-[380px] rounded-2xl overflow-hidden bg-primary/10 shadow-md">
          {ministerio.urlImagenPortada ? (
            <Image
              src={ministerio.urlImagenPortada}
              alt={ministerio.nombre}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-7xl text-white/30">groups</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 flex items-center px-10 py-14 md:px-16 ${imageLeft ? 'justify-start' : 'justify-end'}`}>
        <div className={`max-w-lg flex flex-col ${textAlign}`}>
          <div className="w-10 h-1 bg-secondary-fixed-dim rounded-full mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-5 leading-snug">
            {ministerio.nombre}
          </h2>

          {ministerio.descripcion && (
            <p className="text-on-surface-variant leading-relaxed mb-8 text-lg">
              {ministerio.descripcion}
            </p>
          )}

          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 hover:shadow-lg active:scale-95 transition-all self-start md:self-auto"
          >
            {!imageLeft && <span className="material-symbols-outlined text-base">arrow_back</span>}
            Unirme a este ministerio
            {imageLeft && <span className="material-symbols-outlined text-base">arrow_forward</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function MinisteriosPage() {
  const [ministerios, heroImages] = await Promise.all([
    getMinisteriosActivos(),
    getHeroImages(),
  ])

  const heroBg = heroImages[0] ?? null

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — foto de fondo completo con overlay */}
        <section className="relative min-h-[500px] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/55 z-10" />
            {heroBg ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${heroBg}')` }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container" />
            )}
          </div>

          {/* Content */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-8 py-32 md:py-40">
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-2 rounded-lg mb-8 border border-white/25">
              <span className="w-2 h-2 bg-secondary-fixed rounded-full" />
              <span className="text-white/90 font-bold tracking-widest uppercase text-xs">
                Comunidad activa
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 leading-tight">
              Nuestros
              <span className="block text-secondary-fixed">Ministerios</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-md">
              Cada ministerio es un llamado a servir. Encuentra tu lugar y
              desarrolla los dones que Dios puso en ti.
            </p>
          </div>
        </section>

        {/* Ministerios alternados */}
        {ministerios.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {ministerios.map((m, i) => (
              <MinisterioCard key={m.id} ministerio={m} index={i} />
            ))}
          </div>
        ) : (
          <section className="bg-white py-32 text-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">
              groups
            </span>
            <p className="text-on-surface-variant text-lg">
              Próximamente información sobre nuestros ministerios.
            </p>
          </section>
        )}

        {/* CTA final */}
        <section className="bg-primary py-20">
          <div className="max-w-3xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold font-serif text-white mb-5">
              ¿Listo para servir?
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Acércate a nosotros y descubre cómo puedes hacer la diferencia
              en nuestra comunidad.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 bg-secondary-fixed text-on-secondary-fixed px-10 py-5 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Contáctanos
              <span className="material-symbols-outlined">volunteer_activism</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
