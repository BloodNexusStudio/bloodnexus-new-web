"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/data/stats";
import styles from "./StatsStrip.module.css";

/**
 * Studio stats strip (§6.4): giant numbers count up when scrolled into view
 * (GSAP innerText tween, ~1.2s). Static under prefers-reduced-motion.
 */
export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nums = el.querySelectorAll<HTMLElement>("[data-value]");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      nums.forEach((n) => {
        n.textContent = n.dataset.value ?? "0";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const target = Number(n.dataset.value ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            n.textContent = String(Math.round(obj.v));
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`} ref={ref}>
        {STATS.map((s) => (
          <div className={styles.stat} key={s.label}>
            <div className={styles.number}>
              <span data-value={s.value}>0</span>
              {s.suffix}
            </div>
            <p className="label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
