import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getClient } from '@/lib/admin/data'
import { ClientForm } from '@/components/admin/ClientForm'
import { PageHeader } from '@/components/admin/ui'

export const metadata: Metadata = { title: 'Edit client' }

export default async function EditClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getClient(id).catch(() => null)
  if (!data) notFound()
  return (
    <>
      <PageHeader code="CL-EDIT" title={`Edit ${data.client.name}`} />
      <ClientForm client={data.client} />
    </>
  )
}
