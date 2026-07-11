import { SERVICES } from "@/data/services";
import styles from "./ServicesTicker.module.css";

/** Minimal line-icon per service key — small, recognizable at ticker scale. */
const ICONS: Record<string, React.ReactNode> = {
  "game-dev": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="8" width="18" height="9" rx="4" />
      <path d="M7 11v3M5.5 12.5h3" />
      <circle cx="15.5" cy="11.5" r="1" />
      <circle cx="17.5" cy="13.5" r="1" />
    </svg>
  ),
  cinematics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 10h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z" />
      <path d="M4 10 5 6h14l1 4" />
      <path d="M8 6l1.5 4M13 6l1.5 4" />
    </svg>
  ),
  "vr-3d": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 3v9M4 7.5l8 4.5 8-4.5" />
    </svg>
  ),
  archviz: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6M4 21h16" />
    </svg>
  ),
};

function Group() {
  return (
    <>
      {SERVICES.map((s) => (
        <span className={styles.item} key={s.key}>
          <span className={styles.label}>{s.title}</span>
          <span className={styles.icon} aria-hidden="true">
            {ICONS[s.key]}
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * Dual-direction services ticker (apechain category-ticker pattern, structure
 * only): giant condensed labels + small icon per item, two rows scrolling in
 * opposite directions. Content = our 4 documented services (handoff §6.3 /
 * services.ts) — no new service claims added.
 */
export default function ServicesTicker() {
  return (
    <section className={styles.section} aria-label="Services we provide">
      <div className={styles.row}>
        <div className={styles.track}>
          <Group />
          <span aria-hidden="true" className={styles.dup}>
            <Group />
          </span>
        </div>
      </div>
      <div className={`${styles.row} ${styles.reverse}`}>
        <div className={styles.track}>
          <Group />
          <span aria-hidden="true" className={styles.dup}>
            <Group />
          </span>
        </div>
      </div>
    </section>
  );
}
