import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lightbulb, MonitorPlay, PanelTop, Thermometer } from "lucide-react";

import { PageSection } from "@/components/layout/page-section";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { solutions } from "@/data/solutions";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Solutions",
  description:
    "Smart lighting, climate, curtains, entertainment, security and complete home automation solutions by Shreem Controls.",
  path: "/solutions",
});

const icons = [Lightbulb, Thermometer, PanelTop, MonitorPlay, Lightbulb, PanelTop];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Smart <span className="text-[#009E98]">ecosystem</span>
          </>
        }
        description="Integrated solutions that bring comfort, convenience and elegance to every space."
        image="/images/smart-home-villa.png"
        variant="image"
      />

      <PageSection theme="white" waves="bottom" scene="radial-center-soft">
        <HomeSectionHeading
          align="center"
          eyebrow="Our Solutions"
          titleLead="Applications for"
          titleAccent="intelligent living"
          description="Explore Shreem Controls solutions shaped for lighting, climate, curtains, entertainment and whole-home automation."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {solutions.map((solution, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={solution.slug}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,158,152,0.08)]"
              >
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="relative block aspect-[1.3/1] overflow-hidden"
                >
                  <Image
                    src={solution.image}
                    alt={solution.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </Link>

                <div className="relative z-10 -mt-7 ml-5 flex size-[56px] items-center justify-center rounded-[15px] border-[4px] border-white bg-[#F4FBFA] text-[#009E98] shadow-sm">
                  <Icon size={25} strokeWidth={1.6} />
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-2.5">
                  <span className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-[19px] font-normal leading-tight tracking-[-0.035em] text-[#252A2A]">
                    {solution.name}
                  </h3>
                  <p className="mt-2 min-h-[40px] text-[11px] leading-[1.65] text-[#737B7A] sm:text-[12px]">
                    {solution.summary}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="flex size-[30px] items-center justify-center rounded-full border border-[#009E98] text-[#009E98] transition-all hover:bg-[#087F7B] hover:text-white"
                    >
                      <ArrowUpRight size={15} strokeWidth={1.7} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
