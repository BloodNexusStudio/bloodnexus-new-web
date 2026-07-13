import Link from "next/link";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { SERVICES } from "@/data/services";
import { CONTACT } from "@/data/site";
import styles from "./services.module.css";

export const metadata = {
  title: "Services — BloodNexus Studio",
  description:
    "Game development, cinematics, VR & interactive 3D, and archviz — powered by Unreal Engine and Unity.",
};

const CAPABILITIES: Record<string, string[]> = {
  "game-dev": [
    "Unreal Engine 5 & Unity",
    "Systems & Gameplay Architecture",
    "C++ & C# Optimization",
    "Level & Quest Design",
    "Multiplatform Shipping (PC / Console / Mobile)"
  ],
  "archviz": [
    "Blueprint to 3D Walkthroughs",
    "Photorealistic Rendering",
    "Real-time Interactive Spaces",
    "Dynamic Lighting Setup",
    "CAD to Engine Pipelines"
  ],
  "vr-3d": [
    "Meta Quest Development",
    "PCVR & Standalone Integration",
    "Intuitive Interaction Design",
    "Real-time 3D Configurators",
    "Performant VR Optimization"
  ],
  "web-apps": [
    "React & Next.js",
    "Full-Stack Development",
    "API & Backend Integrations",
    "Database Architecture",
    "Cloud Hosting & DevOps"
  ],
  "3d-art": [
    "High-Poly Modeling",
    "Rigging & Skinning",
    "Environment Art",
    "Engine-Ready Materials",
    "Cinematic Render Pipes"
  ]
};

const SPECS: Record<string, Record<string, string>> = {
  "game-dev": {
    "SYSTEM STATUS": "OPERATIONAL // ACTIVE",
    "CORE ENGINE": "UNREAL 5.4 / UNITY 6",
    "LANGUAGES": "C++ / C# PIPELINES",
    "DEPLOYMENT": "PC / CONSOLE / MOBILE"
  },
  "archviz": {
    "SYSTEM STATUS": "DEPLOYED",
    "LIGHT ENGINE": "LUMEN INTERACTIVE GI",
    "ASSET SYSTEM": "CAD TO ENGINE CONVERT",
    "INTERACTION": "REAL-TIME WALKTHROUGHS"
  },
  "vr-3d": {
    "SYSTEM STATUS": "R&D ACTIVE",
    "SDK STACK": "OPENXR / METAHUMAN SDK",
    "HARDWARE": "QUEST 3 / VISION PRO / PCVR",
    "TARGET FPS": "90HZ - 120HZ COMPLIANT"
  },
  "web-apps": {
    "SYSTEM STATUS": "DEPLOYED // LIVE",
    "FRAMEWORKS": "NEXT.JS / REACT 19",
    "DATABASE": "POSTGRESQL / MONGODB",
    "PERFORMANCE": "LIGHTHOUSE 95+ TARGET"
  },
  "3d-art": {
    "SYSTEM STATUS": "PRODUCTION ACTIVE",
    "TOOLCHAIN": "BLENDER / MAYA / SUBSTANCE",
    "ASSET PIPELINE": "NANITE / PBR COMPLIANT",
    "OUTPUT RES": "8K ULTRA-TEXTURING"
  }
};


// §7 /services — hero + stacked promo bands, alternating image side
export default function ServicesPage() {
  return (
    <>
      <section className={styles.hero}>
        {/* Subtle scanline overlay for the hero */}
        <div className={styles.scanlines} />
        <div className="container">
          <p className={styles.systemTag}>{"//"} CORE SYSTEM CAPABILITIES</p>
          <MaskText as="h1" className={styles.title} text="Services" />
          <p className={styles.intro}>
            {/* [CONTENT] services intro */}
            Deploying high-performance gameplay systems, immersive cinematics, 
            spatial VR designs, and real-time visualization with AAA precision.
          </p>
        </div>
      </section>

      <div className={styles.bandsContainer}>
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.key}
            as="div"
            y={40}
            className={`${styles.band} ${i % 2 === 1 ? styles.reverse : ""}`}
          >
            {/* Gaming HUD corner brackets */}
            <div className={`${styles.hudCorner} ${styles.topLeft}`} />
            <div className={`${styles.hudCorner} ${styles.topRight}`} />
            <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
            <div className={`${styles.hudCorner} ${styles.bottomRight}`} />

            <div className={styles.media}>
              <div className={styles.mediaOverlay} />
              <img src={s.image} alt={`${s.title} visual`} loading="lazy" />
            </div>

            <div className={styles.copy}>
              <div className={styles.headerRow}>
                <span className={styles.index}>0{i + 1}</span>
                <span className={styles.headerLine} />
              </div>
              <h2 className={styles.bandTitle}>{s.title}</h2>
              <p className={styles.text}>{s.copy}</p>
              
              {/* Tactical specs grid */}
              <div className={styles.specsGrid}>
                {Object.entries(SPECS[s.key] || {}).map(([label, val]) => (
                  <div key={label} className={styles.specItem}>
                    <span className={styles.specLabel}>{label}</span>
                    <span className={styles.specValue}>{val}</span>
                  </div>
                ))}
              </div>

              <div className={styles.tagsContainer}>
                <p className={styles.tagsLabel}>SYSTEM MODULES</p>
                <div className={styles.tags}>
                  {CAPABILITIES[s.key]?.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/#contact" className={styles.actionBtn}>
                <span className={styles.actionBtnText}>INITIATE PROJECT</span>
                <span className={styles.actionBtnArrow}>{"//"} &rarr;</span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

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


