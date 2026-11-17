"use client";

import { useCallback, useLayoutEffect, useState } from "react";

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
};

type UseDropdownPositionOptions = {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  panelWidth: number;
  offset?: number;
  viewportPadding?: number;
};

export function useDropdownPosition({
  open,
  anchorRef,
  panelWidth,
  offset = 10,
  viewportPadding = 16,
}: UseDropdownPositionOptions) {
  const [position, setPosition] = useState<DropdownPosition | null>(null);

  const update = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const width = Math.min(panelWidth, window.innerWidth - viewportPadding * 2);
    const centerX = rect.left + rect.width / 2;
    let left = centerX - width / 2;
    left = Math.max(
      viewportPadding,
      Math.min(left, window.innerWidth - width - viewportPadding),
    );

    const top = rect.bottom + offset;
    const maxHeight = Math.max(
      160,
      window.innerHeight - top - viewportPadding,
    );

    setPosition({ top, left, width, maxHeight });
  }, [anchorRef, panelWidth, offset, viewportPadding]);

  useLayoutEffect(() => {
    if (!open) return;

    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, update]);

  return open ? position : null;
}
