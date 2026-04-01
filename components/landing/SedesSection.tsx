import { SedeRow } from '@/lib/queries/landing'

interface SedesSectionProps {
  sedes: SedeRow[]
}

function SedeCard({ sede }: { sede: SedeRow }) {
  const query = encodeURIComponent(
    sede.latitud && sede.longitud
      ? `${sede.latitud},${sede.longitud}`
      : `${sede.direccion}, ${sede.ciudad}`
  )
  const mapsUrl = `https://maps.google.com/?q=${query}`

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <span className="material-symbols-outlined text-8xl text-primary">church</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <h3 className="text-xl font-bold font-serif text-primary">{sede.nombre}</h3>
        </div>

        <p className="text-on-surface-variant leading-relaxed mb-1 text-sm">
          {sede.direccion}
        </p>
        <p className="text-on-surface-variant text-sm mb-4">{sede.ciudad}</p>

        {sede.horario && (
          <p className="text-sm text-secondary font-medium mb-4 flex items-center gap-1">
            <span className="material-symbols-outlined text-base">schedule</span>
            {sede.horario}
          </p>
        )}

        {sede.telefono && (
          <p className="text-sm text-on-surface-variant mb-6 flex items-center gap-1">
            <span className="material-symbols-outlined text-base">phone</span>
            {sede.telefono}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-base">directions</span>
            Cómo llegar
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SedesSection({ sedes }: SedesSectionProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold font-serif text-primary mb-4 tracking-tight">
              Nuestras Sedes
            </h2>
            <p className="text-on-surface-variant text-lg">
              Encuentra una comunidad de Príncipe de Paz cerca de ti. Estamos en el
              corazón de Guatemala esperándote con los brazos abiertos.
            </p>
          </div>
        </div>

        {sedes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sedes.map((sede) => (
              <SedeCard key={sede.id} sede={sede} />
            ))}
          </div>
        ) : (
          <p className="text-on-surface-variant">
            Próximamente más información sobre nuestras sedes.
          </p>
        )}
      </div>
    </section>
  )
}
