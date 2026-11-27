import { CONTACT_INFO } from '@/lib/contact-info'

/** Canonical public URL of the site (no trailing slash). Empty/unset env falls back to the default. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://afridyn.world').replace(/\/+$/, '')

/** Public, indexable routes. Keep in sync with app/ pages; used by the sitemap. */
export const PUBLIC_ROUTES = [
  { path: '/',     changeFrequency: 'monthly', priority: 1 },
  { path: '/shop', changeFrequency: 'weekly',  priority: 0.9 },
] as const

/** Verified company facts — the only figures the site may state. Do not add unverified claims here. */
export const COMPANY = {
  name:      'Afridyn Engineering Limited',
  shortName: 'Afridyn Engineering',
  street:    '31 Salama Park',
  city:      'Lusaka',
  country:   'Zambia',
  countryCode: 'ZM',
  phone:     CONTACT_INFO.phones[0],          // display format
  phoneE164: '+260977244549',
  whatsapp:  '260977244549',
  email:     CONTACT_INFO.email,
  pacra:     '120261040695',
  tpin:      '2004257975',
  zppa:      '137269',
} as const

export const SERVICE_NAMES = [
  'Mechanical & Electrical Spares Supply',
  'Mechanical & Electrical Maintenance',
  'Engineering Consultation',
  'IT Equipment Supply',
  'Optical Fibre Installation & Splicing',
  'Technical Outsourcing',
  'Logistics Consultancy',
  'Clearing & Forwarding',
] as const
