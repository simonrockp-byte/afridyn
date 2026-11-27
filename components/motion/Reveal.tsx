import type { CSSProperties } from 'react'

/**
 * Scroll reveal with zero per-element JavaScript: renders plain markup with the `ax-reveal`
 * class; a single <RevealObserver /> on the page adds `is-in` when it scrolls into view.
 * Content is only hidden when JS is running (`html.js`), so it stays visible without JS.
 */
export function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: { children: React.ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  return (
    <Tag className={`ax-reveal ${className}`} style={{ '--d': `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  )
}
