import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { PageSection } from "@/components/layout/page-section";
import { ResourceFaqPanel } from "@/components/resources/resource-faq-panel";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import type { ResourceItem } from "@/data/resources";
import { getRelatedResources } from "@/data/resources";

type ResourceDetailViewProps = {
  resource: ResourceItem;
};

export function ResourceDetailView({ resource }: ResourceDetailViewProps) {
  const related = getRelatedResources(resource.slug);

  return (
    <>
      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <Link
          href="/resources"
          className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium text-[#087F7B] transition-colors hover:text-[#009E98]"
        >
          <ArrowLeft size={14} />
          Back to resources
        </Link>

        <p className="max-w-3xl text-[13px] leading-[1.8] text-[#737B7A] sm:text-[15px]">
          {resource.summary}
        </p>

        {resource.category === "FAQ" ? (
          <div className="mt-10">
            <HomeSectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Common questions,{" "}
                  <span className="text-[#009E98]">clear answers</span>
                </>
              }
              titleClassName="text-[clamp(1.65rem,3vw,2.35rem)]"
            />
            <div className="mt-8">
              <ResourceFaqPanel />
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.42fr]">
            <article className="rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-6 shadow-[0_6px_24px_rgba(37,42,42,0.05)] sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#009E98]">
                {resource.category}
              </p>
              <div className="mt-6 space-y-4 text-[12px] leading-[1.8] text-[#737B7A] sm:text-[14px]">
                <p>
                  This resource uses a structured editorial layout ready for approved copy. Replace
                  this body text without changing routes or page structure.
                </p>
                <p>
                  Content can include step-by-step guidance, specification notes, or news updates
                  aligned with Shreem Controls smart-home products and solutions.
                </p>
              </div>
            </article>

            <aside className="h-fit rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] p-6 shadow-[0_6px_20px_rgba(37,42,42,0.05)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#087F7B]">
                On this page
              </p>
              <ul className="mt-4 space-y-2 text-[12px] leading-[1.65] text-[#737B7A]">
                <li>Overview</li>
                <li>Key points</li>
                <li>Next steps</li>
              </ul>
              <div className="mt-6 h-px bg-[#DDECEB]" />
              <p className="mt-4 text-[11px] leading-[1.65] text-[#737B7A]">
                Need personalised guidance? Book a consultation for your project.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex h-[40px] items-center gap-2 rounded-md bg-[linear-gradient(105deg,#087F7B_0%,#009E98_100%)] px-4 text-[11px] font-medium text-white shadow-[0_6px_18px_rgba(0,158,152,0.2)] transition-all hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_100%)]"
              >
                Contact us
                <ArrowUpRight size={14} />
              </Link>
            </aside>
          </div>
        )}
      </PageSection>

      {related.length > 0 && (
        <PageSection theme="cream" waves="bottom" scene="orb-bottom-left">
          <HomeSectionHeading
            align="center"
            eyebrow="Continue reading"
            title={
              <>
                Related{" "}
                <span className="text-[#009E98]">resources</span>
              </>
            }
            titleClassName="text-[clamp(1.75rem,3.2vw,2.75rem)]"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/resources/${item.slug}`}
                className="group rounded-[20px] border border-[#DDECEB] bg-white p-5 shadow-[0_6px_20px_rgba(37,42,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,158,152,0.08)]"
              >
                <span className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                  {item.category}
                </span>
                <h3 className="mt-2 font-display text-[17px] leading-snug text-[#252A2A]">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[11px] leading-[1.65] text-[#737B7A]">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </PageSection>
      )}
    </>
  );
}
