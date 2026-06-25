import type { Metadata } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/SiteShell'
import { ClientProviders } from '@/components/ClientProviders'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display:  'swap',
})

const outfit = Outfit({
  subsets:  ['latin'],
  weight:   ['600', '700', '800', '900'],
  variable: '--font-outfit',
  display:  'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  variable: '--font-mono',
  display:  'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://afridynengineering.com'),
  title: {
    default:  'Afridyn Engineering Limited | Engineering Excellence Across Africa',
    template: '%s | Afridyn Engineering',
  },
  description:
    'Professional engineering and technical services for industrial, mining, construction, and infrastructure sectors across Sub-Saharan Africa. Mechanical, electrical, IT, optical fibre solutions and maintenance services. ZPPA approved.',
  keywords: [
    'engineering services Zambia',
    'mechanical engineering Africa',
    'electrical maintenance Lusaka',
    'mining equipment supply Zambia',
    'industrial engineering',
    'infrastructure support Africa',
    'technical services Lusaka',
    'engineering consultation',
    'fibre optic installation Zambia',
    'logistics consultancy Africa',
    'ZPPA approved supplier',
    'IT equipment supply Zambia',
  ],
  authors:  [{ name: 'Afridyn Engineering Limited' }],
  openGraph: {
    type:        'website',
    locale:      'en_ZM',
    url:         'https://afridynengineering.com',
    title:       'Afridyn Engineering Limited | Engineering Excellence Across Africa',
    description: 'Professional engineering services for industrial, mining, and infrastructure sectors across Africa.',
    siteName:    'Afridyn Engineering Limited',
    images: [
      {
        url:    '/images/og-image.png',
        width:  1200,
        height: 630,
        alt:    'Afridyn Engineering Limited',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Afridyn Engineering Limited',
    description: 'Engineering Excellence Across Africa',
    images:      ['/images/og-image.png'],
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-ZM"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div id="scroll-bar" />
        <ClientProviders>
          <SiteShell>{children}</SiteShell>
        </ClientProviders>
        <ScrollProgressBar />
      </body>
    </html>
  )
}
