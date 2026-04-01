import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sedes } from '@/lib/db/schema'
import { createSedeSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db.select().from(sedes)
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener sedes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createSedeSchema.parse(body)

    const [sede] = await db
      .insert(sedes)
      .values({
        nombre: data.nombre,
        direccion: data.direccion,
        ciudad: data.ciudad,
        latitud: data.latitud,
        longitud: data.longitud,
        telefono: data.telefono,
        horario: data.horario,
        activo: data.activo,
      })
      .returning()

    return NextResponse.json(sede, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear sede' },
      { status: 500 }
    )
  }
}
