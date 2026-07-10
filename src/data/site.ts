/** Global site config — nav, socials, contact. [CONTENT] = fill from live site / Anky's sheet. */

export const NAV_LINKS = [
  { label: "Games", href: "/games" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
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
