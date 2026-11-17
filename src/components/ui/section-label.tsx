import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionLabel({
  children,
  className,
  tone = "light",
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em]",
        tone === "light" ? "text-[#009E98]" : "text-[#087F7B]",
        className,
      )}
    >
      <span
        className={cn("h-px w-7", tone === "light" ? "bg-[#009E98]" : "bg-[#73BDB8]")}
      />
      {children}
      <span
        className={cn("h-px w-7", tone === "light" ? "bg-[#009E98]" : "bg-[#73BDB8]")}
      />
    </span>
  );
}
