import ContactForm from "@/components/contact/ContactForm";
import { CONTACT, SOCIAL_LINKS } from "@/data/site";
import styles from "./contact.module.css";

export const metadata = {
  title: "Let’s Talk — BloodNexus Studio",
  description:
    "Work with BloodNexus Studio — immersive games, cinematics, and real-time 3D. Tell us about your project.",
};

// §7 /contact — split layout: giant LET'S TALK left, form right
export default function ContactPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <p className="label">Get In Touch</p>
          <h1 className={styles.title}>
            LET&apos;S
            <br />
            TALK
          </h1>
          <div className={styles.details}>
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className={styles.detailLink}>
                {CONTACT.email}
              </a>
            )}
            {CONTACT.phone && (
              <a href={`tel:${CONTACT.phone}`} className={styles.detailLink}>
                {CONTACT.phone}
              </a>
            )}
            <span className={styles.location}>{CONTACT.location}</span>
          </div>
          <div className={styles.socials}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={styles.social}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
