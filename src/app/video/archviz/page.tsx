import styles from "./archviz-viewer.module.css";

export const metadata = {
  title: "Arch Viz Showcase — BloodNexus Studio",
  description: "High-fidelity real-time architectural walkthrough by BloodNexus Studio.",
  robots: { index: false, follow: false },
};

const ARCHVIZ_VIDEO =
  "/cloudinary-assets/videos/ARCHVIZ_2_wgkmbk.mp4";

export default function ArchVizViewerPage() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <span className={styles.brand}>BLOODNEXUS.</span>
        <span className={styles.tag}>// ARCH VIZ — REAL-TIME WALKTHROUGH</span>
      </div>

      <div className={styles.playerWrap}>
        <div className={styles.shield} />
        <video
          className={styles.video}
          src={ARCHVIZ_VIDEO}
          autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          playsInline
          disablePictureInPicture
        />
      </div>

      <p className={styles.notice}>
        © {new Date().getFullYear()} BloodNexus Studio · All rights reserved ·
        Unauthorised reproduction or distribution is prohibited.
      </p>
    </div>
  );
}
