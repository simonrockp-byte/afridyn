// Dev-only smoke test: renders every document template (and the statement) to
// files so their layout can be checked without a browser.
//   npx tsx scripts/pdf-smoke.tsx <outDir>
import { renderToFile } from '@react-pdf/renderer'
import QR from 'qrcode'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { DocumentPdf } from '../lib/admin/pdf/document-pdf'
import { StatementPdf } from '../lib/admin/pdf/statement-pdf'
import type { Business, DocView } from '../lib/admin/doc-view'
import { kwachaInWords } from '../lib/admin/words'
import type { TemplateId } from '../lib/admin/pdf/templates'

const out = process.argv[2] ?? '.'
const base: Omit<Business, 'template'> = {
  name: 'Afridyn Engineering Limited', phone: '+260 977 244 549', email: 'info@afridyn.world', address: '31 Salama Park, Lusaka, Zambia',
  tpin: '2004257975', pacra: '120261040695', zppa: '137269', bank: 'Bank: (sample)\nAccount: 0000000000', momo: 'MTN MoMo: (sample)',
}
const viewFor = (template: TemplateId, watermark: string | null): DocView => ({
  title: 'INVOICE', number: 'INV-2026-A-0001', type: 'invoice', status: 'partially_paid', business: { ...base, template }, forLabel: 'Bill to',
  client: { name: 'TEST — Demo Mining Ltd', contactPerson: 'Test Contact', phone: '+260977000000', address: 'Plot 1, Test Road, Kitwe', tpin: '1000000000' },
  site: { name: 'TEST Site — Open Pit', location: 'Chingola', contactPerson: 'Site Foreman' },
  meta: [{ label: 'Invoice no.', value: 'INV-2026-A-0001' }, { label: 'Date', value: '27 November 2026' }, { label: 'Due date', value: '27 December 2026' }, { label: 'Ref quotation', value: 'QT-2026-A-0001' }],
  showPrices: true,
  rows: [
    { description: 'SKF 6205-2RS deep groove bearing', unit: 'each', qty: '10', unitPrice: 25000, amount: 250000 },
    { description: 'On-site fitting labour', unit: 'hour', qty: '4', unitPrice: 35000, amount: 140000 },
  ],
  totals: [
    { label: 'Subtotal', amount: 390000 }, { label: 'Total due', amount: 390000, strong: true },
    { label: 'Paid', amount: -200000 }, { label: 'Credited', amount: -25000 }, { label: 'Balance due', amount: 165000, strong: true },
  ],
  infoLines: [], notes: null, termsTitle: 'Terms & conditions',
  terms: ['Payment is due by the due date shown above.', 'Please quote the invoice number as your payment reference.'],
  showPaymentDetails: true, signatures: ['Customer signature', 'For Afridyn Engineering Limited'], watermark,
  amountInWords: kwachaInWords(390000), shareUrl: 'https://afridyn.world/d/sample-token',
})

async function main() {
  const assets = {
    logoMark: `data:image/png;base64,${readFileSync('public/images/logo-mark.png').toString('base64')}`,
    logoFull: `data:image/png;base64,${readFileSync('public/images/logo-full.png').toString('base64')}`,
    qr: await QR.toDataURL('https://afridyn.world/d/sample-token', { margin: 0, width: 260 }),
  }
  for (const t of ['executive', 'industrial', 'minimal'] as const) {
    await renderToFile(<DocumentPdf view={viewFor(t, t === 'executive' ? null : t === 'industrial' ? 'PAID' : 'DRAFT')} assets={assets} />, path.join(out, `invoice-${t}.pdf`))
    await renderToFile(
      <StatementPdf assets={assets} view={{
        business: { ...base, template: t }, client: { name: 'TEST — Demo Mining Ltd', contactPerson: 'Test Contact', address: 'Plot 1, Test Road, Kitwe', tpin: '1000000000' },
        from: '2026-08-29', to: '2026-11-27', opening: 0, closing: 165000, totalDebit: 390000, totalCredit: 225000,
        lines: [
          { date: '2026-11-27', ref: 'INV-2026-A-0001', description: 'Invoice', debit: 390000, credit: 0, balance: 390000 },
          { date: '2026-11-27', ref: 'INV-2026-A-0001', description: 'Payment · MTN MoMo', debit: 0, credit: 200000, balance: 190000 },
          { date: '2026-11-27', ref: 'CN-2026-A-0001', description: 'Credit note · INV-2026-A-0001', debit: 0, credit: 25000, balance: 165000 },
        ],
      }} />,
      path.join(out, `statement-${t}.pdf`),
    )
  }
  console.log('ok')
}
main()
