"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./MaskText.module.css";

type MaskTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "span";
  delay?: number;
};

/**
 * Masked word reveal (§6.1 / §7): each word sits in an overflow-hidden mask and
 * rises from below on mount. Static under prefers-reduced-motion.
 */
export default function MaskText({
  text,
  className,
  as = "h1",
  delay = 0.1,
}: MaskTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>(`.${styles.inner}`);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }
    const tween = gsap.from(inners, {
      yPercent: 115,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.08,
      delay,
    });
    return () => {
      tween.kill();
    };
  }, [delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span className={styles.mask} key={i} aria-hidden="true">
          <span className={styles.inner}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
