"use client";

import { useState, type DragEvent } from "react";
import {
  Check,
  Edit,
  Eye,
  GripVertical,
  Image as ImageIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import { formatBytes, formatDate } from "@/lib/gallery/utils";
import type { GalleryImageDto } from "@/lib/gallery/types";

interface GalleryTableProps {
  items: GalleryImageDto[];
  isLoading: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onReorder: (newItems: GalleryImageDto[]) => Promise<void>;
  onEdit: (image: GalleryImageDto) => void;
  onDelete: (image: GalleryImageDto) => void;
  onPreview: (image: GalleryImageDto) => void;
  onStatusToggle: (image: GalleryImageDto) => Promise<void>;
  isReorderEnabled: boolean;
  onAddNew: () => void;
}

export function GalleryTable({
  items,
  isLoading,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onReorder,
  onEdit,
  onDelete,
  onPreview,
  onStatusToggle,
  isReorderEnabled,
  onAddNew,
}: GalleryTableProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const isAllSelected =
    items.length > 0 && items.every((img) => selectedIds.has(img.id));
  const isPartiallySelected =
    items.length > 0 &&
    items.some((img) => selectedIds.has(img.id)) &&
    !isAllSelected;

  const handleDragStart = (
    e: DragEvent<HTMLTableRowElement>,
    index: number,
  ) => {
    if (!isReorderEnabled) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: DragEvent<HTMLTableRowElement>, index: number) => {
    if (!isReorderEnabled || draggedIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    // Keep hover state stable
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (
    e: DragEvent<HTMLTableRowElement>,
    targetIndex: number,
  ) => {
    e.preventDefault();
    if (
      !isReorderEnabled ||
      draggedIndex === null ||
      draggedIndex === targetIndex
    ) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...items];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    setDraggedIndex(null);
    setDragOverIndex(null);

    await onReorder(reordered);
  };

  const handleToggleStatus = async (image: GalleryImageDto) => {
    if (togglingId) return;
    setTogglingId(image.id);
    try {
      await onStatusToggle(image);
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
                <th className="w-10 px-3 py-3" />
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                  Image
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                  Title
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                  File Size
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                  Status
                </th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                  Uploaded
                </th>
                <th className="px-4 py-3 text-right text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAF0EF] bg-white">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-3 py-3">
                    <div className="h-3.5 w-3.5 rounded bg-[#DDECEB]/70" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-3.5 w-3.5 rounded bg-[#DDECEB]/70" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-10 w-14 rounded-lg bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-40 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-24 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-20 rounded-full bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-24 rounded bg-[#DDECEB]/60" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-block h-6 w-20 rounded bg-[#DDECEB]/60" />
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
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF9F8] text-[#009E98] mb-3.5">
          <ImageIcon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-[16px] font-medium text-[#252A2A]">
          No gallery images found
        </h3>
        <p className="mt-1.5 text-[13px] text-[#71817F] max-w-sm leading-relaxed">
          Get started by adding your first photo to the ShreemControls website
          gallery.
        </p>
        <button
          type="button"
          onClick={onAddNew}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-4 py-2 text-[13px] font-medium text-white shadow-xs hover:opacity-95 transition-all"
        >
          Add Photo
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E2ECEB] bg-white shadow-[0_2px_12px_rgba(24,64,61,0.045)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* ShreemControls Branded Table Header with Elegant Typography */}
          <thead className="border-b border-[#E2ECEB] bg-[#F8FAFA]">
            <tr>
              {/* 1. Drag Handle Column */}
              <th
                className="w-10 px-3 py-3 text-center"
                title="Drag to reorder images"
              >
                <span className="sr-only">Reorder</span>
              </th>

              {/* 2. Checkbox Column */}
              <th className="w-10 px-3 py-3 text-center">
                <input
                  type="checkbox"
                  aria-label="Select all images on this page"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-[#E2ECEB] text-[#009E98] accent-[#009E98] focus:ring-[#009E98]"
                />
              </th>

              {/* 3. Image Thumbnail */}
              <th className="w-24 px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Image
              </th>

              {/* 4. Image Title */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Image Title
              </th>

              {/* 5. File Size */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                File Size
              </th>

              {/* 6. Publication Status */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Publication Status
              </th>

              {/* 7. Uploaded Date */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Uploaded Date
              </th>

              {/* 8. Actions */}
              <th className="px-4 py-3 text-right text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Data Rows with Refined Typography */}
          <tbody className="divide-y divide-[#EAF0EF] bg-white">
            {items.map((image, index) => {
              const isSelected = selectedIds.has(image.id);
              const isBeingDragged = draggedIndex === index;
              const isDragOver = dragOverIndex === index;

              return (
                <tr
                  key={image.id}
                  draggable={isReorderEnabled}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`group transition-colors ${
                    isBeingDragged
                      ? "opacity-30 bg-[#F5FAF9]"
                      : isDragOver
                        ? "border-t-2 border-[#009E98] bg-[#EFF9F8]"
                        : isSelected
                          ? "bg-[#EFF9F8] hover:bg-[#E5F5F3]"
                          : "hover:bg-[#F5FAF9]"
                  }`}
                >
                  {/* 1. Drag Handle */}
                  <td className="px-3 py-3 text-center">
                    <div
                      className={`inline-flex items-center justify-center rounded p-1.5 text-[#71817F]/60 ${
                        isReorderEnabled
                          ? "cursor-grab active:cursor-grabbing hover:bg-[#EFF9F8] hover:text-[#009E98]"
                          : "cursor-not-allowed opacity-30"
                      }`}
                      title={
                        isReorderEnabled
                          ? "Drag to reorder"
                          : "Clear search & filters to enable reordering"
                      }
                    >
                      <GripVertical className="h-3.5 w-3.5" />
                    </div>
                  </td>

                  {/* 2. Row Checkbox */}
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      aria-label={`Select ${image.title}`}
                      checked={isSelected}
                      onChange={() => onToggleSelect(image.id)}
                      className="h-4 w-4 rounded border-[#E2ECEB] text-[#009E98] accent-[#009E98] focus:ring-[#009E98]"
                    />
                  </td>

                  {/* 3. Image Thumbnail */}
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onPreview(image)}
                      className="group/thumb relative block h-10 w-14 overflow-hidden rounded-lg border border-[#E2ECEB] bg-[#F5FAF9] shadow-2xs hover:border-[#009E98] transition-colors"
                      title="Click to preview full image"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover/thumb:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity group-hover/thumb:opacity-100">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  </td>

                  {/* 4. Image Title */}
                  <td className="px-4 py-3">
                    <div className="max-w-xs text-[13px] font-bold text-[#252A2A] truncate">
                      {image.title}
                    </div>
                    <div className="text-[11px] text-[#81908E] font-mono truncate mt-0.5">
                      {image.imageFileName}
                    </div>
                  </td>

                  {/* 5. File Size & Dimensions */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-[13px] font-medium text-[#252A2A]">
                      {formatBytes(image.imageSize)}
                    </div>
                    <div className="text-[11px] text-[#81908E] font-mono mt-0.5">
                      {image.width} × {image.height} px
                    </div>
                  </td>

                  {/* 6. Publication Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(image)}
                      disabled={togglingId === image.id}
                      title="Click to toggle status"
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all hover:opacity-85 disabled:opacity-50 ${
                        image.status === "PUBLISHED"
                          ? "bg-[#EFF9F8] text-[#087F7B] border border-[#B3E5E3]"
                          : "bg-[#F3F8F7] text-[#71817F] border border-[#E2ECEB]"
                      }`}
                    >
                      {togglingId === image.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : image.status === "PUBLISHED" ? (
                        <Check className="h-3 w-3 text-[#009E98]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#737B7A]/60" />
                      )}
                      <span>
                        {image.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </button>
                  </td>

                  {/* 7. Uploaded Date */}
                  <td className="px-4 py-3 whitespace-nowrap text-[12px] text-[#71817F]">
                    {formatDate(image.createdAt)}
                  </td>

                  {/* 8. Actions (Preview, Edit, Delete) */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      {/* Preview Button */}
                      <button
                        type="button"
                        onClick={() => onPreview(image)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#252A2A] transition-colors hover:bg-[#252A2A]/10 hover:text-black"
                        title="Preview image"
                        aria-label="Preview image"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => onEdit(image)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-amber-500 transition-colors hover:bg-amber-50 hover:text-amber-600"
                        title="Edit image"
                        aria-label="Edit image"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDelete(image)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete image"
                        aria-label="Delete image"
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
