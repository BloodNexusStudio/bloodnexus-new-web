import RollLink from "@/components/motion/RollLink";
import FooterWordmark from "./FooterWordmark";
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
 * Footer (§6.6): dark game-art band + overlay, 3 columns, the signature
 * gigantic BLOODNEXUS wordmark in its own dedicated band, then the legal
 * line — stacked in normal flow so nothing overlaps.
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
      </div>

      {/* Signature: WebGL giant wordmark — its own band, clipped within it */}
      <FooterWordmark />

      <div className={`container ${styles.legal}`}>
        <span>
          © {new Date().getFullYear()} BloodNexus Studio · Thane, India
        </span>
        <span className={styles.legalLinks}>
          <RollLink href="/privacy">Privacy</RollLink>
          <RollLink href="/terms">Terms</RollLink>
        </span>
      </div>
    </footer>
  );
}
