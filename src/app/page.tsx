import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryMarquee from "@/components/home/CategoryMarquee";
import ServicesBand from "@/components/home/ServicesBand";
import StatsStrip from "@/components/home/StatsStrip";
import CareersTeaser from "@/components/home/CareersTeaser";

// Home page — wordmark plays as the site preloader (layout); the carousel is the hero.
export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CategoryMarquee />
      <ServicesBand />
      <StatsStrip />
      <CareersTeaser />
      {/* Footer (§6.6) is rendered globally in layout.tsx */}
    </>
  );
}
