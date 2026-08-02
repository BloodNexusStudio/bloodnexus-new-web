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

// Real 3D art portfolio images (Unique subset 18-33)
const SHOTS = [
  "/portfolio-assets/3dart-30.png",
  "/portfolio-assets/3dart-31.png",
  "/portfolio-assets/3dart-32.png",
  "/portfolio-assets/3dart-33.png",
];

const KEY_ART = [
  "/portfolio-assets/3dart-18-cropped.png",
  "/portfolio-assets/3dart-19.png",
  "/portfolio-assets/3dart-20.png",
  "/portfolio-assets/3dart-21.png",
  "/portfolio-assets/3dart-22.png",
  "/portfolio-assets/3dart-23.png",
  "/portfolio-assets/3dart-24.png",
  "/portfolio-assets/3dart-25.png",
  "/portfolio-assets/3dart-26.png",
  "/portfolio-assets/3dart-27.png",
  "/portfolio-assets/3dart-28.png",
  "/portfolio-assets/3dart-29.png",
];

const PREVIEW_CLIPS = [
  "/cloudinary-assets/videos/unr-1_sust4z.mp4",
  "/cloudinary-assets/videos/unr-2_tgjcan.mp4",
  "/cloudinary-assets/videos/unr-3_g2ppd9.mp4",
  "/cloudinary-assets/videos/unr-4_ix0128.mp4",
  "/cloudinary-assets/videos/unr-5_natehn.mp4",
  "/cloudinary-assets/videos/unr-6_wtmqou.mp4",
  "/cloudinary-assets/videos/unr-7_v2bcqi.mp4",
  "/cloudinary-assets/videos/unr-8_yos4i3.mp4",
  "/cloudinary-assets/videos/unr-9_bz2rlw.mp4",
];

const overviewFor = (title: string) => [
  "Full details on the world, tone, and story are still being finalized — this section will be updated as production continues.",
  `More on the systems, cinematics, and craft behind ${title} will be added here closer to launch.`,
];

export const GAMES: Game[] = [
  {
    slug: "game-one",
    title: "Robot Battle Zone",
    hook: "A story-driven sci-fi shooter set across war-torn mechanical zones.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[0],
    previewClip: PREVIEW_CLIPS[0],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Action / Sci-Fi",
    releaseWindow: "Q4 2026",
    overview: overviewFor("Trench Sentinel"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-two",
    title: "Classic Car Racing",
    hook: "An immersive open-world sim featuring realistic period vehicles.",
    status: "COMING SOON",
    keyArt: KEY_ART[1],
    previewClip: PREVIEW_CLIPS[1],
    engine: "Unity",
    platforms: ["Mobile", "PC"],
    genre: "Immersive Simulator",
    releaseWindow: "2027",
    overview: overviewFor("Classic Speed"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-three",
    title: "Arctic Survival",
    hook: "A survival VR experience set in an abandoned sub-zero arctic outpost.",
    status: "RELEASED",
    keyArt: KEY_ART[2],
    previewClip: PREVIEW_CLIPS[2],
    engine: "Unreal Engine 5",
    platforms: ["VR"],
    genre: "VR Survival",
    releaseWindow: "Out now",
    overview: overviewFor("Frostbound"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-four",
    title: "Cyberpunk Action",
    hook: "A tactical real-time cybernetic thriller navigating neon-lit city corridors.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[3],
    previewClip: PREVIEW_CLIPS[3],
    engine: "Unreal Engine 5",
    platforms: ["PC"],
    genre: "Tactical Action",
    releaseWindow: "TBA",
    overview: overviewFor("Neo-Warsaw 2099"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-five",
    title: "Multiplayer Shooter",
    hook: "A physics-driven multiplayer shooter built around tactical combat momentum.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[4],
    previewClip: PREVIEW_CLIPS[4],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    genre: "Tactical Shooter",
    releaseWindow: "2027",
    overview: overviewFor("Vanguard Sector"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-six",
    title: "Mech Strategy",
    hook: "A mecha assembly and defensive strategy title set inside high-tech hangars.",
    status: "COMING SOON",
    keyArt: KEY_ART[5],
    previewClip: PREVIEW_CLIPS[5],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Mecha Strategy",
    releaseWindow: "2027",
    overview: overviewFor("Iron Aegis"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-seven",
    title: "Space Horror",
    hook: "A slow-burn sci-fi horror experience navigating a failing reactor core.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[6],
    previewClip: PREVIEW_CLIPS[6],
    engine: "Unreal Engine 5",
    platforms: ["PC"],
    genre: "Sci-Fi Horror",
    releaseWindow: "TBA",
    overview: overviewFor("Singularity Reactor"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-eight",
    title: "Dungeon Explorer",
    hook: "A fast-paced dungeon explorer running through dark, ancient environments.",
    status: "RELEASED",
    keyArt: KEY_ART[7],
    previewClip: PREVIEW_CLIPS[7],
    engine: "Unity",
    platforms: ["Mobile"],
    genre: "Action Roguelike",
    releaseWindow: "Out now",
    overview: overviewFor("Relic Corridor"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-nine",
    title: "Fantasy RPG",
    hook: "A narrative RPG set in a highly stylized fantasy world with dynamic combat.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[8],
    previewClip: PREVIEW_CLIPS[8],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Fantasy RPG",
    releaseWindow: "2027",
    overview: overviewFor("Mythos Realm"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-ten",
    title: "Tactical Combat",
    hook: "A competitive multiplayer shooter currently in early combat sandbox testing.",
    status: "COMING SOON",
    keyArt: KEY_ART[9],
    previewClip: PREVIEW_CLIPS[0],
    engine: "Unreal Engine 5",
    platforms: ["PC"],
    genre: "Tactical Multiplayer",
    releaseWindow: "TBA",
    overview: overviewFor("Sector Echo"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-eleven",
    title: "Physics Simulator",
    hook: "A simulation built around complex energy grids and physics systems.",
    status: "IN DEVELOPMENT",
    keyArt: KEY_ART[10],
    previewClip: PREVIEW_CLIPS[1],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    genre: "Physics Simulation",
    releaseWindow: "2027",
    overview: overviewFor("Quantum Forge"),
    screenshots: SHOTS,
    trailerYouTubeId: "",
  },
  {
    slug: "game-twelve",
    title: "Sci-Fi Action",
    hook: "A sci-fi action roguelike built around high-risk hacking and extraction runs.",
    status: "COMING SOON",
    keyArt: KEY_ART[0],
    previewClip: PREVIEW_CLIPS[2],
    engine: "Unreal Engine 5",
    platforms: ["PC", "Console"],
    genre: "Sci-Fi Roguelike",
    releaseWindow: "TBA",
    overview: overviewFor("Rogue Core"),
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
