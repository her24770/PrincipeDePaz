import { PromesaRow } from '@/lib/queries/landing'

const PROMESA_FALLBACK = {
  texto:
    'Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.',
  referencia: 'Salmo 23:1-2',
}

interface DevotionalBlockProps {
  promesa: PromesaRow | null
}

export default function DevotionalBlock({ promesa }: DevotionalBlockProps) {
  const { texto, referencia } = promesa ?? PROMESA_FALLBACK

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="relative bg-primary-container rounded-[2rem] p-12 md:p-24 overflow-hidden text-center">
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="devotional-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#devotional-dots)" />
            </svg>
          </div>

          <div className="relative z-10">
            <span
              className="material-symbols-outlined text-secondary-fixed mb-8 block"
              style={{ fontSize: '4rem', fontVariationSettings: '"FILL" 1' }}
            >
              format_quote
            </span>

            <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 italic leading-tight max-w-4xl mx-auto">
              &ldquo;{texto}&rdquo;
            </h2>

            <div className="h-1 w-20 bg-secondary-fixed mx-auto mb-6 rounded-full" />

            <p className="text-secondary-fixed font-bold tracking-[0.2em] text-sm uppercase">
              {referencia}
            </p>

            <div className="mt-12 flex justify-center gap-4">
              <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
