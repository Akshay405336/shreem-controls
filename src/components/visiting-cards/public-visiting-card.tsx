"use client";

import Image from "next/image";
import { CmsUploadImage, isCmsUploadImagePath } from "@/components/media/cms-upload-image";
import { Download, Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { VisitingCardDto } from "@/lib/visiting-cards/types";
import {
  getPlatformVisual,
  IconBadge,
  SocialBrandIcon,
} from "@/components/visiting-cards/platform-brand-icons";
import { VisitingCardFooter } from "@/components/visiting-cards/visiting-card-footer";

type PublicVisitingCardProps = {
  card: VisitingCardDto;
  publicUrl: string;
};

const actionBase =
  "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function PublicVisitingCard({ card, publicUrl }: PublicVisitingCardProps) {
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const telHref = card.phone ? `tel:${card.phone.replace(/\s+/g, "")}` : undefined;
  const whatsappHref = card.whatsapp
    ? `https://wa.me/${card.whatsapp.replace(/[^\d+]/g, "")}`
    : undefined;
  const mailHref = card.email ? `mailto:${card.email}` : undefined;

  const vcfHref = useMemo(() => `/api/visiting-cards/${card.slug}/vcf`, [card.slug]);

  const socialLinks = useMemo(
    () => card.socialLinks.filter((link) => link.url.trim()),
    [card.socialLinks],
  );

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: card.fullName,
          text: card.shortDescription || `${card.fullName} — digital visiting card`,
          url: publicUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(publicUrl);
      setShareMessage("Link copied to clipboard.");
      setTimeout(() => setShareMessage(null), 3000);
    } catch {
      setShareMessage("Could not share. Copy the URL from your browser.");
      setTimeout(() => setShareMessage(null), 3000);
    }
  }, [card.fullName, card.shortDescription, publicUrl]);

  const hasCompanyCover = Boolean(card.companyLogoUrl);

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-10 pt-[var(--inner-page-hero-offset)] sm:pb-14">
      <article className="relative overflow-hidden rounded-[24px] border border-[#DDECEB] bg-white shadow-[0_12px_40px_rgba(37,42,42,0.08)]">
        <div className="relative z-0 aspect-video w-full min-h-[9rem] sm:min-h-[10.5rem]">
          {hasCompanyCover ? (
            isCmsUploadImagePath(card.companyLogoUrl!) ? (
              <CmsUploadImage
                src={card.companyLogoUrl!}
                alt={card.companyName ? `${card.companyName} cover` : "Company cover"}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 576px"
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <Image
                src={card.companyLogoUrl!}
                alt={card.companyName ? `${card.companyName} cover` : "Company cover"}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 576px"
                className="h-full w-full object-cover object-center"
              />
            )
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#009E98] via-[#00847F] to-[#006E6A]"
              aria-hidden
            />
          )}

          {card.companyName && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-4 pt-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/95">
                {card.companyName}
              </p>
            </div>
          )}
        </div>

        <div className="relative z-10 px-6 pb-8">
          <div className="-mt-14 mx-auto flex h-28 w-28 justify-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-white bg-[#F4FBFA] shadow-md ring-1 ring-black/5">
              {card.profilePhotoUrl ? (
                isCmsUploadImagePath(card.profilePhotoUrl) ? (
                  <CmsUploadImage
                    src={card.profilePhotoUrl}
                    alt={card.fullName}
                    fill
                    className="object-cover object-center"
                    sizes="112px"
                    priority
                  />
                ) : (
                  <Image
                    src={card.profilePhotoUrl}
                    alt={card.fullName}
                    fill
                    className="object-cover object-center"
                    sizes="112px"
                    priority
                  />
                )
              ) : (
                <div className="flex h-full items-center justify-center text-2xl font-bold text-[#009E98]">
                  {card.fullName.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#252A2A]">
              {card.fullName}
            </h1>
            {card.designation && (
              <p className="mt-1 text-sm font-semibold text-[#009E98]">{card.designation}</p>
            )}
            {card.department && (
              <p className="mt-0.5 text-xs text-[#737B7A]">{card.department}</p>
            )}
            {card.shortDescription && (
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#5C6664]">
                {card.shortDescription}
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {telHref && (
              <a
                href={telHref}
                className={`${actionBase} border border-emerald-200/80 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 focus-visible:outline-emerald-500`}
              >
                <IconBadge className="h-7 w-7 rounded-lg bg-emerald-500 text-white">
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                </IconBadge>
                Call
              </a>
            )}
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionBase} border border-[#25D366]/30 bg-[#E8F8EF] text-[#128C7E] hover:bg-[#D9F5E7] focus-visible:outline-[#25D366]`}
              >
                <IconBadge className="h-7 w-7 rounded-lg bg-[#25D366] text-white">
                  <SocialBrandIcon platformKey="whatsapp" className="h-3.5 w-3.5" />
                </IconBadge>
                WhatsApp
              </a>
            )}
            {mailHref && (
              <a
                href={mailHref}
                className={`${actionBase} border border-rose-200 bg-rose-50 text-rose-900 hover:bg-rose-100 focus-visible:outline-rose-400`}
              >
                <IconBadge className="h-7 w-7 rounded-lg bg-rose-500 text-white">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                </IconBadge>
                Email
              </a>
            )}
            {card.companyWebsite && (
              <a
                href={card.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionBase} border border-blue-200 bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:outline-blue-500`}
              >
                <IconBadge className="h-7 w-7 rounded-lg bg-blue-600 text-white">
                  <Globe className="h-3.5 w-3.5" aria-hidden />
                </IconBadge>
                Website
              </a>
            )}
            <a
              href={vcfHref}
              download
              className={`${actionBase} border border-[#009E98]/30 bg-[#EFF9F8] text-[#006E6A] hover:bg-[#E0F5F3] focus-visible:outline-[#009E98]`}
            >
              <IconBadge className="h-7 w-7 rounded-lg bg-[#009E98] text-white">
                <Download className="h-3.5 w-3.5" aria-hidden />
              </IconBadge>
              Save Contact
            </a>
            <button
              type="button"
              onClick={handleShare}
              className={`${actionBase} border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 focus-visible:outline-slate-400`}
            >
              <IconBadge className="h-7 w-7 rounded-lg bg-blue-500 text-white">
                <Share2 className="h-3.5 w-3.5" aria-hidden />
              </IconBadge>
              Share
            </button>
          </div>

          {shareMessage && (
            <p className="mt-3 text-center text-xs font-medium text-[#009E98]">{shareMessage}</p>
          )}

          {(card.phone || card.email || card.companyWebsite || card.companyAddress) && (
            <div className="mt-6 space-y-3 rounded-2xl border border-[#DDECEB] bg-gradient-to-b from-[#FAFCFC] to-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              {card.phone && (
                <a
                  href={telHref}
                  className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-white"
                >
                  <IconBadge className="bg-emerald-100 text-emerald-600">
                    <Phone className="h-4 w-4" aria-hidden />
                  </IconBadge>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#879491]">
                      Phone
                    </p>
                    <p className="truncate text-sm font-medium text-[#252A2A] group-hover:text-emerald-700">
                      {card.phone}
                    </p>
                  </div>
                </a>
              )}
              {card.email && (
                <a
                  href={mailHref}
                  className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-white"
                >
                  <IconBadge className="bg-rose-100 text-rose-600">
                    <Mail className="h-4 w-4" aria-hidden />
                  </IconBadge>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#879491]">
                      Email
                    </p>
                    <p className="truncate text-sm font-medium text-[#252A2A] group-hover:text-rose-700">
                      {card.email}
                    </p>
                  </div>
                </a>
              )}
              {card.companyWebsite && (
                <a
                  href={card.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-white"
                >
                  <IconBadge className="bg-blue-100 text-blue-600">
                    <Globe className="h-4 w-4" aria-hidden />
                  </IconBadge>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#879491]">
                      Website
                    </p>
                    <p className="truncate text-sm font-medium text-[#252A2A] group-hover:text-blue-700">
                      {card.companyWebsite.replace(/^https?:\/\//, "")}
                    </p>
                  </div>
                </a>
              )}
              {card.companyAddress && (
                <div className="flex items-start gap-3 rounded-xl p-2">
                  <IconBadge className="bg-orange-100 text-orange-600">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </IconBadge>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#879491]">
                      Address
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-[#252A2A]">
                      {card.companyAddress}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-[#879491]">
                Connect on social
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {socialLinks.map((link) => {
                  const visual = getPlatformVisual(link.platform);
                  return (
                    <a
                      key={`${link.platform}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${visual.label}: ${link.platform}`}
                      aria-label={`${link.platform} profile`}
                      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-md transition-all duration-200 ${visual.circleClass} ${visual.iconClass} ${visual.hoverClass}`}
                    >
                      <SocialBrandIcon platformKey={link.platform} className="h-[18px] w-[18px]" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <VisitingCardFooter />
      </article>
    </div>
  );
}