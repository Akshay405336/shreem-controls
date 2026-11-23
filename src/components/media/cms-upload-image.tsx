import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

const CMS_UPLOAD_PREFIXES = ["/gallery/", "/blog-covers/", "/visiting-cards/"] as const;

export function isCmsUploadImagePath(src: string): boolean {
  if (!src.startsWith("/")) return false;
  return CMS_UPLOAD_PREFIXES.some((prefix) => src.startsWith(prefix));
}

type CmsUploadImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  /** When true, use object-fit from className (default cover for fill layouts). */
  fill?: boolean;
};

/**
 * Runtime CMS files under `public/` are served directly by Nginx/Next static files.
 * Avoid `/_next/image` for these paths so production does not 404 on new uploads.
 */
export function CmsUploadImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
  loading,
  ...rest
}: CmsUploadImageProps) {
  if (isCmsUploadImagePath(src)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full object-cover", className)}
          loading={priority ? "eager" : loading ?? "lazy"}
          decoding="async"
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? "eager" : loading ?? "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
      {...rest}
    />
  );
}