"use client";

import { useEffect, useRef, useState } from "react";
import { Blinds, Layers, Lightbulb, ThermometerSun } from "lucide-react";
import { useReducedMotion } from "motion/react";

import { MobileSmartControlVisual } from "@/components/sections/home/mobile-smart-control-visual";
import { cn } from "@/lib/cn";

const VIDEO_SRC = "/theben-video.mp4";

const featurePills = [
  { label: "Lighting Control", icon: Lightbulb },
  { label: "Climate Control", icon: ThermometerSun },
  { label: "Curtain Control", icon: Blinds },
  { label: "Scene Management", icon: Layers },
] as const;

type ThebenMobileShowcaseProps = {
  className?: string;
};

export function ThebenMobileShowcase({ className }: ThebenMobileShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const videoShellRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const phoneMeasureRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [panelHeightPx, setPanelHeightPx] = useState<number | null>(null);
  const [phoneScale, setPhoneScale] = useState(1);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || shouldReduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      /* Autoplay may be blocked until user gesture on some browsers. */
    });
  }, [shouldLoadVideo, shouldReduceMotion]);

  useEffect(() => {
    const videoShell = videoShellRef.current;
    if (!videoShell) return;

    const syncPanelHeight = () => {
      const isSideBySide = window.matchMedia("(min-width: 768px)").matches;
      if (!isSideBySide) {
        setPanelHeightPx(null);
        if (panelRef.current) {
          panelRef.current.style.height = "";
          panelRef.current.style.minHeight = "";
        }
        return;
      }

      const height = videoShell.getBoundingClientRect().height;
      setPanelHeightPx(height);
    };

    syncPanelHeight();

    const resizeObserver = new ResizeObserver(syncPanelHeight);
    resizeObserver.observe(videoShell);

    const media = window.matchMedia("(min-width: 768px)");
    media.addEventListener("change", syncPanelHeight);
    window.addEventListener("resize", syncPanelHeight);

    return () => {
      resizeObserver.disconnect();
      media.removeEventListener("change", syncPanelHeight);
      window.removeEventListener("resize", syncPanelHeight);
    };
  }, [shouldLoadVideo]);

  useEffect(() => {
    const panel = panelRef.current;
    const phone = phoneMeasureRef.current;
    if (!panel || !phone) return;

    const fitPhone = () => {
      const isSideBySide = window.matchMedia("(min-width: 768px)").matches;
      if (!isSideBySide) {
        setPhoneScale(1);
        return;
      }

      const panelRect = panel.getBoundingClientRect();
      const phoneHeight = phone.scrollHeight;
      if (panelRect.height < 1 || phoneHeight < 1) return;

      const padding = 28;
      const available = panelRect.height - padding;
      setPhoneScale(Math.min(1, Math.max(0.58, available / phoneHeight)));
    };

    fitPhone();

    const resizeObserver = new ResizeObserver(fitPhone);
    resizeObserver.observe(panel);
    resizeObserver.observe(phone);
    window.addEventListener("resize", fitPhone);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", fitPhone);
    };
  }, [panelHeightPx, shouldLoadVideo]);

  return (
    <section
      ref={rootRef}
      data-header-theme="light"
      aria-label="Smart living solutions with Theben and mobile control"
      className={cn(
        /* overflow-x-hidden forces overflow-y to auto/clip in CSS — avoid clipping the phone */
        "relative isolate bg-[linear-gradient(180deg,#FFFFFF_0%,#F6FBFA_42%,#EFF9F8_100%)] py-8 sm:py-10 md:py-12 lg:py-16",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,158,152,0.06),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-12">
        {/* —— Top heading area —— */}
        <div className="mb-6 grid gap-5 sm:mb-8 sm:gap-8 lg:mb-10 lg:grid-cols-[13fr_7fr] lg:items-center lg:gap-8">
          <div className="min-w-0">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 shrink-0 bg-[#009E98]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#087F7B]">
                SMART LIVING SOLUTIONS
              </span>
            </div>

            <h2 className="font-display text-[clamp(2rem,4.2vw,3.35rem)] font-medium leading-[1.06] tracking-[-0.04em] text-[#252A2A]">
              <span className="block">Smart Technology for</span>
              <span className="block text-[#009E98]">Everyday Living</span>
            </h2>

            <p className="mt-5 max-w-2xl text-[14px] leading-[1.75] text-[#737B7A] sm:text-[15px] lg:max-w-none">
              Intelligent control, greater comfort, safety and a more connected home.
            </p>
          </div>

          <ul className="grid min-w-0 grid-cols-2 gap-2 sm:gap-2.5 lg:max-w-[320px] lg:justify-self-end xl:max-w-[360px]">
            {featurePills.map((pill) => {
              const Icon = pill.icon;
              return (
                <li
                  key={pill.label}
                  className="flex min-w-0 items-center gap-2 rounded-xl border border-[#E2F0EF] bg-white/90 px-2.5 py-2 shadow-[0_3px_14px_rgba(37,42,42,0.04)] backdrop-blur-sm sm:rounded-2xl sm:px-3 sm:py-2.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF9F8] text-[#009E98] sm:size-9 sm:rounded-xl">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="text-[10px] font-medium leading-tight text-[#252A2A] sm:text-[11px]">
                    {pill.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* —— Two-column panels —— */}
        <div className="grid min-w-0 gap-5 md:grid-cols-[52fr_48fr] md:items-stretch md:gap-6 lg:gap-7">
          {/* Left: Theben video (defines row height on md+) */}
          <div className="min-w-0">
            <div
              ref={videoShellRef}
              className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#E8EDEC] shadow-[0_14px_40px_rgba(37,42,42,0.1)] sm:rounded-[22px] lg:rounded-[24px]"
            >
              {shouldLoadVideo ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-contain"
                  src={VIDEO_SRC}
                  autoPlay={!shouldReduceMotion}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="Theben smart home brand film"
                />
              ) : (
                <div className="absolute inset-0 animate-pulse bg-[#E8EDEC]" aria-hidden />
              )}
            </div>
          </div>

          {/*
            Right panel:
            - Mobile: natural-height card; teal bg on the card itself so it grows with text + full phone
            - Desktop: height synced to video; absolute teal bg; phone centered in right half
          */}
          <div
            ref={panelRef}
            style={
              panelHeightPx != null
                ? { height: panelHeightPx, minHeight: panelHeightPx }
                : undefined
            }
            className={cn(
              "relative min-w-0",
              /* Mobile: grow with content; paint teal on the card (not absolute inset) */
              "flex flex-col overflow-visible rounded-[20px] border border-[#065955]/40",
              "bg-[linear-gradient(145deg,#0B5C58_0%,#084945_42%,#063532_100%)]",
              "p-5 pb-8 shadow-[0_14px_40px_rgba(6,53,50,0.28)]",
              "sm:rounded-[22px] sm:p-6 sm:pb-10",
              /* Desktop: leave sizing to synced height; transparent shell */
              "md:block md:overflow-visible md:rounded-[24px] md:border-transparent md:bg-transparent md:p-0 md:pb-0 md:shadow-none",
            )}
          >
            {/* Desktop-only absolute teal surface (keeps phone free to sit inside without clipping) */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 hidden overflow-hidden rounded-[22px] lg:rounded-[24px] md:block",
                "border border-[#065955]/40 bg-[linear-gradient(145deg,#0B5C58_0%,#084945_42%,#063532_100%)]",
                "shadow-[0_14px_40px_rgba(6,53,50,0.28)]",
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_70%_50%,rgba(0,158,152,0.14),transparent_58%)]" />
            </div>

            {/* Soft radial on mobile card */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_90%_70%_at_70%_50%,rgba(0,158,152,0.14),transparent_58%)] md:hidden"
            />

            <div className="relative z-[1] min-w-0 md:flex md:h-full md:max-w-[58%] md:flex-col md:justify-center md:p-5 lg:p-6 xl:p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-[2px] w-8 shrink-0 bg-[#73BDB8]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/85 sm:text-[10px] sm:tracking-[0.3em]">
                  SMART CONTROL
                </span>
              </div>

              <h3 className="font-display text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-[1.08] tracking-[-0.04em] text-white">
                <span className="block">Your Home,</span>
                <span className="block text-[#73BDB8]">In Your Hands</span>
              </h3>

              <p className="mt-3 max-w-md text-pretty text-[12px] leading-[1.55] text-white/78 sm:mt-4 sm:text-[13px] sm:leading-[1.65] lg:text-[13px] lg:leading-[1.7]">
                Control your lighting, climate, curtains, scenes and more directly from your
                mobile. Enjoy effortless control of your home, wherever you are.
              </p>
            </div>

            {/*
              Phone:
              - Mobile: in normal flow under copy, full device visible, no scale transform
              - Desktop: absolute, vertically centered, scaled to fit synced panel height
            */}
            <div className="relative z-[2] mt-6 flex w-full justify-center md:absolute md:inset-y-0 md:right-0 md:mt-0 md:w-[50%] md:items-center md:justify-center md:p-3">
              <div
                ref={phoneMeasureRef}
                className="relative shrink-0 will-change-transform"
                style={{
                  transform: `scale(${phoneScale})`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 left-1/2 hidden h-8 w-[85%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(37,42,42,0.12)_0%,transparent_72%)] md:block"
                />
                {/*
                  preferMock: public/images/home/mobile-smart-control.png is not in the repo
                  (folder only contains .gitkeep). Showcase uses the CSS device mock.
                */}
                <MobileSmartControlVisual size="showcase" preferMock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
