import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Afridyn Engineering Limited | Engineering Excellence Across Africa',
  description: 'Professional engineering and technical services for industrial, mining, and infrastructure sectors across Zambia and Sub-Saharan Africa. PACRA, TPIN, and ZPPA certified.',
  keywords: 'engineering, mechanical, electrical, maintenance, mining, industrial, Zambia, Africa, fibre optic, IT equipment, logistics',
  openGraph: {
    title: 'Afridyn Engineering Limited',
    description: 'Engineering Excellence Across Africa',
    type: 'website',
  }
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
