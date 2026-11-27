import { Hero }        from '@/components/sections/Hero'
import { Disciplines } from '@/components/sections/Disciplines'
import { Services }    from '@/components/sections/Services'
import { About }       from '@/components/sections/About'
import { Compliance }  from '@/components/sections/Compliance'
import { Sectors }     from '@/components/sections/Sectors'
import { WhyUs }       from '@/components/sections/WhyUs'
import { Projects, TrustedBy } from '@/components/sections/Projects'
import { CTA }         from '@/components/sections/CTA'
import { Contact }     from '@/components/sections/Contact'
import { RevealObserver } from '@/components/motion/RevealObserver'
import { Process, KineticBand } from '@/components/sections/Process'
import { Interactions } from '@/components/fx/Interactions'

export default function Home() {
  return (
    <>
      <Hero />
      <Disciplines />
      <KineticBand />
      <Services />
      <Process />
      <About />
      <Compliance />
      <Sectors />
      <WhyUs />
      <Projects />
      <TrustedBy />
      <CTA />
      <Contact />
      <RevealObserver />
      <Interactions />
      <div className="ax-cursor-grid" aria-hidden />
    </>
  )
}
