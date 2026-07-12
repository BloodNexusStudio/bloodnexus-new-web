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

const DELIVERABLES = [
  {
    index: "01",
    title: "Exterior Rendering",
    desc: "Photorealistic facades and environments that sell the vision.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    index: "02",
    title: "Interior Rendering",
    desc: "Detailed spaces with mood, lighting, and realistic decor.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    index: "03",
    title: "4K/8K Walkthroughs",
    desc: "Cinematic video tours that showcase property flow.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    index: "04",
    title: "VR Property Tours",
    desc: "Immersive interactive walkthroughs for pre-sales.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
  },
  {
    index: "05",
    title: "Township Visualization",
    desc: "Large-scale masterplans and aerial views.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    index: "06",
    title: "Lighting & Materials",
    desc: "Material selection and lighting studies.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
  },
];

const WORKS = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
];

export default function ArchVizPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80"
            alt="Arch Viz banner"
          />
          <div className={styles.heroOverlay} />
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
            <Link href="/contact" className="pill pill--primary">
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
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&h=900&q=80"
              alt="Luxury bedroom render"
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
