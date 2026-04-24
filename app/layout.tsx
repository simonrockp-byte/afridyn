import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://afridynengineering.com'),
  title: {
    default: 'Afridyn Engineering Limited | Engineering Excellence Across Africa',
    template: '%s | Afridyn Engineering',
  },
  description: 'Professional engineering and technical services for industrial, mining, construction, and infrastructure sectors across Sub-Saharan Africa. Mechanical, electrical, IT, optical fibre solutions and maintenance services. ZPPA approved.',
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
  authors: [{ name: 'Afridyn Engineering Limited' }],
  openGraph: {
    type: 'website',
    locale: 'en_ZM',
    url: '/',
    title: 'Afridyn Engineering Limited | Engineering Excellence Across Africa',
    description: 'Professional engineering services for industrial, mining, and infrastructure sectors across Africa.',
    siteName: 'Afridyn Engineering Limited',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afridyn Engineering Limited',
    description: 'Engineering Excellence Across Africa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div id="scroll-bar" />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Scroll progress
            window.addEventListener('scroll', function() {
              var p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
              document.getElementById('scroll-bar').style.transform = 'scaleX(' + p + ')';
            }, {passive: true});
            // Reveal observer
            var observer = new IntersectionObserver(function(entries) {
              entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('visible'); }
              });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
            });
          `
        }} />
      </body>
    </html>
  )
}
