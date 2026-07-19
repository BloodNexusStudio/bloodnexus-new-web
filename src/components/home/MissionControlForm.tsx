"use client";

import { useState } from "react";
import styles from "./MissionControlForm.module.css";

const MISSION_TYPES = [
  "GAME DEVELOPMENT",
  "VR / XR",
  "ARCHVIZ",
  "ART & ANIMATION",
];

const COUNTRY_CODES = [
  { code: "+91", country: "IN", name: "India (+91)", digits: 10 },
  { code: "+1", country: "US", name: "US/CA (+1)", digits: 10 },
  { code: "+44", country: "UK", name: "UK (+44)", digits: 10 },
  { code: "+61", country: "AU", name: "Australia (+61)", digits: 9 },
  { code: "+971", country: "AE", name: "UAE (+971)", digits: 9 },
];

const BUDGET_OPTIONS = [
  "< $5K",
  "$5K - $10K",
  "$10K - $25K",
  "$25K+",
  "CUSTOM",
];

export default function MissionControlForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phone, setPhone] = useState("");
  const [missionTypes, setMissionTypes] = useState<string[]>(["GAME DEVELOPMENT"]);
  
  // Custom budget Option and slider states
  const [budgetOption, setBudgetOption] = useState("< $5K");
  const [budgetVal, setBudgetVal] = useState<number>(25000);
  const [budgetText, setBudgetText] = useState<string>("25000");

  const [briefing, setBriefing] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only letters (capital & small) and spaces
    if (/^[a-zA-Z\s]*$/.test(val)) {
      setName(val);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (val.length <= selectedCountry.digits) {
      setPhone(val);
    }
  };

  const handleCountryChange = (codeStr: string) => {
    const found = COUNTRY_CODES.find((c) => c.code === codeStr) || COUNTRY_CODES[0];
    setSelectedCountry(found);
    // Truncate existing phone input if it exceeds the new country's limit
    if (phone.length > found.digits) {
      setPhone(phone.slice(0, found.digits));
    }
  };

  const toggleMissionType = (type: string) => {
    if (missionTypes.includes(type)) {
      // Maintain at least one selection
      if (missionTypes.length > 1) {
        setMissionTypes(missionTypes.filter((t) => t !== type));
      }
    } else {
      setMissionTypes([...missionTypes, type]);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    setBudgetVal(num);
    setBudgetText(String(num));
  };

  const handleBudgetTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanVal = e.target.value.replace(/\D/g, ""); // digits only
    setBudgetText(cleanVal);
    
    const num = parseInt(cleanVal, 10);
    if (!isNaN(num)) {
      // Clamp slider representation to bounds internally
      setBudgetVal(Math.min(Math.max(num, 1000), 150000));
    } else {
      setBudgetVal(1000);
    }
  };

  const handleBriefingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setBriefing(val);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { email?: string; phone?: string } = {};

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@domain.com)";
    }

    // Validate phone number length matches country requirement
    if (phone.length !== selectedCountry.digits) {
      newErrors.phone = `Phone number must be exactly ${selectedCountry.digits} digits for ${selectedCountry.name}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");

    const finalBudgetNum = parseInt(budgetText, 10);
    const budgetDisplay = budgetOption === "CUSTOM"
      ? (isNaN(finalBudgetNum) ? `$${budgetVal.toLocaleString()}` : `$${finalBudgetNum.toLocaleString()}`)
      : budgetOption;

    const payload = {
      name,
      email,
      phone: `${selectedCountry.code} ${phone}`,
      missionType: missionTypes.join(", "),
      budget: budgetDisplay,
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
            <h2 className={styles.statusTitle}>Thanks for contacting us</h2>
            <p className={styles.statusNote}>
              We will get back to you shortly.
            </p>
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
                onChange={handleNameChange}
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
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                placeholder="john@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                required
                autoComplete="email"
              />
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Secure Line / Phone No. *
              </label>
              <div className={`${styles.phoneFieldWrapper} ${errors.phone ? styles.inputError : ""}`}>
                <select
                  className={styles.countrySelect}
                  value={selectedCountry.code}
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code} className={styles.selectOption}>
                      {c.country} ({c.code})
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  type="tel"
                  className={styles.phoneInput}
                  placeholder={`Enter ${selectedCountry.digits}-digit number`}
                  value={phone}
                  onChange={(e) => {
                    handlePhoneChange(e);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  required
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.groupLabel}>Mission Type (Multiple Select)</span>
            <div className={styles.pillsGrid}>
              {MISSION_TYPES.map((type) => {
                const isActive = missionTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.pillButton} ${
                      isActive ? styles.pillButtonActive : ""
                    }`}
                    onClick={() => toggleMissionType(type)}
                  >
                    {type} {isActive && <span className={styles.checkIndicator}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.groupLabel}>Resource Allocation (Budget)</span>
            <div className={styles.pillsGrid} style={{ marginBottom: "20px" }}>
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`${styles.pillButton} ${
                    budgetOption === opt ? styles.pillButtonActive : ""
                  }`}
                  onClick={() => setBudgetOption(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {budgetOption === "CUSTOM" && (
              <div className={styles.budgetControl}>
                <div className={styles.budgetHeader}>
                  <div className={styles.currencyWrapper}>
                    <span className={styles.currencySymbol}>$</span>
                    <input
                      type="text"
                      className={styles.customBudgetInput}
                      value={budgetText}
                      onChange={handleBudgetTextChange}
                      placeholder="25000"
                    />
                  </div>
                  <span className={styles.budgetValueDisplay}>
                    {budgetVal >= 150000 ? "Custom / Max ($150K+)" : `Locked: $${budgetVal.toLocaleString()}`}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="150000"
                  step="1000"
                  className={styles.budgetSlider}
                  value={budgetVal}
                  onChange={handleSliderChange}
                />
                <div className={styles.sliderLabels}>
                  <span>$1K</span>
                  <span>$50K</span>
                  <span>$100K</span>
                  <span>$150K+</span>
                </div>
              </div>
            )}
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
