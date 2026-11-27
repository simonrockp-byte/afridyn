import { Reveal } from '@/components/motion/Reveal'

export function SectionHeader({
  code, eyebrow, title, accent, lead, align = 'left', id,
}: {
  code: string
  eyebrow: string
  title: string
  accent?: string
  lead?: string
  align?: 'left' | 'center'
  id?: string
}) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-14 md:mb-16`}>
      <div className={`flex items-center gap-4 mb-5 ${center ? 'justify-center' : ''}`}>
        <span className="ax-eyebrow">{eyebrow}</span>
        <span className="ax-spec text-[10px]" aria-hidden data-scramble>[{code}]</span>
      </div>
      <h2 id={id} className="ax-h2">
        {title}{accent && <> <span className="ax-accent">{accent}</span></>}
      </h2>
      {lead && <p className={`ax-lead mt-5 ${center ? 'mx-auto' : ''} max-w-2xl`}>{lead}</p>}
    </Reveal>
  )
}
