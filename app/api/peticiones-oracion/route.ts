import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { peticionesOracion } from '@/lib/db/schema'
import { createPeticionOracionSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(peticionesOracion)
      .orderBy(desc(peticionesOracion.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener peticiones de oración' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createPeticionOracionSchema.parse(body)

    const [peticion] = await db
      .insert(peticionesOracion)
      .values({
        nombre: data.nombre,
        correo: data.correo,
        peticion: data.peticion,
        visibilidad: data.visibilidad,
      })
      .returning()

    return NextResponse.json(peticion, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear petición de oración' },
      { status: 500 }
    )
  }
}
