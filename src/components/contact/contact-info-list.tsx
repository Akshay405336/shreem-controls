import { Globe, Mail, MapPin, Phone } from "lucide-react";

import { SocialIconLinks } from "@/components/contact/social-icon-links";
import { contactConfig } from "@/config/contact";
import { cn } from "@/lib/cn";

type ContactInfoListProps = {
  tone?: "light" | "dark";
  className?: string;
  showCompany?: boolean;
  showSocials?: boolean;
};

export function ContactInfoList({
  tone = "light",
  className,
  showCompany = true,
  showSocials = true,
}: ContactInfoListProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("space-y-4", className)}>
      {showCompany && (
        <div>
          <p
            className={cn(
              "text-sm font-semibold tracking-wide",
              isDark ? "text-white" : "text-[#252A2A]",
            )}
          >
            {contactConfig.companyName}
          </p>
          <p
            className={cn(
              "mt-1 text-xs leading-relaxed",
              isDark ? "text-white/60" : "text-[#737B7A]",
            )}
          >
            {contactConfig.tagline}
          </p>
          <p
            className={cn(
              "mt-2 text-[10px] font-semibold uppercase tracking-[0.2em]",
              isDark ? "text-[#73BDB8]" : "text-[#009E98]",
            )}
          >
            {contactConfig.category}
          </p>
        </div>
      )}

      <ul className="space-y-3">
        <li>
          <ContactRow
            tone={tone}
            icon={Phone}
            label="Phone"
            href={`tel:${contactConfig.phoneTel}`}
          >
            {contactConfig.phone}
          </ContactRow>
        </li>
        <li>
          <ContactRow
            tone={tone}
            icon={Mail}
            label="Email"
            href={`mailto:${contactConfig.email}`}
          >
            {contactConfig.email}
          </ContactRow>
        </li>
        <li>
          <ContactRow tone={tone} icon={MapPin} label="Address">
            <span className="text-pretty break-words">{contactConfig.address}</span>
          </ContactRow>
        </li>
        <li>
          <ContactRow
            tone={tone}
            icon={Globe}
            label="Website"
            href={contactConfig.websiteUrl}
            external
          >
            {contactConfig.websiteLabel}
          </ContactRow>
        </li>
      </ul>

      {showSocials ? (
        <div>
          <p
            className={cn(
              "mb-2.5 text-[9px] font-semibold uppercase tracking-[0.16em]",
              isDark ? "text-[#73BDB8]" : "text-[#009E98]",
            )}
          >
            Follow us
          </p>
          <SocialIconLinks tone={tone} />
        </div>
      ) : null}
    </div>
  );
}

function ContactRow({
  tone,
  icon: Icon,
  label,
  href,
  external,
  children,
}: {
  tone: "light" | "dark";
  icon: typeof Phone;
  label: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const isDark = tone === "dark";
  const content = (
    <>
      <Icon
        className={cn("mt-0.5 size-4 shrink-0", isDark ? "text-[#73BDB8]" : "text-[#009E98]")}
        strokeWidth={1.6}
        aria-hidden
      />
      <span>
        <span
          className={cn(
            "block text-[9px] font-semibold uppercase tracking-[0.16em]",
            isDark ? "text-[#73BDB8]" : "text-[#009E98]",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-sm",
            isDark ? "text-white/80" : "text-[#252A2A]",
          )}
        >
          {children}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "flex gap-3 transition-colors",
          isDark ? "hover:text-white" : "hover:text-[#009E98]",
        )}
      >
        {content}
      </a>
    );
  }

  return <div className="flex gap-3">{content}</div>;
}
