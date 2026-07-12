import Link from "next/link";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import { CONTACT } from "@/data/site";
import styles from "./3d-art.module.css";

export const metadata = {
  title: "3D Art & Animation — BloodNexus Studio",
  description:
    "High-fidelity modeling, rigging, animation, and engine optimization optimized for modern real-time systems.",
};

export default function ThreeDArtPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src="https://bloodnexusstudio.in/otassets/ChatGPT_Image_Feb_4_2026_07_25_56_PM_bvzmwv.png"
            alt="3D Art banner"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.scanlines} />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.systemTag}>{"//"} VISUALS THAT PUNCH ABOVE THEIR WEIGHT</p>
          <MaskText as="h1" className={styles.heroTitle} text="Stand Out. Sell More." />
          <p className={styles.heroDesc}>
            Great games live and die by their art. At{" "}
            <span className={styles.highlightText}>Blood Nexus Studios</span>, we combine
            artistic flair with technical know-how. We don’t just make things look cool;
            we make sure they work perfectly in your game engine, optimized for performance
            and ready for gameplay.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/contact" className="pill pill--primary">
              COUNT ME IN!
            </Link>
          </div>
        </div>
      </section>

      {/* 2D Art & Creativity Section */}
      <Reveal as="section" y={40} className={styles.twoDSection}>
        <div className={`container ${styles.twoDGrid}`}>
          <div className={styles.twoDMedia}>
            {/* Gaming HUD corner brackets */}
            <div className={`${styles.hudCorner} ${styles.topLeft}`} />
            <div className={`${styles.hudCorner} ${styles.topRight}`} />
            <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
            <div className={`${styles.hudCorner} ${styles.bottomRight}`} />
            <img
              src="https://bloodnexusstudio.in/otassets/6a244693-8114-4990-a5d4-2721a2462563.png"
              alt="2D Art Creative"
            />
          </div>
          <div className={styles.twoDCopy}>
            <p className={styles.systemTag}>{"//"} PRODUCTION BLUEPRINT</p>
            <h2 className={styles.sectionTitle}>2D Art & Creativity</h2>
            <p className={styles.text}>
              Every great project starts with a vision. Our 2D team lays the foundation, creating the look and feel that defines your game&apos;s identity.
            </p>

            <div className={styles.twoDList}>
              <div className={styles.listItem}>
                <span className={styles.listNum}>01</span>
                <div className={styles.listContent}>
                  <h3 className={styles.listTitle}>Concept Art & Storyboarding</h3>
                  <p className={styles.listDesc}>
                    We visualize your ideas early, helping you iterate fast before committing to expensive 3D production.
                  </p>
                </div>
              </div>

              <div className={styles.listItem}>
                <span className={styles.listNum}>02</span>
                <div className={styles.listContent}>
                  <h3 className={styles.listTitle}>Character Design & Caricatures</h3>
                  <p className={styles.listDesc}>
                    From stylized 2D cartoons to detailed character sheets, we create memorable personalities.
                  </p>
                </div>
              </div>

              <div className={styles.listItem}>
                <span className={styles.listNum}>03</span>
                <div className={styles.listContent}>
                  <h3 className={styles.listTitle}>UI/UX Design</h3>
                  <p className={styles.listDesc}>
                    We design game interfaces that are intuitive and sleek, ensuring players spend less time confused and more time playing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3D Modeling & Animation Section */}
      <Reveal as="section" y={40} className={styles.threeDSection}>
        <div className="container">
          <div className={styles.centerHead}>
            <span className={styles.bgWord}>PIPELINE</span>
            <p className={styles.systemTag}>{"//"} REAL-TIME RENDERING</p>
            <h2 className={styles.centerTitle}>3D Modeling & Animation</h2>
          </div>

          <div className={styles.threeDGrid}>
            <div className={styles.threeDCard}>
              <p className={styles.cardInfo}>
                <span className={styles.boldLabel}>High-Fidelity Modeling</span> that captures every detail, from hard-surface mechanical parts to organic creature designs.
              </p>
              <div className={styles.cardImage}>
                <img
                  src="https://bloodnexusstudio.in/otassets/ChatGPT_Image_Feb_4_2026_07_26_22_PM_qqxhaj.png"
                  alt="3D Process Modeling"
                />
              </div>
            </div>

            <div className={styles.threeDCard}>
              <p className={styles.cardInfo}>
                <span className={styles.boldLabel}>Rigging & Animation</span> that brings static meshes to life with fluid motion, realistic physics, and expressive character acting.
              </p>
              <div className={styles.cardImage}>
                <img
                  src="https://bloodnexusstudio.in/otassets/SpiderOnOff_e5qxyl.gif"
                  alt="3D Process Rigging"
                />
              </div>
            </div>

            <div className={styles.threeDCard}>
              <p className={styles.cardInfo}>
                <span className={styles.boldLabel}>Engine-Ready Optimization</span> ensuring your assets look great without killing your frame rate. Topology matters.
              </p>
              <div className={styles.cardImage}>
                <img
                  src="https://bloodnexusstudio.in/otassets/ChatGPT_Image_Feb_4_2026_07_26_34_PM_qmbgys.png"
                  alt="3D Process Optimization"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Creative Direction */}
      <Reveal as="section" y={40} className={styles.directionSection}>
        <div className="container">
          <div className={styles.directionImage}>
            <img
              src="https://bloodnexusstudio.in/otassets/127ec944-4873-4ae2-9703-81d9f940ed5e.png"
              alt="Creative Direction Stools"
            />
          </div>
          <div className={styles.directionContent}>
            <p className={styles.directionSub}>Reach out for any questions or suggestions.</p>
            <h2 className={styles.directionTitle}>Creative Direction</h2>
          </div>
        </div>
      </Reveal>

      {/* Every Great Project Starts With a Vision */}
      <Reveal as="section" y={40} className={styles.visionSection}>
        <div className={`container ${styles.visionGrid}`}>
          <div className={styles.visionCopy}>
            <h2 className={styles.visionTitle}>
              Every Great<br />
              Project<br />
              Starts With<br />
              A Vision.
            </h2>
            <p className={styles.visionDesc}>
              Our 2D team lays the foundation, creating the look and feel that defines your game&apos;s identity.
            </p>
          </div>
          <div className={styles.visionMedia}>
            {/* Gaming HUD corner brackets */}
            <div className={`${styles.hudCorner} ${styles.topLeft}`} />
            <div className={`${styles.hudCorner} ${styles.topRight}`} />
            <div className={`${styles.hudCorner} ${styles.bottomLeft}`} />
            <div className={`${styles.hudCorner} ${styles.bottomRight}`} />
            <img
              src="https://bloodnexusstudio.in/otassets/cf460a22-16c2-42d7-9637-47890f63b1c3.png"
              alt="Vision Character"
            />
          </div>
        </div>
      </Reveal>

      {/* Lets Start Building (Form / CTA Redirect) */}
      <Reveal as="section" y={40} className={styles.buildSection}>
        <div className={`container ${styles.buildGrid}`}>
          <div className={styles.buildCopy}>
            <h2 className={styles.buildTitle}>
              Lets<br />
              Start Building
            </h2>
            <div className={styles.buildImage}>
              <img
                src="https://bloodnexusstudio.in/otassets/ChatGPT_Image_Feb_4_2026_07_26_02_PM_o8am1w.png"
                alt="Lets Start Building Illustration"
              />
            </div>
          </div>
          <div className={styles.buildAction}>
            <p className={styles.systemTag}>{"//"} CONNECTION PORTAL</p>
            <p className={styles.buildDesc}>
              Have an idea that needs AAA level execution? Let&apos;s team up to shape concept art, character models, environment art, and fluid animations for your next big title.
            </p>
            <Link href="/contact" className="pill pill--primary">
              ESTABLISH PORTAL CONNECTION
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
