import type { Metadata } from "next";
import Link from "next/link";
import styles from "./outsourcing.module.css";

export const metadata: Metadata = {
  title: "3D Game Art Outsourcing in 2026: Costs, Models & Partner Guide",
  description:
    "A comprehensive buyer's guide to 3D game art outsourcing in 2026. Explore asset-level costs, monthly engagement models, pipeline governance, and technical evaluation tips.",
};

export default function OutsourcingGuidePage() {
  return (
    <article className={styles.container} id="outsourcing-guide">
      {/* Hero Header */}
      <header className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDark}>Industry Guide</span>
          <span className={styles.badgeAccent}>2026 Edition</span>
        </div>
        <h1 className={styles.title}>
          3D Game Art Outsourcing: Costs, Models & Pipeline Evaluation
        </h1>
        <p className={styles.introText}>
          A structured production blueprint for game studios and publishers looking to scale art pipelines, manage budgets, and choose the right co-development partners in 2026.
        </p>
      </header>

      {/* Section 1: Introduction */}
      <section className={styles.section} aria-labelledby="section-intro">
        <h2 className={styles.subTitle} id="section-intro">
          The Reality of Modern Art Production
        </h2>
        <div className={styles.richText}>
          <p>
            Visual standards in gaming have escalated sharply. High-poly models, physically based rendering (PBR) materials, dynamic lighting setups, and engine-optimized assets are now baseline expectations. Internal art teams, regardless of scale, cannot expand infinitely without inflating fixed overheads, delaying milestones, or fracturing stylistic consistency.
          </p>
          <p>
            This operational reality has shifted <strong>3D game art outsourcing</strong> from a tactical cost-cutting shortcut to a core production design strategy. By embedding external specialists to handle asset volume, internal art directors can protect their creative focus while maintaining a high pipeline velocity.
          </p>
        </div>
      </section>

      {/* Section 2: Asset-Level Cost Breakdown */}
      <section className={styles.section} aria-labelledby="section-costs">
        <h2 className={styles.subTitle} id="section-costs">
          Cost of 3D Game Art Outsourcing in 2026
        </h2>
        <div className={styles.richText}>
          <p>
            Outsourcing budgets depend heavily on fidelity requirements, style complexity, and optimization constraints. Realistic, scan-based PBR assets require significantly more production hours and specialized technical art passes compared to hyper-casual or low-poly stylized props.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              Props & Weapons <span className={styles.cardPrice}>$800 – $5,000</span>
            </h3>
            <ul className={styles.cardList}>
              <li>LOD variants (Level of Detail)</li>
              <li>PBR texture sets (Albedo, Normal, Roughness, Metalness)</li>
              <li>Collision geometry generation</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              Stylized Characters <span className={styles.cardPrice}>$3,000 – $6,000</span>
            </h3>
            <ul className={styles.cardList}>
              <li>Hand-painted or stylized texture maps</li>
              <li>Clean quad-based topology</li>
              <li>Standard skeletal deformation rigging</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              AAA / Realistic Characters <span className={styles.cardPrice}>$6,000 – $15,000+</span>
            </h3>
            <ul className={styles.cardList}>
              <li>Cinematic-level sculpting & micro-skin detailing</li>
              <li>Facial blendshape systems (ARKit compatible)</li>
              <li>Cloth and hair simulation prep</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              Modular Environments <span className={styles.cardPrice}>$10,000+</span>
            </h3>
            <ul className={styles.cardList}>
              <li>Custom trim sheets & seamless tileable materials</li>
              <li>Structural snap-to-grid collision setups</li>
              <li>Performant draw-call draw optimization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Engagement Models */}
      <section className={styles.section} aria-labelledby="section-models">
        <h2 className={styles.subTitle} id="section-models">
          Engagement Models Compared
        </h2>
        <div className={styles.richText}>
          <p>
            Selecting the right engagement model is as critical as selecting the visual style. How your partner is managed directly impacts revision feedback loops, pipeline velocity, and budget predictability.
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table} id="models-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Monthly Rate Range (USD)</th>
                <th>Best Suited For</th>
                <th>Management Overhead</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Freelancer / Task-Based</strong></td>
                <td>$30 – $80 / hour</td>
                <td>One-off prop assets, concepts, and small asset batches</td>
                <td>High (internal PMs must guide closely)</td>
              </tr>
              <tr className={styles.highlightRow}>
                <td><strong>Dedicated Art Pod (Monthly)</strong></td>
                <td>$4,500 – $8,000 / artist</td>
                <td>Medium-scale pipelines, character runs, environment modules</td>
                <td>Moderate (managed by external lead)</td>
              </tr>
              <tr>
                <td><strong>Integrated Co-Development</strong></td>
                <td>$8,000 – $14,000 / specialist</td>
                <td>AAA features, vertical slices, complete environment blocks</td>
                <td>Low (embedded into version control & standups)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Process & Technical Evaluation */}
      <section className={styles.section} aria-labelledby="section-evaluation">
        <h2 className={styles.subTitle} id="section-evaluation">
          How to Evaluate a 3D Art Partner
        </h2>
        <div className={styles.richText}>
          <p>
            A high-quality 3D outsourcing partner is defined not just by a glossy portfolio, but by their technical discipline and how easily their outputs plug into your target game engine.
          </p>
          <p>
            Before signing an agreement, verify the following pipeline parameters:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px", lineHeight: "1.8", color: "var(--color-ink-muted)" }}>
            <li><strong>Poly Budget Discipline</strong>: Ensure assets demonstrate strict polygon budgets optimized for the target runtime platform (Console, PC, VR, or Mobile).</li>
            <li><strong>Clean Topology & UVs</strong>: Inspect UV mapping density, texel resolution ratios, and grid-snapping bounds. Messy layouts cause baking issues and wasting texture memory.</li>
            <li><strong>Engine Export Checks</strong>: Verify that assets undergo a technical QA pass inside your target engine (Unity or Unreal Engine) to inspect material assignments, skeletons, and draw-call counts before handoff.</li>
            <li><strong>Version Control</strong>: Confirm if the partner can work directly within your version control system (Git, Perforce) to eliminate packaging and transfer friction.</li>
          </ul>
        </div>
      </section>

      {/* Call to Action Card */}
      <section className={styles.ctaCard} aria-labelledby="cta-heading">
        <h2 className={styles.ctaTitle} id="cta-heading">
          Scale Your Art Pipeline with BloodNexus
        </h2>
        <p className={styles.ctaText}>
          BloodNexus Studio provides production-grade 3D art outsourcing, rigging, animation, and full-cycle development services. We build engine-ready assets optimized for performance.
        </p>
        <Link href="/#contact" className="pill pill--primary">
          Consult Our Technical Directors
        </Link>
      </section>
    </article>
  );
}
