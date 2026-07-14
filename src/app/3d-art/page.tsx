import Link from "next/link";
import Image from "next/image";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { withWatermark } from "@/lib/cloudinary";
import styles from "./3d-art.module.css";

export const metadata = {
  title: "3D Art & Animation — BloodNexus Studio",
  description:
    "High-fidelity 3D modeling, texturing, rendering, and animation. BloodNexus Studio crafts visuals that push the boundaries of real-time and cinematic production.",
};

// ── Real assets ────────────────────────────────────────────────────────────
const HERO_VIDEO =
  "https://res.cloudinary.com/oglqwvqq/video/upload/v1784007703/3dart-1_1_vaugim.mp4";

const WARSAW_VIDEO =
  "https://res.cloudinary.com/oglqwvqq/video/upload/v1784016507/WARSAW_z4miiu.mp4";

// Gallery — all 16 images with pixel-level watermarks via Cloudinary transform
const GALLERY = [
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007704/3dart-16_nrx6d1.png"), alt: "3D character render — detailed sculpt" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007689/3dart-11_uceyn2.png"), alt: "3D art render — stylised character" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007696/3dart-17_jeiim7.jpg"), alt: "3D scene — environment lighting" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007695/3dart-6_lgcx5k.png"), alt: "3D model — high poly asset" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007690/3dart-10_ziywet.png"), alt: "3D render — cinematic composition" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007692/3dart-9_op3xza.png"), alt: "3D art — creature concept" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007687/3dart-13_obplkd.png"), alt: "3D model — organic sculpt" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007693/3dart-2_ke6lp1.jpg"), alt: "3D art — character portrait" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007695/3dart-18_ubrxbt.png"), alt: "3D render — materials and shading" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007594/3dart-21_n8kdvh.jpg"), alt: "3D art — stylised scene" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007592/3dart-23_1_a0fdxs.png"), alt: "3D render — detailed environment" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007592/3dart-20_1_uifghl.png"), alt: "3D art — character rigging pose" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007590/3dart-22_1_uetcav.png"), alt: "3D model — texture work" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007589/3dart-12_1_uhpc9i.png"), alt: "3D art — cinematic lighting" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007587/3dart-19_1_zsz5ri.png"), alt: "3D render — hard surface model" },
  { src: withWatermark("https://res.cloudinary.com/oglqwvqq/image/upload/v1784007586/3dart-7_1_ri14o4.png"), alt: "3D art — stylised character render" },
];

// Spotlight images for the services section (first 3)
const SPOTLIGHT = GALLERY.slice(0, 3);
// Feature image for vision section
const FEATURE_IMG = GALLERY[3];
// Remaining gallery images
const MASONRY = GALLERY.slice(4);

export default function ThreeDArtPage() {
  return (
    <>
      {/* ── Hero — full-screen video ──────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <video
            className={styles.heroVideo}
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className={styles.heroOverlay} />
          {/* Shield blocks right-click on hero video */}
          <div className={styles.videoShield} />
        </div>
        <div className={styles.scanlines} />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.systemTag}>{"// "} MODELS · RENDERS · ANIMATION</p>
          <MaskText
            as="h1"
            className={styles.heroTitle}
            text="Art That Speaks."
          />
          <p className={styles.heroDesc}>
            From concept sculpt to final render — we build{" "}
            <span className={styles.highlightText}>characters, creatures</span>{" "}
            and environments that look stunning in every frame.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/#contact" className="pill pill--primary">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services — 3 spotlight cards ──────────────────────────────────── */}
      <Reveal as="section" y={40} className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesHead}>
            <p className={styles.systemTag}>{"// "} WHAT WE DO</p>
            <h2 className={styles.sectionTitle}>End-to-End 3D Production</h2>
            <p className={styles.sectionSub}>
              From the first sketch to the final engine-ready asset — we cover the full pipeline.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {[
              {
                num: "01",
                title: "High-Fidelity Modeling",
                desc: "Organic sculpts, hard-surface assets, and everything in between — built to the highest detail level the project demands.",
                img: SPOTLIGHT[0],
              },
              {
                num: "02",
                title: "Texturing & Shading",
                desc: "PBR materials, hand-painted textures, and procedural shading that make every surface feel real under any lighting condition.",
                img: SPOTLIGHT[1],
              },
              {
                num: "03",
                title: "Physics & Animation",
                desc: "Fluid character motion, real-time cloth simulations, and complex physics rigs that bring assets to life.",
                video: "https://res.cloudinary.com/oglqwvqq/video/upload/v1784019225/All_three_Cloth_Simulated_hzr7ek.mp4",
              },
            ].map((s) => (
              <div key={s.num} className={styles.serviceCard}>
                <div className={styles.serviceCardMedia}>
                  {s.video ? (
                    <>
                      <video
                        src={s.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={styles.serviceCardVideo}
                      />
                      <div className={styles.videoShield} />
                    </>
                  ) : s.img ? (
                    <Image
                      src={s.img.src}
                      alt={s.img.alt}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className={styles.serviceCardImg}
                    />
                  ) : null}
                  <span className={styles.serviceNum}>{s.num}</span>
                </div>
                <div className={styles.serviceCardBody}>
                  <h3 className={styles.serviceCardTitle}>{s.title}</h3>
                  <p className={styles.serviceCardDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Feature — full-width split ─────────────────────────────────────── */}
      <Reveal as="section" y={40} className={styles.featureSection}>
        <div className={`container ${styles.featureGrid}`}>
          <div className={styles.featureCopy}>
            <p className={styles.systemTag}>{"// "} CREATIVE PIPELINE</p>
            <h2 className={styles.featureTitle}>
              Every Detail.<br />Intentional.
            </h2>
            <p className={styles.featureDesc}>
              We don't just model — we craft. Each asset goes through a rigorous
              review for topology, UV layout, and engine performance so what you
              get is production-ready from day one.
            </p>
            <ul className={styles.featureList}>
              <li>Engine-ready topology & LODs</li>
              <li>Unreal Engine & Unity optimised exports</li>
              <li>4K PBR texture sets</li>
              <li>Full animation cycles & blendshapes</li>
            </ul>
          </div>
          <div className={styles.featureMedia}>
            <div className={`${styles.hudCorner} ${styles.topLeft}`} />
            <div className={`${styles.hudCorner} ${styles.topRight}`} />
            <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
            <div className={`${styles.hudCorner} ${styles.bottomRight}`} />
            <Image
              src={FEATURE_IMG.src}
              alt={FEATURE_IMG.alt}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className={styles.featureImg}
            />
          </div>
        </div>
      </Reveal>

      {/* ── Warsaw Video — Full-screen background section ─────────────── */}
      <section className={styles.warsawSection}>
        <video
          className={styles.warsawVideo}
          src={WARSAW_VIDEO}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={styles.warsawOverlay} />
        <div className={styles.videoShield} />

        <div className={`container ${styles.warsawContent}`}>
          {/* LEFT — Title + description + CTA */}
          <div className={styles.warsawLeft}>
            <p className={styles.systemTag}>{"// "} CINEMATIC SHOWCASE</p>
            <h2 className={styles.warsawTitle}>Warsaw</h2>
            <p className={styles.warsawDesc}>
              A cinematic animation piece set in 1940s Warsaw — demonstrating
              our full 3D production pipeline from environment design, period-accurate
              props, character animation, and final cinematic compositing.
            </p>
            <a
              href="/video/warsaw"
              target="_blank"
              className={styles.viewFullBtn}
            >
              <span className={styles.viewFullIcon}>▶</span>
              View Full Video
            </a>
          </div>

          {/* RIGHT — Project details */}
          <div className={styles.warsawRight}>
            <div className={styles.warsawStats}>
              <div className={styles.warsawStat}>
                <span className={styles.statLabel}>Type</span>
                <span className={styles.statValue}>Cinematic Animation</span>
              </div>
              <div className={styles.warsawStat}>
                <span className={styles.statLabel}>Setting</span>
                <span className={styles.statValue}>1940s Warsaw, Poland</span>
              </div>
              <div className={styles.warsawStat}>
                <span className={styles.statLabel}>Pipeline</span>
                <span className={styles.statValue}>Modeling · Rigging · Animation · Lighting</span>
              </div>
              <div className={styles.warsawStat}>
                <span className={styles.statLabel}>Engine</span>
                <span className={styles.statValue}>Unreal Engine 5</span>
              </div>
              <div className={styles.warsawStat}>
                <span className={styles.statLabel}>Studio</span>
                <span className={styles.statValue}>BloodNexus Studio</span>
              </div>
            </div>
            <div className={styles.warsawHighlights}>
              <p className={styles.highlightItem}>
                <span className={styles.highlightDot} /> Period-accurate environment & props
              </p>
              <p className={styles.highlightItem}>
                <span className={styles.highlightDot} /> Full character rigs & animation cycles
              </p>
              <p className={styles.highlightItem}>
                <span className={styles.highlightDot} /> Cinematic lighting & atmosphere
              </p>
              <p className={styles.highlightItem}>
                <span className={styles.highlightDot} /> Real-time rendered in UE5
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── Masonry Gallery ───────────────────────────────────────────────── */}
      <Reveal as="section" y={40} className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryHead}>
            <span className={styles.bgWord}>PORTFOLIO</span>
            <p className={styles.systemTag}>{"// "} SELECTED WORKS</p>
            <h2 className={styles.galleryTitle}>Our 3D Portfolio</h2>
          </div>
          <div className={styles.masonryGrid}>
            {MASONRY.map((img) => (
              <div key={img.src} className={styles.masonryItem}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.masonryImg}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <Reveal as="section" y={40} className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaInner}>
            <p className={styles.systemTag}>{"// "} LET'S BUILD TOGETHER</p>
            <h2 className={styles.ctaTitle}>
              Ready to bring your<br />characters to life?
            </h2>
            <p className={styles.ctaDesc}>
              Whether you need a single hero asset or a full production pipeline,
              we're ready to make it happen — on time, on spec.
            </p>
            <Link href="/#contact" className="pill pill--primary">
              Start the Conversation
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
