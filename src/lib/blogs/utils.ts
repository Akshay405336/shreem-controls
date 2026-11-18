/**
 * Formats byte size into human readable string (e.g. 245 KB, 1.2 MB).
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Formats a Date or ISO string into a clean readable date string (e.g. "Nov 18, 2026").
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/**
 * Estimates reading time in minutes based on 200 words per minute.
 */
export function estimateReadingTime(content: string): string {
  if (!content) return "1 min read";
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
