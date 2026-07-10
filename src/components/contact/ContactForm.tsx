"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

const PROJECT_TYPES = [
  "Game Development",
  "Cinematics",
  "VR & Interactive 3D",
  "Archviz",
  "Other",
];

/**
 * Contact form (§7). Front-end only: on submit it validates natively and shows an
 * animated success state. [CONTENT/TODO] wire to a real endpoint (e.g. a Next.js
 * route handler / form service) before launch — nothing is sent yet.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST to a real endpoint here.
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <span className={styles.check} aria-hidden="true">
          ✓
        </span>
        <h3 className={styles.successTitle}>Message sent</h3>
        <p className={styles.successNote}>
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
        <button className="pill pill--outline-dark" onClick={() => setSent(false)}>
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="projectType">Project Type</label>
        <select id="projectType" name="projectType" defaultValue="">
          <option value="" disabled>
            Select one…
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>
      <button type="submit" className={`pill pill--solid ${styles.submit}`}>
        Send Message
      </button>
    </form>
  );
}
