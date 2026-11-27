import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'
import type { Business } from '../doc-view'
import type { Template } from './templates'

// Shared letterhead, footer and stamp used by every Afridyn PDF.

export type Assets = { logoMark?: string; logoFull?: string; qr?: string }

export const PAD = 38

const base = StyleSheet.create({
  title: { fontFamily: 'Helvetica-Bold', fontSize: 22, letterSpacing: 2.2, lineHeight: 1.15 },
  number: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 0.6, marginTop: 3, textAlign: 'right', lineHeight: 1.2 },
  contacts: { fontSize: 7.3, lineHeight: 1.45 },
})

export function Letterhead({ t, b, title, number, assets }: { t: Template; b: Business; title: string; number?: string; assets: Assets }) {
  const regs = `TPIN ${b.tpin}   ·   PACRA ${b.pacra}   ·   ZPPA ${b.zppa}`
  const contact = [b.address, b.phone, b.email, 'afridyn.world'].filter(Boolean).join('   ·   ')

  if (t.header === 'dark') {
    return (
      <View>
        <View style={{ backgroundColor: t.primary, paddingHorizontal: PAD, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {assets.logoMark ? <Image src={assets.logoMark} style={{ width: 38, height: 36, marginRight: 11 }} /> : null}
            <View>
              <Text style={{ color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 15, letterSpacing: 0.4 }}>
                <Text style={{ color: t.accent }}>AFRIDYN</Text> ENGINEERING LIMITED
              </Text>
              <Text style={{ color: '#A3AFBF', fontSize: 7, marginTop: 5, letterSpacing: 1.1 }}>MECHANICAL · ELECTRICAL · IT · FIBRE OPTICS</Text>
            </View>
          </View>
          <View>
            <Text style={[base.title, { color: '#FFFFFF', textAlign: 'right' }]}>{title}</Text>
            {number ? <Text style={[base.number, { color: t.accent }]}>{number}</Text> : null}
          </View>
        </View>
        <View style={{ height: 4, backgroundColor: t.accent }} />
        <View style={{ paddingHorizontal: PAD, paddingTop: 9, paddingBottom: 2 }}>
          <Text style={[base.contacts, { color: t.muted }]}>{contact}</Text>
          <Text style={[base.contacts, { color: t.muted }]}>{regs}</Text>
        </View>
      </View>
    )
  }

  const minimal = t.header === 'minimal'
  return (
    <View style={{ paddingHorizontal: PAD, paddingTop: minimal ? 34 : 30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          {assets.logoFull ? (
            <Image src={assets.logoFull} style={{ width: minimal ? 132 : 156, height: minimal ? 39.6 : 46.8 }} />
          ) : (
            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 16, color: t.primary }}>{b.name}</Text>
          )}
        </View>
        <View>
          <Text style={[base.title, { color: t.primary, textAlign: 'right' }, minimal ? { fontFamily: 'Helvetica', fontSize: 20, letterSpacing: 4 } : {}]}>{title}</Text>
          {number ? <Text style={[base.number, { color: t.accent }]}>{number}</Text> : null}
        </View>
      </View>
      {minimal ? (
        <View style={{ height: 0.8, backgroundColor: t.ink, marginTop: 12 }} />
      ) : (
        <View style={{ flexDirection: 'row', marginTop: 13 }}>
          <View style={{ height: 3, width: 96, backgroundColor: t.accent }} />
          <View style={{ height: 3, flex: 1, backgroundColor: t.primary }} />
        </View>
      )}
      <View style={{ marginTop: 7 }}>
        <Text style={[base.contacts, { color: t.muted }]}>{contact}</Text>
        <Text style={[base.contacts, { color: t.muted }]}>{regs}</Text>
      </View>
    </View>
  )
}

export function Footer({ t, b, right }: { t: Template; b: Business; right: string }) {
  const banded = Boolean(t.footer.bg)
  const text = { position: 'absolute' as const, bottom: banded ? 10 : 14, fontSize: 7, color: t.footer.text }
  return (
    <>
      <View fixed style={{ position: 'absolute', left: banded ? 0 : PAD, right: banded ? 0 : PAD, bottom: banded ? 0 : 27, height: banded ? 28 : 0.5, backgroundColor: banded ? (t.footer.bg as string) : t.line }} />
      <Text fixed style={{ ...text, left: PAD }}>{b.name}  ·  {b.phone}  ·  afridyn.world</Text>
      <Text fixed style={{ ...text, right: PAD }}>{right}</Text>
    </>
  )
}

const STAMP: Record<string, string> = { PAID: '#047857', ACCEPTED: '#047857', DELIVERED: '#047857', VOID: '#B91C1C', DRAFT: '#64748B' }

/** Rubber-stamp mark (PAID, VOID, DRAFT, ACCEPTED, DELIVERED). Rendered inline. */
export function Stamp({ text, t }: { text: string | null; t: Template }) {
  if (!text) return null
  const c = t.id === 'minimal' ? '#111111' : (STAMP[text] ?? t.accent)
  return (
    <View style={{ alignSelf: 'flex-start', marginTop: 12, marginLeft: 14, transform: 'rotate(-8deg)', borderWidth: 2.2, borderColor: c, borderRadius: 5, padding: 2.2, opacity: 0.88 }}>
      <View style={{ borderWidth: 0.8, borderColor: c, borderRadius: 3, paddingHorizontal: 12, paddingVertical: 3 }}>
        <Text style={{ color: c, fontFamily: 'Helvetica-Bold', fontSize: 18, letterSpacing: 3, lineHeight: 1.1 }}>{text}</Text>
      </View>
    </View>
  )
}

/** Big faint diagonal word behind void / draft documents. */
export function Watermark({ text }: { text: string | null }) {
  if (text !== 'VOID' && text !== 'DRAFT') return null
  return (
    <Text fixed style={{ position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center', fontSize: 110, fontFamily: 'Helvetica-Bold', color: text === 'VOID' ? '#B91C1C' : '#64748B', opacity: 0.06, transform: 'rotate(-28deg)' }}>
      {text}
    </Text>
  )
}

export function Label({ t, children, style }: { t: Template; children: string; style?: Style }) {
  return <Text style={[{ fontSize: 6.8, color: t.label, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 4 }, style ?? {}]}>{children}</Text>
}
