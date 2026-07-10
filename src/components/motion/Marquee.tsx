import styles from "./Marquee.module.css";

type MarqueeProps = {
  items: string[];
  /** seconds per loop (default 22s per §8.2) */
  speed?: number;
  separator?: string;
};

/**
 * Marquee ticker (§8.2) — track content duplicated 2× so the loop is seamless
 * (translateX(-50%) lands exactly on the copy). Pauses on hover.
 */
export default function Marquee({
  items,
  speed = 22,
  separator = "✦",
}: MarqueeProps) {
  const line = (
    <>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {item}
          <span aria-hidden="true" className={styles.sep}>
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className={styles.marquee}>
      <div
        className={styles.track}
        style={{ animationDuration: `${speed}s` }}
      >
        {line}
        {/* duplicate, hidden from AT so keywords are announced once */}
        <span aria-hidden="true" className={styles.dup}>
          {line}
        </span>
      </div>
    </div>
  );
}
