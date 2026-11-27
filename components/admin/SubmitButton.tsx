'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ children, variant = 'copper' }: { children: React.ReactNode; variant?: 'copper' | 'ghost' }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={`ax-btn ${variant === 'copper' ? 'ax-btn-copper' : 'ax-btn-ghost'} disabled:opacity-60`}>
      {pending ? 'Saving…' : children}
    </button>
  )
}
