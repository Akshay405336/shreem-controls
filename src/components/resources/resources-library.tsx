"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  FolderOpen,
  HelpCircle,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { PageSection } from "@/components/layout/page-section";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import {
  resourceCategories,
  resources,
  type ResourceCategory,
  type ResourceCategoryFilter,
} from "@/data/resources";
import { cn } from "@/lib/cn";

const resourceCardArrowClass =
  "flex size-[30px] items-center justify-center rounded-full border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 group-hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)]";

const categoryIcons: Record<ResourceCategory, LucideIcon> = {
  Guide: BookOpen,
  Article: FileText,
  Documentation: FolderOpen,
  FAQ: HelpCircle,
  News: Newspaper,
};

export function ResourcesLibrary() {
  const [category, setCategory] = useState<ResourceCategoryFilter>("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (category === "All") return resources;
    return resources.filter((item) => item.category === category);
  }, [category]);

  return (
    <PageSection theme="cream-gradient" waves="bottom" rings scene="orb-top-right">
      <HomeSectionHeading
        align="center"
        eyebrow="Resource Library"
        title={
          <>
            Smart home{" "}
            <span className="text-[#009E98]">knowledge base</span>
          </>
        }
        description="Guides, articles, documentation and FAQs—structured for clear smart-home guidance."
        titleClassName="text-[clamp(1.85rem,3.4vw,3.15rem)]"
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {resourceCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-medium transition-all duration-300",
              category === item
                ? "border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.18)]"
                : "border-[#DDECEB] bg-white/90 text-[#737B7A] hover:border-[#009E98]/40 hover:text-[#087F7B]",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {filtered.map((item, index) => {
          const Icon = categoryIcons[item.category];
          const isFeatured = item.slug === "consultation-faq";
          const displayIndex =
            resources.findIndex((entry) => entry.slug === item.slug) + 1;

          return (
            <motion.div
              key={item.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                delay: shouldReduceMotion ? 0 : index * 0.06,
              }}
            >
              <Link
                href={`/resources/${item.slug}`}
                className={cn(
                  "group flex h-full flex-col rounded-[20px] border p-6 shadow-[0_6px_20px_rgba(37,42,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,158,152,0.1)]",
                  isFeatured
                    ? "border-[#087F7B]/35 bg-[linear-gradient(145deg,#066662_0%,#087F7B_32%,#009E98_62%,#45BDB5_100%)]"
                    : "border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_55%,#F4FBFA_100%)]",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex size-[52px] shrink-0 items-center justify-center rounded-[14px]",
                      isFeatured
                        ? "bg-white/95 text-[#087F7B]"
                        : "bg-[linear-gradient(135deg,#066662_0%,#087F7B_50%,#009E98_100%)] text-white shadow-[0_5px_14px_rgba(0,158,152,0.2)]",
                    )}
                  >
                    <Icon size={24} strokeWidth={1.55} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "text-[9px] font-semibold tracking-[0.18em]",
                        isFeatured ? "text-white/85" : "text-[#009E98]",
                      )}
                    >
                      {item.category} · {String(displayIndex).padStart(2, "0")}
                    </span>
                    <h2
                      className={cn(
                        "mt-1.5 font-display text-[19px] leading-snug tracking-[-0.03em]",
                        isFeatured ? "text-white" : "text-[#252A2A]",
                      )}
                    >
                      {item.title}
                    </h2>
                  </div>
                </div>

                <p
                  className={cn(
                    "mt-4 flex-1 text-[12px] leading-[1.7] sm:text-[13px]",
                    isFeatured ? "text-white/88" : "text-[#737B7A]",
                  )}
                >
                  {item.summary}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.22em]",
                      isFeatured ? "text-white/75" : "text-[#087F7B]",
                    )}
                  >
                    Read more
                  </span>
                  <span
                    className={
                      isFeatured
                        ? "flex size-[30px] items-center justify-center rounded-full border border-white/90 bg-white text-[#087F7B] shadow-[0_4px_14px_rgba(8,127,123,0.2)] transition-colors group-hover:bg-[#F4FBFA]"
                        : resourceCardArrowClass
                    }
                  >
                    <ArrowUpRight size={15} strokeWidth={1.7} />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </PageSection>
  );
}
