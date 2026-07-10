import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RollLink from "@/components/motion/RollLink";
import { ROLES } from "@/data/roles";
import styles from "./CareersTeaser.module.css";

/**
 * Careers teaser (§6.5): H2 JOIN THE STUDIO + 2–3 open-role cards + SEE ALL ROLES.
 */
export default function CareersTeaser() {
  return (
    <section className={styles.section} id="careers">
      <div className={`container ${styles.head}`}>
        <div>
          <p className="label">We&apos;re Hiring</p>
          <h2 className={styles.title}>Join the Studio</h2>
        </div>
        <RollLink href="/careers" accent className={styles.seeAll}>
          See All Roles
        </RollLink>
      </div>

      <Reveal
        as="ul"
        staggerChildren
        className={`container ${styles.list}`}
      >
        {ROLES.map((role) => (
          <li key={role.slug}>
            <Link href="/careers" className={styles.card}>
              <div>
                <h3 className={styles.role}>{role.title}</h3>
                <p className={styles.meta}>
                  {role.department} · {role.type}
                </p>
              </div>
              <div className={styles.cardFoot}>
                <span className={styles.locPill}>{role.location}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
