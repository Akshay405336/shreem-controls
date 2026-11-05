/** Shared mega-menu shell styles — follows header `tone` (hero = dark, default = light). */

export type MegaMenuTone = "hero" | "default";

export function megaMenuPanelShellClass(tone: MegaMenuTone): string {
  return tone === "hero"
    ? "border-white/10 bg-[#252A2A]/95 text-white shadow-2xl backdrop-blur-xl"
    : "border-[#DDECEB] bg-white text-[#252A2A] shadow-[0_16px_48px_rgba(37,42,42,0.08)]";
}
