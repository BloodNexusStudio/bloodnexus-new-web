import React from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

const TESTIMONIALS_DATA = [
  {
    quote: "BloodNexus saved our project. We were 8 weeks behind schedule and failing certification due to Nanite crashes. They jumped in and had us running at a stable 60 FPS in just 18 days.",
    name: "Michael Trenholm",
    stars: 5,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    quote: "Their understanding of engine architecture is unmatched. They didn't just give us advice; they wrote the custom shaders and optimized our entire animation pipeline from the ground up.",
    name: "Sarah Jenkins",
    stars: 5,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    quote: "Our VR port was completely stalled because of motion-to-photon latency issues causing severe motion sickness. BloodNexus fixed the frame pacing in less than a month.",
    name: "David Sterling",
    stars: 4,
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
  },
  {
    quote: "Our mobile port was heavily CPU bound and failing low-end targets. BloodNexus completely rewrote the LOD and memory management systems. It's now running perfectly across all SKUs.",
    name: "Marcus Vane",
    stars: 5,
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
  },
  {
    quote: "They didn't just fix our performance problems; they taught our engineering team how to prevent them in the future. Their technical audits are incredibly deep and valuable.",
    name: "Elena Rostova",
    stars: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    quote: "We brought them in for a 4-week optimization sprint right before our beta launch. They hit every single metric they promised. Unbelievably fast and professional.",
    name: "Christopher Wright",
    stars: 4,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
  }
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.starIcon} style={{ opacity: filled ? 1 : 0.3 }} aria-hidden="true">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
  </svg>
);

const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  return (
    <div key={index} className={styles.card}>
      <div className={styles.stars}>
        {Array(5).fill(0).map((_, i) => (
          <StarIcon key={i} filled={i < testimonial.stars} />
        ))}
      </div>
      <p className={styles.quote}>{testimonial.quote}</p>
      <div className={styles.authorBox}>
        <img src={testimonial.image} alt={testimonial.name} className={styles.avatar} />
        <div className={styles.authorInfo}>
          <p className={styles.authorName}>{testimonial.name}</p>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const row1 = TESTIMONIALS_DATA.slice(0, 3);
  const row2 = TESTIMONIALS_DATA.slice(3, 6);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.topLabel}>
            <span className={styles.decoLine} /> CLIENT SUCCESS
          </div>
          <h2 className={styles.heading}>
            WHAT STUDIOS <span className={styles.headingRed}>ARE SAYING</span>
          </h2>
          <p className={styles.subhead}>
            Real feedback from technical directors, producers, and engineering leads.
          </p>
        </div>

      </div>

      {/* Marquee Rows */}
      <div className={styles.marqueeContainer}>
        {/* Fade Edges */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        {/* Row 1: Left Scroll */}
        <div className={styles.rowWrapper}>
          <div className={`${styles.track} ${styles.scrollLeft}`}>
            {[...row1, ...row1, ...row1, ...row1].map((testimonial, idx) => (
              <TestimonialCard key={`r1-${idx}`} testimonial={testimonial} index={idx} />
            ))}
          </div>
        </div>

        {/* Row 2: Right Scroll */}
        <div className={styles.rowWrapper}>
          <div className={`${styles.track} ${styles.scrollRight}`}>
            {[...row2, ...row2, ...row2, ...row2].map((testimonial, idx) => (
              <TestimonialCard key={`r2-${idx}`} testimonial={testimonial} index={idx} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
