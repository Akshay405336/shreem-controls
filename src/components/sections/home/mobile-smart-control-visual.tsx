"use client";

import { useState } from "react";
import {
  Blinds,
  Home,
  Layers,
  Lightbulb,
  Pause,
  Settings,
  ThermometerSun,
} from "lucide-react";

import { cn } from "@/lib/cn";

/** Expected asset path — file is currently missing from public/images/home/ (only .gitkeep). */
const MOBILE_IMAGE_SRC = "/images/home/mobile-smart-control.png";

const PHONE_WIDTH = {
  default: "w-[min(42vw,152px)] sm:w-[162px] md:w-[168px] lg:w-[172px]",
  compact: "w-[min(34vw,118px)] sm:w-[124px] md:w-[128px]",
  panel: "w-[min(38vw,132px)] sm:w-[140px] md:w-[146px] lg:w-[150px]",
  /** Full device must stay visible; cap width on small phones without clipping height */
  showcase:
    "w-[min(58vw,176px)] sm:w-[188px] md:w-[200px] lg:w-[218px] xl:w-[236px]",
} as const;

const tileControls = [
  { label: "Lighting", value: "72%", icon: Lightbulb, on: true, toggle: true },
  { label: "Climate", value: "22°C", icon: ThermometerSun, on: true, toggle: false },
  { label: "Curtains", value: "Open", icon: Blinds, on: false, toggle: "pause" as const },
  { label: "Scenes", value: "Evening", icon: Layers, on: true, toggle: true },
] as const;

function PhoneDashboardMock({
  size = "default",
}: {
  size?: "default" | "compact" | "panel" | "showcase";
}) {
  const isShowcase = size === "showcase";
  const isTight = size === "compact" || size === "panel";

  const widthClass =
    size === "showcase"
      ? PHONE_WIDTH.showcase
      : size === "panel"
        ? PHONE_WIDTH.panel
        : size === "compact"
          ? PHONE_WIDTH.compact
          : PHONE_WIDTH.default;

  if (isShowcase) {
    return (
      <div className="relative mx-auto w-full shrink-0">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-3 left-1/2 h-14 w-[110%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(8,127,123,0.2)_0%,transparent_70%)]"
        />

        <div className="relative rounded-[2.35rem] border border-[#3a4545] bg-[linear-gradient(160deg,#2a3232_0%,#121818_45%,#0a0e0e_100%)] p-[7px] shadow-[0_20px_48px_rgba(0,0,0,0.35),0_8px_24px_rgba(8,127,123,0.18)]">
          <div className="absolute left-1/2 top-[9px] h-[4px] w-[72px] -translate-x-1/2 rounded-full bg-black/90" />

          <div className="overflow-hidden rounded-[1.95rem] bg-[#0a0f0f] px-3 pb-4 pt-9 sm:px-3.5 sm:pt-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5c8f8c]">
              My Home
            </p>

            <p className="mt-0.5 font-display text-lg font-medium leading-none tracking-tight text-white sm:text-xl">
              Living
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-2.5">
              {tileControls.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex min-h-[64px] flex-col justify-between rounded-2xl border border-white/[0.07] bg-white/[0.05] p-2 sm:min-h-[72px] sm:p-2.5"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="flex size-7 items-center justify-center rounded-xl bg-[#087F7B]/25 text-[#73BDB8] sm:size-8">
                        <Icon size={14} strokeWidth={1.75} />
                      </span>

                      {item.toggle === "pause" ? (
                        <span className="flex size-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70">
                          <Pause size={12} fill="currentColor" />
                        </span>
                      ) : item.toggle ? (
                        <span
                          className={cn(
                            "relative h-[18px] w-[34px] shrink-0 rounded-full",
                            item.on ? "bg-[#009E98]" : "bg-white/15",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-[2px] size-3.5 rounded-full bg-white shadow-sm",
                              item.on ? "left-[17px]" : "left-[2px]",
                            )}
                          />
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-white/95">{item.label}</p>
                      <p className="text-[10px] text-[#73BDB8]/90">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <nav
              aria-hidden
              className="mt-3 flex items-center justify-around rounded-2xl border border-white/[0.06] bg-black/40 px-2 py-2.5 sm:mt-4"
            >
              <span className="flex flex-col items-center gap-0.5 text-[#73BDB8]">
                <Home size={16} strokeWidth={1.75} />
                <span className="text-[8px] font-medium">Home</span>
              </span>
              <span className="flex flex-col items-center gap-0.5 text-white/35">
                <Lightbulb size={16} strokeWidth={1.75} />
                <span className="text-[8px]">Rooms</span>
              </span>
              <span className="flex flex-col items-center gap-0.5 text-white/35">
                <Layers size={16} strokeWidth={1.75} />
                <span className="text-[8px]">Scenes</span>
              </span>
              <span className="flex flex-col items-center gap-0.5 text-white/35">
                <Settings size={16} strokeWidth={1.75} />
                <span className="text-[8px]">More</span>
              </span>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  const listControls = tileControls.map((t) => ({
    label: t.label,
    value: t.value,
    icon: t.icon,
    on: t.on,
  }));

  return (
    <div className={cn("relative mx-auto shrink-0", widthClass)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-1/2 h-10 w-full -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(8,127,123,0.16)_0%,transparent_72%)]"
      />

      <div
        className={cn(
          "relative rounded-[1.75rem] border border-[#2a3333] bg-[linear-gradient(145deg,#1a2222_0%,#0d1212_100%)] shadow-[0_12px_28px_rgba(8,127,123,0.16),0_4px_12px_rgba(0,0,0,0.25)]",
          isTight ? "p-[4px]" : "p-[5px]",
        )}
      >
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 rounded-full bg-black/85",
            isTight ? "top-[6px] h-[2px] w-10" : "top-[7px] h-[3px] w-12",
          )}
        />

        <div
          className={cn(
            "overflow-hidden rounded-[1.5rem] bg-[#0a0f0f]",
            isTight ? "px-2 pb-2.5 pt-6" : "px-3 pb-3.5 pt-8",
          )}
        >
          <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-[#5c8f8c] sm:text-[9px]">
            My Home
          </p>
          <p
            className={cn(
              "mt-0.5 font-display font-medium leading-none tracking-tight text-white",
              isTight ? "text-sm" : "text-base",
            )}
          >
            Living
          </p>
          <ul className={cn(isTight ? "mt-2 space-y-1.5" : "mt-3 space-y-2")}>
            {listControls.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className={cn(
                    "flex items-center justify-between gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.04]",
                    isTight ? "px-2 py-1.5" : "px-2.5 py-2",
                  )}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-1.5">
                    <span
                      className={cn(
                        "flex shrink-0 items-center justify-center rounded-md bg-[#087F7B]/22 text-[#73BDB8]",
                        isTight ? "size-6" : "size-7",
                      )}
                    >
                      <Icon size={isTight ? 11 : 13} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <p className="text-[9px] font-medium text-white/92 sm:text-[10px]">
                        {item.label}
                      </p>
                      <p className="text-[8px] text-white/48 sm:text-[9px]">{item.value}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "relative shrink-0 rounded-full",
                      isTight ? "h-4 w-7" : "h-[18px] w-[32px]",
                      item.on ? "bg-[#009E98]" : "bg-white/15",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-[2px] rounded-full bg-white shadow-sm",
                        isTight ? "size-3" : "size-3.5",
                        item.on
                          ? isTight
                            ? "left-[13px]"
                            : "left-[15px]"
                          : "left-[2px]",
                      )}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

type MobileSmartControlVisualProps = {
  size?: "default" | "compact" | "panel" | "showcase";
  className?: string;
  /**
   * Prefer the CSS device mock. Required for the homepage showcase because
   * `/images/home/mobile-smart-control.png` is not present in the repo.
   */
  preferMock?: boolean;
};

export function MobileSmartControlVisual({
  size = "default",
  className,
  preferMock = false,
}: MobileSmartControlVisualProps) {
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const widthClass =
    size === "showcase"
      ? PHONE_WIDTH.showcase
      : size === "default"
        ? PHONE_WIDTH.default
        : size === "panel"
          ? PHONE_WIDTH.panel
          : PHONE_WIDTH.compact;

  const useMock = preferMock || size === "showcase" || imageFailed;

  return (
    <div
      className={cn(
        "relative mx-auto flex min-w-0 shrink-0 items-center justify-center overflow-visible",
        widthClass,
        className,
      )}
    >
      {useMock ? <PhoneDashboardMock size={size} /> : null}

      {!preferMock && size !== "showcase" && !imageFailed ? (
        <img
          src={MOBILE_IMAGE_SRC}
          alt="Smartphone showing smart-home lighting, climate, curtain and scene controls"
          width={480}
          height={560}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageReady(true)}
          onError={() => {
            setImageFailed(true);
            setImageReady(false);
          }}
          className={cn(
            "block h-auto w-full max-w-full shrink-0 object-contain object-center drop-shadow-[0_12px_24px_rgba(8,127,123,0.16)]",
            imageReady ? "opacity-100" : "sr-only",
          )}
        />
      ) : null}
    </div>
  );
}
