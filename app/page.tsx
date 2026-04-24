import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Sectors } from '@/components/sections/Sectors'
import { WhyUs } from '@/components/sections/WhyUs'
import { CTA } from '@/components/sections/CTA'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Sectors />
      <WhyUs />
      <CTA />
      <Contact />
    </>
  )
}
