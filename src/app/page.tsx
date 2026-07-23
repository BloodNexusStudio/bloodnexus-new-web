import HomeHero from "@/components/home/HomeHero";
import OrbitCarousel from "@/components/home/OrbitCarousel";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import GamesCarousel from "@/components/home/GamesCarousel";
import OurProcess from "@/components/home/OurProcess";
import PerformanceSolutions from "@/components/home/PerformanceSolutions";
import StatsStrip from "@/components/home/StatsStrip";
import Testimonials from "@/components/home/Testimonials";
import MissionControlForm from "@/components/home/MissionControlForm";

// Home page — wordmark plays as the site preloader (layout); the carousel is the hero.
export default function Home() {
  return (
    <>
      <HomeHero />
      <OrbitCarousel />
      <TechStackMarquee />
      <GamesCarousel />
      <OurProcess />
      <PerformanceSolutions />
      <StatsStrip />
      <Testimonials />
      <MissionControlForm />
      {/* Footer (§6.6) is rendered globally in layout.tsx */}
    </>
  );
}
