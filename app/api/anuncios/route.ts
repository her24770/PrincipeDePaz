import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { anuncios } from '@/lib/db/schema'
import { createAnuncioSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(anuncios)
      .orderBy(desc(anuncios.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener anuncios' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createAnuncioSchema.parse(body)

    const [anuncio] = await db
      .insert(anuncios)
      .values({
        titulo: data.titulo,
        urlMedia: data.urlMedia,
        tipoMedia: data.tipoMedia,
        orden: data.orden,
        activo: data.activo,
        expiraEn: data.expiraEn ? new Date(data.expiraEn) : undefined,
        creadoPor: data.creadoPor,
      })
      .returning()

    return NextResponse.json(anuncio, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear anuncio' },
      { status: 500 }
    )
  }
}
