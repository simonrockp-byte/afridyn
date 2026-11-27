import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { formatZMW } from '../money'
import type { Business } from '../doc-view'

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

const COPPER = '#E05A10'
const INK = '#0B0F14'
const STEEL = '#5B6573'
const LINE = '#E3E6EA'

const fmt = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

const s = StyleSheet.create({
  page: { paddingBottom: 50, fontFamily: 'Helvetica', fontSize: 9, color: INK },
  band: { backgroundColor: INK, paddingHorizontal: 36, paddingVertical: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 34, height: 32, marginRight: 10 },
  brand: { color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 14 },
  title: { color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 19, letterSpacing: 1 },
  rule: { height: 3.5, backgroundColor: '#FF6A1A' },
  body: { paddingHorizontal: 36, paddingTop: 16 },
  label: { fontSize: 7, color: COPPER, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 },
  muted: { color: STEEL },
  bold: { fontFamily: 'Helvetica-Bold' },
  th: { flexDirection: 'row', backgroundColor: INK, color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 7.5, paddingVertical: 5, paddingHorizontal: 5, textTransform: 'uppercase' },
  tr: { flexDirection: 'row', paddingVertical: 4.5, paddingHorizontal: 5, borderBottomWidth: 0.5, borderBottomColor: LINE },
  cDate: { width: 62 }, cRef: { width: 96 }, cDesc: { flex: 1, paddingRight: 4 },
  cNum: { width: 74, textAlign: 'right' },
  summary: { marginTop: 10, marginLeft: 'auto', width: 230 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2.5 },
  strong: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderTopWidth: 1.2, borderTopColor: INK, marginTop: 2 },
  footer: { position: 'absolute', bottom: 18, left: 36, right: 36, flexDirection: 'row', justifyContent: 'space-between', color: STEEL, fontSize: 7, borderTopWidth: 0.5, borderTopColor: LINE, paddingTop: 5 },
})

export function StatementPdf({ view, logoUrl }: { view: StatementView; logoUrl?: string }) {
  const b = view.business
  return (
    <Document title={`Statement ${view.client.name}`} author={b.name}>
      <Page size="A4" style={s.page}>
        <View style={s.band}>
          <View style={s.brandRow}>
            {logoUrl ? <Image src={logoUrl} style={s.logo} /> : null}
            <Text style={s.brand}><Text style={{ color: '#FF6A1A' }}>AFRIDYN</Text> ENGINEERING LIMITED</Text>
          </View>
          <Text style={s.title}>STATEMENT</Text>
        </View>
        <View style={s.rule} />
        <View style={s.body}>
          <Text style={[s.muted, { fontSize: 7.5, marginBottom: 12 }]}>{[b.phone, b.email, b.address, `TPIN ${b.tpin}`, `PACRA ${b.pacra}`].filter(Boolean).join('   ')}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={s.label}>Statement for</Text>
              <Text style={[s.bold, { fontSize: 11 }]}>{view.client.name}</Text>
              {view.client.contactPerson ? <Text style={s.muted}>Attn: {view.client.contactPerson}</Text> : null}
              {view.client.address ? <Text style={s.muted}>{view.client.address}</Text> : null}
              {view.client.tpin ? <Text style={s.muted}>TPIN {view.client.tpin}</Text> : null}
            </View>
            <View>
              <Text style={s.label}>Period</Text>
              <Text style={s.bold}>{fmt(view.from)} – {fmt(view.to)}</Text>
            </View>
          </View>
          <View style={s.th} fixed>
            <Text style={s.cDate}>Date</Text><Text style={s.cRef}>Reference</Text><Text style={s.cDesc}>Description</Text>
            <Text style={s.cNum}>Debit</Text><Text style={s.cNum}>Credit</Text><Text style={s.cNum}>Balance</Text>
          </View>
          <View style={s.tr}><Text style={s.cDate} /><Text style={s.cRef} /><Text style={[s.cDesc, s.bold]}>Opening balance</Text><Text style={s.cNum} /><Text style={s.cNum} /><Text style={[s.cNum, s.bold]}>{formatZMW(view.opening)}</Text></View>
          {view.lines.map((l, i) => (
            <View key={i} style={s.tr} wrap={false}>
              <Text style={s.cDate}>{fmt(l.date)}</Text><Text style={s.cRef}>{l.ref}</Text><Text style={s.cDesc}>{l.description}</Text>
              <Text style={s.cNum}>{l.debit ? formatZMW(l.debit) : ''}</Text><Text style={s.cNum}>{l.credit ? formatZMW(l.credit) : ''}</Text><Text style={s.cNum}>{formatZMW(l.balance)}</Text>
            </View>
          ))}
          <View style={s.summary} wrap={false}>
            <View style={s.row}><Text style={s.muted}>Opening balance</Text><Text>{formatZMW(view.opening)}</Text></View>
            <View style={s.row}><Text style={s.muted}>Invoiced</Text><Text>{formatZMW(view.totalDebit)}</Text></View>
            <View style={s.row}><Text style={s.muted}>Payments & credits</Text><Text>{formatZMW(-view.totalCredit)}</Text></View>
            <View style={s.strong}><Text style={[s.bold, { fontSize: 11 }]}>Amount due</Text><Text style={[s.bold, { fontSize: 11, color: COPPER }]}>{formatZMW(view.closing)}</Text></View>
          </View>
          {b.bank || b.momo ? (
            <View style={{ marginTop: 16, borderWidth: 0.75, borderColor: LINE, padding: 9, flexDirection: 'row' }} wrap={false}>
              {b.bank ? <View style={{ flex: 1 }}><Text style={s.label}>Bank transfer</Text><Text>{b.bank}</Text></View> : null}
              {b.momo ? <View style={{ flex: 1 }}><Text style={s.label}>Mobile money</Text><Text>{b.momo}</Text></View> : null}
            </View>
          ) : null}
        </View>
        <View style={s.footer} fixed>
          <Text>{b.name} · {b.phone} · afridyn.world</Text>
          <Text render={({ pageNumber, totalPages }) => `Statement · page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
