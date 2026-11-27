// Three document designs sharing one layout. Chosen in Settings.

export type TemplateId = 'executive' | 'industrial' | 'minimal'

export type Template = {
  id: TemplateId
  name: string
  blurb: string
  header: 'light' | 'dark' | 'minimal'
  ink: string
  muted: string
  line: string
  primary: string // headings, table head, total band
  accent: string // labels, highlights
  label: string // small uppercase labels
  tableHead: { bg: string | null; text: string; borderBottom?: string }
  zebra: string | null
  total: { bg: string | null; text: string; amount: string }
  panel: string | null // tinted boxes (client card, info box)
  footer: { bg: string | null; text: string }
}

export const TEMPLATES: Record<TemplateId, Template> = {
  executive: {
    id: 'executive',
    name: 'Executive',
    blurb: 'White letterhead with the full-colour logo, navy table and total band, copper accents. Best for clients and tenders.',
    header: 'light',
    ink: '#0B1220',
    muted: '#5B6573',
    line: '#E2E6EC',
    primary: '#123A73',
    accent: '#D9560F',
    label: '#D9560F',
    tableHead: { bg: '#123A73', text: '#FFFFFF' },
    zebra: '#F5F7FB',
    total: { bg: '#123A73', text: '#FFFFFF', amount: '#FFFFFF' },
    panel: '#F5F7FB',
    footer: { bg: '#123A73', text: '#DCE4F2' },
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial',
    blurb: 'Bold black letterhead band with the copper rule — matches the website. Strong on screen and WhatsApp.',
    header: 'dark',
    ink: '#0B0F14',
    muted: '#5B6573',
    line: '#E3E6EA',
    primary: '#0B0F14',
    accent: '#FF6A1A',
    label: '#D9560F',
    tableHead: { bg: '#0B0F14', text: '#FFFFFF' },
    zebra: '#F6F7F9',
    total: { bg: '#FF6A1A', text: '#0B0F14', amount: '#0B0F14' },
    panel: '#F4F6F8',
    footer: { bg: null, text: '#5B6573' },
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    blurb: 'Clean black-and-white with hairline rules and no colour fills. Lowest ink use for office printing.',
    header: 'minimal',
    ink: '#111111',
    muted: '#666666',
    line: '#D6D6D6',
    primary: '#111111',
    accent: '#111111',
    label: '#555555',
    tableHead: { bg: null, text: '#111111', borderBottom: '#111111' },
    zebra: null,
    total: { bg: null, text: '#111111', amount: '#111111' },
    panel: null,
    footer: { bg: null, text: '#666666' },
  },
}

export function templateFor(id: string | null | undefined): Template {
  return TEMPLATES[(id as TemplateId) in TEMPLATES ? (id as TemplateId) : 'executive']
}
