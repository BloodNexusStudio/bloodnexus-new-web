import Image from "next/image";
import Link from "next/link";
import { GAMES } from "@/data/games";
import styles from "./HomeHero.module.css";
import Reveal from "@/components/motion/Reveal";

// --- SVG Icons ---
const PulseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const GaugeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #E63946)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path d="M12 12 16.5 7.5" />
    <path d="M19.3 6.7a10.5 10.5 0 1 1-14.6 0" />
  </svg>
);

const NodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #E63946)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 15V9" />
    <path d="M9 18h6" />
    <path d="M9 6h6" />
  </svg>
);

const VRIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #E63946)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="11" rx="2" ry="2" />
    <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <path d="M10 18v-4" />
    <path d="M14 18v-4" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const CubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const SparklineRed = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="#E63946" strokeWidth="1.5">
    <path d="M0 10l5-2 5 6 10-12 10 8 10-5 10 8 10-6" />
  </svg>
);

const SparklineGrey = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
    <path d="M0 15l10-5 5-8 10 12 5-6 10 4 10-8 10 5" />
  </svg>
);

export default function HomeHero() {
  const featured = GAMES[0]; // Trench Sentinel

  return (
    <section className={styles.section}>
      {/* Full Background Image with Tech Overlays */}
      <div className={styles.bgWrapper}>
        <Image src={featured.keyArt} alt="Trench Sentinel" fill priority className={styles.bgImage} />
        <div className={styles.bgOverlay} />
        <div className={styles.gridLines} />
      </div>

      <div className={`container ${styles.grid}`}>
        <Reveal as="div" className={styles.content} staggerChildren>
          <div className={styles.topLabel}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            PERFORMANCE IS POWER
          </div>

          <h1 className={styles.headline}>
            Your Unreal Engine<br />
            <span className={styles.highlightLine}>
              Frame Rate Just &nbsp;<span className={styles.highlight}>Collapsed</span>.
              <span className={styles.lineDecor} />
            </span>
            Your Animation Pipeline<br />
            <span className={styles.highlightLine}>
              <span className={styles.highlight}>Can&apos;t Scale</span>.
              <span className={styles.lineDecor} />
            </span>
            Your VR Port Is<br />
            <span className={styles.highlightLine}>
              <span className={styles.highlight}>Overrunning Budget</span>.
              <span className={styles.lineDecor} />
            </span>
          </h1>

          <h2 className={styles.subhead}>
            We Fix These Deep Technical<br />
            Problems In 2–4 Weeks.
          </h2>

          <div className={styles.features}>
            <div className={styles.feature}>
              <GaugeIcon /> Performance Optimization
            </div>
            <div className={styles.feature}>
              <NodeIcon /> Pipeline Engineering
            </div>
            <div className={styles.feature}>
              <VRIcon /> VR Performance Fixes
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="#contact" className={styles.btnPrimary}>
              <PulseIcon />
              <span>
                Book Your Free <br/>
                <strong>1-Hour Technical Audit</strong>
              </span>
              <span className={styles.arrow}>&rarr;</span>
            </Link>
            <Link href="#services" className={styles.btnSecondary}>
              View Case Studies <span>&rarr;</span>
            </Link>
          </div>
        </Reveal>

        {/* Right HUD Panel */}
        <Reveal as="div" className={styles.hudPanel} delay={0.2}>
          <div className={styles.hudHeader}>ENGINE HEALTH</div>
          
          <div className={styles.hudMetric}>
            <div className={styles.hudInfo}>
              <span className={styles.hudLabel}>FPS</span>
              <span className={`${styles.hudVal} ${styles.hudValRed}`}>24.7</span>
            </div>
            <SparklineRed />
          </div>

          <div className={styles.hudMetric}>
            <div className={styles.hudInfo}>
              <span className={styles.hudLabel}>FRAME TIME</span>
              <span className={styles.hudVal}>40.3<small>ms</small></span>
            </div>
            <SparklineGrey />
          </div>

          <div className={styles.hudMetric}>
            <div className={styles.hudInfo}>
              <span className={styles.hudLabel}>DRAW CALLS</span>
              <span className={styles.hudVal}>3,842</span>
            </div>
            <SparklineGrey />
          </div>

          <div className={styles.hudMetric}>
            <div className={styles.hudInfo}>
              <span className={styles.hudLabelRed}>OVER BUDGET</span>
              <span className={`${styles.hudVal} ${styles.hudValRed}`}>127<small>%</small></span>
            </div>
            <SparklineRed />
          </div>

          <div className={styles.hudRescue}>
            <div className={styles.rescueLabel}>BLOODNEXUS SOLUTION</div>
            <div className={styles.rescueTarget}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              TARGET: 60+ FPS STABLE
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom Info Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomBarGrid}>
            <div className={styles.techBox}>
              <div className={styles.techIcon}><TargetIcon /></div>
              <div className={styles.techCopy}>
                <h4>DEEP TECH EXPERTISE</h4>
                <p>Engine-level profiling, memory optimization & performance tuning.</p>
              </div>
            </div>

            <div className={styles.techBox}>
              <div className={styles.techIcon}><CubeIcon /></div>
              <div className={styles.techCopy}>
                <h4>PIPELINE THAT SCALES</h4>
                <p>Robust animation & asset pipelines built for scale and stability.</p>
              </div>
            </div>

            <div className={styles.techBox}>
              <div className={styles.techIcon}><VRIcon /></div>
              <div className={styles.techCopy}>
                <h4>VR THAT PERFORMS</h4>
                <p>Optimized VR ports that hit performance targets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
