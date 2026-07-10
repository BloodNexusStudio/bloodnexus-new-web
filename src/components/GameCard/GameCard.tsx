import Link from "next/link";
import type { Game } from "@/data/games";
import styles from "./GameCard.module.css";

/**
 * Game card (§6.2) — 16:9 key art, status pill, title, hook, VIEW GAME CTA.
 * Hover (§8.5): art scales 1.06, card lifts -4px, red glow shadow.
 * Reused by the home carousel and the /games grid.
 */
export default function GameCard({ game }: { game: Game }) {
  return (
    <article className={styles.card}>
      <Link href={`/games/${game.slug}`} className={styles.media}>
        <span className={styles.status}>{game.status}</span>
        {/* [CONTENT] real key art; optional preview clip crossfades in on hover */}
        <img
          src={game.keyArt}
          alt={`${game.title} key art`}
          loading="lazy"
          className={styles.art}
        />
      </Link>

      <div className={styles.body}>
        {game.genre && <span className={styles.category}>{game.genre}</span>}
        <h3 className={styles.title}>{game.title}</h3>
        <p className={styles.hook}>{game.hook}</p>
        <Link href={`/games/${game.slug}`} className="pill pill--solid">
          View Game
        </Link>
      </div>
    </article>
  );
}
