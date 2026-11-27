import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export type Db = PostgresJsDatabase<typeof schema>

// Pinned to globalThis in dev so module reloads reuse one pool.
const globalForDb = globalThis as unknown as { __afridynDb?: Db }

let cached: Db | null = null

// Lazy (ported from Milo): importing never throws, because `next build`
// evaluates route modules before DATABASE_URL may exist. The pool opens on the
// first query. postgres.js over TCP because offline sync needs interactive
// transactions.
export function getDb(): Db {
  if (cached) return cached
  if (globalForDb.__afridynDb) return (cached = globalForDb.__afridynDb)

  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set.')
  const client = postgres(url, { max: Number(process.env.DATABASE_POOL_MAX ?? '5') })
  cached = drizzle(client, { schema })
  if (process.env.NODE_ENV !== 'production') globalForDb.__afridynDb = cached
  return cached
}
