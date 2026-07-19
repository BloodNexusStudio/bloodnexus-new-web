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
    img: "/web-apps/odyssey_travels.png",
    tags: ["Next.js", "Mapbox", "Stripe"],
    icon: "web",
  },
  {
    title: "Fintech Dashboard",
    category: "App • Finance",
    desc: "Secure, real-time banking dashboard handling millions of transactions.",
    img: "/web-apps/fintech_dashboard.png",
    tags: ["AES-256", "Sockets", "Biometrics"],
    icon: "mobile",
  },
  {
    title: "Aura Studios",
    category: "Web • Agency",
    desc: "Minimalist portfolio showcasing award-winning brand identities.",
    img: "/web-apps/aura_studios.png",
    tags: ["Vue.js", "GSAP", "WebGL"],
    icon: "web",
  },
  {
    title: "Social Connect",
    category: "App • Social",
    desc: "Community platform with live feeds, chat, and rich media support.",
    img: "/web-apps/social_connect.png",
    tags: ["WebRTC", "Push", "Content Algo"],
    icon: "mobile",
  },
  {
    title: "Lumina Vision",
    category: "Web • Portfolio",
    desc: "High-performance gallery for a professional photography agency.",
    img: "/web-apps/lumina_vision.png",
    tags: ["Next.js", "Cloudinary", "LazyLoad"],
    icon: "web",
  },
];

function getIcon(type: string) {
  if (type === "web") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
        <line x1="12" y1="17" x2="12" y2="20" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

const CAPABILITIES = [
  {
    title: "High-Performance Websites",
    subtitle: "Speed & SEO First",
    desc: "From corporate platforms to creative portfolios. We build fast, clean, and highly polished websites that make your brand stand out.",
    img: "/web-apps/websites.png",
    tags: ["Next.js", "SEO", "Analytics"],
  },
  {
    title: "Native & Mobile Apps",
    subtitle: "iOS & Android",
    desc: "Fluid, responsive applications built for the modern mobile user. Offline support, push notifications, and native device integration.",
    img: "/web-apps/mobile_apps.png",
    tags: ["React Native", "Flutter", "HealthKit"],
  },
  {
    title: "E-Commerce Solutions",
    subtitle: "Scale Your Sales",
    desc: "Custom shopping experiences that convert. Secure payments, inventory management, and seamless checkout flows.",
    img: "/web-apps/ecommerce.png",
    tags: ["Shopify", "Stripe", "Dashboard"],
  },
  {
    title: "Enterprise Platforms",
    subtitle: "Streamline Operations",
    desc: "Internal tools that eliminate bottlenecks. Automated workflows, data visualization, and role-based access control.",
    img: "/web-apps/enterprise.png",
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
          <span className={styles.topBadge}>WEB & MOBILE EXCELLENCE</span>
          <MaskText
            as="h1"
            className={styles.heroTitle}
            text="Digital Experiences That Scale"
          />
          <p className={styles.heroDesc}>
            We engineer high-performance websites and native apps that look stunning, load instantly, and drive real business growth.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/contact" className="pill pill--primary">
              START YOUR PROJECT
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <Reveal as="section" y={40} className={styles.worksSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <p className={styles.systemTag}>WORK HISTORY</p>
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
                    <span className={styles.workIcon}>{getIcon(w.icon)}</span>
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
            <p className={styles.systemTag}>PRODUCTION CAPABILITIES</p>
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
            <p className={styles.systemTag}>INFRASTRUCTURE STACK</p>
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
            <p className={styles.systemTag}>PERFORMANCE METRICS</p>
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
          <p className={styles.systemTag}>SECURE CHANNEL CONNECT</p>
          <h2 className={styles.ctaTitle}>Ready to begin production?</h2>
          <Link href="/contact" className="pill pill--primary">
            ESTABLISH CONNECTION
          </Link>
        </div>
      </section>
    </>
  );
}
