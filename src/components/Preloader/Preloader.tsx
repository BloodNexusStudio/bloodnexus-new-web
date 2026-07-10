"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

const WORD = "BLOODNEXUS";

/**
 * Site preloader — the BLOODNEXUS wordmark rises in per-letter (masked), holds,
 * then the panel lifts away to reveal the hero carousel. Plays once per full page
 * load (persists across in-app navigation because it lives in the root layout).
 * Reduced motion: brief static hold, then removed.
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = "hidden";
    const letters = root.querySelectorAll<HTMLElement>(
      `.${styles.letter} > span`
    );

    const finish = () => {
      document.body.style.overflow = "";
      setShow(false);
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      const t = setTimeout(finish, 700);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const tl = gsap.timeline({ onComplete: finish });
    tl.from(letters, {
      yPercent: 115,
      duration: 0.85,
      ease: "expo.out",
      stagger: 0.055,
      delay: 0.2,
    }).to(
      root,
      { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
      "+=0.55"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div ref={rootRef} className={styles.pre} aria-hidden="true">
      <h2 className={styles.word}>
        {WORD.split("").map((c, i) => (
          <span className={styles.letter} key={i}>
            <span>{c}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}
