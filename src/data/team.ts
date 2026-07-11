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
    role: "Founder",
    photo: "/placeholder/team-1.svg",
  },
  {
    slug: "akshay",
    name: "Akshay", // [CONTENT] full name
    role: "Founder",
    photo: "/placeholder/team-2.svg",
  },
  {
    slug: "vedant",
    name: "Vedant", // [CONTENT] full name
    role: "Founder",
    photo: "/placeholder/team-3.svg",
  },
  {
    slug: "team-member-4",
    name: "Team Member", // [CONTENT] full name
    role: "Contributor",
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
  "BloodNexus Studio is a game development studio based in Thane, building immersive games with narrative depth. What started as a small team chasing a shared obsession with worlds worth getting lost in has grown into a full-cycle production house.",
  "Our pipeline spans Unreal Engine and Unity — covering gameplay systems, cinematics, and real-time worlds, alongside VR and interactive 3D work for partners outside games. Every project is built by the same core team, start to ship.",
];
