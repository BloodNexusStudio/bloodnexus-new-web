import OrbitCarousel from "@/components/home/OrbitCarousel";
import Spotlight from "@/components/home/Spotlight";
import CategoryMarquee from "@/components/home/CategoryMarquee";
import GamesCarousel from "@/components/home/GamesCarousel";
import ServicesTicker from "@/components/home/ServicesTicker";
import ServicesBand from "@/components/home/ServicesBand";
import StatsStrip from "@/components/home/StatsStrip";
import CareersTeaser from "@/components/home/CareersTeaser";
import MissionControlForm from "@/components/home/MissionControlForm";

// Home page — wordmark plays as the site preloader (layout); the carousel is the hero.
export default function Home() {
  return (
    <>
      <OrbitCarousel />
      <Spotlight />
      <CategoryMarquee />
      <GamesCarousel />
      <ServicesTicker />
      <ServicesBand />
      <StatsStrip />
      <CareersTeaser />
      <MissionControlForm />
      {/* Footer (§6.6) is rendered globally in layout.tsx */}
    </>
  );
}
