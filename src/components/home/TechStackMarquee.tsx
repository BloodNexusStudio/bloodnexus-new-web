import Link from "next/link";
import styles from "./TechStackMarquee.module.css";

const TECH_DATA = [
  {
    title: "VR",
    desc: "Immersive virtual reality solutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
        <path d="M12 17v-4"></path>
        <path d="M7 12h0"></path>
        <path d="M17 12h0"></path>
      </svg>
    )
  },
  {
    title: "INTERACTIVE 3D",
    desc: "Real-time 3D interactive worlds",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
        <line x1="12" y1="22" x2="12" y2="12"></line>
        <line x1="22" y1="8.5" x2="12" y2="12"></line>
        <line x1="2" y1="8.5" x2="12" y2="12"></line>
      </svg>
    )
  },
  {
    title: "UNREAL ENGINE",
    desc: "High-fidelity rendering power",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 12h6"></path>
        <path d="M9 16h6"></path>
        <path d="M12 8v8"></path>
      </svg>
    )
  },
  {
    title: "UNITY",
    desc: "Cross-platform development",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
      </svg>
    )
  },
  {
    title: "C++",
    desc: "High-performance native programming",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18l-6-6 6-6"></path>
        <path d="M16 6l6 6-6 6"></path>
      </svg>
    )
  },
  {
    title: "OPTIMIZATION",
    desc: "Performance tuning & optimization",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  }
];

export default function TechStackMarquee() {
  const createRow = (keyPrefix: string, isHidden: boolean) => (
    <div className={styles.row} aria-hidden={isHidden}>
      {TECH_DATA.map((t, idx) => (
        <div key={`${keyPrefix}-${idx}`} className={styles.card}>
          <div className={styles.iconHex}>
            {t.icon}
          </div>
          <h3 className={styles.cardTitle}>{t.title}</h3>
          <p className={styles.cardDesc}>{t.desc}</p>
          <div className={styles.bottomGlow}></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.topLabel}>
          <span className={styles.bracketLeft}></span>
          TECHNOLOGIES WE WORK WITH
          <span className={styles.bracketRight}></span>
        </div>
        <h2 className={styles.heading}>
          BUILT WITH <span className={styles.headingRed}>CUTTING-EDGE</span> TECHNOLOGIES
        </h2>
        <p className={styles.subhead}>
          We leverage industry-leading tools and engines to deliver<br />
          high-performance, immersive experiences.
        </p>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.track}>
          {createRow("a", false)}
          {createRow("b", true)}
          {createRow("c", true)}
          {createRow("d", true)}
          {createRow("e", true)}
          {createRow("f", true)}
          {createRow("g", true)}
          {createRow("h", true)}
        </div>
      </div>

      <div className={styles.ctaContainer}>
        <Link href="/services" className={styles.exploreLink}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.lightningIcon}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          EXPLORE OUR WORK
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
