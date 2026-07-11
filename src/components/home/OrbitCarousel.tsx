"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { GAMES } from "@/data/games";
import styles from "./OrbitCarousel.module.css";

// Back to a small curated set — cards are near-screen-size now, so only a
// handful fit the "one dominant card, slivers of neighbors" look.
const FEATURED = GAMES.slice(0, 5);
const N = FEATURED.length;
const ANGLE_SLICE = 360 / N;
// Wide enough that adjacent cards don't crowd each other at the card's max
// width (~700px) — the .stage perspective is raised alongside this so a
// bigger radius doesn't reintroduce the off-center wobble a too-large
// radius causes (world-space offset ≈ radius × sin(angle), amplified by the
// perspective projection; raising perspective tames that amplification).
const RADIUS = 650; // px — orbit depth
const ROTATION_PER_SCROLL_THROUGH = 200; // deg of spin across one section-height of scroll
const IDLE_ROTATE_DEG_PER_FRAME = 0.035;
const SCROLL_IDLE_DEBOUNCE = 150; // ms

/**
 * Hero orbit carousel — cards arranged in a circle (CSS 3D transforms,
 * GSAP-driven). Rotation is scroll-linked while the hero is being scrolled
 * past, and auto-rotates on its own when idle — same dual mechanic as the
 * reference circular-gallery component, rebuilt on this project's actual
 * stack (CSS Modules + GSAP, no Tailwind/framer-motion) with real game key
 * art instead of stock photos.
 *
 * Each card's own transform is `rotateY(itemAngle) translateZ(radius)` and
 * is never counter-rotated — that's what gives the coverflow/fan look (side
 * cards visibly angle away instead of always facing the viewer). Only the
 * .group wrapping all of them gets an animated rotateY each frame; because
 * every card is its child under transform-style: preserve-3d, the group's
 * spin and each card's own angle compose automatically.
 *
 * Cards past the 90°/270° mark are showing their mirrored back — rather
 * than lean on backface-visibility (verified unreliable here: it doesn't
 * correctly accumulate across this many nested rotated ancestors, so a
 * "pre-flipped back face" just silently fails to show, leaving the card
 * blank), each frame computes whether a card is in its back half and toggles
 * a scaleX(-1) class that un-mirrors it directly. Content stays visible and
 * readable through the entire rotation, never disappearing.
 */
export default function OrbitCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const rotationRef = useRef(0);
  const scrollTargetRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedRef = useRef(false);
  const frontIndexRef = useRef(-1);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Scroll-linked rotation — progress through the hero's own height, not the
  // whole document, so a normal scroll actually spins it a noticeable amount
  // before the section leaves the viewport.
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      scrollTargetRef.current = progress * ROTATION_PER_SCROLL_THROUGH;
      isScrollingRef.current = true;

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, SCROLL_IDLE_DEBOUNCE);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Render loop — spins the ring, fades cards by their angular distance from
  // front, and glows whichever card currently sits nearest front. Cards
  // themselves are never touched here — their rotateY/translateZ is static,
  // set once in JSX.
  useEffect(() => {
    let raf = 0;

    const tick = () => {
      if (isScrollingRef.current) {
        rotationRef.current = scrollTargetRef.current;
      } else if (!reducedRef.current) {
        rotationRef.current += IDLE_ROTATE_DEG_PER_FRAME;
      }
      const rotation = rotationRef.current;

      if (groupRef.current) gsap.set(groupRef.current, { rotateY: rotation });

      let nearestIndex = -1;
      let nearestDist = Infinity;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const baseAngle = i * ANGLE_SLICE;
        const relative = ((baseAngle + rotation) % 360 + 360) % 360;
        const dist = relative > 180 ? 360 - relative : relative;
        el.style.opacity = String(Math.max(0.3, 1 - dist / 180));
        el.classList.toggle(styles.flipped, relative > 90 && relative < 270);

        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIndex = i;
        }
      });

      if (nearestIndex !== frontIndexRef.current) {
        cardRefs.current[frontIndexRef.current]?.classList.remove(styles.cardActive);
        cardRefs.current[nearestIndex]?.classList.add(styles.cardActive);
        frontIndexRef.current = nearestIndex;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Featured games"
    >
      <div className={styles.bgTint} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={`container ${styles.topLabel}`}>
        <p className="label">Featured Games</p>
      </div>

      <div className={styles.stage}>
        <div className={styles.group} ref={groupRef}>
          {FEATURED.map((game, i) => {
            const itemAngle = i * ANGLE_SLICE;
            return (
              <div
                key={game.slug}
                className={styles.slot}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${RADIUS}px)`,
                }}
              >
                <Link
                  href={`/games/${game.slug}`}
                  className={styles.card}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  aria-label={`${game.title} — ${game.status}`}
                >
                  <span className={styles.face}>
                    <img
                      src={game.keyArt}
                      alt=""
                      aria-hidden="true"
                      className={styles.art}
                    />
                    <span className={styles.cardTag}>{game.status}</span>
                    <span className={styles.caption}>
                      <span className={styles.captionTitle}>{game.title}</span>
                      <span className={styles.captionHook}>{game.hook}</span>
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.side}>
        <Link href="/games" className={styles.seeAll}>
          See All Games <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
