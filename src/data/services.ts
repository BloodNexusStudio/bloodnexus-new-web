/** Services spotlight bands (§6.3). 3–4 blocks × 40–60 words. [CONTENT] from current site. */

export type Service = {
  key: string;
  title: string;
  copy: string;
  image: string; // large 3D render / cinematic frame
};

export const SERVICES: Service[] = [
  {
    key: "game-dev",
    title: "Game Development",
    copy: "Full-cycle game development across Unreal Engine and Unity — from early prototyping through ship, covering gameplay systems, level design, and technical implementation, built around worlds with real narrative depth.",
    image: "/placeholder/service-1.svg",
  },
  {
    key: "cinematics",
    title: "Cinematics",
    copy: "Real-time and pre-rendered cinematics — trailers, story sequences, and in-engine cutscenes with a AAA finish, built to work seamlessly inside the games and experiences they belong to.",
    image: "/placeholder/service-2.svg",
  },
  {
    key: "vr-3d",
    title: "VR & Interactive 3D",
    copy: "Immersive VR and real-time 3D experiences for training, product visualization, and location-based entertainment — combining performant real-time pipelines with intuitive, hands-on interaction design.",
    image: "/placeholder/service-3.svg",
  },
  {
    key: "archviz",
    title: "Archviz",
    copy: "Architectural visualization that turns blueprints into photoreal, real-time walkthroughs and rendered stills — powered by game-engine tech, letting clients explore a space long before it's built.",
    image: "/placeholder/service-4.svg",
  },
];
