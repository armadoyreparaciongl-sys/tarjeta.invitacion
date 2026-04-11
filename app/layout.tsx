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
  description:
    'Estás invitado a celebrar la boda de Leo & Iris. Confirma tu asistencia y comparte este día especial con nosotros.',
  generator: 'v0.app',

  icons: {
    icon: [
      {
        url: '/LogoPrincipal.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/LogoPrincipal.png',
        media: '(prefers-color-scheme: dark)', // 👈 ojo typo (darsk → dark)
      },
      {
        url: '/LogoPrincipal.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },

  // 🔥 ESTO ES LO IMPORTANTE
  openGraph: {
    title: 'Leo & Iris - Nuestra Boda',
    description:
      '15 de Agosto 2026 • Te esperamos para compartir este día especial 💍',
    url: 'https://boda-iris-leo.vercel.app/', // o tu dominio
    siteName: 'Boda Leo & Iris',
    images: [
      {
        url: '/preview.png', // 👈 ESTE MANDA EN WHATSAPP
        width: 1200,
        height: 630,
        alt: 'Invitación de boda Leo & Iris',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Leo & Iris - Nuestra Boda',
    description: '15 de Agosto 2026',
    images: ['/preview.png'],
  },
};

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
