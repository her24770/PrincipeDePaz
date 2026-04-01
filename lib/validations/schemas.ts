import { z } from 'zod'

export const createEventoSchema = z.object({
  titulo: z.string().min(1).max(200),
  descripcion: z.string().optional(),
  urlImagenPortada: z.string().url().optional(),
  fechaInicio: z.string().datetime(),
  fechaFin: z.string().datetime().optional(),
  ministerioId: z.string().uuid().optional(),
  estado: z
    .enum(['proximo', 'en_curso', 'completado', 'cancelado'])
    .default('proximo'),
  requiereRegistro: z.boolean().default(false),
  urlRegistro: z.string().url().optional(),
  creadoPor: z.string().uuid().optional(),
})

export type CreateEventoInput = z.infer<typeof createEventoSchema>

export const createAnuncioSchema = z.object({
  titulo: z.string().min(1).max(200),
  urlMedia: z.string().url(),
  tipoMedia: z.string().max(10).default('imagen'),
  orden: z.number().int().default(0),
  activo: z.boolean().default(true),
  expiraEn: z.string().datetime().optional(),
  creadoPor: z.string().uuid().optional(),
})

export type CreateAnuncioInput = z.infer<typeof createAnuncioSchema>

export const createMinisterioSchema = z.object({
  slug: z.string().min(1).max(50),
  nombre: z.string().min(1).max(100),
  descripcion: z.string().optional(),
  urlImagenPortada: z.string().url().optional(),
  activo: z.boolean().default(true),
})

export type CreateMinisterioInput = z.infer<typeof createMinisterioSchema>

export const createSedeSchema = z.object({
  nombre: z.string().min(1).max(150),
  direccion: z.string().min(1),
  ciudad: z.string().min(1).max(100),
  latitud: z.string().optional(),
  longitud: z.string().optional(),
  telefono: z.string().max(30).optional(),
  horario: z.string().max(200).optional(),
  activo: z.boolean().default(true),
})

export type CreateSedeInput = z.infer<typeof createSedeSchema>

export const createPeticionOracionSchema = z.object({
  nombre: z.string().min(1).max(150),
  correo: z.string().email().max(150).optional(),
  peticion: z.string().min(1),
  visibilidad: z.enum(['publica', 'privada']).default('privada'),
})

export type CreatePeticionOracionInput = z.infer<
  typeof createPeticionOracionSchema
>

export const createTestimonioSchema = z.object({
  nombre: z.string().min(1).max(150),
  correo: z.string().email().max(150).optional(),
  contenido: z.string().min(1),
})

export type CreateTestimonioInput = z.infer<typeof createTestimonioSchema>

export const createMensajeContactoSchema = z.object({
  nombre: z.string().min(1).max(150),
  correo: z.string().email().max(150),
  asunto: z.string().max(200).optional(),
  mensaje: z.string().min(1),
})

export type CreateMensajeContactoInput = z.infer<
  typeof createMensajeContactoSchema
>

export const createMaterialEstudioSchema = z.object({
  titulo: z.string().min(1).max(200),
  descripcion: z.string().optional(),
  contenido: z.string().optional(),
  urlArchivo: z.string().url().optional(),
  tipoArchivo: z.string().max(10).optional(),
  versiculo: z.string().optional(),
  referenciaVersiculo: z.string().max(100).optional(),
  serie: z.string().max(150).optional(),
  fechaPublicacion: z.string().date().optional(),
  ministerioId: z.string().uuid().optional(),
  orden: z.number().int().default(0),
  activo: z.boolean().default(true),
  creadoPor: z.string().uuid().optional(),
})

export type CreateMaterialEstudioInput = z.infer<
  typeof createMaterialEstudioSchema
>

export const createProyectoMisionSchema = z.object({
  slug: z.string().min(1).max(150),
  titulo: z.string().min(1).max(200),
  descripcion: z.string().optional(),
  tipo: z.enum([
    'evangelismo',
    'visita_orfanato',
    'ayuda_comunitaria',
    'otro',
  ]),
  estado: z
    .enum(['activo', 'completado', 'pausado'])
    .default('activo'),
  urlImagenPortada: z.string().url().optional(),
  grupoResponsable: z.string().max(150).optional(),
  creadoPor: z.string().uuid().optional(),
})

export type CreateProyectoMisionInput = z.infer<
  typeof createProyectoMisionSchema
>
