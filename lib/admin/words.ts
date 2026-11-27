// "Three thousand nine hundred Kwacha and fifty Ngwee only" — printed under
// document totals as a guard against altered figures.

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const SCALES = ['', 'thousand', 'million', 'billion']

function under1000(n: number): string {
  const h = Math.floor(n / 100)
  const r = n % 100
  const parts: string[] = []
  if (h) parts.push(`${ONES[h]} hundred`)
  if (r) {
    const t = r < 20 ? ONES[r] : `${TENS[Math.floor(r / 10)]}${r % 10 ? `-${ONES[r % 10]}` : ''}`
    parts.push(h ? `and ${t}` : t)
  }
  return parts.join(' ')
}

export function numberInWords(n: number): string {
  n = Math.floor(Math.abs(n))
  if (n === 0) return 'zero'
  const groups: string[] = []
  const last = n % 1000
  let scale = 0
  while (n > 0 && scale < SCALES.length) {
    const chunk = n % 1000
    if (chunk) groups.unshift(`${under1000(chunk)}${SCALES[scale] ? ` ${SCALES[scale]}` : ''}`)
    n = Math.floor(n / 1000)
    scale++
  }
  // British style: "ten thousand and fifteen".
  if (n === 0 && groups.length > 1 && last > 0 && last < 100) groups[groups.length - 1] = `and ${groups[groups.length - 1]}`
  return groups.join(' ')
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** ngwee → "Three thousand nine hundred Kwacha only" / "... Kwacha and fifty Ngwee only". */
export function kwachaInWords(ngwee: number): string {
  const abs = Math.abs(Math.round(ngwee))
  const k = Math.floor(abs / 100)
  const n = abs % 100
  const kw = `${numberInWords(k)} Kwacha`
  return cap(`${ngwee < 0 ? 'minus ' : ''}${n ? `${kw} and ${numberInWords(n)} Ngwee` : kw} only`)
}
