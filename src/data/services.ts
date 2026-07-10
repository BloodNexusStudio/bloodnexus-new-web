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
    copy: "[CONTENT: 40–60 words on full-cycle game development across Unreal Engine and Unity — systems, gameplay, worlds built with narrative depth.]",
    image: "/placeholder/service-1.svg",
  },
  {
    key: "cinematics",
    title: "Cinematics",
    copy: "[CONTENT: 40–60 words on real-time and pre-rendered cinematics — trailers, story sequences, and in-engine cutscenes with a AAA finish.]",
    image: "/placeholder/service-2.svg",
  },
  {
    key: "vr-3d",
    title: "VR & Interactive 3D",
    copy: "[CONTENT: 40–60 words on immersive VR and real-time 3D experiences — training, product, and location-based interactive builds.]",
    image: "/placeholder/service-3.svg",
  },
  {
    key: "archviz",
    title: "Archviz",
    copy: "[CONTENT: 40–60 words on architectural visualization — photoreal real-time walkthroughs and rendered stills powered by game-engine tech.]",
    image: "/placeholder/service-4.svg",
  },
];
