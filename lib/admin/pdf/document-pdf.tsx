import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import { formatZMW } from '../money'
import type { DocView } from '../doc-view'
import { templateFor } from './templates'
import { Footer, Label, Letterhead, PAD, Stamp, Watermark, type Assets } from './parts'

// Afridyn document PDF, built on the device. One layout, three looks
// (Executive / Industrial / Minimal) chosen in Settings. Uses the PDF
// standard Helvetica fonts, so nothing has to download.

export function DocumentPdf({ view, assets = {} }: { view: DocView; assets?: Assets }) {
  const b = view.business
  const t = templateFor(b.template)
  const banded = Boolean(t.footer.bg)
  const strongTotals = view.totals.filter((x) => x.strong)
  const finalStrong = strongTotals[strongTotals.length - 1]

  return (
    <Document title={`${view.title} ${view.number}`} author={b.name} creator={b.name} producer={b.name}>
      <Page size="A4" style={{ paddingBottom: banded ? 52 : 46, fontFamily: 'Helvetica', fontSize: 9.2, color: t.ink, lineHeight: 1.3 }}>
        <Watermark text={view.watermark} />
        <Letterhead t={t} b={b} title={view.title} number={view.number} assets={assets} />

        <View style={{ paddingHorizontal: PAD, paddingTop: 16 }}>
          {/* Parties + document details */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
            <View
              style={{
                width: 268, padding: t.panel ? 11 : 0, backgroundColor: t.panel ?? undefined,
                borderLeftWidth: t.panel ? 2.5 : 0, borderLeftColor: t.accent,
              }}
            >
              <Label t={t}>{view.forLabel}</Label>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 11.5, marginBottom: 2 }}>{view.client.name}</Text>
              {view.client.contactPerson ? <Text style={{ color: t.muted }}>Attn: {view.client.contactPerson}</Text> : null}
              {view.client.address ? <Text style={{ color: t.muted }}>{view.client.address}</Text> : null}
              {[view.client.phone, view.client.email].filter(Boolean).length ? (
                <Text style={{ color: t.muted }}>{[view.client.phone, view.client.email].filter(Boolean).join('  ·  ')}</Text>
              ) : null}
              {view.client.tpin ? <Text style={{ color: t.muted }}>TPIN {view.client.tpin}</Text> : null}
              {view.site ? (
                <View style={{ marginTop: 8, paddingTop: 7, borderTopWidth: 0.5, borderTopColor: t.line }}>
                  <Label t={t}>Site</Label>
                  <Text style={{ fontFamily: 'Helvetica-Bold' }}>{view.site.name}</Text>
                  <Text style={{ color: t.muted }}>{[view.site.location, view.site.contactPerson, view.site.phone].filter(Boolean).join('  ·  ')}</Text>
                </View>
              ) : null}
            </View>

            <View style={{ width: 196 }}>
              {view.meta.map((m, i) => (
                <View
                  key={m.label}
                  style={{
                    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4,
                    borderBottomWidth: i === view.meta.length - 1 ? 0 : 0.5, borderBottomColor: t.line,
                  }}
                >
                  <Text style={{ color: t.muted, fontSize: 8 }}>{m.label}</Text>
                  <Text style={{ fontFamily: 'Helvetica-Bold', textAlign: 'right' }}>{m.value}</Text>
                </View>
              ))}
              {finalStrong && view.type !== 'receipt' ? (
                <View style={{ marginTop: 8, padding: 8, backgroundColor: t.total.bg ?? undefined, borderWidth: t.total.bg ? 0 : 1, borderColor: t.ink }}>
                  <Text style={{ fontSize: 6.8, letterSpacing: 1.1, textTransform: 'uppercase', color: t.total.text, opacity: t.total.bg ? 0.85 : 1 }}>{finalStrong.label}</Text>
                  <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 15, color: t.total.amount, marginTop: 2 }}>{formatZMW(finalStrong.amount)}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {view.infoLines.length ? (
            <View style={{ backgroundColor: t.panel ?? undefined, borderWidth: t.panel ? 0 : 0.5, borderColor: t.line, padding: 10, marginBottom: 12 }}>
              {view.infoLines.map((l) => (
                <View key={l.label} style={{ flexDirection: 'row', paddingVertical: 1.5 }}>
                  <Text style={{ width: 130, color: t.muted }}>{l.label}</Text>
                  <Text style={{ fontFamily: 'Helvetica-Bold', flex: 1 }}>{l.value}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Line items */}
          {view.rows.length ? (
            <View>
              <View
                fixed
                style={{
                  flexDirection: 'row', backgroundColor: t.tableHead.bg ?? undefined, color: t.tableHead.text,
                  fontFamily: 'Helvetica-Bold', fontSize: 7, letterSpacing: 0.8, textTransform: 'uppercase',
                  paddingVertical: 6, paddingHorizontal: 6,
                  borderBottomWidth: t.tableHead.borderBottom ? 1 : 0, borderBottomColor: t.tableHead.borderBottom,
                }}
              >
                <Text style={{ width: 20 }}>#</Text>
                <Text style={{ flex: 1 }}>Description</Text>
                <Text style={{ width: 46 }}>Unit</Text>
                <Text style={{ width: 36, textAlign: 'right' }}>Qty</Text>
                {view.showPrices ? <><Text style={{ width: 80, textAlign: 'right' }}>Unit price</Text><Text style={{ width: 84, textAlign: 'right' }}>Amount</Text></> : null}
              </View>
              {view.rows.map((r, i) => (
                <View
                  key={i}
                  wrap={false}
                  style={{
                    flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 6,
                    borderBottomWidth: 0.5, borderBottomColor: t.line,
                    backgroundColor: t.zebra && i % 2 ? t.zebra : undefined,
                  }}
                >
                  <Text style={{ width: 20, color: t.muted }}>{String(i + 1).padStart(2, '0')}</Text>
                  <Text style={{ flex: 1, paddingRight: 8 }}>{r.description}</Text>
                  <Text style={{ width: 46, color: t.muted }}>{r.unit}</Text>
                  <Text style={{ width: 36, textAlign: 'right' }}>{r.qty}</Text>
                  {view.showPrices ? (
                    <>
                      <Text style={{ width: 80, textAlign: 'right' }}>{formatZMW(r.unitPrice)}</Text>
                      <Text style={{ width: 84, textAlign: 'right', fontFamily: 'Helvetica-Bold' }}>{formatZMW(r.amount)}</Text>
                    </>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Amount in words + totals */}
          {view.totals.length ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} wrap={false}>
              <View style={{ width: 250, paddingTop: 4 }}>
                {view.amountInWords ? (
                  <>
                    <Label t={t}>Amount in words</Label>
                    <Text style={{ fontFamily: 'Helvetica-Oblique', color: t.ink }}>{view.amountInWords}</Text>
                  </>
                ) : null}
                <Text style={{ color: t.muted, fontSize: 7.3, marginTop: 6 }}>
                  All amounts in Zambian Kwacha (ZMW).
                </Text>
                <Stamp text={view.watermark} t={t} />
              </View>
              <View style={{ width: 232 }}>
                {view.totals.map((x) =>
                  x.strong ? (
                    <View
                      key={x.label}
                      style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                        paddingVertical: 7, paddingHorizontal: 8, marginTop: 3,
                        backgroundColor: t.total.bg ?? undefined,
                        borderTopWidth: t.total.bg ? 0 : 1.2, borderBottomWidth: t.total.bg ? 0 : 1.2, borderColor: t.ink,
                      }}
                    >
                      <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, color: t.total.text }}>{x.label}</Text>
                      <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 12, color: t.total.amount }}>{formatZMW(x.amount)}</Text>
                    </View>
                  ) : (
                    <View key={x.label} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 8 }}>
                      <Text style={{ color: t.muted }}>{x.label}</Text>
                      <Text>{formatZMW(x.amount)}</Text>
                    </View>
                  ),
                )}
              </View>
            </View>
          ) : null}

          {view.notes ? (
            <View style={{ marginTop: 16 }} wrap={false}>
              <Label t={t}>Notes</Label>
              <Text>{view.notes}</Text>
            </View>
          ) : null}

          {view.showPaymentDetails ? (
            <View style={{ marginTop: 16, flexDirection: 'row', borderWidth: 0.75, borderColor: t.line, borderTopWidth: 2, borderTopColor: t.accent }} wrap={false}>
              <View style={{ width: 112, padding: 10, backgroundColor: t.panel ?? undefined }}>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: t.primary }}>How to pay</Text>
                <Text style={{ color: t.muted, fontSize: 7.3, marginTop: 3 }}>Quote {view.number} as your reference.</Text>
              </View>
              {b.bank ? <View style={{ flex: 1, padding: 10 }}><Label t={t}>Bank transfer</Label><Text>{b.bank}</Text></View> : null}
              {b.momo ? <View style={{ flex: 1, padding: 10 }}><Label t={t}>Mobile money</Label><Text>{b.momo}</Text></View> : null}
            </View>
          ) : null}

          {view.terms.length ? (
            <View style={{ marginTop: 16 }} wrap={false}>
              <Label t={t}>{view.termsTitle}</Label>
              {view.terms.map((x, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 2.5, color: t.muted }}>
                  <Text style={{ width: 14, color: t.accent, fontFamily: 'Helvetica-Bold' }}>{i + 1}.</Text>
                  <Text style={{ flex: 1 }}>{x}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {!view.totals.length ? <Stamp text={view.watermark} t={t} /> : null}

          {/* Signatures + verification QR */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 30 }} wrap={false}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingRight: assets.qr ? 22 : 0 }}>
              {view.signatures.map((sig) => (
                <View key={sig} style={{ width: assets.qr ? 168 : 214 }}>
                  <View style={{ height: 30 }} />
                  <View style={{ borderTopWidth: 0.75, borderTopColor: t.ink, paddingTop: 4 }}>
                    <Text style={{ color: t.muted, fontSize: 7.3 }}>{sig}</Text>
                  </View>
                </View>
              ))}
            </View>
            {assets.qr && view.shareUrl ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 7, width: 74 }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 7.3, color: t.primary, textAlign: 'right' }}>Scan to verify</Text>
                  <Text style={{ fontSize: 6.5, color: t.muted, textAlign: 'right', marginTop: 2 }}>View this document online at afridyn.world</Text>
                </View>
                <Image src={assets.qr} style={{ width: 54, height: 54 }} />
              </View>
            ) : null}
          </View>
        </View>

        <Footer t={t} b={b} right={view.number} />
      </Page>
    </Document>
  )
}
