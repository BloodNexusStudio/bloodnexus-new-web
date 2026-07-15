/** Global site config — nav, socials, contact. [CONTENT] = fill from live site / Anky's sheet. */

export const NAV_LINKS = [
  { label: "Games", href: "/games" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
] as const;

export const CAPSULE_LINKS = [
  { label: "Game Dev", href: "/" },
  { label: "Arch Viz", href: "/arch-viz" },
  { label: "VR", href: "/vr" },
  { label: "Web & Apps", href: "/web-apps" },
  { label: "3D Art", href: "/3d-art" },
] as const;



export const SOCIAL_LINKS = [
  // [CONTENT] confirm handles/URLs from current site
  { label: "Instagram", href: "https://instagram.com/bloodnexusstudio" },
  { label: "YouTube", href: "#" },
  { label: "ArtStation", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;

export const CONTACT = {
  email: "hello@bloodnexusstudio.in", // [CONTENT] real email
  phone: "", // [CONTENT] phone from current site
  location: "Thane, India",
};

export const SITE_NAME = "BloodNexus";
