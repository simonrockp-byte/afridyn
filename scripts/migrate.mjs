// Runs before every Vercel build ("vercel-build" script), ported from Milo Motors:
//  1. Applies pending Drizzle migrations (db/migrations) to the database.
//  2. Ensures the business-settings row exists.
//  3. If ADMIN_EMAIL and ADMIN_PASSWORD are set, creates that owner account
//     once. An existing account's password is never overwritten, unless
//     ADMIN_RESET_PASSWORD=1 is set for a single deploy (then remove it).
//
// No DATABASE_URL (e.g. a local build): skips quietly so the build still works.
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import bcrypt from 'bcryptjs'

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL
if (!url) {
  console.log('migrate: DATABASE_URL is not set; skipping migrations.')
  process.exit(0)
}

const sql = postgres(url, { max: 1, onnotice: () => {} })
try {
  await migrate(drizzle(sql), { migrationsFolder: 'db/migrations' })
  console.log('migrate: database is up to date.')

  await sql`insert into settings (id) values (1) on conflict (id) do nothing`

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME?.trim() || 'Admin'
  if (email && password) {
    if (password.length < 10) {
      console.warn('migrate: ADMIN_PASSWORD must be at least 10 characters; owner not created.')
    } else {
      const [existing] = await sql`select id from users where lower(email) = ${email} limit 1`
      if (!existing) {
        const hash = await bcrypt.hash(password, 12)
        await sql`insert into users (name, email, password_hash, role) values (${name}, ${email}, ${hash}, 'owner')`
        console.log(`migrate: created owner account ${email}.`)
        // Close OPEN TEST MODE (lib/auth/open-mode.ts): the real owner now exists.
        const closed = await sql`update users set active = false, updated_at = now() where email = 'open-mode@afridyn.local' and active = true returning id`
        if (closed.length) console.log('migrate: open test mode closed (test account deactivated).')
      } else if (process.env.ADMIN_RESET_PASSWORD === '1') {
        const hash = await bcrypt.hash(password, 12)
        await sql`update users set password_hash = ${hash}, role = 'owner', active = true, deleted_at = null, updated_at = now() where id = ${existing.id}`
        console.log(`migrate: reset password for ${email} (remove ADMIN_RESET_PASSWORD now).`)
      } else {
        console.log(`migrate: owner ${email} already exists; password left unchanged.`)
      }
    }
  } else {
    console.log('migrate: ADMIN_EMAIL/ADMIN_PASSWORD not set; no owner account created.')
  }
} finally {
  await sql.end()
}
