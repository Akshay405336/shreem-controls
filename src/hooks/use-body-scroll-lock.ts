"use client";

import { useContext, useEffect } from "react";

import { LenisRefContext } from "@/components/providers/lenis-provider";

type BodyStyleSnapshot = {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
  paddingRight: string;
};

type HtmlStyleSnapshot = {
  overflow: string;
};

function lockBodyScroll(scrollY: number) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  document.documentElement.style.overflow = "hidden";
}

function unlockBodyScroll(snapshot: {
  body: BodyStyleSnapshot;
  html: HtmlStyleSnapshot;
  scrollY: number;
}) {
  document.body.style.position = snapshot.body.position;
  document.body.style.top = snapshot.body.top;
  document.body.style.left = snapshot.body.left;
  document.body.style.right = snapshot.body.right;
  document.body.style.width = snapshot.body.width;
  document.body.style.overflow = snapshot.body.overflow;
  document.body.style.paddingRight = snapshot.body.paddingRight;

  document.documentElement.style.overflow = snapshot.html.overflow;

  window.scrollTo(0, snapshot.scrollY);
}

export function useBodyScrollLock(active: boolean) {
  const lenisRef = useContext(LenisRefContext);

  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const lenis = lenisRef?.current ?? null;

    const bodySnapshot: BodyStyleSnapshot = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    const htmlSnapshot: HtmlStyleSnapshot = {
      overflow: document.documentElement.style.overflow,
    };

    lenis?.stop();
    lockBodyScroll(scrollY);

    return () => {
      unlockBodyScroll({
        body: bodySnapshot,
        html: htmlSnapshot,
        scrollY,
      });
      lenis?.start();
    };
  }, [active, lenisRef]);
}
