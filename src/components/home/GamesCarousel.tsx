"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
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
  // Start with a large card (Tall) instead of a stack
  let stackNext = false;
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

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionArrow}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

function Tile({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.slug}`} className={styles.tile}>
      <Image
        src={game.keyArt}
        alt={`${game.title} key art`}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className={styles.tileArt}
      />
      <div className={styles.tileScrim} />
      
      {/* Top Left Tag */}
      {game.genre && (
        <div className={styles.tileTagWrapper}>
          <span className={styles.tileTag}>{game.genre}</span>
        </div>
      )}

      {/* Bottom Content */}
      <div className={styles.tileBody}>
        <h3 className={styles.tileTitle}>{game.title}</h3>
        <p className={styles.tileHook}>{game.hook}</p>
        
        <div className={styles.exploreBtn}>
          EXPLORE GAME <ArrowRightIcon />
        </div>
      </div>

      <div className={styles.bottomGlow} />
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
      {/* Decorative Grid Dots */}
      <div className={styles.decoGridLeft} />
      <div className={styles.decoGridRight} />

      <div className={`container ${styles.head}`}>
        <div className={styles.headLeft}>
          <div className={styles.topLabel}>
            <span className={styles.decoLine} /> OUR WORK
          </div>
          <h2 className={styles.heading}>
            ALL <span className={styles.headingRed}>GAMES</span>
          </h2>
          <p className={styles.subhead}>
            Explore immersive worlds crafted with<br />
            cutting-edge technology and passion.
          </p>
        </div>
        <Link href="/games" className={styles.seeAllBtn}>
          SEE ALL GAMES <ArrowRightIcon />
        </Link>
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
