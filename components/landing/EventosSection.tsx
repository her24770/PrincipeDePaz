import Image from 'next/image'
import Link from 'next/link'
import { EventoRow } from '@/lib/queries/landing'

interface EventosSectionProps {
  eventos: EventoRow[]
}

function EventoCard({ evento }: { evento: EventoRow }) {
  const fecha = new Date(evento.fechaInicio)
  const dia = fecha.getDate().toString().padStart(2, '0')
  const mes = fecha.toLocaleString('es', { month: 'short' }).toUpperCase()

  return (
    <div className="group bg-surface-container-lowest rounded-[1rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-outline-variant/10">
      <div className="aspect-[4/3] overflow-hidden relative bg-surface-container-high">
        {evento.urlImagenPortada ? (
          <Image
            src={evento.urlImagenPortada}
            alt={evento.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-outline">event</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center shadow-lg">
          <span className="block text-primary font-extrabold text-xl leading-none">{dia}</span>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">{mes}</span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-serif text-primary mb-4">{evento.titulo}</h3>
        <p className="text-on-surface-variant mb-8 flex-grow line-clamp-3">
          {evento.descripcion}
        </p>
        <Link
          href={`/eventos/${evento.id}`}
          className="flex items-center justify-between w-full text-primary font-bold pt-4 border-t border-outline-variant/20 group-hover:text-secondary transition-colors"
        >
          Ver más
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      </div>
    </div>
  )
}

function EventoSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-[1rem] overflow-hidden border border-outline-variant/10 flex flex-col">
      <div className="aspect-[4/3] bg-surface-container-high flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-outline/40">event</span>
      </div>
      <div className="p-8 flex flex-col gap-3">
        <div className="h-5 bg-surface-container rounded w-3/4" />
        <div className="h-4 bg-surface-container rounded w-full" />
        <div className="h-4 bg-surface-container rounded w-2/3" />
      </div>
    </div>
  )
}

export default function EventosSection({ eventos }: EventosSectionProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold font-serif text-primary mb-4">
              Próximos Eventos
            </h2>
            <p className="text-on-surface-variant max-w-md">
              No te pierdas la oportunidad de conectar, aprender y crecer junto a
              nuestra familia.
            </p>
          </div>
          <Link
            href="/eventos"
            className="text-secondary font-bold flex items-center gap-2 group shrink-0"
          >
            Ver calendario completo
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              east
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventos.length > 0
            ? eventos.map((evento) => <EventoCard key={evento.id} evento={evento} />)
            : Array.from({ length: 3 }).map((_, i) => <EventoSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}
