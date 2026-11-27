// Ported from Milo Motors. Money is stored and computed as integer ngwee
// (K 1 = 100 ngwee) so totals never drift; convert only at the edges.

export function toNgwee(kwacha: number): number {
  return Math.round(kwacha * 100)
}

export function toKwacha(ngwee: number): number {
  return ngwee / 100
}

const formatter = new Intl.NumberFormat('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** "K 1,250.00"; negatives as "-K 1,250.00". */
export function formatZMW(ngwee: number): string {
  const sign = ngwee < 0 ? '-' : ''
  return `${sign}K ${formatter.format(Math.abs(ngwee) / 100)}`
}

/** Parses typed amounts ("1,250.5", "K 300") into ngwee; null if invalid. */
export function parseKwachaInput(value: string): number | null {
  const cleaned = value.replace(/[Kk,\s]/g, '')
  if (cleaned === '' || !/^-?\d*\.?\d{0,2}$/.test(cleaned) || cleaned === '.' || cleaned === '-') return null
  return toNgwee(Number(cleaned))
}

/** qty may be fractional; the line total is rounded once, not per unit. */
export function lineTotal(qty: number, unitPriceNgwee: number): number {
  return Math.round(qty * unitPriceNgwee)
}
