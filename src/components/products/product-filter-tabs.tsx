"use client";

import { cn } from "@/lib/cn";

import "./product-category-filter.css";

export type FilterTab = {
  slug: string;
  label: string;
  count?: number;
};

type ProductFilterTabsProps = {
  tabs: FilterTab[];
  activeSlug: string | null;
  allLabel?: string;
  onSelect: (slug: string | null) => void;
  ariaLabel: string;
};

export function ProductFilterTabs({
  tabs,
  activeSlug,
  allLabel = "All",
  onSelect,
  ariaLabel,
}: ProductFilterTabsProps) {
  return (
    <div
      className="-mx-[5%] flex gap-2 overflow-x-auto px-[5%] pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label={ariaLabel}
    >
      <FilterTabButton
        pressed={activeSlug === null}
        onClick={() => onSelect(null)}
        label={allLabel}
      />
      {tabs.map((tab) => (
        <FilterTabButton
          key={tab.slug}
          pressed={activeSlug === tab.slug}
          onClick={() => onSelect(tab.slug)}
          label={tab.label}
          count={tab.count}
        />
      ))}
    </div>
  );
}

function FilterTabButton({
  pressed,
  onClick,
  label,
  count,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={pressed}
      onClick={onClick}
      className={cn(
        "product-category-filter shrink-0 whitespace-nowrap",
        pressed ? "product-category-filter--active" : "product-category-filter--inactive",
      )}
    >
      {label}
      {count !== undefined && (
        <span className={cn("ml-1.5 tabular-nums opacity-70")}>({count})</span>
      )}
    </button>
  );
}
