import { AnuncioRow } from '@/lib/queries/landing'

interface AnunciosSectionProps {
  anuncios: AnuncioRow[]
}

function AnuncioItem({ anuncio }: { anuncio: AnuncioRow }) {
  const fecha = new Date(anuncio.creadoEn)
  const dia = fecha.getDate().toString().padStart(2, '0')
  const mes = fecha.toLocaleString('es', { month: 'long' })

  return (
    <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:border-secondary-container/50 transition-colors flex flex-col md:flex-row gap-8 items-center">
      <div className="text-center md:text-left min-w-[120px] shrink-0">
        <span className="block text-3xl font-bold text-secondary">{dia}</span>
        <span className="text-slate-500 text-xs font-bold tracking-widest uppercase">
          {mes}
        </span>
      </div>
      <div className="flex-grow">
        <h4 className="text-xl font-bold text-primary mb-1">{anuncio.titulo}</h4>
      </div>
      <button className="bg-surface-container text-primary p-3 rounded-full hover:bg-secondary-fixed transition-colors shrink-0">
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  )
}

export default function AnunciosSection({ anuncios }: AnunciosSectionProps) {
  if (anuncios.length === 0) return null

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold font-serif text-primary mb-12 flex items-center gap-4">
          Anuncios Generales
          <div className="h-[1px] bg-outline-variant flex-grow" />
        </h2>
        <div className="space-y-6">
          {anuncios.slice(0, 4).map((anuncio) => (
            <AnuncioItem key={anuncio.id} anuncio={anuncio} />
          ))}
        </div>
      </div>
    </section>
  )
}
