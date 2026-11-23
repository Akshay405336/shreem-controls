"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Mail,
  Phone,
  Building2,
  Globe,
  MapPin,
} from "lucide-react";
import { formatDate } from "@/lib/gallery/utils";
import type { VisitingCardDto } from "@/lib/visiting-cards/types";

interface VisitingCardViewModalProps {
  isOpen: boolean;
  card: VisitingCardDto | null;
  onClose: () => void;
}

export function VisitingCardViewModal({
  isOpen,
  card,
  onClose,
}: VisitingCardViewModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !card) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, card]);

  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  const publicPath = card ? `/${card.slug}` : "";
  const publicUrl =
    typeof window !== "undefined" && card
      ? `${window.location.origin}${publicPath}`
      : publicPath;

  const handleCopyUrl = useCallback(async () => {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [publicUrl]);

  if (!isOpen || !card) return null;

  const qrSrc = `/api/admin/visiting-cards/${card.id}/qr`;
  const isActive = card.status === "ACTIVE";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col rounded-2xl border border-[#DDECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden"
      >
        <div className="shrink-0 flex items-center justify-between border-b border-[#DDECEB] px-5 sm:px-6 py-4 bg-white">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold ${
                isActive
                  ? "border-[#B3E5E3] bg-[#EFF9F8] text-[#087F7B]"
                  : "border-[#DDECEB] bg-[#F8FAFA] text-[#737B7A]"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
            <span className="font-mono text-[12px] text-[#737B7A]">/{card.slug}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] hover:border-[#009E98] hover:bg-[#EFF9F8]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5 space-y-5 overscroll-contain"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-[#DDECEB] bg-[#F4FBFA] shadow-xs">
              {card.profilePhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.profilePhotoUrl}
                  alt={card.fullName}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-display text-[22px] font-bold text-[#252A2A]">
                {card.fullName}
              </h2>
              {card.designation && (
                <p className="mt-0.5 text-[14px] text-[#52615F]">{card.designation}</p>
              )}
              {card.department && (
                <p className="text-[12px] text-[#737B7A]">{card.department}</p>
              )}
              {card.shortDescription && (
                <p className="mt-2 text-[13px] leading-relaxed text-[#71817F]">
                  {card.shortDescription}
                </p>
              )}
              <p className="mt-2 text-[12px] text-[#737B7A]">
                Created {formatDate(card.createdAt)}
              </p>
            </div>
          </div>

          {(card.companyName ||
            card.companyWebsite ||
            card.companyAddress ||
            card.companyLogoUrl) && (
            <div className="rounded-xl border border-[#DDECEB] bg-[#F8FAFA] p-4 space-y-2">
              <h3 className="text-[13px] font-bold text-[#252A2A] flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#009E98]" />
                Company
              </h3>
              {card.companyLogoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.companyLogoUrl}
                  alt={card.companyName || "Company logo"}
                  className="h-10 max-w-[120px] object-contain"
                />
              )}
              {card.companyName && (
                <p className="text-[14px] font-medium text-[#252A2A]">{card.companyName}</p>
              )}
              {card.companyWebsite && (
                <a
                  href={card.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[13px] text-[#009E98] hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {card.companyWebsite}
                </a>
              )}
              {card.companyAddress && (
                <p className="flex items-start gap-1.5 text-[13px] text-[#737B7A]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#009E98]" />
                  {card.companyAddress}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-[13px] text-[#52615F]">
            {card.phone && (
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#009E98]" />
                {card.phone}
              </p>
            )}
            {card.whatsapp && (
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#009E98]" />
                WhatsApp: {card.whatsapp}
              </p>
            )}
            {card.altPhone && (
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#009E98]" />
                Alt: {card.altPhone}
              </p>
            )}
            {card.email && (
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#009E98]" />
                {card.email}
              </p>
            )}
          </div>

          {card.socialLinks.length > 0 && (
            <SocialLinksSummary links={card.socialLinks} />
          )}

          <div className="rounded-xl border border-[#DDECEB] bg-white p-4">
            <h3 className="text-[13px] font-bold text-[#252A2A] mb-3">Public URL</h3>
            <div className="flex flex-wrap items-center gap-2">
              <code className="flex-1 min-w-0 truncate rounded-lg border border-[#DDECEB] bg-[#F4FBFA] px-3 py-2 font-mono text-[12px] text-[#087F7B]">
                {publicUrl}
              </code>
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDECEB] bg-white px-3 py-2 text-[12px] font-medium text-[#252A2A] hover:border-[#009E98] hover:bg-[#EFF9F8]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#009E98]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
              {isActive && (
                <Link
                  href={publicPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-3 py-2 text-[12px] font-medium text-white"
                >
                  Open
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-[#DDECEB] bg-[#F8FAFA] p-5">
            <h3 className="text-[13px] font-bold text-[#252A2A] mb-3 self-start w-full">
              QR Code
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt={`QR code for ${card.fullName}`}
              className="h-48 w-48 rounded-lg border border-[#DDECEB] bg-white object-contain p-2 shadow-xs"
            />
            <p className="mt-2 text-center text-[12px] text-[#737B7A]">
              Scan to open the public visiting card page
            </p>
          </div>
        </div>

        <div className="shrink-0 flex justify-end border-t border-[#DDECEB] px-5 sm:px-6 py-3 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#DDECEB] bg-white px-4 py-2 text-[13px] font-medium text-[#252A2A] hover:bg-[#F4FBFA]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function SocialLinksSummary({
  links,
}: {
  links: { platform: string; url: string }[];
}) {
  return (
    <div className="rounded-xl border border-[#DDECEB] p-4">
      <h3 className="text-[13px] font-bold text-[#252A2A] mb-2">Social links</h3>
      <ul className="space-y-1.5">
        {links.map((link, i) => (
          <li key={`${link.platform}-${i}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#009E98] hover:underline"
            >
              {link.platform}: {link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}