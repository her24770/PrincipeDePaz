import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-100 w-full mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <p className="text-2xl font-bold font-serif text-primary">
            Iglesia Príncipe de Paz
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Brillando la luz de Cristo en Guatemala y el mundo entero a través de la
            fe, el servicio y el amor fraternal.
          </p>
        </div>

        {/* Conectar */}
        <div>
          <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">
            Conectar
          </h4>
          <ul className="space-y-4">
            <li>
              <Link href="/nosotros" className="text-slate-600 hover:text-primary transition-colors">
                Nuestra Historia
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-slate-600 hover:text-primary transition-colors">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/ministerios" className="text-slate-600 hover:text-primary transition-colors">
                Ministerios
              </Link>
            </li>
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">
            Recursos
          </h4>
          <ul className="space-y-4">
            <li>
              <Link href="/material-estudio" className="text-slate-600 hover:text-primary transition-colors">
                Material de Estudio
              </Link>
            </li>
            <li>
              <Link href="/preguntas" className="text-slate-600 hover:text-primary transition-colors">
                Preguntas Frecuentes
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="text-slate-600 hover:text-primary transition-colors">
                Privacidad
              </Link>
            </li>
          </ul>
        </div>

        {/* Visítanos */}
        <div>
          <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">
            Visítanos
          </h4>
          <div className="space-y-4">
            <p className="text-slate-600 text-sm">Zona 1, Ciudad de Guatemala</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:bg-secondary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:bg-secondary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="md:col-span-4 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Iglesia Príncipe de Paz. Guatemala.
          </p>
          <div className="flex gap-8">
            <Link href="/privacidad" className="text-slate-600 text-xs hover:text-secondary underline">
              Privacidad
            </Link>
            <Link href="/contacto" className="text-slate-600 text-xs hover:text-secondary underline">
              Contacto
            </Link>
            <Link href="/preguntas" className="text-slate-600 text-xs hover:text-secondary underline">
              Preguntas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
