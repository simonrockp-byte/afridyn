import Link from 'next/link'
import { STATUS_LABELS, type DocStatus } from '@/lib/admin/documents'
import { formatZMW } from '@/lib/admin/money'

export function PageHeader({ code, title, lead, actions }: { code: string; title: string; lead?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <p className="ax-spec text-[10px]" style={{ color: 'var(--ax-copper)' }}>{code}</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-white mt-1 tracking-tight">{title}</h1>
        {lead && <p className="mt-2 text-[15px]" style={{ color: 'var(--ax-dim)' }}>{lead}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

const STATUS_COLOURS: Record<DocStatus, string> = {
  draft: '#A3AFBF',
  sent: '#22D3EE',
  accepted: '#34D399',
  partially_paid: '#FBBF24',
  paid: '#34D399',
  delivered: '#34D399',
  void: '#F87171',
}

export function StatusBadge({ status }: { status: DocStatus }) {
  const c = STATUS_COLOURS[status]
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border font-mono text-[10.5px] uppercase tracking-[0.12em] whitespace-nowrap" style={{ borderColor: `${c}66`, color: c }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} aria-hidden />
      {STATUS_LABELS[status]}
    </span>
  )
}

export function Money({ ngwee, strong }: { ngwee: number; strong?: boolean }) {
  return <span className={`tabular-nums ${strong ? 'text-white font-semibold' : ''}`}>{formatZMW(ngwee)}</span>
}

export function Panel({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="ax-panel p-5 md:p-6">
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 mb-4">
          {title && <h2 className="ax-spec" style={{ color: 'var(--ax-text)' }}>{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}

export function Empty({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="border border-dashed p-8 text-center" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-dim)' }}>
      <p>{children}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}

export function Field({ label, name, defaultValue, type = 'text', required, placeholder, as, rows, children, hint }: {
  label: string
  name: string
  defaultValue?: string | number | null
  type?: string
  required?: boolean
  placeholder?: string
  as?: 'textarea' | 'select'
  rows?: number
  children?: React.ReactNode
  hint?: string
}) {
  const id = `f-${name}`
  return (
    <div>
      <label htmlFor={id} className="ax-label">{label}{required ? ' *' : ''}</label>
      {as === 'textarea' ? (
        <textarea id={id} name={name} defaultValue={defaultValue ?? ''} required={required} placeholder={placeholder} rows={rows ?? 3} className="ax-field resize-y" />
      ) : as === 'select' ? (
        <select id={id} name={name} defaultValue={defaultValue ?? ''} required={required} className="ax-field">{children}</select>
      ) : (
        <input id={id} name={name} type={type} defaultValue={defaultValue ?? ''} required={required} placeholder={placeholder} className="ax-field" />
      )}
      {hint && <p className="mt-1.5 text-[12.5px]" style={{ color: 'var(--ax-faint)' }}>{hint}</p>}
    </div>
  )
}

export function LinkButton({ href, children, variant = 'ghost' }: { href: string; children: React.ReactNode; variant?: 'ghost' | 'copper' }) {
  return (
    <Link href={href} className={`ax-btn ${variant === 'copper' ? 'ax-btn-copper' : 'ax-btn-ghost'} !min-h-[42px] !px-4`}>
      {children}
    </Link>
  )
}

export function formatDate(iso: string | Date | null | undefined): string {
  if (!iso) return '—'
  const s = typeof iso === 'string' ? iso.slice(0, 10) : iso.toISOString().slice(0, 10)
  return new Date(`${s}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
}
