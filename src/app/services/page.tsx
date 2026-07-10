import Link from "next/link";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { SERVICES } from "@/data/services";
import { CONTACT } from "@/data/site";
import styles from "./services.module.css";

export const metadata = {
  title: "Services — BloodNexus Studio",
  description:
    "Game development, cinematics, VR & interactive 3D, and archviz — powered by Unreal Engine and Unity.",
};

// §7 /services — hero + stacked promo bands, alternating image side
export default function ServicesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">What We Do</p>
          <MaskText as="h1" className={styles.title} text="Services" />
          <p className={styles.intro}>
            {/* [CONTENT] services intro */}
            From full-cycle game development to cinematics, immersive VR, and
            real-time visualization — built with a AAA pipeline.
          </p>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <Reveal
          key={s.key}
          as="div"
          className={`${styles.band} ${i % 2 === 1 ? styles.reverse : ""}`}
        >
          <div className={styles.media}>
            <img src={s.image} alt={`${s.title} visual`} loading="lazy" />
          </div>
          <div className={styles.copy}>
            <span className={styles.index}>0{i + 1}</span>
            <h2 className={styles.bandTitle}>{s.title}</h2>
            <p className={styles.text}>{s.copy}</p>
            <Link href="/contact" className="pill pill--solid">
              Start A Project
            </Link>
          </div>
        </Reveal>
      ))}

      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
          <a href={`mailto:${CONTACT.email}`} className="pill pill--primary">
            Work With Us
          </a>
        </div>
      </section>
    </>
  );
}
