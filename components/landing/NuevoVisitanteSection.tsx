import Link from 'next/link'

export default function NuevoVisitanteSection() {
  return (
    <section className="py-24 bg-secondary-fixed">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-4xl font-bold font-serif text-on-secondary-fixed mb-6">
            ¿Es tu primera vez con nosotros?
          </h2>
          <p className="text-on-secondary-fixed-variant text-lg leading-relaxed">
            Queremos que te sientas como en casa. Tenemos un equipo listo para darte
            la bienvenida y ayudarte a encontrar tu lugar en nuestra familia.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/nuevo-visitante"
            className="bg-primary text-on-primary px-12 py-5 rounded-xl font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl inline-block"
          >
            ¿Primera vez aquí?
          </Link>
        </div>
      </div>
    </section>
  )
}
