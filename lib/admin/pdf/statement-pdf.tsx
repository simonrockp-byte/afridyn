import { Document, Page, Text, View } from '@react-pdf/renderer'
import { formatZMW } from '../money'
import { kwachaInWords } from '../words'
import type { Business } from '../doc-view'
import { templateFor } from './templates'
import { Footer, Label, Letterhead, PAD, type Assets } from './parts'

export type StatementView = {
  business: Business
  client: { name: string; contactPerson?: string | null; phone?: string | null; email?: string | null; address?: string | null; tpin?: string | null }
  from: string
  to: string
  opening: number
  closing: number
  totalDebit: number
  totalCredit: number
  lines: { date: string; ref: string; description: string; debit: number; credit: number; balance: number }[]
}

const fmt = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

export function StatementPdf({ view, assets = {} }: { view: StatementView; assets?: Assets }) {
  const b = view.business
  const t = templateFor(b.template)
  const banded = Boolean(t.footer.bg)
  const num = { width: 76, textAlign: 'right' as const }
  return (
    <Document title={`Statement ${view.client.name}`} author={b.name} creator={b.name} producer={b.name}>
      <Page size="A4" style={{ paddingBottom: banded ? 52 : 46, fontFamily: 'Helvetica', fontSize: 8.8, color: t.ink, lineHeight: 1.3 }}>
        <Letterhead t={t} b={b} title="STATEMENT" number={`${fmt(view.from)} – ${fmt(view.to)}`} assets={assets} />
        <View style={{ paddingHorizontal: PAD, paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
            <View style={{ width: 268, padding: t.panel ? 11 : 0, backgroundColor: t.panel ?? undefined, borderLeftWidth: t.panel ? 2.5 : 0, borderLeftColor: t.accent }}>
              <Label t={t}>Statement for</Label>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 11.5, marginBottom: 2 }}>{view.client.name}</Text>
              {view.client.contactPerson ? <Text style={{ color: t.muted }}>Attn: {view.client.contactPerson}</Text> : null}
              {view.client.address ? <Text style={{ color: t.muted }}>{view.client.address}</Text> : null}
              {view.client.tpin ? <Text style={{ color: t.muted }}>TPIN {view.client.tpin}</Text> : null}
            </View>
            <View style={{ width: 196 }}>
              {[
                ['Opening balance', formatZMW(view.opening)],
                ['Invoiced', formatZMW(view.totalDebit)],
                ['Payments & credits', formatZMW(-view.totalCredit)],
              ].map(([l, v]) => (
                <View key={l} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: t.line }}>
                  <Text style={{ color: t.muted, fontSize: 8 }}>{l}</Text>
                  <Text style={{ fontFamily: 'Helvetica-Bold' }}>{v}</Text>
                </View>
              ))}
              <View style={{ marginTop: 8, padding: 8, backgroundColor: t.total.bg ?? undefined, borderWidth: t.total.bg ? 0 : 1, borderColor: t.ink }}>
                <Text style={{ fontSize: 6.8, letterSpacing: 1.1, textTransform: 'uppercase', color: t.total.text }}>Amount due</Text>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 15, color: t.total.amount, marginTop: 2 }}>{formatZMW(view.closing)}</Text>
              </View>
            </View>
          </View>

          <View fixed style={{ flexDirection: 'row', backgroundColor: t.tableHead.bg ?? undefined, color: t.tableHead.text, fontFamily: 'Helvetica-Bold', fontSize: 7, letterSpacing: 0.8, textTransform: 'uppercase', paddingVertical: 6, paddingHorizontal: 6, borderBottomWidth: t.tableHead.borderBottom ? 1 : 0, borderBottomColor: t.tableHead.borderBottom }}>
            <Text style={{ width: 62 }}>Date</Text><Text style={{ width: 98 }}>Reference</Text><Text style={{ flex: 1 }}>Description</Text>
            <Text style={num}>Debit</Text><Text style={num}>Credit</Text><Text style={num}>Balance</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 5.5, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: t.line }}>
            <Text style={{ width: 62 }}>{fmt(view.from)}</Text><Text style={{ width: 98 }} /><Text style={{ flex: 1, fontFamily: 'Helvetica-Bold' }}>Balance brought forward</Text>
            <Text style={num} /><Text style={num} /><Text style={[num, { fontFamily: 'Helvetica-Bold' }]}>{formatZMW(view.opening)}</Text>
          </View>
          {view.lines.map((l, i) => (
            <View key={i} wrap={false} style={{ flexDirection: 'row', paddingVertical: 5.5, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: t.line, backgroundColor: t.zebra && i % 2 === 0 ? t.zebra : undefined }}>
              <Text style={{ width: 62, color: t.muted }}>{fmt(l.date)}</Text>
              <Text style={{ width: 98, fontFamily: 'Helvetica-Bold' }}>{l.ref}</Text>
              <Text style={{ flex: 1, paddingRight: 4 }}>{l.description}</Text>
              <Text style={num}>{l.debit ? formatZMW(l.debit) : ''}</Text>
              <Text style={num}>{l.credit ? formatZMW(l.credit) : ''}</Text>
              <Text style={[num, { fontFamily: 'Helvetica-Bold' }]}>{formatZMW(l.balance)}</Text>
            </View>
          ))}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} wrap={false}>
            <View style={{ width: 250, paddingTop: 4 }}>
              {view.closing > 0 ? (
                <>
                  <Label t={t}>Amount due in words</Label>
                  <Text style={{ fontFamily: 'Helvetica-Oblique' }}>{kwachaInWords(view.closing)}</Text>
                </>
              ) : null}
              <Text style={{ color: t.muted, fontSize: 7.3, marginTop: 6 }}>All amounts in Zambian Kwacha (ZMW).</Text>
            </View>
            <View style={{ width: 232, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 7, paddingHorizontal: 8, backgroundColor: t.total.bg ?? undefined, borderTopWidth: t.total.bg ? 0 : 1.2, borderBottomWidth: t.total.bg ? 0 : 1.2, borderColor: t.ink }}>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, color: t.total.text }}>Amount due</Text>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 12, color: t.total.amount }}>{formatZMW(view.closing)}</Text>
            </View>
          </View>

          {b.bank || b.momo ? (
            <View style={{ marginTop: 16, flexDirection: 'row', borderWidth: 0.75, borderColor: t.line, borderTopWidth: 2, borderTopColor: t.accent }} wrap={false}>
              <View style={{ width: 112, padding: 10, backgroundColor: t.panel ?? undefined }}>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: t.primary }}>How to pay</Text>
                <Text style={{ color: t.muted, fontSize: 7.3, marginTop: 3 }}>Quote the invoice numbers as your reference.</Text>
              </View>
              {b.bank ? <View style={{ flex: 1, padding: 10 }}><Label t={t}>Bank transfer</Label><Text>{b.bank}</Text></View> : null}
              {b.momo ? <View style={{ flex: 1, padding: 10 }}><Label t={t}>Mobile money</Label><Text>{b.momo}</Text></View> : null}
            </View>
          ) : null}
        </View>
        <Footer t={t} b={b} right={`Statement  ·  ${view.client.name}`.slice(0, 60)} />
      </Page>
    </Document>
  )
}
