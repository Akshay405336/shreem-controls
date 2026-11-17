"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/cn";

const faqItems = [
  {
    question: "How do I book a smart-home consultation?",
    answer:
      "Use the enquiry form on the Contact page or the consultation CTA across the site. A specialist will follow up to understand your space, priorities and timeline.",
  },
  {
    question: "Can Shreem Controls work with my existing wiring?",
    answer:
      "Many interfaces are designed for premium retrofits and new builds. Final compatibility is confirmed during a site review and technical assessment.",
  },
  {
    question: "Do you support whole-home automation?",
    answer:
      "Yes—lighting, climate interfaces, curtains, entertainment and security can be orchestrated through scenes and central control points.",
  },
  {
    question: "Where can I see product specifications?",
    answer:
      "Visit the Products section for control panels, knobs and switches, including feature lists and specification placeholders ready for approved data.",
  },
];

export function ResourceFaqPanel() {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-[16px] border border-[#DDECEB] bg-white shadow-[0_4px_18px_rgba(37,42,42,0.04)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-[15px] leading-snug text-[#252A2A] sm:text-[16px]">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-[#009E98] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.35,
                ease: "easeOut",
              }}
              className="overflow-hidden"
            >
              <p className="border-t border-[#DDECEB]/80 px-5 pb-4 pt-3 text-[12px] leading-[1.75] text-[#737B7A] sm:text-[13px]">
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
