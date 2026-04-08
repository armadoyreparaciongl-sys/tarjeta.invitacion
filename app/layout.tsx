import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AudioProvider } from '@/context/AudioContext';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Leo & Iris - Nuestra Boda',
  description: 'Estás invitado a celebrar la boda de Leo & Iris. Confirma tu asistencia y comparte este día especial con nosotros.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/LogoPrincipal.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/LogoPrincipal.png',
        media: '(prefers-color-scheme: darsk)',
      },
      {
        url: '/LogoPrincipal.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${cormorant.variable} font-serif antialiased`}>
        <AudioProvider>
          {children}
        </AudioProvider>
        <Analytics />
      </body>
    </html>
  )
}
