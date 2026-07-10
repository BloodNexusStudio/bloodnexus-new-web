"use client";

import { useMemo, useState } from "react";
import GameCard from "@/components/GameCard/GameCard";
import { GAMES } from "@/data/games";
import styles from "./GamesGrid.module.css";

// §7 filter pills — derived from platforms. [CONTENT] confirm real categories.
const FILTERS = ["All", "PC", "Console", "Mobile", "VR"] as const;

export default function GamesGrid() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");

  const shown = useMemo(() => {
    if (active === "All") return GAMES;
    return GAMES.filter((g) => g.platforms?.includes(active));
  }, [active]);

  return (
    <>
      <div className={styles.filters} role="tablist" aria-label="Filter games">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            className={`${styles.filter} ${active === f ? styles.active : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className={styles.empty}>No games in this category yet.</p>
      ) : (
        <div className={styles.grid}>
          {shown.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      )}
    </>
  );
}
