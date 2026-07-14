/**
 * Cloudinary utilities — BloodNexus Studio
 *
 * withWatermark(): Reserved for pixel-level watermarking via Cloudinary's
 * transformation API. Text overlays require a paid Cloudinary plan.
 * Currently returns the URL unchanged — CSS + shield protections are active.
 *
 * To enable watermarks when the plan supports it, replace the function body with:
 *   const WATERMARK =
 *     "l_text:Arial_22_bold:BloodNexus_Studio,co_white,o_35" +
 *     "/fl_layer_apply,g_south_east,x_14,y_14";
 *   return url.replace("/upload/", `/upload/${WATERMARK}/`);
 */
export function withWatermark(url: string): string {
  // No-op: text overlay transformations require Cloudinary paid plan.
  // Active protections: CSS pointer-events:none, right-click shields,
  // disablePictureInPicture, and controlsList="nodownload" on video players.
  return url;
}
