'use client'

import type { DocView } from '../doc-view'

// Builds the PDF on the device. The renderer (~1 MB) loads only when someone
// taps Share or Download (Milo pattern).

export async function buildPdfBlob(view: DocView): Promise<Blob> {
  const [{ pdf }, { DocumentPdf }] = await Promise.all([import('@react-pdf/renderer'), import('./document-pdf')])
  return pdf(<DocumentPdf view={view} logoUrl={`${window.location.origin}/images/logo-mark.png`} />).toBlob()
}

export function pdfFilename(view: DocView): string {
  const who = view.client.name.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 40)
  return `${view.number}${who ? `-${who}` : ''}.pdf`
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

/** Shares the actual PDF through the phone's share sheet (WhatsApp etc.). */
export async function sharePdf(blob: Blob, filename: string, text: string): Promise<'shared' | 'cancelled' | 'unsupported'> {
  const file = new File([blob], filename, { type: 'application/pdf' })
  if (!navigator.canShare?.({ files: [file] })) return 'unsupported'
  try {
    await navigator.share({ files: [file], text })
    return 'shared'
  } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') return 'cancelled'
    throw error
  }
}
