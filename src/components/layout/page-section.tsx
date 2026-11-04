import type { ReactNode } from "react";

import {
  AmbientGoldWaves,
  CreamSectionRings,
  DarkSectionWaves,
  SectionBottomWaves,
} from "@/components/decorations/gold-waves";
import {
  SectionSceneDecor,
  type SectionSceneVariant,
} from "@/components/decorations/section-scene-decor";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type PageSectionTheme = "white" | "cream" | "cream-gradient" | "dark" | "mint";

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  theme?: PageSectionTheme;
  headerTheme?: "light" | "dark";
  waves?: "ambient" | "bottom" | "dark-bottom" | "none";
  rings?: boolean;
  scene?: SectionSceneVariant;
  id?: string;
  as?: "section" | "div";
};

const themeClasses: Record<PageSectionTheme, string> = {
  white: "bg-white text-[#252A2A]",
  cream: "bg-[#FCFCFA] text-[#252A2A]",
  mint: "bg-[#EFF9F8] text-[#252A2A]",
  "cream-gradient":
    "bg-[linear-gradient(135deg,#FFFFFF_0%,#FCFEFD_55%,#F1F9F8_100%)] text-[#252A2A]",
  dark:
    "bg-[linear-gradient(135deg,#FFFFFF_0%,#F4FBFA_48%,#EFF9F8_100%)] text-[#252A2A]",
};

export function PageSection({
  children,
  className,
  containerClassName,
  theme = "white",
  headerTheme,
  waves = "none",
  rings = false,
  scene = "none",
  id,
  as = "section",
}: PageSectionProps) {
  const Component = as;
  const resolvedHeaderTheme = headerTheme ?? "light";

  return (
    <Component
      id={id}
      data-header-theme={resolvedHeaderTheme}
      className={cn(
        "relative isolate overflow-hidden py-9 sm:py-11 lg:py-12",
        themeClasses[theme],
        className,
      )}
    >
      {(theme === "dark" || theme === "mint") && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,158,152,0.06),transparent_58%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 -top-48 -z-10 size-[430px] rounded-full border border-[#009E98]/10"
          />
        </>
      )}

      <SectionSceneDecor variant={scene} />
      {waves === "ambient" && <AmbientGoldWaves />}
      {rings && <CreamSectionRings />}
      {waves === "bottom" && <SectionBottomWaves />}
      {waves === "dark-bottom" && <DarkSectionWaves />}

      <Container className={cn("relative z-10", containerClassName)}>{children}</Container>
    </Component>
  );
}
