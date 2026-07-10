import Link from "next/link";
import styles from "./CategoryMarquee.module.css";

/**
 * Scrolling category strip (apechain-style category marquee, adapted).
 * Outlined pills scroll horizontally; track is duplicated 2× for a seamless loop.
 */
const CATEGORIES = [
  { label: "Game Development", href: "/services" },
  { label: "Cinematics", href: "/services" },
  { label: "VR & Interactive 3D", href: "/services" },
  { label: "Archviz", href: "/services" },
  { label: "Unreal Engine", href: "/games" },
  { label: "Unity", href: "/games" },
  { label: "Real-Time 3D", href: "/games" },
];

export default function CategoryMarquee() {
  const row = (
    <div className={styles.row} aria-hidden={false}>
      {CATEGORIES.map((c) => (
        <Link key={c.label} href={c.href} className={styles.pill}>
          {c.label}
        </Link>
      ))}
    </div>
  );

  return (
    <section className={styles.section} aria-label="Explore by category">
      <div className={styles.track}>
        {row}
        <div className={styles.row} aria-hidden="true">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              tabIndex={-1}
              className={styles.pill}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
