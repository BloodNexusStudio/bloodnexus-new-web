"use client";

import { useEffect, useState } from "react";
import styles from "./Screenshots.module.css";

/**
 * Screenshot masonry grid with a click-to-open lightbox (§7 game detail).
 * Esc / backdrop / arrows close & navigate. Keyboard accessible.
 */
export default function Screenshots({ shots }: { shots: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % shots.length);
      if (e.key === "ArrowLeft")
        setOpen((i) => ((i ?? 0) - 1 + shots.length) % shots.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, shots.length]);

  return (
    <>
      <div className={styles.masonry}>
        {shots.map((src, i) => (
          <button
            key={src}
            className={styles.tile}
            onClick={() => setOpen(i)}
            aria-label={`Open screenshot ${i + 1}`}
          >
            <img src={src} alt={`Screenshot ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot ${open + 1} of ${shots.length}`}
          onClick={() => setOpen(null)}
        >
          <button
            className={styles.close}
            aria-label="Close"
            onClick={() => setOpen(null)}
          >
            ✕
          </button>
          <button
            className={`${styles.nav} ${styles.prev}`}
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) - 1 + shots.length) % shots.length);
            }}
          >
            ←
          </button>
          <img
            className={styles.full}
            src={shots[open]}
            alt={`Screenshot ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={`${styles.nav} ${styles.next}`}
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) + 1) % shots.length);
            }}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
