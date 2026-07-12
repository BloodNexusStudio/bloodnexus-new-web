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
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    key: "archviz",
    title: "Archviz",
    copy: "Architectural visualization that turns blueprints into photoreal, real-time walkthroughs and rendered stills — powered by game-engine tech, letting clients explore a space long before it's built.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    key: "vr-3d",
    title: "VR / XR Experiences",
    copy: "Immersive VR and real-time 3D experiences for training, product visualization, and location-based entertainment — combining performant real-time pipelines with intuitive, hands-on interaction design.",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    key: "web-apps",
    title: "Web & Apps",
    copy: "High-performance web applications and custom digital platforms built for scale, security, and premium user experience, powered by modern React, Next.js, and real-time backend systems.",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    key: "3d-art",
    title: "3D Art & Animation",
    copy: "Comprehensive 3D asset creation, environment design, high-detail character modeling, and rigging. Crafting high-fidelity virtual assets optimized for real-time engines and cinematic rendering.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=900&q=80",
  },
];


