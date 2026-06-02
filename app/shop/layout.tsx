import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industrial Supplies & Engineering Equipment Shop',
  description:
    'Shop premium industrial tools, safety gear, welding supplies, and lubricants from top brands like Bosch, Ingco, and Texaco. Delivered across Sub-Saharan Africa by Afridyn Engineering.',
  keywords: [
    'industrial supplies Zambia',
    'engineering equipment Africa',
    'Bosch tools Zambia',
    'safety equipment Lusaka',
    'welding supplies Africa',
    'compressor oil Zambia',
    'industrial tools online shop',
    'Ingco tools Africa',
  ],
  openGraph: {
    title: 'Industrial Supplies & Equipment | Afridyn Engineering Shop',
    description:
      'Premium tools, safety gear, and industrial equipment from leading brands — delivered across Africa.',
    url: '/shop',
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
