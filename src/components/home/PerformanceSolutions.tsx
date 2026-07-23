import Link from "next/link";
import Image from "next/image";
import styles from "./PerformanceSolutions.module.css";

const SERVICES_DATA = [
  {
    num: "01",
    title: "NANITE OPTIMIZATION",
    desc: "Fix frame rate collapse. Get stable, high performance on any target.",
    slug: "nanite-optimization",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
        <line x1="12" y1="22" x2="12" y2="12"></line>
        <line x1="22" y1="8.5" x2="12" y2="12"></line>
        <line x1="2" y1="8.5" x2="12" y2="12"></line>
      </svg>
    ),
    points: [
      "Nanite Profiling & Analysis",
      "Draw Call Reduction",
      "LOD & Streaming Optimization"
    ]
  },
  {
    num: "02",
    title: "ANIMATION RIGGING",
    desc: "High-quality rigs and mocap cleanup for realistic animations.",
    slug: "animation-rigging",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"></circle>
        <circle cx="5" cy="19" r="2"></circle>
        <circle cx="19" cy="19" r="2"></circle>
        <line x1="12" y1="7" x2="12" y2="14"></line>
        <line x1="12" y1="14" x2="6.5" y2="17.5"></line>
        <line x1="12" y1="14" x2="17.5" y2="17.5"></line>
      </svg>
    ),
    points: [
      "Mocap Cleanup & Retargeting",
      "IK/FK Rigging Systems",
      "Facial Rigging"
    ]
  },
  {
    num: "03",
    title: "PLATFORM PORTING",
    desc: "Port your game across platforms with optimized performance.",
    slug: "platform-porting",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="12" rx="2" ry="2"></rect>
        <rect x="8" y="16" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
    ),
    points: [
      "Cross-Platform Porting",
      "Memory & CPU Optimization",
      "Shader Optimization"
    ]
  },
  {
    num: "04",
    title: "VR PERFORMANCE",
    desc: "Eliminate motion sickness and frame drops for smooth VR.",
    slug: "vr-performance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="3"></rect>
        <path d="M9 12v.01"></path>
        <path d="M15 12v.01"></path>
        <path d="M12 18v-3"></path>
      </svg>
    ),
    points: [
      "Motion-to-Photon Latency",
      "Frame Time Stability",
      "VR Profiling & Testing"
    ]
  },
  {
    num: "05",
    title: "SHADER OPTIMIZATION",
    desc: "Custom shaders, reduced cost, maximum visual impact.",
    slug: "shader-optimization",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="M4.93 4.93l1.41 1.41"></path>
        <path d="M17.66 17.66l1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="M6.34 17.66l-1.41 1.41"></path>
        <path d="M19.07 4.93l-1.41 1.41"></path>
      </svg>
    ),
    points: [
      "Shader Profiling & Analysis",
      "Custom Shader Development",
      "GPU Utilization Optimization"
    ]
  }
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionArrow}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const GamepadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
    <line x1="6" y1="12" x2="10" y2="12"></line>
    <line x1="8" y1="10" x2="8" y2="14"></line>
    <circle cx="15" cy="13" r="1"></circle>
    <circle cx="18" cy="11" r="1"></circle>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);


export default function PerformanceSolutions() {
  return (
    <section className={styles.section} id="services">
      {/* Background Image Hero Area */}
      <div className={styles.heroBackground}>
        <Image 
          src="/cloudinary-assets/images/new-1_q5vqzv.png" 
          alt="Services Hero" 
          fill 
          className={styles.heroImage} 
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroGradientBottom} />
      </div>

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.topLabel}>
            <span className={styles.decoLine} /> WHAT WE DO
          </div>
          <h2 className={styles.heading}>
            SERVICES THAT <span className={styles.headingRed}>POWER</span> EXPERIENCES
          </h2>
          <p className={styles.subhead}>
            We combine technology, creativity, and performance<br />
            engineering to build immersive, interactive,<br />
            and intelligent digital experiences.
          </p>
        </div>

        {/* 6-Column Grid */}
        <div className={styles.grid}>
          {SERVICES_DATA.map((s, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardNumber}>{s.num}</div>
              
              <div className={styles.cardIconBox}>
                {s.icon}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>

                <ul className={styles.pointList}>
                  {s.points.map((pt, i) => (
                    <li key={i} className={styles.pointItem}>
                      <span className={styles.pointCheck}>
                        <CheckIcon />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/services/${s.slug}`} className={styles.exploreLink}>
                LEARN MORE <ArrowRightIcon />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
