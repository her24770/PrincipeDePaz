import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { proyectosMision } from '@/lib/db/schema'
import { createProyectoMisionSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(proyectosMision)
      .orderBy(desc(proyectosMision.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener proyectos de misión' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createProyectoMisionSchema.parse(body)

    const [proyecto] = await db
      .insert(proyectosMision)
      .values({
        slug: data.slug,
        titulo: data.titulo,
        descripcion: data.descripcion,
        tipo: data.tipo,
        estado: data.estado,
        urlImagenPortada: data.urlImagenPortada,
        grupoResponsable: data.grupoResponsable,
        creadoPor: data.creadoPor,
      })
      .returning()

    return NextResponse.json(proyecto, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear proyecto de misión' },
      { status: 500 }
    )
  }
}
