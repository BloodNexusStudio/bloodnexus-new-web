"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./CurvedImage.module.css";

const STRIPS = 18; // vertical slices
const ARC_DEG = 34; // total horizontal arc of the cylinder

/**
 * Curved media panel — renders an image as vertical strips wrapped onto a
 * cylinder so the card surface genuinely bows toward the viewer (apechain's
 * curved cards), without WebGL. Geometry is computed from the measured size.
 */
export default function CurvedImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const strips: React.ReactNode[] = [];
  if (size && size.w > 0) {
    const { w, h } = size;
    const arc = (ARC_DEG * Math.PI) / 180;
    const R = w / 2 / Math.sin(arc / 2); // radius so the chord equals the width
    const stripW = w / STRIPS;
    for (let i = 0; i < STRIPS; i++) {
      const phi = (i - (STRIPS - 1) / 2) * (arc / (STRIPS - 1)); // -arc/2 .. arc/2
      const x = R * Math.sin(phi);
      const z = R * (Math.cos(phi) - Math.cos(arc / 2)); // center bulges forward
      const rot = (phi * 180) / Math.PI;
      strips.push(
        <div
          key={i}
          className={styles.strip}
          style={{
            width: stripW + 2,
            height: h,
            // scaleX widens each strip so neighbours overlap → no seams
            transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${rot}deg) scaleX(1.12)`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${w}px ${h}px`,
            backgroundPosition: `${-i * stripW}px 0`,
          }}
        />
      );
    }
  }

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${className ?? ""}`}
      aria-hidden="true"
    >
      {!size && (
        <img src={src} alt="" className={styles.fallback} draggable={false} />
      )}
      {size && size.w > 0 && (
        <div
          className={styles.cyl}
          style={{ perspective: `${size.w * 1.5}px` }}
        >
          {strips}
        </div>
      )}
    </div>
  );
}
