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
  "/cloudinary-assets/videos/3dart-1_1_vaugim.mp4";


// Gallery — all 16 images with pixel-level watermarks via Cloudinary transform
const GALLERY = [
  { src: "/portfolio-assets/bible.jpg", alt: "3D model — high fidelity bible prop" },
  { src: "/portfolio-assets/leader_cam.png", alt: "3D render — Unreal Engine 5 leader cinematic camera view" },
  { src: "/portfolio-assets/fly_1.png", alt: "3D model — sci-fi flyer vehicle design" },
  { src: "/portfolio-assets/zombie_varek.png", alt: "3D character render — post processed zombie varek" },
  { src: "/portfolio-assets/fly_3.png", alt: "3D render — hard-surface flying prop model" },
  { src: withWatermark("/cloudinary-assets/images/3dart-16_nrx6d1.png"), alt: "3D character render — detailed sculpt" },
  { src: withWatermark("/cloudinary-assets/images/3dart-11_uceyn2.png"), alt: "3D art render — stylised character" },
  { src: withWatermark("/cloudinary-assets/images/3dart-17_jeiim7.jpg"), alt: "3D scene — environment lighting" },
  { src: withWatermark("/cloudinary-assets/images/3dart-6_lgcx5k.png"), alt: "3D model — high poly asset" },
  { src: withWatermark("/cloudinary-assets/images/3dart-10_ziywet.png"), alt: "3D render — cinematic composition" },
  { src: withWatermark("/cloudinary-assets/images/3dart-9_op3xza.png"), alt: "3D art — creature concept" },
  { src: withWatermark("/cloudinary-assets/images/3dart-13_obplkd.png"), alt: "3D model — organic sculpt" },
  { src: withWatermark("/cloudinary-assets/images/3dart-2_ke6lp1.jpg"), alt: "3D art — character portrait" },
  { src: withWatermark("/cloudinary-assets/images/3dart-18_ubrxbt.png"), alt: "3D render — materials and shading" },
  { src: withWatermark("/cloudinary-assets/images/3dart-21_n8kdvh.jpg"), alt: "3D art — stylised scene" },
  { src: withWatermark("/cloudinary-assets/images/3dart-23_1_a0fdxs.png"), alt: "3D render — detailed environment" },
  { src: withWatermark("/cloudinary-assets/images/3dart-20_1_uifghl.png"), alt: "3D art — character rigging pose" },
  { src: withWatermark("/cloudinary-assets/images/3dart-22_1_uetcav.png"), alt: "3D model — texture work" },
  { src: withWatermark("/cloudinary-assets/images/3dart-12_1_uhpc9i.png"), alt: "3D art — cinematic lighting" },
  { src: withWatermark("/cloudinary-assets/images/3dart-19_1_zsz5ri.png"), alt: "3D render — hard surface model" },
  { src: withWatermark("/cloudinary-assets/images/3dart-7_1_ri14o4.png"), alt: "3D art — stylised character render" },
];

// Spotlight images for the services section (first 3 original)
const SPOTLIGHT = GALLERY.slice(5, 8);
// Feature image for vision section
const FEATURE_IMG = GALLERY[8];
// Remaining gallery images — structured with titles and tags for a proper portfolio
const MASONRY = [
  {
    src: "/portfolio-assets/bible.jpg",
    alt: "3D model — high fidelity bible prop",
    title: "The Lost Bible",
    category: "Prop Modeling",
    tools: "ZBrush · Substance Painter · Blender",
  },
  {
    src: "/portfolio-assets/leader_cam.png",
    alt: "3D render — Unreal Engine 5 leader cinematic camera view",
    title: "Leader Cam Render",
    category: "Cinematic Environment",
    tools: "Unreal Engine 5 · Lumen · Quixel",
  },
  {
    src: "/portfolio-assets/fly_1.png",
    alt: "3D model — sci-fi flyer vehicle design",
    title: "Sci-Fi Flyer Alpha",
    category: "Vehicle Concept",
    tools: "Fusion 360 · Keyshot · Photoshop",
  },
  {
    src: "/portfolio-assets/zombie_varek.png",
    alt: "3D character render — post processed zombie varek",
    title: "Zombie Varek",
    category: "Character Sculpt",
    tools: "ZBrush · Substance Painter · UE5",
  },
  {
    src: "/portfolio-assets/fly_3.png",
    alt: "3D render — hard-surface flying prop model",
    title: "Sci-Fi Flyer Beta",
    category: "Hard-Surface Design",
    tools: "Blender · Marmoset Toolbag",
  },
  {
    src: "/cloudinary-assets/images/3dart-10_ziywet.png",
    alt: "3D render — vintage motorcycle",
    title: "Vintage Garage",
    category: "Environment Art",
    tools: "Unreal Engine 5 · Substance Painter",
  },
  {
    src: "/cloudinary-assets/images/3dart-9_op3xza.png",
    alt: "3D art — classic ambassador taxi",
    title: "Classic Ambassador",
    category: "Automotive Art",
    tools: "3ds Max · V-Ray · Substance Painter",
  },
  {
    src: "/cloudinary-assets/images/3dart-13_obplkd.png",
    alt: "3D model — warrior portrait sculpt",
    title: "Warrior Portrait",
    category: "Character Sculpt",
    tools: "ZBrush · Marvelous Designer",
  },
  {
    src: "/cloudinary-assets/images/3dart-2_ke6lp1.jpg",
    alt: "3D art — winter outpost scene",
    title: "Winter Outpost",
    category: "Environment Design",
    tools: "Unreal Engine 5 · Megascans",
  },
  {
    src: "/cloudinary-assets/images/3dart-18_ubrxbt.png",
    alt: "3D render — trench sentinel character",
    title: "Trench Sentinel",
    category: "Character Concept",
    tools: "Blender · Substance Painter",
  },
  {
    src: "/cloudinary-assets/images/3dart-21_n8kdvh.jpg",
    alt: "3D art — heavy gunner character pose",
    title: "Heavy Gunner Pose",
    category: "Character Rigging",
    tools: "Maya · Substance Painter",
  },
  {
    src: "/cloudinary-assets/images/3dart-23_1_a0fdxs.png",
    alt: "3D render — cyberpunk streets environment",
    title: "Neon Streets",
    category: "Concept Art",
    tools: "Blender · Photoshop",
  },
  {
    src: "/cloudinary-assets/images/3dart-20_1_uifghl.png",
    alt: "3D art — tactical gear detail render",
    title: "Tactical Gear",
    category: "PBR Material Study",
    tools: "Substance Painter · ZBrush",
  },
  {
    src: "/cloudinary-assets/images/3dart-22_1_uetcav.png",
    alt: "3D model — hangar bay scifi interior",
    title: "Hangar Bay",
    category: "Hard-Surface Design",
    tools: "Fusion 360 · Blender",
  },
  {
    src: "/cloudinary-assets/images/3dart-12_1_uhpc9i.png",
    alt: "3D art — power substation lighting",
    title: "Power Substation",
    category: "Environment Art",
    tools: "Unreal Engine 5 · Lumen",
  },
  {
    src: "/cloudinary-assets/images/3dart-19_1_zsz5ri.png",
    alt: "3D render — recon operative back view",
    title: "Recon Operative",
    category: "Character Modeling",
    tools: "Blender · Marvelous Designer",
  },
  {
    src: "/cloudinary-assets/images/3dart-7_1_ri14o4.png",
    alt: "3D art — node reactor prop close up",
    title: "Node Reactor",
    category: "Hard-Surface Prop",
    tools: "Marmoset Toolbag · Substance Painter",
  },
];

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
                video: "/cloudinary-assets/videos/All_three_Cloth_Simulated_hzr7ek.mp4",
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





      {/* ── Masonry Gallery ───────────────────────────────────────────────── */}
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
