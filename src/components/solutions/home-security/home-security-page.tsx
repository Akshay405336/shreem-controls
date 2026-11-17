import {
  Bell,
  CheckCircle2,
  DoorOpen,
  Eye,
  MessageSquare,
  Radio,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Video,
} from "lucide-react";

import { FadeInView } from "@/components/animations/fade-in-view";
import { PageSection } from "@/components/layout/page-section";
import { HomeSecurityHeroActions } from "@/components/solutions/home-security/home-security-hero-actions";
import { HomeSecurityMobileVisual } from "@/components/solutions/home-security/home-security-mobile-visual";
import { SolutionAssetImage } from "@/components/solutions/home-security/solution-asset-image";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import {
  ajaxBrandSection,
  applicationCards,
  homeSecurityHero,
  mobileSecuritySection,
  securityCategories,
  securityProcessSteps,
  vdpCapabilities,
  vdpProcessSteps,
  vdpSection,
  vdpShowcaseFrames,
  whyShreemSecurity,
  whyShreemSecurityIntro,
} from "@/data/home-security";

import { HomeSecurityConsultationCta } from "./home-security-consultation-cta";

const securityProcessIcons = [ScanSearch, Radio, Bell, ShieldCheck] as const;
const vdpProcessIcons = [DoorOpen, Eye, MessageSquare, ShieldCheck] as const;
const vdpCapabilityIcons = [Video, MessageSquare, DoorOpen, Smartphone, Eye, ShieldCheck] as const;

export function HomeSecurityPage() {
  return (
    <>
      <PageHero
        eyebrow={homeSecurityHero.eyebrow}
        titleLead={homeSecurityHero.titleLead}
        titleAccent={homeSecurityHero.titleAccent}
        description={homeSecurityHero.description}
        image={homeSecurityHero.image}
        imageFallback={homeSecurityHero.imageFallback}
        variant="image"
      >
        <HomeSecurityHeroActions />
      </PageHero>

      {/* —— Ajax Systems —— */}
      <PageSection theme="cream-gradient" waves="ambient" scene="orb-top-right">
        <div className="grid gap-7 sm:gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
          <div>
            <HomeSectionHeading
              eyebrow={ajaxBrandSection.eyebrow}
              titleLead={ajaxBrandSection.titleLead}
              titleAccent={ajaxBrandSection.titleAccent}
              description={ajaxBrandSection.description}
            />
            <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
              {ajaxBrandSection.logo ? (
                <div className="relative h-9 w-24 shrink-0 sm:h-10 sm:w-28">
                  <SolutionAssetImage
                    src={ajaxBrandSection.logo}
                    fallback=""
                    alt="Ajax Systems"
                    fill
                    sizes="112px"
                    className="object-contain object-left"
                  />
                </div>
              ) : null}
              <p className="min-w-0 text-[12px] leading-[1.65] text-[#737B7A]">
                Professional wireless security technology for residential and commercial
                properties.
              </p>
            </div>
          </div>
          <FadeInView className="relative overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-[0_10px_36px_rgba(37,42,42,0.07)] sm:rounded-[24px]">
            <div className="relative aspect-[4/3] w-full min-h-[180px] sm:min-h-[220px]">
              <SolutionAssetImage
                src={ajaxBrandSection.showcaseImage}
                fallback={ajaxBrandSection.showcaseFallback}
                alt="Ajax security devices"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeInView>
        </div>
      </PageSection>

      <PageSection
        id="security-categories"
        theme="white"
        waves="bottom"
        scene="orb-bottom-left"
      >
        <HomeSectionHeading
          eyebrow="Solution categories"
          title={
            <>
              Complete{" "}
              <span className="text-[#009E98]">property protection</span>
            </>
          }
          titleClassName="text-balance"
          description="Plan intrusion, video, life safety and automation for how your space is used."
          align="center"
        />

        <div className="mt-12 space-y-16 lg:space-y-20">
          {securityCategories.map((category, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={category.id}
                className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
              >
                <FadeInView
                  className={reversed ? "lg:order-2" : undefined}
                  delay={0.05}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#009E98]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display text-[clamp(1.65rem,3vw,2.25rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#252A2A]">
                    {category.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-[13px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
                    {category.summary}
                  </p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-[1.55] text-[#737B7A]"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009E98]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeInView>
                <FadeInView
                  className={reversed ? "lg:order-1" : undefined}
                  delay={0.1}
                >
                  <div className="relative overflow-hidden rounded-[24px] border border-[#DDECEB] shadow-[0_10px_32px_rgba(37,42,42,0.06)]">
                    <div className="relative aspect-[4/3] w-full">
                      <SolutionAssetImage
                        src={category.image}
                        fallback={category.imageFallback}
                        alt={category.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                    </div>
                  </div>
                </FadeInView>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection theme="mint" waves="ambient">
        <HomeSectionHeading
          eyebrow="How it works"
          title={
            <>
              Detection to{" "}
              <span className="text-[#009E98]">response</span>
            </>
          }
          titleClassName="text-balance"
          description="A connected security ecosystem that keeps you informed when events matter."
          align="center"
        />

        <ol className="relative mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-[#009E98]/35 to-transparent lg:block"
          />
          {securityProcessSteps.map((step, index) => {
            const Icon = securityProcessIcons[index] ?? ShieldCheck;
            return (
              <li key={step.title} className="list-none">
                <FadeInView delay={index * 0.06} className="h-full">
                  <div className="relative flex h-full flex-col rounded-[20px] border border-[#DDECEB] bg-white/80 p-6 shadow-[0_6px_24px_rgba(37,42,42,0.05)] backdrop-blur-sm">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#EFF9F8] text-[#009E98] ring-1 ring-[#009E98]/15">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-4 text-[10px] font-semibold tracking-[0.2em] text-[#009E98]">
                      {step.step}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium tracking-[-0.02em] text-[#252A2A]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-[1.7] text-[#737B7A]">
                      {step.description}
                    </p>
                  </div>
                </FadeInView>
              </li>
            );
          })}
        </ol>
      </PageSection>

      <PageSection theme="cream" scene="orb-top-right">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
          <div className="max-w-xl">
            <HomeSectionHeading
              eyebrow={mobileSecuritySection.eyebrow}
              titleLead={mobileSecuritySection.titleLead}
              titleAccent={mobileSecuritySection.titleAccent}
              description={mobileSecuritySection.description}
            />
            <ul className="mt-8 space-y-3">
              {[
                "Security system status at a glance",
                "Armed and disarmed modes",
                "Sensor status overview",
                "Camera preview where supported",
                "Recent alerts and notifications",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-2 text-[12px] text-[#737B7A] sm:text-[13px]"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#009E98]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <HomeSecurityMobileVisual />
        </div>
      </PageSection>

      {/* —— Smart Video Door Phone —— */}
      <PageSection id="video-door-phone" theme="white" waves="bottom" scene="orb-bottom-left">
        <HomeSectionHeading
          eyebrow={vdpSection.eyebrow}
          titleLead={vdpSection.titleLead}
          titleAccent={vdpSection.titleAccent}
          description={vdpSection.description}
          align="center"
        />

        <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] leading-[1.65] text-[#9AA3A2] sm:text-[12px]">
          Capabilities below describe what Video Door Phone solutions can offer depending on the
          selected system — not guaranteed features of every product.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {vdpCapabilities.map((capability, index) => {
            const Icon = vdpCapabilityIcons[index] ?? Video;
            return (
              <FadeInView key={capability.title} delay={index * 0.04}>
                <article className="flex h-full flex-col rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 shadow-[0_6px_24px_rgba(37,42,42,0.05)] sm:p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#EFF9F8] text-[#009E98]">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-[18px] font-medium tracking-[-0.02em] text-[#252A2A]">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.7] text-[#737B7A] sm:text-[13px]">
                    {capability.description}
                  </p>
                </article>
              </FadeInView>
            );
          })}
        </div>
      </PageSection>

      <PageSection theme="mint" waves="ambient" scene="orb-top-right">
        <HomeSectionHeading
          eyebrow="Visual showcase"
          titleLead="Entrance,"
          titleAccent="monitor and mobile"
          description="A connected entrance experience can bring outdoor door stations, indoor interfaces and mobile viewing together — shaped around the system you select."
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {vdpShowcaseFrames.map((frame, index) => (
            <FadeInView key={frame.title} delay={index * 0.05}>
              <figure className="overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-[0_8px_28px_rgba(37,42,42,0.06)] sm:rounded-[24px]">
                <div className="relative aspect-[16/10] w-full">
                  <SolutionAssetImage
                    src={frame.image}
                    alt={frame.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="p-5 sm:p-6">
                  <h3 className="font-display text-[17px] font-medium tracking-[-0.02em] text-[#252A2A]">
                    {frame.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-[1.65] text-[#737B7A]">
                    {frame.description}
                  </p>
                </figcaption>
              </figure>
            </FadeInView>
          ))}
        </div>
      </PageSection>

      <PageSection theme="cream-gradient" scene="orb-bottom-left">
        <HomeSectionHeading
          eyebrow="How VDP works"
          title={
            <>
              From arrival to{" "}
              <span className="text-[#009E98]">managed entry</span>
            </>
          }
          titleClassName="text-balance"
          description="A simple flow for visitor communication and access, depending on the selected Video Door Phone system."
          align="center"
        />

        <ol className="relative mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-[#009E98]/35 to-transparent lg:block"
          />
          {vdpProcessSteps.map((step, index) => {
            const Icon = vdpProcessIcons[index] ?? DoorOpen;
            return (
              <li key={step.title} className="list-none">
                <FadeInView delay={index * 0.06} className="h-full">
                  <div className="relative flex h-full flex-col rounded-[20px] border border-[#DDECEB] bg-white/80 p-6 shadow-[0_6px_24px_rgba(37,42,42,0.05)] backdrop-blur-sm">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#EFF9F8] text-[#009E98] ring-1 ring-[#009E98]/15">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-4 text-[10px] font-semibold tracking-[0.2em] text-[#009E98]">
                      {step.step}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium tracking-[-0.02em] text-[#252A2A]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-[1.7] text-[#737B7A]">
                      {step.description}
                    </p>
                  </div>
                </FadeInView>
              </li>
            );
          })}
        </ol>
      </PageSection>

      <PageSection theme="white" waves="bottom">
        <HomeSectionHeading
          eyebrow="Applications"
          title={
            <>
              Home &{" "}
              <span className="text-[#009E98]">commercial spaces</span>
            </>
          }
          titleClassName="text-balance"
          description="Security and video door phone solutions shaped around residences, offices and reception areas."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {applicationCards.map((card) => (
            <FadeInView
              key={card.title}
              className="overflow-hidden rounded-[24px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] shadow-[0_8px_28px_rgba(37,42,42,0.06)]"
            >
              <div className="relative aspect-[16/9] w-full">
                <SolutionAssetImage
                  src={card.image}
                  fallback={card.imageFallback}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-[#252A2A]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.75] text-[#737B7A]">{card.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[#DDECEB] bg-white px-3 py-1 text-[11px] text-[#737B7A]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>
          ))}
        </div>
      </PageSection>

      <PageSection theme="mint" scene="orb-bottom-left">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <HomeSectionHeading
            eyebrow="Why Shreem Controls"
            titleLead="Guidance for"
            titleAccent="security & VDP"
            description={whyShreemSecurityIntro}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyShreemSecurity.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-[16px] border border-[#DDECEB] bg-white/70 px-4 py-3 text-[12px] leading-[1.6] text-[#737B7A]"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009E98]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <HomeSecurityConsultationCta />
    </>
  );
}
