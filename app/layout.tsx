import type { Metadata } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ClientProviders } from '@/components/ClientProviders'

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
    url:         '/',
    title:       'Afridyn Engineering Limited | Engineering Excellence Across Africa',
    description: 'Professional engineering services for industrial, mining, and infrastructure sectors across Africa.',
    siteName:    'Afridyn Engineering Limited',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Afridyn Engineering Limited',
    description: 'Engineering Excellence Across Africa',
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
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div id="scroll-bar" />
        <Navigation />
        <ClientProviders>
          <main>{children}</main>
        </ClientProviders>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('scroll', function() {
                var p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
                var bar = document.getElementById('scroll-bar');
                if (bar) bar.style.transform = 'scaleX(' + p + ')';
              }, { passive: true });
              var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                  if (e.isIntersecting) e.target.classList.add('visible');
                });
              }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
              document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
