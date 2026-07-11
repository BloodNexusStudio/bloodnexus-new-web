import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GAMES, getGame, getNextGame } from "@/data/games";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/motion/Reveal";
import Screenshots from "@/components/games/Screenshots";
import styles from "./detail.module.css";

// Prerender every game page (static → crawlable, §10 SEO)
export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game Not Found — BloodNexus Studio" };
  return {
    title: `${game.title} — BloodNexus Studio`,
    description: game.hook,
  };
}

export default async function GameDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  const next = getNextGame(slug);

  const infoRows = [
    game.engine && { label: "Engine", value: game.engine },
    game.genre && { label: "Genre", value: game.genre },
    game.platforms && {
      label: "Platforms",
      value: game.platforms.join(", "),
    },
    game.releaseWindow && { label: "Release", value: game.releaseWindow },
  ].filter(Boolean) as { label: string; value: string }[];

  // VideoGame structured data (§10)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.hook,
    gamePlatform: game.platforms,
    genre: game.genre,
    publisher: { "@type": "Organization", name: "BloodNexus Studio" },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <header className={styles.hero}>
        <img className={styles.heroArt} src={game.keyArt} alt="" aria-hidden />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.pills}>
            <span className={styles.status}>{game.status}</span>
            {game.platforms?.map((p) => (
              <span key={p} className={styles.platform}>
                {p}
              </span>
            ))}
          </div>
          <MaskText as="h1" className={styles.title} text={game.title} />
          <p className={styles.hook}>{game.hook}</p>
        </div>
      </header>

      {/* Info bar */}
      <div className={styles.infoBarWrap}>
        <Reveal as="div" staggerChildren className={`container ${styles.infoBar}`}>
          {infoRows.map((row) => (
            <div key={row.label} className={styles.info}>
              <span className="label">{row.label}</span>
              <span className={styles.infoValue}>{row.value}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Body */}
      <div className={`container ${styles.body}`}>
        <Reveal as="div" className={styles.overview}>
          <p className="label">Overview</p>
          {game.overview?.map((p, i) => (
            <p key={i} className={styles.para}>
              {p}
            </p>
          ))}
        </Reveal>

        {game.screenshots && game.screenshots.length > 0 && (
          <section className={styles.media}>
            <h2 className={styles.mediaHeading}>Media</h2>
            <Screenshots shots={game.screenshots} />
          </section>
        )}

        {game.trailerYouTubeId ? (
          <section className={styles.trailer}>
            <div className={styles.trailerFrame}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${game.trailerYouTubeId}`}
                title={`${game.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        ) : (
          <section className={styles.trailer}>
            <div className={`${styles.trailerFrame} ${styles.trailerEmpty}`}>
              <span className="label">Trailer coming soon</span>
            </div>
          </section>
        )}
      </div>

      {/* Next game teaser */}
      <Link href={`/games/${next.slug}`} className={styles.nextGame}>
        <img className={styles.nextArt} src={next.keyArt} alt="" aria-hidden />
        <div className={styles.nextOverlay} aria-hidden />
        <div className={`container ${styles.nextInner}`}>
          <span className="label">Next Game</span>
          <span className={styles.nextTitle}>
            {next.title} <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
