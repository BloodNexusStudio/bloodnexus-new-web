"use client";

import { useEffect, useRef, useState, type PointerEvent, type MouseEvent } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { GAMES } from "@/data/games";
import styles from "./OrbitCarousel.module.css";

// Back to a small curated set — cards are near-screen-size now, so only a
// handful fit the "one dominant card, slivers of neighbors" look.
const FEATURED = GAMES.slice(0, 5);
const N = FEATURED.length;
const ANGLE_SLICE = 360 / N;
// Tight enough that neighboring cards sit close with only a small gap, but
// still wide enough not to overlap at the card's max width (~700px) — the
// .stage perspective is raised alongside this so the radius doesn't
// reintroduce the off-center wobble a too-large radius causes (world-space
// offset ≈ radius × sin(angle), amplified by the perspective projection).
const ROTATION_PER_SCROLL_THROUGH = 70; // deg of spin across one section-height of scroll
const IDLE_ROTATE_DEG_PER_FRAME = 0.035;
const SCROLL_IDLE_DEBOUNCE = 150; // ms
const DRAG_DEG_PER_PIXEL = 0.35;
const DRAG_CLICK_THRESHOLD = 5; // px — below this, a pointer-up still counts as a card click

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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const rotationRef = useRef(0);
  const scrollTargetRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedRef = useRef(false);
  const frontIndexRef = useRef(-1);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotationRef = useRef(0);
  const dragMovedRef = useRef(0);

  const handleCardMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleCardMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const [radius, setRadius] = useState(520);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setRadius(240); // close grouping on mobile screens
      } else if (window.innerWidth < 768) {
        setRadius(340); // small tablet
      } else if (window.innerWidth < 1024) {
        setRadius(440); // laptop / large tablet
      } else {
        setRadius(520); // desktop default
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      if (isDraggingRef.current) {
        // rotationRef is being written directly by the pointermove handler.
      } else if (isScrollingRef.current) {
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

  // Drag-to-rotate — grabbing the ring and moving the pointer spins it
  // directly; scroll/idle rotation both stand down for the duration (the
  // tick loop checks isDraggingRef first). A drag past DRAG_CLICK_THRESHOLD
  // suppresses the click that would otherwise follow pointerup, so dragging
  // across a card doesn't accidentally navigate to it.
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartRotationRef.current = rotationRef.current;
    dragMovedRef.current = 0;
    // Pointer capture can throw (e.g. the pointer already released, or no
    // OS-level pointer was ever registered for this id) — that's cosmetic,
    // not fatal, so don't let it break the drag.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    dragMovedRef.current = Math.max(dragMovedRef.current, Math.abs(deltaX));
    rotationRef.current = dragStartRotationRef.current + deltaX * DRAG_DEG_PER_PIXEL;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleClickCapture = (e: MouseEvent) => {
    if (dragMovedRef.current > DRAG_CLICK_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

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

      <div
        className={styles.stage}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
      >
        <div className={styles.group} ref={groupRef}>
          {FEATURED.map((game, i) => {
            const itemAngle = i * ANGLE_SLICE;
            return (
              <div
                key={game.slug}
                className={styles.slot}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                }}
                onMouseEnter={() => handleCardMouseEnter(i)}
                onMouseLeave={() => handleCardMouseLeave(i)}
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
                    {game.previewClip && (
                      <video
                        ref={(el) => {
                          videoRefs.current[i] = el;
                        }}
                        src={game.previewClip}
                        loop
                        muted
                        playsInline
                        preload="none"
                        className={styles.artVideo}
                      />
                    )}
                    <img
                      src={game.keyArt}
                      alt=""
                      aria-hidden="true"
                      className={styles.art}
                      draggable={false}
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
