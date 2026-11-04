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

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {projectCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-medium",
              category === item
                ? "border-[#009E98] bg-[#EFF9F8] text-[#087F7B]"
                : "border-[#DDECEB] bg-white text-[#737B7A]",
            )}
          >
            {item}
          </button>
        ))}
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
                className="flex size-[30px] shrink-0 items-center justify-center rounded-full border border-[#009E98] text-[#009E98] hover:bg-[#087F7B] hover:text-white"
              >
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}
