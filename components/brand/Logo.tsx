import Image from 'next/image'

/** Afridyn lockup: brand mark (from the official logo) + live-text wordmark that stays crisp on dark. */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const mark = size === 'lg' ? 56 : 46
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={mark}
        height={Math.round(mark * 180 / 192)}
        priority
        className="shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-bold text-white"
          style={{ fontSize: size === 'lg' ? 30 : 25, letterSpacing: '-0.02em' }}
        >
          Afridyn
        </span>
        <span
          className="font-mono font-semibold uppercase mt-1"
          style={{ fontSize: size === 'lg' ? 10.5 : 9, letterSpacing: '0.28em', color: 'var(--logo-green, #8BCB4F)' }}
        >
          Engineering Limited
        </span>
      </span>
    </span>
  )
}
