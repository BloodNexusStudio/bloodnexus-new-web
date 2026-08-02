import Link from "next/link";
import Image from "next/image";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import styles from "./3d-art.module.css";

export const metadata = {
  title: "3D Art & Animation — BloodNexus Studio",
  description:
    "High-fidelity 3D modeling, texturing, rendering, and animation. BloodNexus Studio crafts visuals that push the boundaries of real-time and cinematic production.",
};

// ── Hero & Feature Renders ──────────────────────────────────────────────────
const HERO_IMAGE = "/portfolio-assets/3dart-1-cropped.png";

const SPOTLIGHT = [
  { src: "/portfolio-assets/3dart-2.png", alt: "3D Environment — Medieval Courtyard Pass" },
  { src: "/portfolio-assets/3dart-3.png", alt: "3D Environment — Forest Logging Camp" },
  { src: "/portfolio-assets/3dart-4.png", alt: "3D Environment — Himalayan Cliffside Monastery" },
];

const FEATURE_IMG = {
  src: "/portfolio-assets/3dart-5.png",
  alt: "3D Environment — Abandoned Highway Settlement",
};

// ── Curated Limited Portfolio Gallery (12 Pristine Full-Bleed Renders) ─────
const MASONRY = [
  {
    src: "/portfolio-assets/3dart-6.png",
    alt: "3D Environment — Gothic Manor Grounds",
    title: "Old Mansion Outside",
    category: "Environment Art",
    tools: "Unreal Engine 5 · Quixel · Lumen",
  },
  {
    src: "/portfolio-assets/3dart-7.png",
    alt: "3D Environment — Sunset Coastal Village",
    title: "Beach Town at Sunset",
    category: "Environment Art",
    tools: "Unreal Engine 5 · Megascans · V-Ray",
  },
  {
    src: "/portfolio-assets/3dart-8.png",
    alt: "3D Environment — Overgrown Bayou Settlement",
    title: "Swamp Village",
    category: "Environment Design",
    tools: "Unreal Engine 5 · SpeedTree · Substance 3D",
  },
  {
    src: "/portfolio-assets/3dart-9.png",
    alt: "3D Environment — Moonlit Fortress Ruins",
    title: "Castle Ruins at Night",
    category: "Environment Art",
    tools: "Unreal Engine 5 · Quixel · Blender",
  },
  {
    src: "/portfolio-assets/3dart-10.png",
    alt: "3D Environment — Alpine Valley Village",
    title: "Mountain Village",
    category: "Environment Design",
    tools: "Unreal Engine 5 · World Creator · Megascans",
  },
  {
    src: "/portfolio-assets/3dart-11.png",
    alt: "3D Environment — Desert Oasis Marketplace",
    title: "Desert Market",
    category: "Environment Art",
    tools: "Unreal Engine 5 · Substance Painter · Blender",
  },
  {
    src: "/portfolio-assets/3dart-12.png",
    alt: "3D Environment — Lighthouse Fishing Harbor",
    title: "Lighthouse Dock",
    category: "Environment Art",
    tools: "Unreal Engine 5 · Megascans · Blender",
  },
  {
    src: "/portfolio-assets/3dart-13.png",
    alt: "3D Environment — Countryside Farmstead Sim",
    title: "Country Farm",
    category: "Environment Design",
    tools: "Unreal Engine 5 · Substance Painter · Houdini",
  },
  {
    src: "/portfolio-assets/3dart-14.png",
    alt: "3D Vehicle & Prop — Vintage Railway Depot",
    title: "Old Train Station",
    category: "Vehicle & Prop Art",
    tools: "Unreal Engine 5 · Maya · Substance 3D",
  },
  {
    src: "/portfolio-assets/3dart-15.png",
    alt: "3D Environment — Jungle Research Outpost",
    title: "Jungle Camp",
    category: "Environment Art",
    tools: "Unreal Engine 5 · SpeedTree · Lumen",
  },
  {
    src: "/portfolio-assets/3dart-16.png",
    alt: "3D Environment — Hilltop Medieval Citadel",
    title: "Castle on a Hill",
    category: "Environment Design",
    tools: "Unreal Engine 5 · Nanite · Substance 3D",
  },
  {
    src: "/portfolio-assets/3dart-17.png",
    alt: "3D Environment — Lakeside Resort & Cabins",
    title: "Lake Cabins",
    category: "Environment Art",
    tools: "Unreal Engine 5 · ArchViz · Lumen",
  },
];

export default function ThreeDArtPage() {
  return (
    <>
      {/* ── Hero — Full-bleed High Fidelity Render Image ───────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={HERO_IMAGE}
            alt="3D Art & Animation Hero Render"
            fill
            priority
            sizes="100vw"
            className={styles.heroVideo}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.scanlines} />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.systemTag}>MODELS · RENDERS · ANIMATION</p>
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
            <p className={styles.systemTag}>WHAT WE DO</p>
            <h2 className={styles.sectionTitle}>End-to-End 3D Production</h2>
            <p className={styles.sectionSub}>
              From the first sketch to the final engine-ready asset — we cover the full pipeline.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {[
              {
                num: "01",
                title: "Highly Detailed 3D Models",
                desc: "Organic sculpts, hard-surface assets, and everything in between — built to the highest detail level the project demands.",
                img: SPOTLIGHT[0],
              },
              {
                num: "02",
                title: "Adding Colors and Details",
                desc: "PBR materials, hand-painted textures, and procedural shading that make every surface feel real under any lighting condition.",
                img: SPOTLIGHT[1],
              },
              {
                num: "03",
                title: "Adding Movement",
                desc: "Fluid character motion, real-time cloth simulations, and complex physics rigs that bring assets to life.",
                img: SPOTLIGHT[2],
              },
            ].map((s) => (
              <div key={s.num} className={styles.serviceCard}>
                <div className={styles.serviceCardMedia}>
                  {s.img ? (
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
            <p className={styles.systemTag}>CREATIVE PIPELINE</p>
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

      {/* ── Process — 3 steps ─────────────────────────────────────────────── */}
      <Reveal as="section" y={40} className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesHead}>
            <p className={styles.systemTag}>OUR PROCESS</p>
            <h2 className={styles.sectionTitle}>How We Create 3D Art</h2>
            <p className={styles.sectionSub}>
              A rigorous step-by-step pipeline ensuring maximum fidelity from blockout to final render.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {[
              {
                num: "01",
                title: "3D Render",
                desc: "Finalizing lighting, materials, and post-processing for a production-ready cinematic look.",
                img: { src: "/3d-art/process/step1-render.png", alt: "Final 3D Render" },
              },
              {
                num: "02",
                title: "Clay Render / Unlit",
                desc: "Evaluating the primary forms, sculpting details, and surface read before applying textures.",
                img: { src: "/3d-art/process/step2-clay.png", alt: "Clay Render / Unlit" },
              },
              {
                num: "03",
                title: "Wireframe Work",
                desc: "Optimizing the underlying topology for clean deformation, LODs, and engine performance.",
                img: { src: "/3d-art/process/step3-wireframe.png", alt: "Wireframe Work" },
              },
            ].map((s) => (
              <div key={s.num} className={styles.serviceCard}>
                <div className={`${styles.serviceCardMedia} ${styles.portraitMedia}`}>
                  {s.img ? (
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

      {/* ── Masonry Gallery (Curated Limited Selection) ────────────────────── */}
      <Reveal as="section" y={40} className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryHead}>
            <span className={styles.bgWord}>PORTFOLIO</span>
            <p className={styles.systemTag}>SELECTED WORKS</p>
            <h2 className={styles.galleryTitle}>Our 3D Portfolio</h2>
          </div>
          <div className={styles.masonryGrid}>
            {MASONRY.map((item) => (
              <div key={item.src} className={styles.masonryItem}>
                <div className={styles.cardFrame}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={styles.masonryImg}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.cardDivider} />
                    <p className={styles.cardTools}>{item.tools}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <Reveal as="section" y={40} className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaInner}>
            <p className={styles.systemTag}>LET'S BUILD TOGETHER</p>
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
