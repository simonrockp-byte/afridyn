import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { formatZMW } from '../money'
import type { DocView } from '../doc-view'

// Afridyn letterhead PDF, built on the device (adapted from Milo Motors).
// Uses the PDF standard Helvetica fonts, so nothing has to download.

const COPPER = '#E05A10'
const INK = '#0B0F14'
const STEEL = '#5B6573'
const LINE = '#E3E6EA'
const TINT = '#F4F6F8'

const s = StyleSheet.create({
  page: { paddingBottom: 54, fontFamily: 'Helvetica', fontSize: 9.5, color: INK },
  band: { backgroundColor: INK, paddingHorizontal: 36, paddingVertical: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 34, height: 32, marginRight: 10 },
  brand: { color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 14, letterSpacing: 0.4 },
  tagline: { color: '#A3AFBF', fontSize: 7.5, marginTop: 3 },
  title: { color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 19, letterSpacing: 1 },
  rule: { height: 3.5, backgroundColor: '#FF6A1A' },
  body: { paddingHorizontal: 36, paddingTop: 16 },
  contacts: { flexDirection: 'row', flexWrap: 'wrap', color: STEEL, fontSize: 7.5, marginBottom: 14 },
  contact: { marginRight: 12, marginBottom: 2 },
  twoCol: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  label: { fontSize: 7, color: COPPER, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 },
  bold: { fontFamily: 'Helvetica-Bold' },
  muted: { color: STEEL },
  metaRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 2 },
  metaLabel: { color: STEEL, marginRight: 8, fontSize: 8 },
  metaValue: { fontFamily: 'Helvetica-Bold', minWidth: 96, textAlign: 'right' },
  info: { backgroundColor: TINT, padding: 9, marginBottom: 10 },
  infoRow: { flexDirection: 'row', paddingVertical: 1.5 },
  infoLabel: { width: 130, color: STEEL },
  th: { flexDirection: 'row', backgroundColor: INK, color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 7.5, paddingVertical: 5, paddingHorizontal: 5, textTransform: 'uppercase' },
  tr: { flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 5, borderBottomWidth: 0.5, borderBottomColor: LINE },
  cNo: { width: 18, color: STEEL },
  cDesc: { flex: 1, paddingRight: 6 },
  cUnit: { width: 44, color: STEEL },
  cQty: { width: 34, textAlign: 'right' },
  cPrice: { width: 78, textAlign: 'right' },
  cAmt: { width: 82, textAlign: 'right' },
  totals: { marginTop: 8, marginLeft: 'auto', width: 220 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2.5 },
  totalStrong: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderTopWidth: 1.2, borderTopColor: INK, marginTop: 2 },
  totalStrongText: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  section: { marginTop: 14 },
  term: { flexDirection: 'row', marginBottom: 2, color: '#3A4250' },
  bullet: { width: 9, color: STEEL },
  payBox: { flexDirection: 'row', marginTop: 14, borderWidth: 0.75, borderColor: LINE, padding: 9 },
  payCol: { flex: 1, paddingRight: 8 },
  signRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  signBox: { width: 210, borderTopWidth: 0.75, borderTopColor: STEEL, paddingTop: 4, color: STEEL, fontSize: 7.5 },
  footer: { position: 'absolute', bottom: 18, left: 36, right: 36, flexDirection: 'row', justifyContent: 'space-between', color: STEEL, fontSize: 7, borderTopWidth: 0.5, borderTopColor: LINE, paddingTop: 5 },
  watermark: { position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center', fontSize: 92, fontFamily: 'Helvetica-Bold', color: '#FF6A1A', opacity: 0.08, transform: 'rotate(-24deg)' },
})

export function DocumentPdf({ view, logoUrl }: { view: DocView; logoUrl?: string }) {
  const b = view.business
  const contacts = [b.phone, b.email, b.address, `TPIN ${b.tpin}`, `PACRA ${b.pacra}`, `ZPPA ${b.zppa}`].filter(Boolean)
  return (
    <Document title={`${view.title} ${view.number}`} author={b.name} creator={b.name} producer={b.name}>
      <Page size="A4" style={s.page}>
        {view.watermark ? <Text style={s.watermark} fixed>{view.watermark}</Text> : null}
        <View style={s.band}>
          <View style={s.brandRow}>
            {logoUrl ? <Image src={logoUrl} style={s.logo} /> : null}
            <View>
              <Text style={s.brand}><Text style={{ color: '#FF6A1A' }}>AFRIDYN</Text> ENGINEERING LIMITED</Text>
              <Text style={s.tagline}>Mechanical · Electrical · IT · Fibre Optics</Text>
            </View>
          </View>
          <Text style={s.title}>{view.title}</Text>
        </View>
        <View style={s.rule} />

        <View style={s.body}>
          <View style={s.contacts}>{contacts.map((c) => <Text key={c} style={s.contact}>{c}</Text>)}</View>

          <View style={s.twoCol}>
            <View style={{ maxWidth: 270 }}>
              <Text style={s.label}>{view.forLabel}</Text>
              <Text style={[s.bold, { fontSize: 11 }]}>{view.client.name}</Text>
              {view.client.contactPerson ? <Text style={s.muted}>Attn: {view.client.contactPerson}</Text> : null}
              {view.client.phone ? <Text style={s.muted}>{view.client.phone}</Text> : null}
              {view.client.email ? <Text style={s.muted}>{view.client.email}</Text> : null}
              {view.client.address ? <Text style={s.muted}>{view.client.address}</Text> : null}
              {view.client.tpin ? <Text style={s.muted}>TPIN {view.client.tpin}</Text> : null}
              {view.site ? (
                <View style={{ marginTop: 7 }}>
                  <Text style={s.label}>Site</Text>
                  <Text style={s.bold}>{view.site.name}</Text>
                  <Text style={s.muted}>{[view.site.location, view.site.contactPerson, view.site.phone].filter(Boolean).join(' · ')}</Text>
                </View>
              ) : null}
            </View>
            <View>
              {view.meta.map((m) => (
                <View key={m.label} style={s.metaRow}>
                  <Text style={s.metaLabel}>{m.label}</Text>
                  <Text style={s.metaValue}>{m.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {view.infoLines.length ? (
            <View style={s.info}>
              {view.infoLines.map((l) => (
                <View key={l.label} style={s.infoRow}><Text style={s.infoLabel}>{l.label}</Text><Text style={s.bold}>{l.value}</Text></View>
              ))}
            </View>
          ) : null}

          {view.rows.length ? (
            <View>
              <View style={s.th} fixed>
                <Text style={s.cNo}>#</Text>
                <Text style={s.cDesc}>Description</Text>
                <Text style={[s.cUnit, { color: '#FFFFFF' }]}>Unit</Text>
                <Text style={s.cQty}>Qty</Text>
                {view.showPrices ? <><Text style={s.cPrice}>Unit price</Text><Text style={s.cAmt}>Amount</Text></> : null}
              </View>
              {view.rows.map((r, i) => (
                <View key={i} style={[s.tr, i % 2 ? { backgroundColor: '#F7F8FA' } : {}]} wrap={false}>
                  <Text style={s.cNo}>{i + 1}</Text>
                  <Text style={s.cDesc}>{r.description}</Text>
                  <Text style={s.cUnit}>{r.unit}</Text>
                  <Text style={s.cQty}>{r.qty}</Text>
                  {view.showPrices ? <><Text style={s.cPrice}>{formatZMW(r.unitPrice)}</Text><Text style={s.cAmt}>{formatZMW(r.amount)}</Text></> : null}
                </View>
              ))}
            </View>
          ) : null}

          {view.totals.length ? (
            <View style={s.totals} wrap={false}>
              {view.totals.map((t) =>
                t.strong ? (
                  <View key={t.label} style={s.totalStrong}>
                    <Text style={s.totalStrongText}>{t.label}</Text>
                    <Text style={[s.totalStrongText, { color: COPPER }]}>{formatZMW(t.amount)}</Text>
                  </View>
                ) : (
                  <View key={t.label} style={s.totalRow}><Text style={s.muted}>{t.label}</Text><Text>{formatZMW(t.amount)}</Text></View>
                ),
              )}
            </View>
          ) : null}

          {view.notes ? <View style={s.section} wrap={false}><Text style={s.label}>Notes</Text><Text>{view.notes}</Text></View> : null}

          {view.showPaymentDetails ? (
            <View style={s.payBox} wrap={false}>
              {b.bank ? <View style={s.payCol}><Text style={s.label}>Bank transfer</Text><Text>{b.bank}</Text></View> : null}
              {b.momo ? <View style={s.payCol}><Text style={s.label}>Mobile money</Text><Text>{b.momo}</Text></View> : null}
            </View>
          ) : null}

          {view.terms.length ? (
            <View style={s.section} wrap={false}>
              <Text style={s.label}>{view.termsTitle}</Text>
              {view.terms.map((t, i) => <View key={i} style={s.term}><Text style={s.bullet}>•</Text><Text style={{ flex: 1 }}>{t}</Text></View>)}
            </View>
          ) : null}

          <View style={s.signRow} wrap={false}>
            <Text style={s.signBox}>{view.signatures[0]}</Text>
            <Text style={s.signBox}>{view.signatures[1]}</Text>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text>{b.name} · {b.phone} · afridyn.world</Text>
          <Text render={({ pageNumber, totalPages }) => `${view.number} · page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
