import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { ROLES } from "@/data/roles";
import { CONTACT } from "@/data/site";
import styles from "./careers.module.css";

export const metadata = {
  title: "Careers — BloodNexus Studio",
  description:
    "Join BloodNexus Studio. Open roles across design, art, and engineering for a Thane-based AAA game studio.",
};

// §7 /careers — intro + role cards grid (from CMS/MDX so roles change without a deploy)
export default function CareersPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <p className="label">We&apos;re Hiring</p>
        <MaskText as="h1" className={styles.title} text="Join The Studio" />
        <p className={styles.intro}>
          {/* [CONTENT] careers intro line */}
          We build immersive games with narrative depth. If you want to craft
          worlds, systems, and cinematics at a studio that ships, we want to hear
          from you.
        </p>

        <Reveal as="ul" staggerChildren className={styles.list}>
          {ROLES.map((role) => (
            <li key={role.slug}>
              <a href={role.applyHref} className={styles.card}>
                <div className={styles.top}>
                  <span className={styles.dept}>{role.department}</span>
                  <h3 className={styles.role}>{role.title}</h3>
                  <p className={styles.meta}>
                    {role.type} · {role.location}
                  </p>
                </div>
                <span className={styles.apply}>
                  Apply <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </Reveal>

        <div className={styles.openApp}>
          <p className={styles.openText}>
            Don&apos;t see your role? Send us your work anyway.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="pill pill--primary">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
