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
    image: "/cloudinary-assets/images/new-1_q5vqzv.png",
  },
  {
    key: "archviz",
    title: "Archviz",
    copy: "Architectural visualization that turns blueprints into photoreal, real-time walkthroughs and rendered stills — powered by game-engine tech, letting clients explore a space long before it's built.",
    image: "/cloudinary-assets/images/archviz-1_hsyoti.jpg",
  },
  {
    key: "vr-3d",
    title: "VR / XR Experiences",
    copy: "Immersive VR and real-time 3D experiences for training, product visualization, and location-based entertainment — combining performant real-time pipelines with intuitive, hands-on interaction design.",
    image: "/vr/vr_hero_bg.png",
  },
  {
    key: "web-apps",
    title: "Web & Apps",
    copy: "High-performance web applications and custom digital platforms built for scale, security, and premium user experience, powered by modern React, Next.js, and real-time backend systems.",
    image: "/web-apps/odyssey_travels.png",
  },
  {
    key: "3d-art",
    title: "3D Art & Animation",
    copy: "Comprehensive 3D asset creation, environment design, high-detail character modeling, and rigging. Crafting high-fidelity virtual assets optimized for real-time engines and cinematic rendering.",
    image: "/cloudinary-assets/images/3dart-10_ziywet.png",
  },
];


