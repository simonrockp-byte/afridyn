import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/SiteShell'
import { Footer } from '@/components/layout/Footer'
import { ClientProviders } from '@/components/ClientProviders'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { SITE_URL, COMPANY, SERVICE_NAMES } from '@/lib/site'

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-inter',
  display:  'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets:  ['latin'],
  weight:   ['500', '600', '700'],
  variable: '--font-display',
  display:  'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  variable: '--font-mono',
  display:  'swap',
})

const TITLE = 'Afridyn Engineering Limited | Engineering Services in Lusaka, Zambia'
const DESCRIPTION =
  'Afridyn Engineering Limited, Lusaka: mechanical & electrical spares, maintenance, engineering consultation, IT equipment, optical fibre installation, technical outsourcing, logistics and clearing & forwarding for mining, energy and industry across Zambia and Sub-Saharan Africa. ZPPA registered supplier.'

export const viewport: Viewport = {
  themeColor: '#07090D',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: {
    default:  TITLE,
    template: '%s | Afridyn Engineering',
  },
  description: DESCRIPTION,
  applicationName: COMPANY.name,
  keywords: [
    'Afridyn',
    'Afridyn Engineering',
    'Afridyn Engineering Limited',
    'engineering company Lusaka',
    'engineering services Zambia',
    'mining spares Zambia',
    'mechanical and electrical spares Zambia',
    'industrial maintenance Zambia',
    'electrical maintenance Lusaka',
    'fibre optic installation Zambia',
    'fusion splicing OTDR testing Zambia',
    'IT equipment supply Zambia',
    'technical outsourcing Zambia',
    'clearing and forwarding Zambia',
    'logistics consultancy Africa',
    'ZPPA registered supplier',
    'Copperbelt engineering services',
  ],
  authors:  [{ name: COMPANY.name, url: SITE_URL }],
  creator:  COMPANY.name,
  publisher: COMPANY.name,
  category: 'Engineering',
  openGraph: {
    type:        'website',
    locale:      'en_ZM',
    url:         SITE_URL,
    title:       TITLE,
    description: 'Mechanical, electrical, IT and fibre optic engineering for mining, energy and industry across Zambia and Sub-Saharan Africa.',
    siteName:    COMPANY.name,
  },
  twitter: {
    card:        'summary_large_image',
    title:       COMPANY.name,
    description: 'Engineering services for mining, energy and industry — Lusaka, Zambia.',
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // TODO(owner): paste the Google Search Console HTML-tag token here if you verify with a meta tag
  // verification: { google: '...' },
}

/** Organization + LocalBusiness structured data (only verified facts). */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id':   `${SITE_URL}/#organization`,
      name:    COMPANY.name,
      alternateName: ['Afridyn', COMPANY.shortName],
      url:     SITE_URL,
      logo:    `${SITE_URL}/images/logo-mark.png`,
      email:   COMPANY.email,
      telephone: COMPANY.phoneE164,
      identifier: [
        { '@type': 'PropertyValue', propertyID: 'PACRA', value: COMPANY.pacra },
        { '@type': 'PropertyValue', propertyID: 'TPIN',  value: COMPANY.tpin },
        { '@type': 'PropertyValue', propertyID: 'ZPPA',  value: COMPANY.zppa },
      ],
      // TODO(owner): add your Google Business Profile, LinkedIn and Facebook URLs once they exist
      // sameAs: ['https://www.linkedin.com/company/...', 'https://maps.google.com/?cid=...'],
    },
    {
      '@type': 'LocalBusiness',
      '@id':   `${SITE_URL}/#localbusiness`,
      name:    COMPANY.name,
      url:     SITE_URL,
      image:   `${SITE_URL}/opengraph-image`,
      logo:    `${SITE_URL}/images/logo-mark.png`,
      telephone: COMPANY.phoneE164,
      email:   COMPANY.email,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      address: {
        '@type': 'PostalAddress',
        streetAddress:   COMPANY.street,
        addressLocality: COMPANY.city,
        addressCountry:  COMPANY.countryCode,
      },
      areaServed: [
        { '@type': 'Country', name: 'Zambia' },
        { '@type': 'Place',   name: 'Sub-Saharan Africa' },
      ],
      knowsAbout: [...SERVICE_NAMES],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Engineering services',
        itemListElement: SERVICE_NAMES.map(s => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s, areaServed: 'Zambia' },
        })),
      },
      // TODO(owner): add geo (exact office coordinates) and openingHoursSpecification once confirmed
    },
    {
      '@type': 'WebSite',
      '@id':   `${SITE_URL}/#website`,
      url:     SITE_URL,
      name:    COMPANY.name,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-ZM',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-ZM"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* flag JS so scroll-reveal styles only hide content when JS can reveal it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#main" className="ax-skip">Skip to content</a>
        <div id="scroll-bar" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <ClientProviders>
          <SiteShell footer={<Footer />}>{children}</SiteShell>
        </ClientProviders>
        <ScrollProgressBar />
      </body>
    </html>
  )
}
