import styles from "./warsaw-viewer.module.css";

export const metadata = {
  title: "Warsaw — BloodNexus Studio",
  description: "Cinematic animation reel by BloodNexus Studio.",
  robots: { index: false, follow: false }, // don't index the viewer page
};

const WARSAW_VIDEO =
  "https://res.cloudinary.com/oglqwvqq/video/upload/v1784016507/WARSAW_z4miiu.mp4";

export default function WarsawViewerPage() {
  return (
    <div className={styles.page}>
      {/* Branding bar */}
      <div className={styles.topBar}>
        <span className={styles.brand}>BLOODNEXUS.</span>
        <span className={styles.tag}>// WARSAW — CINEMATIC REEL</span>
      </div>

      {/* Protected video player */}
      <div className={styles.playerWrap}>
        {/* Shield overlay — sits on top, blocks right-click "Save video as" */}
        <div className={styles.shield} />

        <video
          className={styles.video}
          src={WARSAW_VIDEO}
          autoPlay
          controls
          /* removes the download button from native controls */
          controlsList="nodownload nofullscreen noremoteplayback"
          playsInline
          disablePictureInPicture
        />
      </div>

      {/* Footer note */}
      <p className={styles.notice}>
        © {new Date().getFullYear()} BloodNexus Studio · All rights reserved ·
        Unauthorised reproduction or distribution is prohibited.
      </p>
    </div>
  );
}
