export default function StreamingSection() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold mb-6">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              EN VIVO
            </div>
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">
              Sigue nuestro servicio en vivo
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              No importa dónde te encuentres, eres parte de nuestra congregación.
              Acompáñanos cada domingo a las 10:00 AM para una palabra fresca y
              adoración inspiradora.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <p className="text-on-surface">Transmisión en Alta Definición</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <p className="text-on-surface">Chat interactivo de oración</p>
              </div>
            </div>
            <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">live_tv</span>
              Ver en vivo
            </button>
          </div>

          {/* Video placeholder */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary-container to-primary-container opacity-20 blur-2xl rounded-[1.5rem] group-hover:opacity-30 transition-opacity" />
            <div className="relative aspect-video bg-gradient-to-br from-primary to-primary-container rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined text-white text-4xl"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl inline-block">
                  <p className="text-white text-sm font-medium">
                    Última enseñanza: Caminando en Fe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
