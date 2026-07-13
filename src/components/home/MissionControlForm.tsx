"use client";

import { useState } from "react";
import styles from "./MissionControlForm.module.css";

const MISSION_TYPES = [
  "GAME DEVELOPMENT",
  "VR / XR",
  "ARCHVIZ",
  "ART & ANIMATION",
];

const BUDGET_OPTIONS = [
  "< $5K",
  "$5K - $10K",
  "$10K - $25K",
  "$25K+",
];

export default function MissionControlForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [missionType, setMissionType] = useState("GAME DEVELOPMENT");
  const [budget, setBudget] = useState("< $5K");
  const [briefing, setBriefing] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleBriefingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setBriefing(val);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !phone || !briefing) return;

    setStatus("submitting");

    const payload = {
      name,
      email,
      phone,
      missionType,
      budget,
      briefing,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className={styles.section} id="contact">
        <div className={styles.container}>
          <div className={styles.statusScreen}>
            <div className={styles.statusCheck}>✓</div>
            <h2 className={styles.statusTitle}>Launch Sequence Initiated</h2>
            <p className={styles.statusNote}>
              Transmission received. Mission parameters locked. Our team will establish communication shortly.
            </p>
            <button
              className="pill pill--outline"
              onClick={() => {
                setName("");
                setEmail("");
                setPhone("");
                setBriefing("");
                setMissionType("GAME DEVELOPMENT");
                setBudget("< $5K");
                setStatus("idle");
              }}
            >
              Start New Mission
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className={styles.section} id="contact">
        <div className={styles.container}>
          <div className={styles.statusScreen}>
            <div className={`${styles.statusCheck} ${styles.statusCheckError}`}>✕</div>
            <h2 className={styles.statusTitle}>Transmission Interrupted</h2>
            <p className={styles.statusNote}>
              A connection error occurred. Please verify your grid status and retry the launch sequence.
            </p>
            <button
              className="pill pill--outline"
              onClick={() => setStatus("idle")}
            >
              Retry Sequence
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <span className={styles.titleLine} />
            <h2 className={styles.title}>Contact Us</h2>
            <span className={styles.titleLine} />
          </div>
          <p className={styles.subtitle}>
            Initialize your project with Blood Nexus Studio
          </p>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          {/* FormSubmit Honeypot and custom settings */}
          <input type="text" name="_honey" style={{ display: "none" }} />
          
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Codename / Name *
              </label>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Communication Channel *
              </label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Secure Line / Phone No. *
              </label>
              <input
                id="phone"
                type="tel"
                className={styles.input}
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="tel"
              />
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.groupLabel}>Mission Type</span>
            <div className={styles.pillsGrid}>
              {MISSION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${styles.pillButton} ${
                    missionType === type ? styles.pillButtonActive : ""
                  }`}
                  onClick={() => setMissionType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.groupLabel}>Resource Allocation (Budget)</span>
            <div className={styles.pillsGrid}>
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`${styles.pillButton} ${
                    budget === opt ? styles.pillButtonActive : ""
                  }`}
                  onClick={() => setBudget(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field} style={{ marginBottom: "32px" }}>
            <div className={styles.labelRow}>
              <label htmlFor="briefing" className={styles.label}>
                Briefing
              </label>
              <span className={styles.charCounter}>{briefing.length} / 1000</span>
            </div>
            <textarea
              id="briefing"
              className={styles.textarea}
              placeholder="Tell us about your vision..."
              value={briefing}
              onChange={handleBriefingChange}
              required
            />
          </div>

          <div className={styles.submitWrap}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                "Transmitting..."
              ) : (
                <>
                  Initiate Launch Sequence <span style={{ fontSize: "10px" }}>▲</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
