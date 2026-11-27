import type { MetadataRoute } from 'next'
import { SITE_URL, PUBLIC_ROUTES } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    // Home is the bare origin; other pages have no trailing slash.
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
