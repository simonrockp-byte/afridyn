'use client'

import type { DocView } from '../doc-view'
import type { Assets } from './parts'

// Builds the PDF on the device. The renderer (~1 MB) loads only when someone
// taps Share or Download (Milo pattern).

/** Logo URLs plus, when the document has a public link, a QR code for it. */
export async function pdfAssets(shareUrl?: string | null): Promise<Assets> {
  const origin = window.location.origin
  const assets: Assets = { logoMark: `${origin}/images/logo-mark.png`, logoFull: `${origin}/images/logo-full.png` }
  if (shareUrl) {
    try {
      const QR = await import('qrcode')
      assets.qr = await QR.toDataURL(shareUrl, { margin: 0, width: 260, errorCorrectionLevel: 'M', color: { dark: '#0B1220', light: '#FFFFFF' } })
    } catch {
      // A PDF without the QR is still a valid document.
    }
  }
  return assets
}

export async function buildPdfBlob(view: DocView): Promise<Blob> {
  const [{ pdf }, { DocumentPdf }, assets] = await Promise.all([import('@react-pdf/renderer'), import('./document-pdf'), pdfAssets(view.shareUrl)])
  return pdf(<DocumentPdf view={view} assets={assets} />).toBlob()
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

/** Opens the PDF in a new tab (preview before sending). */
export function openBlob(blob: Blob) {
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
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
