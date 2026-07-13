import Link from "next/link";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { CONTACT } from "@/data/site";
import styles from "./web-apps.module.css";

export const metadata = {
  title: "Web & Apps — BloodNexus Studio",
  description:
    "We engineer high-performance websites and native apps that look stunning, load instantly, and drive real business growth.",
};

const WORKS = [
  {
    title: "Odyssey Travels",
    category: "Web • Travel",
    desc: "Immersive booking experience for luxury world tours and expeditions.",
    img: "https://bloodnexusstudio.in/otassets/48c6bc10-99a6-46cb-9621-39e34ee5beb6.png",
    tags: ["Next.js", "Mapbox", "Stripe"],
    icon: "💻",
  },
  {
    title: "Fintech Dashboard",
    category: "App • Finance",
    desc: "Secure, real-time banking dashboard handling millions of transactions.",
    img: "https://bloodnexusstudio.in/otassets/71b176a7-2f8a-498b-b060-2d0fd3ed13d9.png",
    tags: ["AES-256", "Sockets", "Biometrics"],
    icon: "📱",
  },
  {
    title: "Aura Studios",
    category: "Web • Agency",
    desc: "Minimalist portfolio showcasing award-winning brand identities.",
    img: "https://bloodnexusstudio.in/otassets/e997db8e-f93f-4118-8dbe-1f3bc12f2d9f.png",
    tags: ["Vue.js", "GSAP", "WebGL"],
    icon: "💻",
  },
  {
    title: "Social Connect",
    category: "App • Social",
    desc: "Community platform with live feeds, chat, and rich media support.",
    img: "https://bloodnexusstudio.in/otassets/0c009dba-c4fc-48a5-8cd2-d5cf446c833b.png",
    tags: ["WebRTC", "Push", "Content Algo"],
    icon: "📱",
  },
  {
    title: "Lumina Vision",
    category: "Web • Portfolio",
    desc: "High-performance gallery for a professional photography agency.",
    img: "https://bloodnexusstudio.in/otassets/81c500d3-c6f1-40a1-b821-368f4e11f491.png",
    tags: ["Next.js", "Cloudinary", "LazyLoad"],
    icon: "💻",
  },
];

const CAPABILITIES = [
  {
    title: "High-Performance Websites",
    subtitle: "Speed & SEO First",
    desc: "From corporate platforms to creative portfolios. We build fast, clean, and highly polished websites that make your brand stand out.",
    img: "https://bloodnexusstudio.in/otassets/25cf4ea0-5ad9-4869-b7fb-1c33e631b55e.png",
    tags: ["Next.js", "SEO", "Analytics"],
  },
  {
    title: "Native & Mobile Apps",
    subtitle: "iOS & Android",
    desc: "Fluid, responsive applications built for the modern mobile user. Offline support, push notifications, and native device integration.",
    img: "https://bloodnexusstudio.in/otassets/3a02916d-831e-4ccd-9ccd-e607810671ae.png",
    tags: ["React Native", "Flutter", "HealthKit"],
  },
  {
    title: "E-Commerce Solutions",
    subtitle: "Scale Your Sales",
    desc: "Custom shopping experiences that convert. Secure payments, inventory management, and seamless checkout flows.",
    img: "https://bloodnexusstudio.in/otassets/48707790-3cf9-4b45-afd1-f35dbe11fc7e.png",
    tags: ["Shopify", "Stripe", "Dashboard"],
  },
  {
    title: "Enterprise Platforms",
    subtitle: "Streamline Operations",
    desc: "Internal tools that eliminate bottlenecks. Automated workflows, data visualization, and role-based access control.",
    img: "https://bloodnexusstudio.in/otassets/cea3d78a-fae7-4717-b884-1732f3082662.png",
    tags: ["SaaS", "Cloud", "Security"],
  },
];

const BACKBONE = [
  { name: "React / Next.js", desc: "Frontend Core" },
  { name: "Node.js", desc: "Scalable Backend" },
  { name: "React Native", desc: "Cross-Platform" },
  { name: "Flutter", desc: "High Performance" },
  { name: "AWS", desc: "Cloud Infra" },
  { name: "Firebase", desc: "Real-time DB" },
  { name: "TailwindCSS", desc: "Modern UI" },
  { name: "Three.js", desc: "3D Web Graphics" },
  { name: "PostgreSQL", desc: "Relational DB" },
  { name: "GraphQL", desc: "Efficient Data" },
  { name: "Docker", desc: "Containerization" },
  { name: "Figma", desc: "UI/UX Design" },
];

export default function WebAppsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.scanlines} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.topBadge}>{"//"} WEB & MOBILE EXCELLENCE</span>
          <MaskText
            as="h1"
            className={styles.heroTitle}
            text="Digital Experiences That Scale"
          />
          <p className={styles.heroDesc}>
            We engineer high-performance websites and native apps that look stunning, load instantly, and drive real business growth.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/#contact" className="pill pill--primary">
              START YOUR PROJECT
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <Reveal as="section" y={40} className={styles.worksSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.systemTag}>{"//"} WORK HISTORY</p>
            <h2 className={styles.centerTitle}>Selected Works</h2>
          </div>

          <div className={styles.worksList}>
            {WORKS.map((w, index) => (
              <div
                key={w.title}
                className={`${styles.workRow} ${
                  index % 2 !== 0 ? styles.reverseRow : ""
                }`}
              >
                <div className={styles.workMedia}>
                  {/* Gaming HUD corner brackets */}
                  <div className={`${styles.hudCorner} ${styles.topLeft}`} />
                  <div className={`${styles.hudCorner} ${styles.topRight}`} />
                  <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
                  <div className={`${styles.hudCorner} ${styles.bottomRight}`} />
                  <img src={w.img} alt={w.title} loading="lazy" />
                </div>
                <div className={styles.workCopy}>
                  <div className={styles.workMeta}>
                    <span className={styles.workIcon}>{w.icon}</span>
                    <span className={styles.workCategory}>{w.category}</span>
                  </div>
                  <h3 className={styles.workTitle}>{w.title}</h3>
                  <p className={styles.workDesc}>{w.desc}</p>
                  <div className={styles.workTags}>
                    {w.tags.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Capabilities Section */}
      <Reveal as="section" y={40} className={styles.capabilitiesSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <span className={styles.bgWord}>SERVICES</span>
            <p className={styles.systemTag}>{"//"} PRODUCTION CAPABILITIES</p>
            <h2 className={styles.centerTitle}>What We Deliver</h2>
          </div>

          <div className={styles.capabilitiesList}>
            {CAPABILITIES.map((c, index) => (
              <div
                key={c.title}
                className={`${styles.capRow} ${
                  index % 2 !== 0 ? styles.reverseRow : ""
                }`}
              >
                <div className={styles.capMedia}>
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <div className={styles.capCopy}>
                  <span className={styles.capSubtitle}>{c.subtitle}</span>
                  <h3 className={styles.capTitle}>{c.title}</h3>
                  <p className={styles.capDesc}>{c.desc}</p>
                  <div className={styles.capTags}>
                    {c.tags.map((t) => (
                      <span key={t} className={styles.capTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Technological Backbone */}
      <Reveal as="section" y={40} className={styles.backboneSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.systemTag}>{"//"} INFRASTRUCTURE STACK</p>
            <h2 className={styles.centerTitle}>Technological Backbone</h2>
          </div>

          <div className={styles.backboneGrid}>
            {BACKBONE.map((b) => (
              <div key={b.name} className={styles.backboneCard}>
                <h4 className={styles.backboneName}>{b.name}</h4>
                <p className={styles.backboneDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Built for Speed & Design (Performance) */}
      <Reveal as="section" y={40} className={styles.speedSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.systemTag}>{"//"} PERFORMANCE METRICS</p>
            <h2 className={styles.centerTitle}>Built for Speed & Design</h2>
          </div>

          <div className={styles.speedGrid}>
            <div className={styles.speedCard}>
              <h3 className={styles.speedCardTitle}>Visual Psychology</h3>
              <ul className={styles.speedList}>
                <li>Strong color psychology</li>
                <li>Readable typography</li>
                <li>Clean modern layouts</li>
              </ul>
            </div>

            <div className={styles.speedCard}>
              <h3 className={styles.speedCardTitle}>Performance</h3>
              <ul className={styles.speedList}>
                <li>
                  <span className={styles.greenText}>99+</span> Lighthouse Scores
                </li>
                <li>Sub-second load times</li>
                <li>Smooth 60fps animations</li>
              </ul>
            </div>

            <div className={styles.speedCard}>
              <h3 className={styles.speedCardTitle}>Scalability</h3>
              <p className={styles.speedCardText}>
                Architecture built to handle growth. From your first 100 users to your first million, our code scales with you effortlessly.
              </p>
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
