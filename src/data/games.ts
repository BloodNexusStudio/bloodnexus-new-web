/**
 * Games / projects (§6.2, §7 detail). Placeholder records — [CONTENT] one per game
 * from the current site. Editable here without a deploy; migrate to Sanity/MDX later.
 * Key art source min 1216×672 (16:9).
 */

export type GameStatus = "IN DEVELOPMENT" | "RELEASED" | "COMING SOON";

export type Game = {
  slug: string;
  title: string;
  hook: string; // one-line hook
  status: GameStatus;
  keyArt: string; // /public path, 16:9
  previewClip?: string; // optional muted looping clip for hover crossfade
  engine?: string;
  platforms?: string[];
  genre?: string;
  // --- detail page (§7 /games/[slug]) ---
  releaseWindow?: string; // e.g. "Q4 2026"
  overview?: string[]; // paragraphs of body copy
  screenshots?: string[]; // /public paths for the masonry grid
  trailerYouTubeId?: string; // embedded trailer id
};

// Real imagery from Unsplash (Unsplash License — free to use). [CONTENT] swap for
// each game's own key art / screenshots.
const SHOTS = [
  "/games/shot-1.jpg",
  "/games/shot-2.jpg",
  "/games/shot-3.jpg",
  "/games/shot-4.jpg",
  "/games/shot-5.jpg",
  "/games/shot-6.jpg",
];

export const GAMES: Game[] = [
  {
    slug: "game-one",
    title: "[CONTENT: Game Title]",
    hook: "[CONTENT: one-line hook that sells the game]",
    status: "IN DEVELOPMENT",
    keyArt: "/games/game-1.jpg",
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Action / Narrative",
    releaseWindow: "Q4 2026",
    overview: [
      "[CONTENT: overview paragraph — set the world, tone, and hook of the game in 2–3 sentences.]",
      "[CONTENT: second paragraph — what makes the systems, cinematics, or worlds distinctive; the studio craft behind it.]",
    ],
    screenshots: SHOTS,
    trailerYouTubeId: "", // [CONTENT] YouTube trailer id
  },
  {
    slug: "game-two",
    title: "[CONTENT: Game Title]",
    hook: "[CONTENT: one-line hook that sells the game]",
    status: "COMING SOON",
    keyArt: "/games/game-2.jpg",
    engine: "Unity",
    platforms: ["Mobile", "PC"],
    genre: "Immersive Sim",
    releaseWindow: "2027",
    overview: [
      "[CONTENT: overview paragraph — set the world, tone, and hook of the game in 2–3 sentences.]",
      "[CONTENT: second paragraph — what makes the systems, cinematics, or worlds distinctive; the studio craft behind it.]",
    ],
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-three",
    title: "[CONTENT: Game Title]",
    hook: "[CONTENT: one-line hook that sells the game]",
    status: "RELEASED",
    keyArt: "/games/game-3.jpg",
    engine: "Unreal Engine 5",
    platforms: ["VR"],
    genre: "VR Experience",
    releaseWindow: "Out now",
    overview: [
      "[CONTENT: overview paragraph — set the world, tone, and hook of the game in 2–3 sentences.]",
      "[CONTENT: second paragraph — what makes the systems, cinematics, or worlds distinctive; the studio craft behind it.]",
    ],
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-four",
    title: "[CONTENT: Game Title]",
    hook: "[CONTENT: one-line hook that sells the game]",
    status: "IN DEVELOPMENT",
    keyArt: "/games/game-4.jpg",
    engine: "Unreal Engine 5",
    platforms: ["PC"],
    genre: "Real-Time 3D",
    releaseWindow: "TBA",
    overview: [
      "[CONTENT: overview paragraph — set the world, tone, and hook of the game in 2–3 sentences.]",
      "[CONTENT: second paragraph — what makes the systems, cinematics, or worlds distinctive; the studio craft behind it.]",
    ],
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

/** Next game in the list, wrapping around — powers the "NEXT GAME →" teaser (§7). */
export function getNextGame(slug: string): Game {
  const i = GAMES.findIndex((g) => g.slug === slug);
  return GAMES[(i + 1) % GAMES.length];
}
