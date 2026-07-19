"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import RollLink from "@/components/motion/RollLink";
import { GAMES, type Game } from "@/data/games";
import styles from "./GamesCarousel.module.css";

const AUTOPLAY = 5000;

type Unit =
  | { type: "stack"; games: [Game, Game] }
  | { type: "large"; games: [Game] };

/** Alternating columns — two stacked cards, then one card spanning both rows,
 * repeating (apechain "APPS" grid pattern, structure only). */
function buildUnits(games: Game[]): Unit[] {
  const units: Unit[] = [];
  let i = 0;
  let stackNext = true;
  while (i < games.length) {
    if (stackNext && i + 1 < games.length) {
      units.push({ type: "stack", games: [games[i], games[i + 1]] });
      i += 2;
    } else {
      units.push({ type: "large", games: [games[i]] });
      i += 1;
    }
    stackNext = !stackNext;
  }
  return units;
}

function Tile({ game }: { game: Game }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className={styles.tile}
    >
      <img
        src={game.keyArt}
        alt={`${game.title} key art`}
        loading="lazy"
        className={styles.tileArt}
      />
      <div className={styles.tileScrim} />
      <div className={styles.tileBody}>
        {game.genre && <span className={styles.tileTag}>{game.genre}</span>}
        <h3 className={styles.tileTitle}>{game.title}</h3>
        <p className={styles.tileHook}>{game.hook}</p>
      </div>
    </Link>
  );
}

/**
 * All Games carousel (handoff §6.2 / §2 Embla; layout per apechain's "APPS"
 * grid — structure only, no artwork/text reused): full-bleed drag carousel,
 * free-scroll + snap, auto-advance 5s, pause on hover. Columns alternate
 * between two stacked cards and one card spanning both rows.
 */
export default function GamesCarousel() {
  const units = useMemo(() => buildUnits(GAMES), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      if (!pausedRef.current) emblaApi.scrollNext();
    }, AUTOPLAY);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  const onEnter = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const onLeave = useCallback(() => {
    pausedRef.current = false;
  }, []);

  return (
    <section className={styles.section}>
      <span className={styles.bgWord} aria-hidden="true">
        Games
      </span>

      <div className={`container ${styles.head}`}>
        <div>
          <p className="label">Our Work</p>
          <h2 className={styles.heading}>All Games</h2>
        </div>
        <RollLink href="/games" accent className={styles.seeAll}>
          See All Games
        </RollLink>
      </div>

      <div
        className={styles.viewport}
        ref={emblaRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className={styles.track}>
          {units.map((unit, i) =>
            unit.type === "large" ? (
              <div className={styles.slideLarge} key={`u${i}`}>
                <Tile game={unit.games[0]} />
              </div>
            ) : (
              <div className={styles.slideStack} key={`u${i}`}>
                <Tile game={unit.games[0]} />
                <Tile game={unit.games[1]} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
