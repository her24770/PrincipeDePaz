import { db } from '@/lib/db'
import { createServiceClient } from '@/lib/supabase/server'
import { anuncios, eventos, promesasBiblicas, sedes, ministerios } from '@/lib/db/schema'
import { eq, asc, and, or, isNull, gt, sql } from 'drizzle-orm'

export type AnuncioRow = typeof anuncios.$inferSelect
export type EventoRow = typeof eventos.$inferSelect
export type PromesaRow = typeof promesasBiblicas.$inferSelect
export type SedeRow = typeof sedes.$inferSelect

export async function getAnunciosActivos(): Promise<AnuncioRow[]> {
  return db
    .select()
    .from(anuncios)
    .where(
      and(
        eq(anuncios.activo, true),
        or(isNull(anuncios.expiraEn), gt(anuncios.expiraEn, new Date()))
      )
    )
    .orderBy(asc(anuncios.orden))
    .limit(8)
}

export async function getEventosProximos(): Promise<EventoRow[]> {
  return db
    .select()
    .from(eventos)
    .where(eq(eventos.estado, 'proximo'))
    .orderBy(asc(eventos.fechaInicio))
    .limit(3)
}

export async function getPromesaDelDia(): Promise<PromesaRow | null> {
  const rows = await db
    .select()
    .from(promesasBiblicas)
    .where(eq(promesasBiblicas.activo, true))
    .orderBy(sql`RANDOM()`)
    .limit(1)
  return rows[0] ?? null
}

export async function getSedesActivas(): Promise<SedeRow[]> {
  return db.select().from(sedes).where(eq(sedes.activo, true))
}

export type MinisterioRow = typeof ministerios.$inferSelect

export async function getMinisteriosActivos(): Promise<MinisterioRow[]> {
  return db
    .select()
    .from(ministerios)
    .where(eq(ministerios.activo, true))
    .orderBy(asc(ministerios.nombre))
}

export async function getHeroImages(): Promise<string[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase.storage
    .from('imagenes-publicas')
    .list('hero', { sortBy: { column: 'name', order: 'asc' } })

  if (error) {
    console.error('[getHeroImages] storage list error:', error.message)
    return []
  }
  if (!data || data.length === 0) {
    console.warn('[getHeroImages] no files found in imagenes-publicas/hero/')
    return []
  }

  return data
    .filter((f) => f.name !== '.emptyFolderPlaceholder' && f.id !== null)
    .map((f) => {
      const { data: urlData } = supabase.storage
        .from('imagenes-publicas')
        .getPublicUrl(`hero/${f.name}`)
      return urlData.publicUrl
    })
}
