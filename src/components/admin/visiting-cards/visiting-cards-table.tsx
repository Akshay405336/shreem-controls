"use client";

import { useState } from "react";
import {
  SquarePen,
  Eye,
  Check,
  Loader2,
  IdCard,
  Power,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/gallery/utils";
import type { VisitingCardDto } from "@/lib/visiting-cards/types";

interface VisitingCardsTableProps {
  items: VisitingCardDto[];
  isLoading: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (card: VisitingCardDto) => void;
  onDelete: (card: VisitingCardDto) => void;
  onView: (card: VisitingCardDto) => void;
  onStatusToggle: (card: VisitingCardDto) => Promise<void>;
  onAddNew: () => void;
}

export function VisitingCardsTable({
  items,
  isLoading,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
  onView,
  onStatusToggle,
  onAddNew,
}: VisitingCardsTableProps) {
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const isAllSelected =
    items.length > 0 && items.every((card) => selectedIds.has(card.id));

  const isPartiallySelected =
    items.length > 0 &&
    items.some((card) => selectedIds.has(card.id)) &&
    !isAllSelected;

  const handleToggleStatus = async (card: VisitingCardDto) => {
    if (togglingId) return;
    setTogglingId(card.id);
    try {
      await onStatusToggle(card);
    } finally {
      setTogglingId(null);
    }
  };

  if (isLoading && items.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-[#E2ECEB] bg-white shadow-[0_2px_12px_rgba(24,64,61,0.045)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#E2ECEB] bg-[#F3F8F7] text-[#71817F]">
              <tr>
                <th className="w-10 px-3 py-3" />
                <th className="w-16 px-4 py-3" />
                <th className="px-4 py-3 text-[12px] font-semibold">Name</th>
                <th className="px-4 py-3 text-[12px] font-semibold">Designation</th>
                <th className="px-4 py-3 text-[12px] font-semibold">Company</th>
                <th className="px-4 py-3 text-[12px] font-semibold">Slug</th>
                <th className="w-16 px-4 py-3 text-[12px] font-semibold">QR</th>
                <th className="px-4 py-3 text-[12px] font-semibold">Status</th>
                <th className="px-4 py-3 text-[12px] font-semibold">Created</th>
                <th className="px-4 py-3 text-right text-[12px] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAF0EF] bg-white">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-3 py-3">
                    <div className="h-3.5 w-3.5 rounded bg-[#DDECEB]/70" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 rounded-full bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-32 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-24 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-28 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-20 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-16 rounded-full bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-24 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-block h-6 w-24 rounded bg-[#DDECEB]/60" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E2ECEB] bg-white p-10 text-center shadow-xs">
        <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF9F8] text-[#009E98]">
          <IdCard className="h-6 w-6" />
        </div>
        <h3 className="font-display text-[16px] font-medium text-[#252A2A]">
          No visiting cards found
        </h3>
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-[#71817F]">
          Create digital visiting cards with profile photos, contact details, and QR
          codes for your team.
        </p>
        <button
          type="button"
          onClick={onAddNew}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-4 py-2 text-[13px] font-medium text-white shadow-xs transition-all hover:opacity-95"
        >
          + Add Visiting Card
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E2ECEB] bg-white shadow-[0_2px_12px_rgba(24,64,61,0.045)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-[#E2ECEB] bg-[#F8FAFA]">
            <tr>
              <th className="w-10 px-3 py-3 text-center">
                <input
                  type="checkbox"
                  aria-label="Select all visiting cards on this page"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-[#E2ECEB] text-[#009E98] accent-[#009E98] focus:ring-[#009E98]"
                />
              </th>
              <th className="w-16 px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Photo
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Full Name
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Designation
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Company
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Public URL
              </th>
              <th className="w-16 px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                QR
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Status
              </th>
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Created Date
              </th>
              <th className="px-4 py-3 text-right text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAF0EF] bg-white">
            {items.map((card) => {
              const isSelected = selectedIds.has(card.id);
              const isTogglingThis = togglingId === card.id;
              const isActive = card.status === "ACTIVE";
              const qrSrc = `/api/admin/visiting-cards/${card.id}/qr`;

              return (
                <tr
                  key={card.id}
                  className={`group transition-colors ${
                    isSelected
                      ? "bg-[#EFF9F8] hover:bg-[#E5F5F3]"
                      : "hover:bg-[#F5FAF9]"
                  }`}
                >
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      aria-label={`Select ${card.fullName}`}
                      checked={isSelected}
                      onChange={() => onToggleSelect(card.id)}
                      className="h-4 w-4 rounded border-[#E2ECEB] text-[#009E98] accent-[#009E98] focus:ring-[#009E98]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-[#E2ECEB] bg-[#F5FAF9] shadow-2xs">
                      {card.profilePhotoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={card.profilePhotoUrl}
                          alt={card.fullName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#737B7A]">
                          <IdCard className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-[140px] truncate text-[13px] font-medium text-[#252A2A]">
                      {card.fullName}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-[120px] truncate text-[12px] text-[#71817F]">
                      {card.designation || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-[120px] truncate text-[12px] text-[#71817F]">
                      {card.companyName || "—"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a
                      href={`/${card.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#087F7B] hover:underline"
                      title={`Open /${card.slug}`}
                    >
                      /{card.slug}
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrSrc}
                      alt={`QR code for ${card.fullName}`}
                      className="h-10 w-10 rounded border border-[#E2ECEB] bg-white object-contain p-0.5"
                      loading="lazy"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(card)}
                      disabled={isTogglingThis}
                      title="Click to toggle status"
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all hover:opacity-85 disabled:opacity-50 ${
                        isActive
                          ? "border-[#B3E5E3] bg-[#EFF9F8] text-[#087F7B]"
                          : "border-[#E2ECEB] bg-[#F3F8F7] text-[#71817F]"
                      }`}
                    >
                      {isTogglingThis ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : isActive ? (
                        <Check className="h-3 w-3 text-[#009E98]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#737B7A]/60" />
                      )}
                      <span>{isActive ? "Active" : "Inactive"}</span>
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[12px] text-[#71817F]">
                    {formatDate(card.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onView(card)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#252A2A] transition-colors hover:bg-[#252A2A]/10"
                        title="View card"
                        aria-label="View card"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(card)}
                        disabled={isTogglingThis}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors disabled:opacity-50 ${
                          isActive
                            ? "text-green-600 hover:bg-green-50"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={isActive ? "Deactivate" : "Activate"}
                        aria-label={isActive ? "Deactivate" : "Activate"}
                      >
                        {isTogglingThis ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Power className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(card)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-orange-500 transition-colors hover:bg-orange-50"
                        title="Edit card"
                        aria-label="Edit card"
                      >
                        <SquarePen className="h-3 w-3" strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(card)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                        title="Delete card"
                        aria-label="Delete card"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}