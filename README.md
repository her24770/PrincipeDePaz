# Iglesia Príncipe de Paz — Plataforma Web

Plataforma web para la Iglesia Príncipe de Paz, Guatemala. Construida con Next.js 15 App Router, Drizzle ORM + Supabase (PostgreSQL) y Supabase Auth.

## Stack técnico

- **Framework**: Next.js 15 (App Router, TypeScript, `output: standalone`)
- **Base de datos**: Supabase (PostgreSQL) via Drizzle ORM
- **Autenticación**: Supabase Auth con `@supabase/ssr`
- **Storage**: Supabase Storage
- **Validación**: Zod
- **Runtime**: Node 22 Alpine (Docker multi-stage)

## Desarrollo local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Editar `.env.local` con los valores reales de tu proyecto Supabase:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (solo servidor) |
| `DATABASE_URL` | Cadena de conexión PostgreSQL directa |
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio |

### 3. Aplicar esquema de base de datos

```bash
# Generar migraciones
npm run db:generate

# Aplicar migraciones a la base de datos
npm run db:push
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

## Docker

### Construir y ejecutar con Docker Compose

```bash
docker-compose up --build
```

La aplicación se servirá en el puerto `3000`. Asegúrate de tener el archivo `.env.local` con todas las variables configuradas antes de ejecutar.

### Construir imagen manualmente

```bash
docker build -t principe-de-paz .
docker run -p 3000:3000 --env-file .env.local principe-de-paz
```

## Comandos de base de datos

| Comando | Descripción |
|---|---|
| `npm run db:generate` | Genera archivos de migración SQL en `/drizzle` |
| `npm run db:push` | Aplica el esquema directamente a la base de datos |
| `npm run db:studio` | Abre Drizzle Studio (explorador visual de BD) |

## Estructura del proyecto

```
/
├── app/
│   ├── layout.tsx              # Root layout (requerido por App Router)
│   └── api/
│       ├── eventos/route.ts
│       ├── anuncios/route.ts
│       ├── ministerios/route.ts
│       ├── sedes/route.ts
│       ├── peticiones-oracion/route.ts
│       ├── testimonios/route.ts
│       ├── mensajes-contacto/route.ts
│       ├── material-estudio/route.ts
│       └── proyectos-mision/route.ts
├── lib/
│   ├── db/
│   │   ├── schema.ts           # Esquema Drizzle ORM (todas las tablas y enums)
│   │   └── index.ts            # Instancia de DB
│   ├── supabase/
│   │   ├── client.ts           # Cliente de navegador
│   │   └── server.ts           # Cliente de servidor + cliente de servicio
│   └── validations/
│       └── schemas.ts          # Esquemas Zod para validación de API
├── middleware.ts               # Protección de rutas /admin y /panel con Supabase Auth
├── drizzle.config.ts
├── next.config.ts
├── Dockerfile
└── docker-compose.yml
```

### Estructura de rutas futura (App Router)

El proyecto está preparado para incorporar el frontend en la misma app usando route groups:

```
app/
├── (public)/           # Páginas públicas del sitio
├── (auth)/             # Páginas de autenticación (/login, /registro)
└── (admin)/            # Panel de administración protegido
```

## API Endpoints

Todos los endpoints responden JSON. Los `POST` validan el cuerpo con Zod y retornan `400` para errores de validación, `500` para errores de base de datos.

| Método | Ruta | Descripción |
|---|---|---|
| GET/POST | `/api/eventos` | Eventos de la iglesia |
| GET/POST | `/api/anuncios` | Anuncios y banners |
| GET/POST | `/api/ministerios` | Ministerios |
| GET/POST | `/api/sedes` | Sedes / ubicaciones |
| GET/POST | `/api/peticiones-oracion` | Peticiones de oración |
| GET/POST | `/api/testimonios` | Testimonios |
| GET/POST | `/api/mensajes-contacto` | Formulario de contacto |
| GET/POST | `/api/material-estudio` | Material de estudio bíblico |
| GET/POST | `/api/proyectos-mision` | Proyectos de misión |
