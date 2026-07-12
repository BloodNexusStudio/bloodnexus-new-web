"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/motion/Reveal";
import { SERVICES } from "@/data/services";
import styles from "./ServicesBand.module.css";

/**
 * Services spotlight (§6.3): stacked full-width charcoal bands, image side
 * alternates per block, each reveals on scroll (fade + rise).
 */
export default function ServicesBand() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const bands = el.querySelectorAll(`.${styles.band}`);
    bands.forEach((band) => {
      const img = band.querySelector(`.${styles.media} img`);
      if (!img) return;

      gsap.fromTo(
        img,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: band,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className={styles.section} id="services">
      <div className={`container ${styles.head}`}>
        <p className="label">What We Do</p>
        <h2 className={styles.heading}>Services</h2>
      </div>

      {SERVICES.map((s, i) => (
        <Reveal key={s.key} as="div" y={40} className={styles.band}>
          <div
            className={`container ${styles.inner} ${
              i % 2 === 1 ? styles.reverse : ""
            }`}
          >
            <div className={styles.media}>
              {/* [CONTENT] large 3D render / cinematic frame */}
              <img src={s.image} alt={`${s.title} visual`} loading="lazy" />
            </div>
            <div className={styles.copy}>
              <span className={styles.index}>0{i + 1}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.copy}</p>
              <Link href="/services" className="pill pill--solid">
                Learn More
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
