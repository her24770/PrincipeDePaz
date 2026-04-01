import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  date,
} from 'drizzle-orm/pg-core'

// Enums
export const rolUsuarioEnum = pgEnum('rol_usuario', ['admin', 'pastor'])

export const estadoAprobacionEnum = pgEnum('estado_aprobacion', [
  'pendiente',
  'aprobado',
  'rechazado',
])

export const visibilidadOracionEnum = pgEnum('visibilidad_oracion', [
  'publica',
  'privada',
])

export const estadoEventoEnum = pgEnum('estado_evento', [
  'proximo',
  'en_curso',
  'completado',
  'cancelado',
])

export const estadoProyectoMisionEnum = pgEnum('estado_proyecto_mision', [
  'activo',
  'completado',
  'pausado',
])

export const tipoProyectoMisionEnum = pgEnum('tipo_proyecto_mision', [
  'evangelismo',
  'visita_orfanato',
  'ayuda_comunitaria',
  'otro',
])

export const origenFotoEnum = pgEnum('origen_foto', [
  'evento',
  'proyecto_mision',
])

// Tables

export const perfiles = pgTable('perfiles', {
  id: uuid('id').primaryKey(),
  rol: rolUsuarioEnum('rol').notNull(),
  nombreCompleto: varchar('nombre_completo', { length: 150 }),
  urlAvatar: text('url_avatar'),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const sedes = pgTable('sedes', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 150 }).notNull(),
  direccion: text('direccion').notNull(),
  ciudad: varchar('ciudad', { length: 100 }).notNull(),
  latitud: varchar('latitud'),
  longitud: varchar('longitud'),
  telefono: varchar('telefono', { length: 30 }),
  horario: varchar('horario', { length: 200 }),
  activo: boolean('activo').notNull().default(true),
})

export const ministerios = pgTable('ministerios', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  descripcion: text('descripcion'),
  urlImagenPortada: text('url_imagen_portada'),
  activo: boolean('activo').notNull().default(true),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const solicitudesUnionMinisterio = pgTable(
  'solicitudes_union_ministerio',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    ministerioId: uuid('ministerio_id')
      .notNull()
      .references(() => ministerios.id, { onDelete: 'cascade' }),
    nombreCompleto: varchar('nombre_completo', { length: 150 }).notNull(),
    correo: varchar('correo', { length: 150 }),
    telefono: varchar('telefono', { length: 30 }),
    mensaje: text('mensaje'),
    creadoEn: timestamp('creado_en', { withTimezone: true })
      .notNull()
      .defaultNow(),
  }
)

export const eventos = pgTable('eventos', {
  id: uuid('id').primaryKey().defaultRandom(),
  titulo: varchar('titulo', { length: 200 }).notNull(),
  descripcion: text('descripcion'),
  urlImagenPortada: text('url_imagen_portada'),
  fechaInicio: timestamp('fecha_inicio', { withTimezone: true }).notNull(),
  fechaFin: timestamp('fecha_fin', { withTimezone: true }),
  ministerioId: uuid('ministerio_id').references(() => ministerios.id, {
    onDelete: 'set null',
  }),
  estado: estadoEventoEnum('estado').notNull().default('proximo'),
  requiereRegistro: boolean('requiere_registro').notNull().default(false),
  urlRegistro: text('url_registro'),
  creadoPor: uuid('creado_por').references(() => perfiles.id, {
    onDelete: 'set null',
  }),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const anuncios = pgTable('anuncios', {
  id: uuid('id').primaryKey().defaultRandom(),
  titulo: varchar('titulo', { length: 200 }).notNull(),
  urlMedia: text('url_media').notNull(),
  tipoMedia: varchar('tipo_media', { length: 10 }).notNull().default('imagen'),
  orden: integer('orden').notNull().default(0),
  activo: boolean('activo').notNull().default(true),
  expiraEn: timestamp('expira_en', { withTimezone: true }),
  creadoPor: uuid('creado_por').references(() => perfiles.id, {
    onDelete: 'set null',
  }),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const proyectosMision = pgTable('proyectos_mision', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  titulo: varchar('titulo', { length: 200 }).notNull(),
  descripcion: text('descripcion'),
  tipo: tipoProyectoMisionEnum('tipo').notNull(),
  estado: estadoProyectoMisionEnum('estado').notNull().default('activo'),
  urlImagenPortada: text('url_imagen_portada'),
  grupoResponsable: varchar('grupo_responsable', { length: 150 }),
  creadoPor: uuid('creado_por').references(() => perfiles.id, {
    onDelete: 'set null',
  }),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const fotos = pgTable('fotos', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  descripcion: varchar('descripcion', { length: 300 }),
  orden: integer('orden').notNull().default(0),
  perteneceA: origenFotoEnum('pertenece_a').notNull(),
  eventoId: uuid('evento_id').references(() => eventos.id, {
    onDelete: 'cascade',
  }),
  proyectoId: uuid('proyecto_id').references(() => proyectosMision.id, {
    onDelete: 'cascade',
  }),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const materialEstudio = pgTable('material_estudio', {
  id: uuid('id').primaryKey().defaultRandom(),
  titulo: varchar('titulo', { length: 200 }).notNull(),
  descripcion: text('descripcion'),
  contenido: text('contenido'),
  urlArchivo: text('url_archivo'),
  tipoArchivo: varchar('tipo_archivo', { length: 10 }),
  versiculo: text('versiculo'),
  referenciaVersiculo: varchar('referencia_versiculo', { length: 100 }),
  serie: varchar('serie', { length: 150 }),
  fechaPublicacion: date('fecha_publicacion'),
  ministerioId: uuid('ministerio_id').references(() => ministerios.id, {
    onDelete: 'set null',
  }),
  orden: integer('orden').notNull().default(0),
  activo: boolean('activo').notNull().default(true),
  creadoPor: uuid('creado_por').references(() => perfiles.id, {
    onDelete: 'set null',
  }),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const categoriasPromesa = pgTable('categorias_promesa', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 100 }).notNull().unique(),
})

export const promesasBiblicas = pgTable('promesas_biblicas', {
  id: uuid('id').primaryKey().defaultRandom(),
  texto: text('texto').notNull(),
  referencia: varchar('referencia', { length: 100 }).notNull(),
  categoriaId: uuid('categoria_id').references(() => categoriasPromesa.id, {
    onDelete: 'set null',
  }),
  activo: boolean('activo').notNull().default(true),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const peticionesOracion = pgTable('peticiones_oracion', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 150 }).notNull(),
  correo: varchar('correo', { length: 150 }),
  peticion: text('peticion').notNull(),
  visibilidad: visibilidadOracionEnum('visibilidad').notNull().default('privada'),
  estado: estadoAprobacionEnum('estado').notNull().default('pendiente'),
  revisadoPor: uuid('revisado_por').references(() => perfiles.id, {
    onDelete: 'set null',
  }),
  revisadoEn: timestamp('revisado_en', { withTimezone: true }),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const testimonios = pgTable('testimonios', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 150 }).notNull(),
  correo: varchar('correo', { length: 150 }),
  contenido: text('contenido').notNull(),
  estado: estadoAprobacionEnum('estado').notNull().default('pendiente'),
  revisadoPor: uuid('revisado_por').references(() => perfiles.id, {
    onDelete: 'set null',
  }),
  revisadoEn: timestamp('revisado_en', { withTimezone: true }),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const mensajesContacto = pgTable('mensajes_contacto', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 150 }).notNull(),
  correo: varchar('correo', { length: 150 }).notNull(),
  asunto: varchar('asunto', { length: 200 }),
  mensaje: text('mensaje').notNull(),
  leido: boolean('leido').notNull().default(false),
  creadoEn: timestamp('creado_en', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const cuentasDonacion = pgTable('cuentas_donacion', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombreBanco: varchar('nombre_banco', { length: 100 }).notNull(),
  titularCuenta: varchar('titular_cuenta', { length: 150 }).notNull(),
  numeroCuenta: varchar('numero_cuenta', { length: 60 }).notNull(),
  tipoCuenta: varchar('tipo_cuenta', { length: 50 }),
  moneda: varchar('moneda', { length: 10 }).notNull().default('GTQ'),
  proposito: varchar('proposito', { length: 100 }),
  activo: boolean('activo').notNull().default(true),
  orden: integer('orden').notNull().default(0),
})
