/**
 * Studio team + tools (§7 /about). Placeholder — [CONTENT] real names, roles, photos.
 * Handoff names the founders (Yogesh, Akshay, Vedant) + team. Photos square 800×800.
 */

export type Member = {
  slug: string;
  name: string;
  role: string;
  photo: string; // square /public path
};

export const TEAM: Member[] = [
  {
    slug: "yogesh",
    name: "Yogesh", // [CONTENT] full name
    role: "[CONTENT: Founder / role]",
    photo: "/placeholder/team-1.svg",
  },
  {
    slug: "akshay",
    name: "Akshay", // [CONTENT] full name
    role: "[CONTENT: Founder / role]",
    photo: "/placeholder/team-2.svg",
  },
  {
    slug: "vedant",
    name: "Vedant", // [CONTENT] full name
    role: "[CONTENT: Founder / role]",
    photo: "/placeholder/team-3.svg",
  },
  {
    slug: "team-member-4",
    name: "[CONTENT: Name]",
    role: "[CONTENT: Role]",
    photo: "/placeholder/team-4.svg",
  },
];

// Tools marquee — logos only if licensing permits, otherwise text (handoff §7).
export const TOOLS = [
  "Unreal Engine",
  "Unity",
  "Blender",
  "Houdini",
  "Substance",
  "Maya",
  "ZBrush",
  "Nuke",
];

// Studio story paragraphs — [CONTENT] from current site / Anky's sheet.
export const STUDIO_STORY = [
  "[CONTENT: studio story paragraph 1 — who BloodNexus is, where it started, and what drives the work: immersive games with narrative depth, built in Thane.]",
  "[CONTENT: studio story paragraph 2 — the craft and pipeline: Unreal Engine and Unity, cinematics, systems, worlds, plus VR and real-time 3D.]",
];
