"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RollLink from "@/components/motion/RollLink";
import { CAPSULE_LINKS, SOCIAL_LINKS, SITE_NAME } from "@/data/site";
import styles from "./Header.module.css";

/**
 * Fixed header (§5): transparent over hero → solid --color-bg + hairline after 80px.
 * Mobile: hamburger → full-screen black overlay, staggered link slide-in.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.solid : ""}`}
      data-open={open}
    >
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logoWrap} onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="BloodNexus Logo" className={styles.logoImg} />
          <span className={styles.logoText}>
            {SITE_NAME}
            <span className={styles.logoDot}>.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.nav} aria-label="Primary">
          {CAPSULE_LINKS.map((link) => (
            <RollLink
              key={link.href}
              href={link.href}
              accent
              active={isActive(link.href)}
            >
              {link.label}
            </RollLink>
          ))}
          <Link
            href="/#contact"
            className="pill pill--outline"
          >
            Contact Us
          </Link>
        </nav>

        <button
          className={styles.burger}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <div className={styles.overlay} aria-hidden={!open}>
        <nav className={styles.overlayNav} aria-label="Mobile">
          {CAPSULE_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.overlayLink} ${
                isActive(link.href) ? styles.overlayLinkActive : ""
              }`}
              style={{ transitionDelay: `${0.07 * (i + 1)}s` }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className={styles.overlayLink}
            style={{ transitionDelay: `${0.07 * (CAPSULE_LINKS.length + 2)}s` }}
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
        <div className={styles.overlaySocial}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
