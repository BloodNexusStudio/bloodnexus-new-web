import Link from "next/link";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { CONTACT } from "@/data/site";
import styles from "./vr.module.css";

export const metadata = {
  title: "VR / XR Experiences — BloodNexus Studio",
  description:
    "Comfortable, intuitive, and realistic immersive experiences built for Quest, SteamVR, and Vision Pro.",
};

const GALLERY = [
  "https://bloodnexusstudio.in/otassets/FamilyRoom_-_Copy_fcqzbg.jpg",
  "https://bloodnexusstudio.in/otassets/IMG-20250421-WA0025_mu7mlq.jpg",
  "https://bloodnexusstudio.in/otassets/IMG-20250421-WA0026_ubm637.jpg",
  "https://bloodnexusstudio.in/otassets/IMG-20250421-WA0024_kobxdb.jpg",
  "https://bloodnexusstudio.in/otassets/IMG-20250421-WA0022_mmd1oy.jpg",
  "https://bloodnexusstudio.in/otassets/IMG-20250421-WA0019_dydete.jpg",
];

export default function VRPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src="https://bloodnexusstudio.in/otassets/VR-bg_uqw3k8.png"
            alt="VR banner"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.scanlines} />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.systemTag}>{"//"} IMMERSIVE VR BUILT FOR NATURAL INTERACTION</p>
          <MaskText as="h1" className={styles.heroTitle} text="Beyond Perception" />
          <p className={styles.heroDesc}>
            We design VR experiences that are comfortable, intuitive, and realistic—built for Quest, SteamVR, and Vision Pro.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/contact" className="pill pill--primary">
              START YOUR VR EXPERIENCE
            </Link>
          </div>
        </div>
      </section>

      {/* VR Solutions Banner */}
      <Reveal as="section" y={40} className={styles.bannerSection}>
        <div className="container">
          <div className={styles.bannerContainer}>
            <div className={styles.media}>
              <div className={styles.mediaOverlay} />
              {/* Gaming HUD corner brackets */}
              <div className={`${styles.hudCorner} ${styles.topLeft}`} />
              <div className={`${styles.hudCorner} ${styles.topRight}`} />
              <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
              <div className={`${styles.hudCorner} ${styles.bottomRight}`} />
              <img
                src="https://bloodnexusstudio.in/otassets/cbaec4f1-d8a7-402f-84cc-424f62491a24.png"
                alt="VR Solutions Banner"
              />
            </div>
            <div className={styles.bannerContent}>
              <p className={styles.systemTag}>{"//"} OPERATIONAL PROTOCOL</p>
              <h2 className={styles.bannerTitle}>Virtual Reality (VR) Solutions</h2>
              <p className={styles.bannerDesc}>
                Perfect for businesses that need to wow their audience or train their staff safely.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Visual Odyssey Section */}
      <Reveal as="section" y={40} className={styles.odysseySection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.sectionTitles}>
              <p className={styles.systemTag}>{"//"} CURATED VIRTUAL ENVIRONMENTS</p>
              <h2 className={styles.sectionTitle}>Visual Odyssey</h2>
            </div>
            <p className={styles.headDesc}>
              Each environment is meticulously rendered to capture the subtle interplay of light, texture, and emotion.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {GALLERY.map((p, index) => (
              <div
                key={index}
                className={`${styles.galleryCard} ${
                  index === 0 ? styles.featuredCard : ""
                }`}
              >
                <img src={p} alt={`Odyssey Environment ${index + 1}`} loading="lazy" />
                <div className={styles.galleryHover}>
                  <span className={styles.projectIndex}>PROJECT 0{index + 1}</span>
                  <h3 className={styles.projectTitle}>Virtual Space</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Power-Ups Section */}
      <Reveal as="section" y={40} className={styles.powerUpsSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <span className={styles.bgWord}>STANDARDS</span>
            <p className={styles.systemTag}>{"//"} PRODUCTION SYSTEMS</p>
            <h2 className={styles.centerTitle}>Power-Ups, Not Mark-Ups</h2>
          </div>

          <div className={styles.powerUpsGrid}>
            <div className={styles.powerCard}>
              <div className={styles.cardMedia}>
                <img
                  src="https://bloodnexusstudio.in/otassets/6dc2726f-447c-40fd-9184-69d9f3dbe147.png"
                  alt="VR Training & Simulation"
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>VR Training & Simulation:</h3>
                <p className={styles.cardDesc}>
                  Train employees in a safe, virtual environment. Great for heavy machinery, safety drills, or complex procedures.
                </p>
              </div>
            </div>

            <div className={styles.powerCard}>
              <div className={styles.cardMedia}>
                <img
                  src="https://bloodnexusstudio.in/otassets/ac1b28f6-bc0b-4660-b0c9-55e106966887.png"
                  alt="VR Gaming"
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>VR Gaming:</h3>
                <p className={styles.cardDesc}>
                  We build immersive games that take full advantage of motion controls and 360-degree environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Augmented Reality Section */}
      <Reveal as="section" y={40} className={styles.arSection}>
        <div className="container">
          <div className={styles.arGrid}>
            <div className={styles.arContent}>
              <p className={styles.systemTag}>{"//"} AUGMENTED REALITY (AR)</p>
              <h2 className={styles.arTitle}>Augmented Reality</h2>
              <p className={styles.arDesc}>
                Let customers scan a product package to see it come to life.
              </p>
              <Link href="/contact" className="pill pill--primary">
                LETS INNOVATE
              </Link>
            </div>
            <div className={styles.arMedia}>
              {/* Gaming HUD corner brackets */}
              <div className={`${styles.hudCorner} ${styles.topLeft}`} />
              <div className={`${styles.hudCorner} ${styles.topRight}`} />
              <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
              <div className={`${styles.hudCorner} ${styles.bottomRight}`} />
              <img
                src="https://bloodnexusstudio.in/otassets/cbf57e62-e045-42a0-b6d9-2060b4a0d454.png"
                alt="Augmented Reality experience"
              />
            </div>
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
