import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_DETAILS, ServiceDetail } from "@/data/service_details";
import styles from "./service-detail.module.css";
import Reveal from "@/components/motion/Reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const service = SERVICE_DETAILS.find((s) => s.slug === resolvedParams.slug);
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: service.metaTitle,
    description: service.heroHeadline,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const service = SERVICE_DETAILS.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image 
            src={service.heroImage} 
            alt="Hero Background" 
            fill 
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.topLabel}>
            <span className={styles.decoLine} /> PERFORMANCE ENGINEERING
          </div>
          <h1 className={styles.headline}>{service.heroHeadline}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.contentGrid}`}>
          
          {/* Left Column: Technical Copy */}
          <div className={styles.mainCopy}>
            <Reveal as="div" y={30}>
              <h2 className={styles.sectionTitle}>TECHNICAL ANALYSIS</h2>
              <div className={styles.paragraphs}>
                {service.content.map((paragraph, idx) => (
                  <p key={idx} className={styles.textBlock}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Case Studies */}
          <div className={styles.sidebar}>
            <Reveal as="div" y={30} delay={0.2}>
              <h2 className={styles.sectionTitle}>FIELD DATA</h2>
              <div className={styles.caseStudyList}>
                {service.caseStudies.map((caseStudy, idx) => (
                  <div key={idx} className={styles.caseCard}>
                    <div className={styles.caseTitle}>{caseStudy.title}</div>
                    <div className={styles.caseMetric}>{caseStudy.metric}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Massive CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to optimize your pipeline?</h2>
            <Link href="/contact" className={styles.ctaButton}>
              {service.ctaText}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.ctaArrow}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
