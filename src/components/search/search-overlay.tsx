"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useSearch } from "@/components/providers/search-provider";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { resources } from "@/data/resources";

const staticPages = [
  { title: "Technology", href: "/technology" },
  { title: "Projects", href: "/projects" },
  { title: "About Shreem Controls", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    setQuery("");
    closeSearch();
  }, [closeSearch]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const productResults = products
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
      .map((item) => ({
        title: item.name,
        href: `/products/${item.slug}`,
        type: "Product",
      }));

    const solutionResults = solutions
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q),
      )
      .map((item) => ({
        title: item.name,
        href: `/solutions/${item.slug}`,
        type: "Solution",
      }));

    const resourceResults = resources
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q),
      )
      .map((item) => ({
        title: item.title,
        href: `/resources/${item.slug}`,
        type: "Resource",
      }));

    const pageResults = staticPages
      .filter((item) => item.title.toLowerCase().includes(q))
      .map((item) => ({ ...item, type: "Page" }));

    return [...productResults, ...solutionResults, ...resourceResults, ...pageResults].slice(
      0,
      12,
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] bg-[#252A2A]/45 backdrop-blur-sm"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto flex min-h-full max-w-3xl flex-col px-5 py-8 sm:py-16">
            <motion.div
              className="rounded-2xl border border-[#DDECEB] bg-white p-5 shadow-2xl sm:p-6"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            >
              <div className="flex items-center gap-3 border-b border-[#eee5d8] pb-4">
                <Search className="size-5 text-[#009E98]" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products, solutions, resources…"
                  className="w-full bg-transparent text-base text-[#252A2A] outline-none placeholder:text-[#999088]"
                />
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close search"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-[#DDECEB]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-4 max-h-[50vh] overflow-y-auto">
                {query && results.length === 0 && (
                  <p className="py-8 text-center text-sm text-[#737B7A]">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}

                <ul className="divide-y divide-[#f0e8dc]">
                  {results.map((result) => (
                    <li key={`${result.type}-${result.href}`}>
                      <Link
                        href={result.href}
                        onClick={handleClose}
                        className="flex items-center justify-between gap-4 py-3 text-sm transition-colors hover:text-[#009E98]"
                      >
                        <span>{result.title}</span>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#009E98]">
                          {result.type}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <button
            type="button"
            className="absolute inset-0 -z-10"
            aria-label="Close search overlay"
                        onClick={handleClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
