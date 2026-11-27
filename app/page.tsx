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

export default function Home() {
  return (
    <>
      <Hero />
      <Disciplines />
      <Services />
      <About />
      <Compliance />
      <Sectors />
      <WhyUs />
      <Projects />
      <TrustedBy />
      <CTA />
      <Contact />
      <RevealObserver />
    </>
  )
}
