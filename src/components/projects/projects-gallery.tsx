"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { PageSection } from "@/components/layout/page-section";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { projectCategories, projects } from "@/data/projects";
import { cn } from "@/lib/cn";

import "@/components/products/product-category-filter.css";

const projectCardArrowClass =
  "flex size-[30px] shrink-0 items-center justify-center rounded-full border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)] hover:shadow-[0_6px_18px_rgba(0,158,152,0.28)]";

export function ProjectsGallery() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const shouldReduceMotion = useReducedMotion();
  const filtered = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.category === category),
    [category],
  );

  return (
    <PageSection theme="white" waves="ambient" scene="orb-top-right">
      <HomeSectionHeading
        align="center"
        eyebrow="Project Gallery"
        titleLead="Premium architectural"
        titleAccent="smart-home showcases"
        description="Residential, villa and presentation environments featuring Shreem Controls intelligent living."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {projectCategories.map((item) => {
          const isActive = category === item;

          return (
            <button
              key={item}
              type="button"
              aria-pressed={isActive}
              onClick={() => setCategory(item)}
              className={cn(
                "product-category-filter",
                isActive
                  ? "product-category-filter--active"
                  : "product-category-filter--inactive",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {filtered.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            className="group overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,158,152,0.08)]"
          >
            <Link href={`/projects/${project.slug}`} className="relative block aspect-[16/10]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                  {project.category}
                </p>
                <h2 className="mt-1 font-display text-[19px] text-[#252A2A]">{project.title}</h2>
                <p className="mt-2 text-[12px] leading-[1.65] text-[#737B7A]">{project.summary}</p>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`View ${project.title}`}
                className={projectCardArrowClass}
              >
                <ArrowUpRight size={15} strokeWidth={1.7} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}
