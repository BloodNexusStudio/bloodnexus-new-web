"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { GAMES } from "@/data/games";
import CurvedImage from "./CurvedImage";
import styles from "./FeaturedGames.module.css";

/**
 * Featured games — premium full-width fluid hero carousel (apechain-inspired,
 * original code). Slanted circular 3D coverflow with the active card scaled up
 * and neighbours peeking at the edges. GSAP-driven inertia transitions
 * (expo.out): on any slide change the outgoing card slides out and the new one
 * snaps into focus while the overlay text (header / tags / description / LAUNCH)
 * fades in on a staggered reveal. Interactions: an on-card circular swipe-dial
 * (drag or ← / →), pointer/swipe scrubbing across the stage, and detached
 * right-side arrow buttons. Autoplays; pauses on hover / interaction.
 */
// concentric radii for the warped topographic backdrop
const RING_RADII = Array.from({ length: 24 }, (_, i) => 40 + i * 30);

export default function FeaturedGames() {
  const len = GAMES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useRef<((v: number) => void) | null>(null);
  const cursorY = useRef<((v: number) => void) | null>(null);
  const cursorShown = useRef(false);
  const mounted = useRef(false);
  const reducedRef = useRef(false);

  const rel = useCallback(
    (i: number, a: number) => {
      let r = i - a;
      if (r > len / 2) r -= len;
      if (r < -len / 2) r += len;
      return r;
    },
    [len]
  );

  const target = (r: number) => ({
    xPercent: r * 44, // horizontal fan
    y: Math.abs(r) * 46, // dip at the sides → curved arc
    z: -Math.abs(r) * 240, // recede into depth
    rotationY: -r * 42, // turn to face along the arc
    scale: r === 0 ? 1 : Math.max(0.74, 1 - Math.abs(r) * 0.08),
    opacity: r === 0 ? 1 : Math.abs(r) === 1 ? 0.88 : 0.34,
  });

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + len) % len),
    [len]
  );

  // Lay the cards out around the arc (GSAP for premium inertia easing).
  const layout = useCallback(
    (a: number, animate: boolean) => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = rel(i, a);
        const t = target(r);
        card.style.zIndex = String(10 - Math.abs(r));
        card.style.pointerEvents = Math.abs(r) > 2 ? "none" : "auto";
        if (animate && !reducedRef.current) {
          gsap.to(card, { ...t, duration: 0.85, ease: "expo.out" });
        } else {
          gsap.set(card, t);
        }
      });
    },
    [rel]
  );

  // Staggered reveal of the overlay text on each slide change.
  const revealText = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reducedRef.current) {
      gsap.set(items, { y: 0, opacity: 1 });
      return;
    }
    gsap.fromTo(
      items,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.07 }
    );
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Layout + reveal on mount and whenever the active slide changes.
  // Also give the active card a subtle continuous float/sway (rotation, no zoom).
  useEffect(() => {
    layout(active, mounted.current);
    revealText();
    mounted.current = true;

    const activeCard = cardRefs.current[active];
    if (!activeCard || reducedRef.current) return;
    const sway = gsap.to(activeCard, {
      rotationY: 3,
      rotationZ: -1,
      duration: 3.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.95,
    });
    return () => {
      sway.kill();
    };
  }, [active, layout, revealText]);

  // Autoplay.
  useEffect(() => {
    if (paused || reducedRef.current) return;
    const id = setInterval(() => setActive((a) => (a + 1) % len), 4500);
    return () => clearInterval(id);
  }, [paused, len]);

  // --- Custom cursor (the ‹ › dial) that follows the mouse over the cards ---
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: -8, yPercent: -8, autoAlpha: 0, scale: 0.5 });
    cursorX.current = gsap.quickTo(el, "x", { duration: 0.22, ease: "power3" });
    cursorY.current = gsap.quickTo(el, "y", { duration: 0.22, ease: "power3" });
  }, []);

  const setCursorShown = (v: boolean) => {
    if (cursorShown.current === v || !cursorRef.current) return;
    cursorShown.current = v;
    gsap.to(cursorRef.current, {
      autoAlpha: v ? 1 : 0,
      scale: v ? 1 : 0.5,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  // --- Stage pointer: swipe scrubbing + tap-to-navigate (by side) ---
  const drag = useRef({ active: false, startX: 0, moved: 0 });
  const onStageDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-nodrag]")) return;
    drag.current = { active: true, startX: e.clientX, moved: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setPaused(true);
  };
  const onStageMove = (e: React.PointerEvent) => {
    cursorX.current?.(e.clientX);
    cursorY.current?.(e.clientY);
    if (drag.current.active) {
      const dx = e.clientX - drag.current.startX;
      drag.current.moved = dx;
      gsap.set(trackRef.current, { x: dx * 0.35 });
      setCursorShown(true);
    } else {
      setCursorShown(!!(e.target as HTMLElement).closest("[data-card]"));
    }
  };
  const onStageUp = () => {
    if (!drag.current.active) return;
    const dx = drag.current.moved;
    drag.current.active = false;
    gsap.to(trackRef.current, { x: 0, duration: 0.7, ease: "expo.out" });
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    else if (Math.abs(dx) < 8)
      go(drag.current.startX < window.innerWidth / 2 ? -1 : 1); // tap by side
    setPaused(false);
  };
  const onStageLeave = () => setCursorShown(false);

  const current = GAMES[active];

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Featured games"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Per-slide blurred background tint */}
      <div className={styles.bg} aria-hidden="true">
        {GAMES.map((g, i) => (
          <div
            key={g.slug}
            className={styles.bgLayer}
            style={{
              backgroundImage: `url(${g.keyArt})`,
              opacity: i === active ? 1 : 0,
            }}
          />
        ))}
        <div className={styles.bgTint} />
        <svg
          className={styles.rings}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter
              id="bn-topo"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.0042"
                numOctaves={2}
                seed={11}
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={80} />
            </filter>
          </defs>
          <g
            filter="url(#bn-topo)"
            fill="none"
            stroke="rgba(246,242,233,0.14)"
            strokeWidth={1.4}
          >
            {RING_RADII.map((r) => (
              <circle key={r} cx={500} cy={540} r={r} />
            ))}
          </g>
        </svg>
      </div>

      <div className={`container ${styles.topLabel}`}>
        <p className="label">Featured Games</p>
      </div>

      {/* Coverflow stage — cards on a slanted circular track */}
      <div
        className={styles.stage}
        onPointerDown={onStageDown}
        onPointerMove={onStageMove}
        onPointerUp={onStageUp}
        onPointerCancel={onStageUp}
        onPointerLeave={onStageLeave}
      >
        <div className={styles.tilt}>
          <div className={styles.track} ref={trackRef}>
            {GAMES.map((game, i) => (
              <div className={styles.slot} key={game.slug}>
                <article
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={styles.card}
                  data-card
                  aria-label={i === active ? `${game.title} key art` : undefined}
                >
                  <CurvedImage className={styles.art} src={game.keyArt} />
                  <div className={styles.cardScrim} aria-hidden="true" />
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom cursor — blue arrow pointer that follows the mouse over the cards */}
      <div className={styles.cursor} ref={cursorRef} aria-hidden="true">
        <svg className={styles.arrow} viewBox="0 0 24 24" width="26" height="26">
          <path d="M3 2L21 12L13 13.5L10 21L3 2Z" />
        </svg>
      </div>

      {/* Overlay content — synchronized staggered reveal */}
      <div className={`container ${styles.overlay}`} ref={overlayRef}>
        <div className={styles.badges} data-reveal>
          <span className={styles.status}>{current.status}</span>
          {current.genre && (
            <span className={styles.category}>{current.genre}</span>
          )}
        </div>
        <h2 className={styles.cardTitle} data-reveal>
          {current.title}
        </h2>
        <p className={styles.hook} data-reveal>
          {current.hook}
        </p>
        <Link
          href={`/games/${current.slug}`}
          className="pill pill--primary"
          data-reveal
          data-nodrag
        >
          Launch
        </Link>
      </div>

      {/* Detached right-side navigation arrows */}
      <div className={styles.side} data-nodrag>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            aria-label="Previous game"
            onClick={() => go(-1)}
          >
            ↑
          </button>
          <button
            className={styles.arrow}
            aria-label="Next game"
            onClick={() => go(1)}
          >
            ↓
          </button>
        </div>
        <Link href="/games" className={styles.seeAll}>
          See All Games <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Thumbnail strip — bottom-right */}
      <div className={styles.thumbs} data-nodrag>
        {GAMES.map((game, i) => (
          <button
            key={game.slug}
            className={styles.thumb}
            data-active={i === active}
            aria-label={`Show ${game.title}`}
            onClick={() => setActive(i)}
          >
            <img src={game.keyArt} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
