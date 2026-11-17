"use client";

import { whatsAppContact } from "@/config/contact";
import { cn } from "@/lib/cn";

function WhatsAppBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-[55] min-[400px]:bottom-4 min-[400px]:right-4 md:bottom-6 md:right-6">
      <a
        href={whatsAppContact.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Shreem Controls on WhatsApp"
        className={cn(
          "pointer-events-auto group relative flex items-center justify-end gap-2 outline-none",
          "focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFA]",
        )}
      >
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+10px)] right-0 hidden w-max max-w-[220px] rounded-lg bg-[#252A2A] px-3 py-2 text-[11px] font-medium leading-snug text-white opacity-0 shadow-[0_8px_24px_rgba(37,42,42,0.18)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
        >
          Chat with us on WhatsApp
          <span
            aria-hidden
            className="absolute -bottom-1 right-5 size-2 rotate-45 bg-[#252A2A]"
          />
        </span>

        <span
          className={cn(
            "pointer-events-none hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white px-0 py-2 text-[12px] font-medium text-[#252A2A] opacity-0 shadow-[0_6px_20px_rgba(37,42,42,0.1)] transition-all duration-300 ease-out",
            "group-hover:max-w-[120px] group-hover:px-3 group-hover:opacity-100 group-focus-visible:max-w-[120px] group-focus-visible:px-3 group-focus-visible:opacity-100 md:inline-block",
          )}
        >
          Let&apos;s Chat
        </span>

        <span
          className={cn(
            "relative flex size-[50px] shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform duration-300 ease-out",
            "group-hover:scale-105 group-focus-visible:scale-105 min-[400px]:size-[54px] md:size-[58px]",
            "motion-safe:before:absolute motion-safe:before:inset-0 motion-safe:before:animate-[whatsapp-pulse_2.8s_ease-out_infinite] motion-safe:before:rounded-full motion-safe:before:bg-[#25D366]/40 motion-safe:before:content-['']",
          )}
        >
          <WhatsAppBrandIcon className="relative z-[1] size-7 md:size-[30px]" />
        </span>
      </a>
    </div>
  );
}
