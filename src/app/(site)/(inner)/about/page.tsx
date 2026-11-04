import { PageSection } from "@/components/layout/page-section";
import { AboutBrandPhilosophy } from "@/components/sections/about/about-brand-philosophy";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { aboutContent } from "@/data/about";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "Learn about Shreem Controls brand philosophy, design values and intelligent living vision.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Shreem Controls"
        titleLead="Design-led"
        titleAccent="intelligent living"
        description={aboutContent.intro}
        image="/images/Glowing-Smart-Display.png"
        variant="image"
      />

      <AboutBrandPhilosophy />

      <PageSection theme="mint" waves="bottom" scene="orb-top-right">
        <HomeSectionHeading
          eyebrow="Craft & Innovation"
          titleLead="Design philosophy"
          titleAccent="and brand values"
          description={`${aboutContent.designPhilosophy} ${aboutContent.innovation}`}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map((value, index) => (
            <article
              key={value.title}
              className="rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 shadow-[0_6px_24px_rgba(37,42,42,0.05)]"
            >
              <span className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-[19px] text-[#252A2A]">{value.title}</h3>
              <p className="mt-2 text-[12px] leading-[1.65] text-[#737B7A]">{value.text}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
