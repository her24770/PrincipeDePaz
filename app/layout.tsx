import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iglesia Príncipe de Paz',
  description: 'Plataforma web de la Iglesia Príncipe de Paz, Guatemala',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
