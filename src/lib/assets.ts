/**
 * BloodNexus Asset Router Utility
 * Centralizes all local media imports and routing to avoid hardcoding relative/external paths in components.
 */

export const IMAGES = {
  // New High-Fidelity Portfolio Assets
  bible: "/portfolio-assets/bible.jpg",
  leaderCam: "/portfolio-assets/leader_cam.png",
  fly1: "/portfolio-assets/fly_1.png",
  zombieVarek: "/portfolio-assets/zombie_varek.png",
  fly3: "/portfolio-assets/fly_3.png",

  // Homepage / Web-Apps Mockups
  odysseyTravels: "/web-apps/odyssey_travels.png",
  fintechDashboard: "/web-apps/fintech_dashboard.png",
  auraStudios: "/web-apps/aura_studios.png",
  socialConnect: "/web-apps/social_connect.png",
  luminaVision: "/web-apps/lumina_vision.png",
  websitesCapability: "/web-apps/websites.png",
  mobileAppsCapability: "/web-apps/mobile_apps.png",
  ecommerceCapability: "/web-apps/ecommerce.png",
  enterpriseCapability: "/web-apps/ecommerce.png", // shared mockup

  // VR Mockups & Assets
  vrHeroBg: "/vr/vr_hero_bg.png",
  vrSolutions: "/vr/vr_solutions.png",
  vrGallery1: "/vr/gallery_1.png",
  vrGallery2: "/vr/gallery_2.png",

  // Cloudinary Migrated Images (Local)
  archviz1: "/cloudinary-assets/images/archviz-1_hsyoti.jpg",
  archviz2: "/cloudinary-assets/images/archviz-2_mrptom.jpg",
  archviz3: "/cloudinary-assets/images/archviz-3_mf7hgz.jpg",
  archviz4: "/cloudinary-assets/images/archviz-4_pjsj9p.jpg",
  archviz5: "/cloudinary-assets/images/archviz-5_ncybew.jpg",
  archviz6: "/cloudinary-assets/images/archviz-6_zzem07.jpg",
  archviz7: "/cloudinary-assets/images/archviz-7_gewhjs.jpg",
  archviz8: "/cloudinary-assets/images/archviz-8_wqhnsu.jpg",

  threedArt2: "/cloudinary-assets/images/3dart-2_ke6lp1.jpg",
  threedArt6: "/cloudinary-assets/images/3dart-6_lgcx5k.png",
  threedArt7: "/cloudinary-assets/images/3dart-7_1_ri14o4.png",
  threedArt9: "/cloudinary-assets/images/3dart-9_op3xza.png",
  threedArt10: "/cloudinary-assets/images/3dart-10_ziywet.png",
  threedArt11: "/cloudinary-assets/images/3dart-11_uceyn2.png",
  threedArt12: "/cloudinary-assets/images/3dart-12_1_uhpc9i.png",
  threedArt13: "/cloudinary-assets/images/3dart-13_obplkd.png",
  threedArt16: "/cloudinary-assets/images/3dart-16_nrx6d1.png",
  threedArt17: "/cloudinary-assets/images/3dart-17_jeiim7.jpg",
  threedArt18: "/cloudinary-assets/images/3dart-18_ubrxbt.png",
  threedArt19: "/cloudinary-assets/images/3dart-19_1_zsz5ri.png",
  threedArt20: "/cloudinary-assets/images/3dart-20_1_uifghl.png",
  threedArt21: "/cloudinary-assets/images/3dart-21_n8kdvh.jpg",
  threedArt22: "/cloudinary-assets/images/3dart-22_1_uetcav.png",
  threedArt23: "/cloudinary-assets/images/3dart-23_1_a0fdxs.png",

  gameKey1: "/cloudinary-assets/images/new-1_q5vqzv.png",
  gameKey2: "/cloudinary-assets/images/new-2_nusgoh.png",
  gameKey3: "/cloudinary-assets/images/new-3_toofsl.png",
  gameKey4: "/cloudinary-assets/images/new-4_mtnbv2.png",
  gameKey5: "/cloudinary-assets/images/new-5_vg2rfe.png",
  gameKey6: "/cloudinary-assets/images/new-6_1_pmlcur.png",
  gameKey7: "/cloudinary-assets/images/new-7_1_nj1vc1.png",
  gameKey8: "/cloudinary-assets/images/new-8_1_q6akdj.png",
} as const;

export const VIDEOS = {
  archvizVideo9: "/cloudinary-assets/videos/archviz-9_jkk6cl.mp4",
  threedArtVideo1: "/cloudinary-assets/videos/3dart-1_1_vaugim.mp4",
  warsawVideo: "/cloudinary-assets/videos/WARSAW_z4miiu.mp4",
  clothSimulation: "/cloudinary-assets/videos/All_three_Cloth_Simulated_hzr7ek.mp4",
  archvizVideo2: "/cloudinary-assets/videos/ARCHVIZ_2_wgkmbk.mp4",

  unr1: "/cloudinary-assets/videos/unr-1_sust4z.mp4",
  unr2: "/cloudinary-assets/videos/unr-2_tgjcan.mp4",
  unr3: "/cloudinary-assets/videos/unr-3_g2ppd9.mp4",
  unr4: "/cloudinary-assets/videos/unr-4_ix0128.mp4",
  unr5: "/cloudinary-assets/videos/unr-5_natehn.mp4",
  unr6: "/cloudinary-assets/videos/unr-6_wtmqou.mp4",
  unr7: "/cloudinary-assets/videos/unr-7_v2bcqi.mp4",
  unr8: "/cloudinary-assets/videos/unr-8_yos4i3.mp4",
  unr9: "/cloudinary-assets/videos/unr-9_bz2rlw.mp4",
} as const;

export type ImageKey = keyof typeof IMAGES;
export type VideoKey = keyof typeof VIDEOS;

/**
 * Returns the resolved path for a given image asset key.
 */
export function getImagePath(key: ImageKey): string {
  return IMAGES[key];
}

/**
 * Returns the resolved path for a given video asset key.
 */
export function getVideoPath(key: VideoKey): string {
  return VIDEOS[key];
}
