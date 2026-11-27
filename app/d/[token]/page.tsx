import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocumentByToken } from '@/lib/admin/data'
import { buildDocView } from '@/lib/admin/doc-view'
import { DocPaper } from '@/components/admin/DocPaper'
import { PublicDocActions } from './PublicDocActions'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Document', robots: { index: false, follow: false } }

export default async function PublicDocument({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  if (!/^[A-Za-z0-9_-]{20,40}$/.test(token)) notFound()
  const b = await getDocumentByToken(token).catch(() => null)
  if (!b) notFound()
  const view = buildDocView({ doc: b.doc, settings: b.settings, payments: b.payments, source: b.source, settle: b.settle })
  const canAccept = b.doc.type === 'quotation' && b.doc.status === 'sent'

  return (
    <main className="ax-admin min-h-[100svh] px-4 py-8 md:py-12" data-theme="light" style={{ background: '#EEF1F5' }}>
      <div className="max-w-4xl mx-auto">
        <PublicDocActions token={token} view={view} canAccept={canAccept} accepted={b.doc.status === 'accepted'} />
        <DocPaper view={view} />
        <p className="mt-6 text-center text-[13px]" style={{ color: 'var(--ax-dim)' }}>
          Questions? WhatsApp or call {view.business.phone} · <a className="underline underline-offset-4 hover:text-white" href="https://afridyn.world">afridyn.world</a>
        </p>
      </div>
    </main>
  )
}
