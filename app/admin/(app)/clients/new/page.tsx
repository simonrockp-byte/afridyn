import type { Metadata } from 'next'
import { ClientForm } from '@/components/admin/ClientForm'
import { PageHeader } from '@/components/admin/ui'

export const metadata: Metadata = { title: 'New client' }

export default async function NewClient({ searchParams }: { searchParams: Promise<{ then?: string }> }) {
  const { then } = await searchParams
  // ?then=quotation → after saving, jump straight into a new quotation for this client.
  const returnTo = then && /^(quotation|proforma|invoice|delivery_note)$/.test(then) ? `/admin/documents/new?type=${then}&clientId={id}` : undefined
  return (
    <>
      <PageHeader code="CL-NEW" title="New client" />
      <ClientForm returnTo={returnTo} />
    </>
  )
}
