import React from "react";
import Image, { ImageProps } from "next/image";
import { IMAGES, VIDEOS, ImageKey, VideoKey } from "@/lib/assets";

type AssetProps = {
  type: "image" | "video";
  id: string; // Accepts ImageKey, VideoKey, or raw local public path
  className?: string;
  alt?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
};

/**
 * Responsive Asset routing component. Automatically resolves logical asset keys 
 * to their verified local public directories or falls back to raw path mapping.
 */
export default function Asset({
  type,
  id,
  className,
  alt = "BloodNexus Asset",
  fill = false,
  sizes,
  priority = false,
  videoProps,
}: AssetProps) {
  // Resolve image source
  if (type === "image") {
    const src = id in IMAGES ? IMAGES[id as ImageKey] : id;
    
    // If using fill layout (common in our cards)
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
        />
      );
    }

    // Default inline layout
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? undefined : "lazy"}
      />
    );
  }

  // Resolve video source
  const src = id in VIDEOS ? VIDEOS[id as VideoKey] : id;
  return (
    <video
      src={src}
      className={className}
      autoPlay={videoProps?.autoPlay ?? true}
      muted={videoProps?.muted ?? true}
      loop={videoProps?.loop ?? true}
      playsInline={videoProps?.playsInline ?? true}
      controls={videoProps?.controls}
      {...videoProps}
    />
  );
}
