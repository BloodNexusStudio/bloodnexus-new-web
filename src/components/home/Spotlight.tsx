"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { GAMES } from "@/data/games";
import styles from "./Spotlight.module.css";

/**
 * Studio Spotlight (apechain "APECHAIN SPOTLIGHT" band, structure only — no
 * artwork/copy reused): two-tone badge + giant headline + copy + two CTAs on
 * the left, a tilted featured-game card bleeding off the right edge. The
 * card tilts in 3D toward the cursor as it moves across it.
 */
const featured = GAMES[0];
const BASE_TILT = -6; // resting rotateZ, matches the CSS fallback transform

export default function Spotlight() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const skipTiltRef = useRef(false);
  const qRotX = useRef<((v: number) => void) | null>(null);
  const qRotY = useRef<((v: number) => void) | null>(null);
  const qScale = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    skipTiltRef.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const el = cardRef.current;
    if (!el || skipTiltRef.current) return;

    gsap.set(el, {
      transformPerspective: 1200,
      rotationZ: BASE_TILT,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      transformOrigin: "center",
    });
    qRotX.current = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
    qRotY.current = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
    qScale.current = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3" });
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (skipTiltRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    qRotY.current?.((px - 0.5) * 20);
    qRotX.current?.((0.5 - py) * 16);
    qScale.current?.(1.05);
  };

  const onLeave = () => {
    if (skipTiltRef.current) return;
    qRotX.current?.(0);
    qRotY.current?.(0);
    qScale.current?.(1);
  };

  return (
    <section className={styles.section}>
      <Reveal as="div" className={`container ${styles.grid}`} staggerChildren>
        <div className={styles.copy}>
          <div className={styles.badge}>
            <span className={styles.badgeDark}>BloodNexus</span>
            <span className={styles.badgeAccent}>Studio Services</span>
          </div>
          <h2 className={styles.headline}>
            <strong>Game Dev & 3D Art Outsourcing Company</strong>
          </h2>
          <p className={styles.text}>
            We are a premier game development and 3D art outsourcing partner, delivering high-fidelity real-time assets, cinematics, and full-cycle development services.
          </p>
          <p className={styles.text}>
            Our team integrates seamlessly into your pipeline, providing AAA-grade characters, environment blocks, and engine-ready optimization for Unreal Engine and Unity.
          </p>
          <div className={styles.ctas}>
            <Link href="/services" className="pill pill--primary">
              Our Services
            </Link>
            <Link href="/blog/3d-game-art-outsourcing-costs-studios" className="pill pill--outline">
              Outsourcing Cost Guide
            </Link>
          </div>
        </div>

        <div className={styles.cardWrap}>
          <Link
            href={`/games/${featured.slug}`}
            className={styles.card}
            ref={cardRef}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <img
              src={featured.keyArt}
              alt={`${featured.title} key art`}
              loading="lazy"
              className={styles.art}
            />
            <div className={styles.cardScrim} />
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>{featured.status}</span>
              <h3 className={styles.cardTitle}>{featured.title}</h3>
              <p className={styles.cardHook}>{featured.hook}</p>
              <span className="pill pill--primary">What&apos;s This</span>
            </div>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
