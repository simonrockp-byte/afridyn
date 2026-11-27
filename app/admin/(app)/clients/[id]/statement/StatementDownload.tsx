'use client'
import { useState } from 'react'
import { Download, Share2 } from 'lucide-react'
import type { StatementView } from '@/lib/admin/pdf/statement-pdf'
import { downloadBlob, pdfAssets, sharePdf } from '@/lib/admin/pdf/share'

async function build(view: StatementView): Promise<Blob> {
  const [{ pdf }, { StatementPdf }, assets] = await Promise.all([import('@react-pdf/renderer'), import('@/lib/admin/pdf/statement-pdf'), pdfAssets()])
  return pdf(<StatementPdf view={view} assets={assets} />).toBlob()
}

export function StatementDownload({ view }: { view: StatementView }) {
  const [busy, setBusy] = useState(false)
  const name = `Statement-${view.client.name.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 40)}-${view.to}.pdf`
  return (
    <>
      <button className="ax-btn ax-btn-copper !min-h-[42px] !px-4" disabled={busy} onClick={async () => {
        setBusy(true)
        try { const blob = await build(view); if ((await sharePdf(blob, name, `Statement of account — Afridyn Engineering Limited`)) === 'unsupported') downloadBlob(blob, name) } finally { setBusy(false) }
      }}><Share2 size={15} aria-hidden /> {busy ? 'Building…' : 'Share PDF'}</button>
      <button className="ax-btn ax-btn-ghost !min-h-[42px] !px-4" disabled={busy} onClick={async () => { setBusy(true); try { downloadBlob(await build(view), name) } finally { setBusy(false) } }}>
        <Download size={15} aria-hidden /> Download
      </button>
    </>
  )
}
