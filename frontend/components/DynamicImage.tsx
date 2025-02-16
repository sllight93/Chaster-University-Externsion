// components/DynamicImage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface DynamicImageProps {
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function DynamicImage({
  name,
  alt,
  width,
  height,
  className,
}: DynamicImageProps) {
  // Entferne alle Zeichen, die keine Buchstaben oder Ziffern sind, und wandle in Kleinbuchstaben um.
  const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const extensions = ["avif", "webp", "png", "jpg", "jpeg"];
  const [extIndex, setExtIndex] = useState(0);
  const [src, setSrc] = useState(`/images/${sanitizedName}.${extensions[0]}`);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      const newIndex = extIndex + 1;
      setExtIndex(newIndex);
      setSrc(`/images/${sanitizedName}.${extensions[newIndex]}`);
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}
