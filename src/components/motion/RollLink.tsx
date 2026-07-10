import Link from "next/link";
import styles from "./RollLink.module.css";

type RollLinkProps = {
  children: string;
  href: string;
  className?: string;
  /** color the duplicate line with --color-accent for a red swap */
  accent?: boolean;
  ariaLabel?: string;
};

/**
 * Text-roll link hover (§8.1) — use on every nav link, footer link, button label.
 * Duplicate span is aria-hidden so screen readers hear the label once (§10).
 */
export default function RollLink({
  children,
  href,
  className,
  accent = false,
  ariaLabel,
}: RollLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? children}
      className={`${styles.roll} ${className ?? ""}`}
    >
      <span className={styles.inner}>
        <span>{children}</span>
        <span aria-hidden="true" className={accent ? styles.accent : undefined}>
          {children}
        </span>
      </span>
    </Link>
  );
}
