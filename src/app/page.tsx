"use client";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { MissionVision } from "@/components/sections/MissionVision";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <LoadingScreen />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <MissionVision />
        <WhyChooseUs />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
