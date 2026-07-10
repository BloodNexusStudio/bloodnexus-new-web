import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { SERVICES } from "@/data/services";
import styles from "./ServicesBand.module.css";

/**
 * Services spotlight (§6.3): stacked full-width charcoal bands, image side
 * alternates per block, each reveals on scroll (fade + rise).
 */
export default function ServicesBand() {
  return (
    <section className={styles.section} id="services">
      <div className={`container ${styles.head}`}>
        <p className="label">What We Do</p>
        <h2 className={styles.heading}>Services</h2>
      </div>

      {SERVICES.map((s, i) => (
        <Reveal key={s.key} as="div" className={styles.band}>
          <div
            className={`container ${styles.inner} ${
              i % 2 === 1 ? styles.reverse : ""
            }`}
          >
            <div className={styles.media}>
              {/* [CONTENT] large 3D render / cinematic frame */}
              <img src={s.image} alt={`${s.title} visual`} loading="lazy" />
            </div>
            <div className={styles.copy}>
              <span className={styles.index}>0{i + 1}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.copy}</p>
              <Link href="/services" className="pill pill--solid">
                Learn More
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
