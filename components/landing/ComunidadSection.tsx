import Link from 'next/link'

export default function ComunidadSection() {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Peticiones de oración */}
          <div className="text-center md:text-left">
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">auto_awesome</span>
            </div>
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">
              ¿Podemos orar por ti?
            </h2>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              Si tienes alguna petición especial, queremos acompañarte en oración.
              Tu comunidad está contigo.
            </p>
            <Link
              href="/oracion"
              className="border-2 border-primary text-primary px-10 py-4 rounded-xl font-bold hover:bg-primary/5 transition-all inline-block"
            >
              Hacer una petición
            </Link>
          </div>

          {/* Donaciones */}
          <div className="text-center md:text-left">
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-container/20 text-secondary">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
            </div>
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">
              Sosteniendo la Misión
            </h2>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              Tu generosidad nos permite llevar el mensaje de esperanza a más
              personas y servir a los necesitados en nuestra comunidad.
            </p>
            <Link
              href="/donaciones"
              className="bg-primary text-on-primary px-10 py-4 rounded-xl font-extrabold hover:opacity-90 transition-all shadow-lg inline-block"
            >
              Donar
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
