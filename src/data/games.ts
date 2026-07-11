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
// each game's own key art / screenshots. Only 4 unique key-art photos exist so
// far, so they repeat across the placeholder catalog below.
const SHOTS = [
  "/games/shot-1.jpg",
  "/games/shot-2.jpg",
  "/games/shot-3.jpg",
  "/games/shot-4.jpg",
  "/games/shot-5.jpg",
  "/games/shot-6.jpg",
];
const KEY_ART = [
  "/games/game-1.jpg",
  "/games/game-2.jpg",
  "/games/game-3.jpg",
  "/games/game-4.jpg",
];

const overviewFor = (title: string) => [
  "Full details on the world, tone, and story are still being finalized — this section will be updated as production continues.",
  `More on the systems, cinematics, and craft behind ${title} will be added here closer to launch.`,
];

export const GAMES: Game[] = [
  {
    slug: "game-one",
    title: "Project One",
    hook: "A story-driven action title currently in production.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[0],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Action / Narrative",
    releaseWindow: "Q4 2026",
    overview: overviewFor("Project One"),
    screenshots: SHOTS,
    trailerYouTubeId: "", // [CONTENT] YouTube trailer id
  },
  {
    slug: "game-two",
    title: "Project Two",
    hook: "An immersive sim built for mobile and PC — coming soon.",
    status: "COMING SOON",
    keyArt: KEY_ART[1],
    engine: "Unity",
    platforms: ["Mobile", "PC"],
    genre: "Immersive Sim",
    releaseWindow: "2027",
    overview: overviewFor("Project Two"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-three",
    title: "Project Three",
    hook: "A VR experience now available to play.",
    status: "RELEASED",
    keyArt: KEY_ART[2],
    engine: "Unreal Engine 5",
    platforms: ["VR"],
    genre: "VR Experience",
    releaseWindow: "Out now",
    overview: overviewFor("Project Three"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-four",
    title: "Project Four",
    hook: "A real-time 3D title currently taking shape.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[3],
    engine: "Unreal Engine 5",
    platforms: ["PC"],
    genre: "Real-Time 3D",
    releaseWindow: "TBA",
    overview: overviewFor("Project Four"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-five",
    title: "Project Five",
    hook: "A physics-driven platformer built around momentum and light.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[0],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    genre: "Puzzle / Platformer",
    releaseWindow: "2027",
    overview: overviewFor("Project Five"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-six",
    title: "Project Six",
    hook: "A tactical strategy title set across a fractured world.",
    status: "COMING SOON",
    keyArt: KEY_ART[1],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Strategy",
    releaseWindow: "2027",
    overview: overviewFor("Project Six"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-seven",
    title: "Project Seven",
    hook: "A slow-burn horror experience built for atmosphere over jump scares.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[2],
    engine: "Unreal Engine 5",
    platforms: ["PC"],
    genre: "Horror",
    releaseWindow: "TBA",
    overview: overviewFor("Project Seven"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-eight",
    title: "Project Eight",
    hook: "An arcade racer built for quick, replayable runs.",
    status: "RELEASED",
    keyArt: KEY_ART[3],
    engine: "Unity",
    platforms: ["Mobile"],
    genre: "Racing",
    releaseWindow: "Out now",
    overview: overviewFor("Project Eight"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-nine",
    title: "Project Nine",
    hook: "A narrative RPG with systems-driven combat and real choice.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[0],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "RPG",
    releaseWindow: "2027",
    overview: overviewFor("Project Nine"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-ten",
    title: "Project Ten",
    hook: "A competitive multiplayer shooter currently in early testing.",
    status: "COMING SOON",
    keyArt: KEY_ART[1],
    engine: "Unreal Engine 5",
    platforms: ["PC"],
    genre: "Multiplayer Shooter",
    releaseWindow: "TBA",
    overview: overviewFor("Project Ten"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-eleven",
    title: "Project Eleven",
    hook: "A systems-heavy simulation built for depth over spectacle.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[2],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    genre: "Simulation",
    releaseWindow: "2027",
    overview: overviewFor("Project Eleven"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-twelve",
    title: "Project Twelve",
    hook: "A roguelike built around fast runs and permanent consequence.",
    status: "COMING SOON",
    keyArt: KEY_ART[3],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Roguelike",
    releaseWindow: "TBA",
    overview: overviewFor("Project Twelve"),
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
