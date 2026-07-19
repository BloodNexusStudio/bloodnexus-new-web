/** Global site config — nav, socials, contact. [CONTENT] = fill from live site / Anky's sheet. */

export const NAV_LINKS = [
  { label: "Games", href: "/games" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
] as const;

export const CAPSULE_LINKS = [
  { label: "Arch Viz", href: "/arch-viz" },
  { label: "VR", href: "/vr" },
  { label: "Web & Apps", href: "/web-apps" },
  { label: "3D Art", href: "/3d-art" },
  { label: "Blog", href: "/blog/3d-game-art-outsourcing-costs-studios" },
] as const;



export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/bloodnexusstudio?igsh=MTlxY3hzMTcwbW1meQ==" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bloodnexusstudio/" },
] as const;

export const CONTACT = {
  email: "hello@bloodnexusstudio.in", // [CONTENT] real email
  phone: "", // [CONTENT] phone from current site
  location: "Thane, India",
};

export const SITE_NAME = "BloodNexus";
