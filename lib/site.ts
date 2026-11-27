/** Canonical public URL of the site (no trailing slash). Empty/unset env falls back to the default. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://afridyn.world').replace(/\/+$/, '')

/** Public, indexable routes. Keep in sync with app/ pages; used by the sitemap. */
export const PUBLIC_ROUTES = [
  { path: '/',     changeFrequency: 'monthly', priority: 1 },
  { path: '/shop', changeFrequency: 'weekly',  priority: 0.9 },
] as const
