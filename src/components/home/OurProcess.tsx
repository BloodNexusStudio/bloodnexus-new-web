import React from "react";
import styles from "./OurProcess.module.css";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "TECHNICAL AUDIT",
    desc: "We analyze your project, identify bottlenecks and provide a clear roadmap.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <path d="M11 8v2"></path>
        <path d="M10 9h2"></path>
      </svg>
    )
  },
  {
    num: "02",
    title: "DEEP DIAGNOSIS",
    desc: "We dig into performance, pipelines, memory, assets and system-level issues.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
        <polyline points="4 12 8 8 12 12 20 4"></polyline>
      </svg>
    )
  },
  {
    num: "03",
    title: "IMPLEMENT & OPTIMIZE",
    desc: "We implement targeted fixes and optimize for measurable performance gains.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  },
  {
    num: "04",
    title: "DELIVER RESULTS",
    desc: "You get a stable, optimized, production-ready build with measurable results.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="M12 15l-3-3a22 22 0 0 1 3.82-9 1 1 0 0 1 1.18-.32 12.83 12.83 0 0 1 6.32 6.32 1 1 0 0 1-.32 1.18A22 22 0 0 1 12 15z"></path>
        <line x1="16.5" y1="7.5" x2="16.5" y2="7.51"></line>
        <line x1="8" y1="18" x2="10" y2="20"></line>
        <line x1="4" y1="14" x2="6" y2="16"></line>
      </svg>
    )
  }
];

export default function OurProcess() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.topLabel}>OUR PROCESS</div>
          <h2 className={styles.heading}>AUDIT. DIAGNOSE. FIX. DELIVER.</h2>
        </div>

        {/* Process Flow */}
        <div className={styles.processFlow}>
          {PROCESS_STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              
              {/* Step Card */}
              <div className={styles.stepCard}>
                <div className={styles.iconBox}>
                  {step.icon}
                </div>
                <div className={styles.contentBox}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>

              {/* Arrow (Skip after last item) */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className={styles.arrowBox}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}

            </React.Fragment>
          ))}
        </div>
        
      </div>
    </section>
  );
}
