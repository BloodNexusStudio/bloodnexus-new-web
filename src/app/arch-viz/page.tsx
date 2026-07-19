import Link from "next/link";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { CONTACT } from "@/data/site";
import WalkthroughShowcase from "@/components/showcase/WalkthroughShowcase";
import styles from "./arch-viz.module.css";

export const metadata = {
  title: "Arch Viz — BloodNexus Studio",
  description:
    "Realistic architecture visuals in real-time. Reshaping perspective with photoreal renders, walkthroughs, and VR experiences.",
};

const TOOLS = [
  "UNREAL ENGINE 5",
  "LUMEN",
  "TWINMOTION",
  "BLENDER",
  "MEGASCANS",
  "CAD-TO-FBX",
];

const ARCHVIZ_SHOWCASE_VIDEO =
  "/cloudinary-assets/videos/ARCHVIZ_2_wgkmbk.mp4";

const DELIVERABLES = [
  {
    index: "01",
    title: "Exterior Rendering",
    desc: "Photorealistic structural facades, architectural contours, and natural landscape integration.",
    image: "/cloudinary-assets/images/archviz-1_hsyoti.jpg",
  },
  {
    index: "02",
    title: "Interior Design & Mood",
    desc: "Hyper-detailed indoor environments capturing authentic lighting, furniture arrangement, and physical materials.",
    image: "/cloudinary-assets/images/archviz-2_mrptom.jpg",
  },
  {
    index: "03",
    title: "Interactive Property Walkthroughs",
    desc: "Cinematic fluid tours designed in real-time engine to show property layouts and room flow.",
    image: "/cloudinary-assets/images/archviz-3_mf7hgz.jpg",
  },
  {
    index: "04",
    title: "Commercial & Office Spaces",
    desc: "Spacious commercial complex designs customized for retail, enterprise offices, and modern working hubs.",
    image: "/cloudinary-assets/images/archviz-5_ncybew.jpg",
  },
  {
    index: "05",
    title: "Township & High-Rise Renders",
    desc: "Stunning masterplans and realistic aerial captures designed for massive cityscapes and apartments.",
    image: "/cloudinary-assets/images/archviz-6_zzem07.jpg",
  },
  {
    index: "06",
    title: "Dynamic Ambient Lighting",
    desc: "Accurate daylight simulation, architectural mood lighting, and shadow studies to capture dawn to dusk vibes.",
    image: "/cloudinary-assets/images/archviz-7_gewhjs.jpg",
  },
];

const WORKS = [
  "/cloudinary-assets/images/archviz-1_hsyoti.jpg",
  "/cloudinary-assets/images/archviz-2_mrptom.jpg",
  "/cloudinary-assets/images/archviz-3_mf7hgz.jpg",
  "/cloudinary-assets/images/archviz-4_pjsj9p.jpg",
  "/cloudinary-assets/images/archviz-5_ncybew.jpg",
  "/cloudinary-assets/images/archviz-6_zzem07.jpg",
  "/cloudinary-assets/images/archviz-7_gewhjs.jpg",
  "/cloudinary-assets/images/archviz-8_wqhnsu.jpg",
];

export default function ArchVizPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <video
            src="/cloudinary-assets/videos/archviz-9_jkk6cl.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroVideo}
          />
          <div className={styles.heroOverlay} />
          {/* Shield overlay blocks right-click on hero video */}
          <div className={styles.videoShield} />
        </div>
        <div className={styles.scanlines} />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.systemTag}>REALISTIC ARCHITECTURE VISUALS IN REAL-TIME</p>
          <MaskText as="h1" className={styles.heroTitle} text="Reshaping Perspective" />
          <p className={styles.heroDesc}>
            We bring real-estate ideas to life with detailed interior and exterior
            renders, walkthrough videos, and VR experiences powered by real-time engines.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/#contact" className="pill pill--primary">
              INITIATE INQUIRY
            </Link>
          </div>
        </div>
      </section>

      {/* Atmospheres Section */}
      <Reveal as="section" y={40} className={styles.atmosphereSection}>
        <div className={`container ${styles.atmosphereGrid}`}>
          <div className={styles.atmosphereCopy}>
            <p className={styles.sectionLabel}>VISUAL IDENTITY</p>
            <h2 className={styles.sectionTitle}>More Than Renders</h2>
            <h3 className={styles.sectionSub}>Atmospheres</h3>
            <p className={styles.text}>
              Our visuals do more than show a building—they help people feel the space. We add:
            </p>
            <ul className={styles.bullets}>
              <li>Warm, natural lighting</li>
              <li>High-quality materials</li>
              <li>Realistic props & décor</li>
              <li>Smooth camera paths</li>
              <li>Accurate proportions</li>
            </ul>
            <p className={styles.pitchText}>
              Clients use our visuals to pitch projects faster, close deals confidently,
              and give buyers a clear idea of the final environment.
            </p>

            <div className={styles.toolsContainer}>
              <p className={styles.toolsLabel}>Tools We Use</p>
              <div className={styles.toolsList}>
                {TOOLS.map((t) => (
                  <span key={t} className={styles.toolTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.atmosphereMedia}>
            {/* Gaming HUD corner brackets */}
            <div className={`${styles.hudCorner} ${styles.topLeft}`} />
            <div className={`${styles.hudCorner} ${styles.topRight}`} />
            <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
            <div className={`${styles.hudCorner} ${styles.bottomRight}`} />
            <img
              src="/cloudinary-assets/images/archviz-4_pjsj9p.jpg"
              alt="Luxury interior architecture render"
            />
          </div>
        </div>
      </Reveal>

      {/* Deliverables Section */}
      <Reveal as="section" y={40} className={styles.deliverablesSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <span className={styles.bgWord}>CAPABILITIES</span>
            <p className={styles.systemTag}>WHAT WE DELIVER</p>
            <h2 className={styles.centerTitle}>Visual Capabilities</h2>
          </div>

          <div className={styles.deliverablesGrid}>
            {DELIVERABLES.map((d) => (
              <div key={d.index} className={styles.deliverableCard}>
                <div className={styles.cardMedia}>
                  <img src={d.image} alt={d.title} loading="lazy" />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardIndexRow}>
                    <span className={styles.cardIndex}>{d.index}</span>
                    <span className={styles.cardLine} />
                  </div>
                  <h3 className={styles.cardTitle}>{d.title}</h3>
                  <p className={styles.cardDesc}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Real-Time Walkthrough Showcase Section ───────────────────── */}
      <WalkthroughShowcase
        videoSrc={ARCHVIZ_SHOWCASE_VIDEO}
        tag="REAL-TIME WALKTHROUGH"
        title="Vibrant Spaces"
        desc="Experience interactive walkthroughs with fully dynamic lighting, physically accurate materials, and seamless frame-rates powered by Unreal Engine 5."
        ctaText="View Full Walkthrough"
        stats={[
          { label: "Resolution", value: "4K Ultra HD" },
          { label: "Illumination", value: "Lumen Global Illumination" },
          { label: "Interactivity", value: "Real-Time Sandbox Walkthrough" },
          { label: "Render Time", value: "Instant (60 FPS Real-time)" },
        ]}
        highlights={[
          "Dynamic day/night cycle simulation",
          "Custom material shaders (PBR)",
          "Detailed architectural models",
        ]}
      />

      {/* Selected Works Section */}
      <Reveal as="section" y={40} className={styles.portfolioSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.systemTag}>PORTFOLIO</p>
            <h2 className={styles.centerTitle}>Selected Works</h2>
          </div>

          <div className={styles.worksGrid}>
            {WORKS.map((w, index) => (
              <div key={index} className={styles.workCard}>
                <img src={w} alt={`Selected Work ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Secure CTA */}
      <section className={styles.cta}>
        <div className="container">
          <p className={styles.systemTag}>SECURE CHANNEL CONNECT</p>
          <h2 className={styles.ctaTitle}>Ready to begin production?</h2>
          <a href={`mailto:${CONTACT.email}`} className="pill pill--primary">
            ESTABLISH CONNECTION
          </a>
        </div>
      </section>
    </>
  );
}
