import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    localPatterns: [
      // Omit `search` so any query string (e.g. ?v= cache keys) is allowed.
      { pathname: "/images/**" },
      { pathname: "/logo/**" },
      { pathname: "/gallery/**" },
      { pathname: "/blog-covers/**" },
      { pathname: "/visiting-cards/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/cookies", destination: "/cookie-policy", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      {
        source: "/blogs/blog-:timestamp(\\d+)-:hash([a-f0-9]+).webp",
        destination: "/blog-covers/blog-:timestamp-:hash.webp",
        permanent: true,
      },
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
