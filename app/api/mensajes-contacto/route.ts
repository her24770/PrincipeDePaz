import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { mensajesContacto } from '@/lib/db/schema'
import { createMensajeContactoSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(mensajesContacto)
      .orderBy(desc(mensajesContacto.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener mensajes de contacto' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createMensajeContactoSchema.parse(body)

    const [mensaje] = await db
      .insert(mensajesContacto)
      .values({
        nombre: data.nombre,
        correo: data.correo,
        asunto: data.asunto,
        mensaje: data.mensaje,
      })
      .returning()

    return NextResponse.json(mensaje, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear mensaje de contacto' },
      { status: 500 }
    )
  }
}
