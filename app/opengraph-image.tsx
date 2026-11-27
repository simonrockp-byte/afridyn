import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Afridyn Engineering Limited — engineering services in Lusaka, Zambia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const mark = await readFile(join(process.cwd(), 'public/images/logo-mark.png'))
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: 72, background: '#07090D', color: '#E7ECF2',
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={96} height={90} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>Afridyn</div>
            <div style={{ fontSize: 20, letterSpacing: 6, color: '#6AAB2E' }}>ENGINEERING LIMITED</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, display: 'flex', flexWrap: 'wrap' }}>
            Engineering for Africa&apos;s mines, plants &amp; networks.
          </div>
          <div style={{ fontSize: 24, color: '#A3AFBF' }}>
            Mechanical · Electrical · IT · Fibre Optics — Lusaka, Zambia
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 20, color: '#FF6A1A', letterSpacing: 3 }}>
          <span>PACRA 120261040695</span>
          <span>ZPPA 137269</span>
          <span>TPIN 2004257975</span>
        </div>
      </div>
    ),
    size,
  )
}
