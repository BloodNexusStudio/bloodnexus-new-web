"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global smooth-scroll + ScrollTrigger wiring (§8.3).
 * Lenis drives inertia; GSAP ScrollTrigger syncs to it.
 * Disabled entirely under prefers-reduced-motion — native scroll takes over.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.1 });

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      // GSAP ticker delivers seconds; Lenis expects ms
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
