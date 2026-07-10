import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import { TEAM, TOOLS, STUDIO_STORY } from "@/data/team";
import styles from "./about.module.css";

export const metadata = {
  title: "About — BloodNexus Studio",
  description:
    "BloodNexus is a Thane-based game development studio building immersive games with narrative depth — powered by Unreal Engine and Unity.",
};

// §7 /about — studio story + founder/team cards + tools marquee
export default function AboutPage() {
  return (
    <>
      <section className={styles.page}>
        <div className="container">
          <p className="label">The Studio</p>
          <MaskText as="h1" className={styles.title} text="A AAA Game Studio" />

          <div className={styles.story}>
            {STUDIO_STORY.map((p, i) => (
              <p key={i} className={styles.para}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container">
          <p className="label">The Team</p>
          <h2 className={styles.teamHeading}>Founders &amp; Crew</h2>
          <Reveal as="ul" staggerChildren className={styles.grid}>
            {TEAM.map((m) => (
              <li key={m.slug} className={styles.card}>
                <div className={styles.photo}>
                  <img src={m.photo} alt={m.name} loading="lazy" />
                </div>
                <h3 className={styles.name}>{m.name}</h3>
                <p className={styles.role}>{m.role}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Tools marquee */}
      <div className={styles.tools}>
        <div className="container">
          <p className="label">Our Toolkit</p>
        </div>
        <Marquee items={TOOLS} speed={26} />
      </div>
    </>
  );
}
