import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { ministerios } from '@/lib/db/schema'
import { createMinisterioSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(ministerios)
      .orderBy(desc(ministerios.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener ministerios' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createMinisterioSchema.parse(body)

    const [ministerio] = await db
      .insert(ministerios)
      .values({
        slug: data.slug,
        nombre: data.nombre,
        descripcion: data.descripcion,
        urlImagenPortada: data.urlImagenPortada,
        activo: data.activo,
      })
      .returning()

    return NextResponse.json(ministerio, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear ministerio' },
      { status: 500 }
    )
  }
}
