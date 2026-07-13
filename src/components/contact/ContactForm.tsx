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

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: "N/A", // Not provided in this form
          missionType: projectType || "General Contact Inquiry",
          budget: "N/A", // Not provided in this form
          briefing: message,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact Form submission error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.check} aria-hidden="true">
          ✓
        </span>
        <h3 className={styles.successTitle}>Message sent</h3>
        <p className={styles.successNote}>
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
        <button
          className="pill pill--outline-dark"
          onClick={() => {
            setName("");
            setEmail("");
            setProjectType("");
            setMessage("");
            setStatus("idle");
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.success} role="status" style={{ borderColor: "#c1121f" }}>
        <span className={styles.check} style={{ borderColor: "#c1121f", color: "#c1121f" }} aria-hidden="true">
          ✕
        </span>
        <h3 className={styles.successTitle} style={{ color: "#ffffff" }}>Transmission Failed</h3>
        <p className={styles.successNote}>
          Could not establish server connection. Please retry.
        </p>
        <button
          className="pill pill--outline-dark"
          onClick={() => setStatus("idle")}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="projectType">Project Type</label>
        <select
          id="projectType"
          name="projectType"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
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
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className={`pill pill--solid ${styles.submit}`}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
