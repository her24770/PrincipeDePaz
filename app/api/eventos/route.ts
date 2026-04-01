import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { eventos } from '@/lib/db/schema'
import { createEventoSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(eventos)
      .orderBy(desc(eventos.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener eventos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createEventoSchema.parse(body)

    const [evento] = await db
      .insert(eventos)
      .values({
        titulo: data.titulo,
        descripcion: data.descripcion,
        urlImagenPortada: data.urlImagenPortada,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined,
        ministerioId: data.ministerioId,
        estado: data.estado,
        requiereRegistro: data.requiereRegistro,
        urlRegistro: data.urlRegistro,
        creadoPor: data.creadoPor,
      })
      .returning()

    return NextResponse.json(evento, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear evento' },
      { status: 500 }
    )
  }
}
