/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { ExpirationPlugin, NetworkFirst, NetworkOnly, Serwist } from 'serwist'

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

// Admin PWA service worker (ported from Milo Motors, adapted). Registered with
// scope /admin/ only, so the public website is never affected.
//  - Precache: the admin's JS/CSS chunks, fonts and the offline page
//    (the website's 3D chunks are filtered out in serwist.config.mjs).
//  - Admin pages are rendered on the server, so they're cached as you visit
//    them (network first, cached copy when offline or slow).
//  - Auth and sync always go to the network.

const isAdmin = (url: URL) => url.pathname === '/admin' || url.pathname.startsWith('/admin/')

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: { cleanupOutdatedCaches: true },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url, sameOrigin }) => sameOrigin && (url.pathname.startsWith('/api/auth/') || url.pathname.startsWith('/api/admin/')),
      handler: new NetworkOnly(),
    },
    // Full page loads of admin screens.
    {
      matcher: ({ request, url, sameOrigin }) => sameOrigin && request.mode === 'navigate' && isAdmin(url) && url.pathname !== '/admin/login',
      handler: new NetworkFirst({
        cacheName: 'afridyn-admin-pages',
        networkTimeoutSeconds: 4,
        plugins: [new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 })],
      }),
    },
    // In-app (client-side) navigations fetch React Server Component payloads.
    {
      matcher: ({ request, url, sameOrigin }) => sameOrigin && isAdmin(url) && request.method === 'GET' && (request.headers.get('RSC') === '1' || url.searchParams.has('_rsc')),
      handler: new NetworkFirst({
        cacheName: 'afridyn-admin-rsc',
        networkTimeoutSeconds: 4,
        plugins: [new ExpirationPlugin({ maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 })],
      }),
    },
    ...defaultCache,
  ],
  fallbacks: {
    entries: [
      {
        url: '/admin/offline',
        matcher: ({ request }) => request.destination === 'document' && isAdmin(new URL(request.url)),
      },
    ],
  },
})

// Sign-out asks the worker to forget cached admin pages (they contain client data).
self.addEventListener('message', (event) => {
  if (event.data?.type === 'afridyn-clear-admin-cache') {
    event.waitUntil(Promise.all([caches.delete('afridyn-admin-pages'), caches.delete('afridyn-admin-rsc')]))
  }
})

serwist.addEventListeners()
