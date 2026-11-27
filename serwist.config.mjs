import { readFileSync } from 'node:fs'
import { serwist } from '@serwist/next/config'

// Configurator mode (works with Turbopack): the service worker is built after
// `next build` — see the "build" / "vercel-build" scripts. Ported from Milo Motors.
//
// The admin installs from the same origin as the marketing site, so the
// website's heavy chunks (three.js hero, post-processing) are kept out of the
// precache; otherwise every phone that installs the admin downloads ~1 MB of
// 3D code it never uses.

const SITE_ONLY_MARKERS = [
  ['WebGLRenderer', 'ShaderMaterial'], // three.js / react-three-fiber / drei
  ['EffectComposer', 'BloomEffect'], // postprocessing
]

function isSiteOnlyChunk(path) {
  if (!path.startsWith('.next/static/chunks/') || !path.endsWith('.js')) return false
  let text
  try {
    text = readFileSync(path, 'utf8')
  } catch {
    return false
  }
  if (text.length < 5_000) return false
  return SITE_ONLY_MARKERS.some((markers) => markers.every((m) => text.includes(m)))
}

function keep(url) {
  const path = url.split('?')[0]
  // Prerendered pages: only the admin offline page.
  if (path.startsWith('.next/server/')) return /^\.next\/server\/app\/admin\/offline\.html$/.test(path)
  // Website photos bundled through next/image static imports.
  if (/^\.next\/static\/media\/.*\.(webp|jpe?g|png|avif)$/.test(path)) return false
  return !isSiteOnlyChunk(path)
}

export default serwist({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  // Only the logo mark and PWA icons from public/ (used by PDFs and the install icon).
  globIgnores: ['public/images/**', 'public/*.svg', 'public/sw.js'],
  additionalPrecacheEntries: [{ url: '/images/logo-mark.png', revision: '1' }],
  manifestTransforms: [
    async (entries) => ({
      manifest: entries.filter((entry) => keep(entry.url)),
      warnings: [],
    }),
  ],
})
