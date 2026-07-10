import RollLink from "@/components/motion/RollLink";
import { SOCIAL_LINKS } from "@/data/site";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    heading: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Games", href: "/games" },
      { label: "Services", href: "/services" },
    ],
  },
];

/**
 * Footer (§6.6): dark game-art band + overlay, 3 columns, legal line,
 * and the signature gigantic BLOODNEXUS wordmark clipped by the bottom edge.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          {COLUMNS.map((col) => (
            <div key={col.heading} className={styles.col}>
              <p className="label">{col.heading}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <RollLink href={l.href}>{l.label}</RollLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className={styles.col}>
            <p className="label">Social</p>
            <ul>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.social}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <span>
            © {new Date().getFullYear()} BloodNexus Studio · Thane, India
          </span>
          <span className={styles.legalLinks}>
            <RollLink href="/privacy">Privacy</RollLink>
            <RollLink href="/terms">Terms</RollLink>
          </span>
        </div>
      </div>

      {/* Signature: giant wordmark clipped by bottom viewport edge */}
      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>BLOODNEXUS</span>
      </div>
    </footer>
  );
}
