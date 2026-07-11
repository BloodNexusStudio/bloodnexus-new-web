"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: React.ReactNode;
  /** rise distance in px (24–40 per §8) */
  y?: number;
  /** stagger between direct children, seconds (60–100ms per §8) */
  stagger?: number;
  /** animate direct children instead of the wrapper itself */
  staggerChildren?: boolean;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
};

/**
 * Scroll reveal (§8 global rules): rise + fade, trigger at "top 85%", play once.
 * Falls back to opacity-only (instant, visible) under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  y = 32,
  stagger = 0.08,
  staggerChildren = false,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      gsap.set(staggerChildren ? el.children : el, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const targets = staggerChildren ? el.children : el;

    const tween = gsap.from(targets, {
      y,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay,
      stagger: staggerChildren ? stagger : 0,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      // .revert() (not .kill()) — kill() leaves the inline styles gsap.from()
      // applied (e.g. opacity:0) in place. React 18 StrictMode double-invokes
      // this effect (mount→cleanup→mount) on every mount, including remounts
      // from client-side navigation: the second gsap.from() call then reads
      // that leftover opacity:0 as its own implicit "to" target, producing a
      // degenerate 0→0 tween that reports complete while staying invisible
      // forever. revert() actually undoes the inline styles first.
      tween.revert();
    };
  }, [y, stagger, staggerChildren, delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
