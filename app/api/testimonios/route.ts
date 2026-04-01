import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { testimonios } from '@/lib/db/schema'
import { createTestimonioSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(testimonios)
      .orderBy(desc(testimonios.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener testimonios' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createTestimonioSchema.parse(body)

    const [testimonio] = await db
      .insert(testimonios)
      .values({
        nombre: data.nombre,
        correo: data.correo,
        contenido: data.contenido,
      })
      .returning()

    return NextResponse.json(testimonio, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear testimonio' },
      { status: 500 }
    )
  }
}
