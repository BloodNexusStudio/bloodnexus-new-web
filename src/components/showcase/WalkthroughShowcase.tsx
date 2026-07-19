"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./WalkthroughShowcase.module.css";

interface WalkthroughShowcaseProps {
  videoSrc: string;
  tag: string;
  title: string;
  desc: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  ctaText?: string;
}

export default function WalkthroughShowcase({
  videoSrc,
  tag,
  title,
  desc,
  stats,
  highlights,
  ctaText = "View Full Walkthrough",
}: WalkthroughShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlaying(true);
  };

  const handleExitClick = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.controls = false;
      videoRef.current.play().catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.muted = false;
        videoRef.current.controls = true;
        videoRef.current.play().catch((err) => console.error(err));
      } else {
        videoRef.current.muted = true;
        videoRef.current.controls = false;
      }
    }
  }, [isPlaying]);

  return (
    <section className={styles.showcaseSection}>
      <video
        ref={videoRef}
        className={styles.showcaseVideo}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />
      <div 
        className={styles.showcaseOverlay} 
        style={{ 
          opacity: isPlaying ? 0.05 : 1, 
          pointerEvents: isPlaying ? "none" : "auto", 
          transition: "opacity 0.6s ease" 
        }} 
      />
      
      {/* Hide the shield to allow browser player clicks when controls are showing */}
      {!isPlaying && <div className={styles.videoShield} />}

      {/* Exit button */}
      {isPlaying && (
        <button className={styles.exitBtn} onClick={handleExitClick}>
          ✕ Close Walkthrough
        </button>
      )}

      {/* Content overlay */}
      <div 
        className={`container ${styles.showcaseContent}`}
        style={{ 
          opacity: isPlaying ? 0 : 1, 
          transform: isPlaying ? "translateY(24px)" : "translateY(0)", 
          pointerEvents: isPlaying ? "none" : "auto", 
          transition: "opacity 0.5s ease, transform 0.5s ease" 
        }}
      >
        <div className={styles.showcaseLeft}>
          <p className={styles.systemTag}>{tag}</p>
          <h2 className={styles.showcaseTitle}>{title}</h2>
          <p className={styles.showcaseDesc}>{desc}</p>
          <button onClick={handlePlayClick} className={styles.viewFullBtn}>
            <span className={styles.viewFullIcon}>▶</span>
            {ctaText}
          </button>
        </div>

        <div className={styles.showcaseRight}>
          <div className={styles.showcaseStats}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.showcaseStat}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.showcaseHighlights}>
            {highlights.map((h, i) => (
              <p key={i} className={styles.highlightItem}>
                <span className={styles.highlightDot} /> {h}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
