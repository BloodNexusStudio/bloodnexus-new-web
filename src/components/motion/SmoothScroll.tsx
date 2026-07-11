"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.1 });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  // Lenis + ScrollTrigger are mounted once in the root layout and persist
  // across client-side navigation, but neither re-measures on its own when
  // a new page (different height) swaps in — Lenis keeps stale scroll
  // bounds and ScrollTrigger keeps stale trigger positions, so
  // Reveal-wrapped sections on the new page can get stuck at their initial
  // opacity:0 state forever. Re-sync both after every route change.
  //
  // A single immediate refresh isn't enough: right after the route commits,
  // the page-transition wipe (template.tsx) is still animating and fonts/
  // images can still be settling, so the layout ScrollTrigger measures on
  // the first refresh is often smaller than the final one — e.g. it can
  // catch the hero before its 100svh height is reflected, miscalculating
  // every trigger position below it. Refresh again after the wipe + any
  // late layout shifts have had time to finish.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const refresh = () => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(refresh);
    const timeout = window.setTimeout(refresh, 900);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return <>{children}</>;
}
