"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { EnquiryForm } from "@/components/consultation/enquiry-form";
import { useConsultation } from "@/components/providers/consultation-provider";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

export function ConsultationModal() {
  const { isOpen, closeConsultation, context } = useConsultation();
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeConsultation();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeConsultation]);

  /** Lenis can swallow wheel on the page; keep scroll on the modal body. */
  useEffect(() => {
    if (!isOpen) return;

    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onWheel = (event: WheelEvent) => {
      if (!scrollEl.contains(event.target as Node)) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const delta = event.deltaY;
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;

      if ((delta > 0 && canScrollDown) || (delta < 0 && canScrollUp)) {
        event.preventDefault();
        event.stopPropagation();
        scrollEl.scrollTop += delta;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-4 sm:p-6"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close consultation dialog"
            className="absolute inset-0 bg-[#252A2A]/40 backdrop-blur-[2px]"
            onClick={closeConsultation}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            className="relative z-10 grid max-h-[min(720px,calc(100dvh-48px))] w-full max-w-2xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl border border-[#DDECEB] bg-[linear-gradient(180deg,#ffffff_0%,#F4FBFA_100%)] shadow-[0_24px_80px_rgba(20,16,10,0.18)]"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 shrink-0 bg-[linear-gradient(180deg,#ffffff_0%,#F4FBFA_100%)] px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
              <button
                type="button"
                onClick={closeConsultation}
                className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-[#DDECEB] bg-[#F4FBFA]/95 text-[#252A2A] transition-colors hover:bg-[#EFF9F8] sm:right-6 sm:top-6"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#009E98]">
                Request Consultation
              </p>
              <h2
                id="consultation-title"
                className="mt-3 pr-10 text-2xl font-medium tracking-[-0.03em] text-[#252A2A] sm:text-3xl"
              >
                Speak with a Shreem Controls specialist
              </h2>
            </div>

            <div
              ref={scrollRef}
              data-lenis-prevent
              className="scrollbar-hidden min-h-0 overflow-y-auto overscroll-contain px-6 pb-6 sm:px-8 sm:pb-8"
            >
              <EnquiryForm key={JSON.stringify(context)} showIntro={false} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
