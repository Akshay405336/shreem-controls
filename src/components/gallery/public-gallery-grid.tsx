"use client";

import { CmsUploadImage } from "@/components/media/cms-upload-image";
import { useState } from "react";
import { Images } from "lucide-react";
import { PublicGalleryLightbox } from "@/components/gallery/public-gallery-lightbox";
import type { GalleryImageDto } from "@/lib/gallery/types";

type PublicGalleryGridProps = {
  images: GalleryImageDto[];
};

export function PublicGalleryGrid({ images }: PublicGalleryGridProps) {
  const [activeImage, setActiveImage] = useState<GalleryImageDto | null>(null);

  if (images.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-[#DDECEB] bg-white/80 p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#009E98]/10 text-[#009E98]">
          <Images className="h-7 w-7" />
        </div>
        <h3 className="text-base font-semibold text-[#1a1f1f]">No Gallery Images Yet</h3>
        <p className="mt-2 text-xs leading-relaxed text-[#737B7A]">
          Published gallery photography will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveImage(image)}
            className="group overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white text-left shadow-[0_6px_24px_rgba(37,42,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,158,152,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009E98]"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-[#F4FBFA]">
              <CmsUploadImage
                src={image.imageUrl}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="border-t border-[#DDECEB]/70 px-5 py-4">
              <p className="truncate text-sm font-semibold text-[#252A2A] transition-colors group-hover:text-[#009E98]">
                {image.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      <PublicGalleryLightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
