'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Download } from 'lucide-react'
import { acceptQuotationByToken } from '@/lib/admin/public-actions'
import { buildPdfBlob, downloadBlob, pdfFilename } from '@/lib/admin/pdf/share'
import type { DocView } from '@/lib/admin/doc-view'

export function PublicDocActions({ token, view, canAccept, accepted }: { token: string; view: DocView; canAccept: boolean; accepted: boolean }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<string | null>(accepted ? 'This quotation has been accepted. Thank you — we will be in touch.' : null)
  const [err, setErr] = useState<string | null>(null)

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <button className="ax-btn ax-btn-ghost !min-h-[44px]" disabled={busy} onClick={async () => { setBusy(true); try { downloadBlob(await buildPdfBlob(view), pdfFilename(view)) } finally { setBusy(false) } }}>
        <Download size={15} aria-hidden /> {busy ? 'Preparing…' : 'Download PDF'}
      </button>
      {canAccept && !msg && (
        <button className="ax-btn ax-btn-copper !min-h-[44px]" disabled={pending}
          onClick={() => { if (confirm('Accept this quotation?')) start(async () => { const r = await acceptQuotationByToken(token); if (r.ok) { setMsg('Thank you — your acceptance has been recorded. We will be in touch.'); router.refresh() } else setErr(r.error ?? 'Could not accept.') }) }}>
          <CheckCircle2 size={15} aria-hidden /> Accept quotation
        </button>
      )}
      {msg && <p role="status" className="text-[14px]" style={{ color: 'var(--ax-green)' }}>{msg}</p>}
      {err && <p role="alert" className="text-[14px]" style={{ color: '#FFB27A' }}>{err}</p>}
    </div>
  )
}
