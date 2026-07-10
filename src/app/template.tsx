import styles from "./template.module.css";

/**
 * Page-transition wipe (§8.4). template.tsx remounts on every navigation, so the
 * cover panel replays each time: it starts covering the viewport, then wipes up
 * and off (a thin cream edge trailing) to reveal the new page. The new hero then
 * plays its own load animation. Disabled under prefers-reduced-motion.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.wipe} aria-hidden="true" />
      {children}
    </>
  );
}
