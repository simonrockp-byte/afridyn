'use client'
import { RefreshCw } from 'lucide-react'

export function RetryButton() {
  return (
    <button type="button" className="ax-btn ax-btn-copper" onClick={() => window.location.reload()}>
      <RefreshCw size={15} aria-hidden /> Try again
    </button>
  )
}
