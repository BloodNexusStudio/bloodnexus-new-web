import Link from "next/link";
import FooterWordmark from "./FooterWordmark";
import styles from "./Footer.module.css";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 14v3h4.5a3 3 0 0 0 0-6h-4.5v3Z" />
    <path d="M4 11V7h4.5a3 3 0 0 1 0 6h-4.5v-2Z" />
    <path d="M14 11h6" />
    <path d="M14 14c0-2.5 2-4 4.5-4S23 11.5 23 14h-9v1a4 4 0 0 0 4.5 3 4 4 0 0 0 3.5-1.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Background Red Glow */}
      <div className={styles.bgGlow} />

      <div className={`container ${styles.inner}`}>
        
        {/* Giant Wordmark Section */}
        <div className={styles.wordmarkWrapper}>
          <FooterWordmark />
          <div className={styles.redDot} />
        </div>

        {/* Content Grid */}
        <div className={styles.grid}>
          
          {/* Col 1: Blurb */}
          <div className={`${styles.col} ${styles.colBlurb}`}>
            <p className={styles.blurbText}>
              We design experiences that<br />
              bleed creativity and technology.<br />
              From concept to execution,<br />
              we build digital worlds<br />
              that leave a mark.
            </p>
            <Link href="#contact" className={styles.btnWork}>
              WORK WITH US <span className={styles.arrowUpRight}>↗</span>
            </Link>
          </div>

          {/* Col 2: Studio */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>STUDIO</h3>
            <ul className={styles.linkList}>
              <li><Link href="/careers">CAREERS</Link></li>
              <li><Link href="#contact">CONTACT</Link></li>
            </ul>
          </div>

          {/* Col 3: Work */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>WORK</h3>
            <ul className={styles.linkList}>
              <li><Link href="/games">GAMES</Link></li>
              <li><Link href="/services">SERVICES</Link></li>
            </ul>
          </div>

          {/* Col 4: Social */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>SOCIAL</h3>
            <ul className={styles.linkList}>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LINKEDIN</a></li>
            </ul>
          </div>

          {/* Col 5: Connect */}
          <div className={`${styles.col} ${styles.colConnect}`}>
            <h3 className={styles.colTitle}>LET'S CONNECT</h3>
            <p className={styles.connectText}>
              Have a project in mind?<br />
              Let's create something<br />
              extraordinary together.
            </p>
            <div className={styles.socialIcons}>
              <a href="mailto:hello@bloodnexus.com" aria-label="Email"><MailIcon /></a>
              <a href="https://instagram.com" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="https://behance.net" aria-label="Behance"><BehanceIcon /></a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarInner}`}>
          <div className={styles.bottomLeft}>
            <div className={styles.logoCircle}>N</div>
            <span className={styles.copyright}>© {new Date().getFullYear()} BLOODNEXUS STUDIO · THANE, INDIA</span>
          </div>
          <div className={styles.bottomRight}>
            <Link href="/privacy">PRIVACY POLICY</Link>
            <span className={styles.separator}>|</span>
            <Link href="/terms">TERMS OF USE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
