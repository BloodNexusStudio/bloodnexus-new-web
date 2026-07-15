import Link from "next/link";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { CONTACT } from "@/data/site";
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
  "https://res.cloudinary.com/oglqwvqq/video/upload/v1784022265/ARCHVIZ_2_wgkmbk.mp4";

const DELIVERABLES = [
  {
    index: "01",
    title: "Exterior Rendering",
    desc: "Photorealistic structural facades, architectural contours, and natural landscape integration.",
    image: "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934510/archviz-1_hsyoti.jpg",
  },
  {
    index: "02",
    title: "Interior Design & Mood",
    desc: "Hyper-detailed indoor environments capturing authentic lighting, furniture arrangement, and physical materials.",
    image: "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934510/archviz-2_mrptom.jpg",
  },
  {
    index: "03",
    title: "Interactive Property Walkthroughs",
    desc: "Cinematic fluid tours designed in real-time engine to show property layouts and room flow.",
    image: "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934510/archviz-3_mf7hgz.jpg",
  },
  {
    index: "04",
    title: "Commercial & Office Spaces",
    desc: "Spacious commercial complex designs customized for retail, enterprise offices, and modern working hubs.",
    image: "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934509/archviz-5_ncybew.jpg",
  },
  {
    index: "05",
    title: "Township & High-Rise Renders",
    desc: "Stunning masterplans and realistic aerial captures designed for massive cityscapes and apartments.",
    image: "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934509/archviz-6_zzem07.jpg",
  },
  {
    index: "06",
    title: "Dynamic Ambient Lighting",
    desc: "Accurate daylight simulation, architectural mood lighting, and shadow studies to capture dawn to dusk vibes.",
    image: "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934509/archviz-7_gewhjs.jpg",
  },
];

const WORKS = [
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934510/archviz-1_hsyoti.jpg",
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934510/archviz-2_mrptom.jpg",
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934510/archviz-3_mf7hgz.jpg",
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934511/archviz-4_pjsj9p.jpg",
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934509/archviz-5_ncybew.jpg",
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934509/archviz-6_zzem07.jpg",
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934509/archviz-7_gewhjs.jpg",
  "https://res.cloudinary.com/oglqwvqq/image/upload/v1783934509/archviz-8_wqhnsu.jpg",
];

export default function ArchVizPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <video
            src="https://res.cloudinary.com/oglqwvqq/video/upload/v1783934528/archviz-9_jkk6cl.mp4"
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
          <p className={styles.systemTag}>{"//"} REALISTIC ARCHITECTURE VISUALS IN REAL-TIME</p>
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
            <p className={styles.sectionLabel}>{"//"} VISUAL IDENTITY</p>
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
              src="https://res.cloudinary.com/oglqwvqq/image/upload/v1783934511/archviz-4_pjsj9p.jpg"
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
            <p className={styles.systemTag}>{"//"} WHAT WE DELIVER</p>
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
      <section className={styles.showcaseSection}>
        <video
          className={styles.showcaseVideo}
          src={ARCHVIZ_SHOWCASE_VIDEO}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={styles.showcaseOverlay} />
        <div className={styles.videoShield} />

        <div className={`container ${styles.showcaseContent}`}>
          <div className={styles.showcaseLeft}>
            <p className={styles.systemTag}>{"// "} REAL-TIME WALKTHROUGH</p>
            <h2 className={styles.showcaseTitle}>Vibrant Spaces</h2>
            <p className={styles.showcaseDesc}>
              Experience interactive walkthroughs with fully dynamic lighting, physically accurate materials, and seamless frame-rates powered by Unreal Engine 5.
            </p>
            <a
              href="/video/archviz"
              target="_blank"
              className={styles.viewFullBtn}
            >
              <span className={styles.viewFullIcon}>▶</span>
              View Full Walkthrough
            </a>
          </div>

          <div className={styles.showcaseRight}>
            <div className={styles.showcaseStats}>
              <div className={styles.showcaseStat}>
                <span className={styles.statLabel}>Resolution</span>
                <span className={styles.statValue}>4K Ultra HD</span>
              </div>
              <div className={styles.showcaseStat}>
                <span className={styles.statLabel}>Illumination</span>
                <span className={styles.statValue}>Lumen Global Illumination</span>
              </div>
              <div className={styles.showcaseStat}>
                <span className={styles.statLabel}>Interactivity</span>
                <span className={styles.statValue}>Real-Time Sandbox Walkthrough</span>
              </div>
              <div className={styles.showcaseStat}>
                <span className={styles.statLabel}>Render Time</span>
                <span className={styles.statValue}>Instant (60 FPS Real-time)</span>
              </div>
            </div>
            <div className={styles.showcaseHighlights}>
              <p className={styles.highlightItem}>
                <span className={styles.highlightDot} /> Dynamic day/night cycle simulation
              </p>
              <p className={styles.highlightItem}>
                <span className={styles.highlightDot} /> Custom material shaders (PBR)
              </p>
              <p className={styles.highlightItem}>
                <span className={styles.highlightDot} /> Detailed architectural models
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <Reveal as="section" y={40} className={styles.portfolioSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.systemTag}>{"//"} PORTFOLIO</p>
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
          <p className={styles.systemTag}>{"//"} SECURE CHANNEL CONNECT</p>
          <h2 className={styles.ctaTitle}>Ready to begin production?</h2>
          <a href={`mailto:${CONTACT.email}`} className="pill pill--primary">
            ESTABLISH CONNECTION
          </a>
        </div>
      </section>
    </>
  );
}
