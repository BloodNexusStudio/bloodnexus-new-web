/**
 * Open roles (§6.5 / §7 careers). Placeholder — [CONTENT] pull live roles.
 * Currently advertised: UI/UX Designer (remote), Junior 3D Artist Intern.
 * Editable here (or migrate to CMS/MDX) so the team adds roles without a deploy.
 */

export type Role = {
  slug: string;
  title: string;
  department: string;
  type: string; // Full-time / Internship / Contract
  location: string;
  applyHref: string;
};

export const ROLES: Role[] = [
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    applyHref: "mailto:careers@bloodnexusstudio.in", // [CONTENT] real apply link
  },
  {
    slug: "junior-3d-artist-intern",
    title: "Junior 3D Artist Intern",
    department: "Art",
    type: "Internship",
    location: "Thane / Hybrid",
    applyHref: "mailto:careers@bloodnexusstudio.in", // [CONTENT] real apply link
  },
];
