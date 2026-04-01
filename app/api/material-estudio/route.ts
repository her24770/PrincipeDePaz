import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { materialEstudio } from '@/lib/db/schema'
import { createMaterialEstudioSchema } from '@/lib/validations/schemas'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(materialEstudio)
      .orderBy(desc(materialEstudio.creadoEn))
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener material de estudio' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = createMaterialEstudioSchema.parse(body)

    const [material] = await db
      .insert(materialEstudio)
      .values({
        titulo: data.titulo,
        descripcion: data.descripcion,
        contenido: data.contenido,
        urlArchivo: data.urlArchivo,
        tipoArchivo: data.tipoArchivo,
        versiculo: data.versiculo,
        referenciaVersiculo: data.referenciaVersiculo,
        serie: data.serie,
        fechaPublicacion: data.fechaPublicacion,
        ministerioId: data.ministerioId,
        orden: data.orden,
        activo: data.activo,
        creadoPor: data.creadoPor,
      })
      .returning()

    return NextResponse.json(material, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear material de estudio' },
      { status: 500 }
    )
  }
}
