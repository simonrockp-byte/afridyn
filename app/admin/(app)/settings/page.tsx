import type { Metadata } from 'next'
import { asc, isNull } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { users } from '@/db/schema'
import { getSettings } from '@/lib/admin/data'
import { defaultTerms } from '@/lib/admin/documents'
import { getSessionUser } from '@/lib/auth/server'
import { OPEN_MODE_EMAIL } from '@/lib/auth/open-mode'
import { PageHeader, Panel } from '@/components/admin/ui'
import { SettingsForm } from './SettingsForm'
import { UsersPanel } from './UsersPanel'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const me = await getSessionUser()
  if (me?.role !== 'owner') {
    return (
      <>
        <PageHeader code="SE-00" title="Settings" />
        <Panel><p style={{ color: 'var(--ax-dim)' }}>Only the owner can view and change settings.</p></Panel>
      </>
    )
  }
  const s = await getSettings()
  const blank = { quoteTerms: null, invoiceTerms: null, deliveryTerms: null, receiptFooter: null, quoteValidityDays: s?.quoteValidityDays ?? 30 }
  const defaults = {
    quote: defaultTerms('quotation', blank),
    invoice: defaultTerms('invoice', blank),
    delivery: defaultTerms('delivery_note', blank),
    receipt: defaultTerms('receipt', blank),
  }
  const rows = await getDb()
    .select({ id: users.id, name: users.name, email: users.email, role: users.role, active: users.active })
    .from(users)
    .where(isNull(users.deletedAt))
    .orderBy(asc(users.createdAt))

  return (
    <>
      <PageHeader code="SE-00" title="Settings" lead="Company details, payment information, standard terms and users." />
      <div className="space-y-4">
        <SettingsForm s={s} defaults={defaults} />
        <UsersPanel users={rows.map((u) => ({ ...u, isTest: u.email === OPEN_MODE_EMAIL, isYou: u.id === me.id }))} />
      </div>
    </>
  )
}
