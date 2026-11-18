"use client";

import { useState, type DragEvent } from "react";
import {
  Check,
  Edit2,
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

  const isAllSelected = items.length > 0 && items.every((img) => selectedIds.has(img.id));
  const isPartiallySelected =
    items.length > 0 && items.some((img) => selectedIds.has(img.id)) && !isAllSelected;

  const handleDragStart = (e: DragEvent<HTMLTableRowElement>, index: number) => {
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

  const handleDrop = async (e: DragEvent<HTMLTableRowElement>, targetIndex: number) => {
    e.preventDefault();
    if (!isReorderEnabled || draggedIndex === null || draggedIndex === targetIndex) {
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
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-white text-slate-500">
              <tr>
                <th className="w-10 px-3 py-3.5" />
                <th className="w-10 px-3 py-3.5" />
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Image
                </th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Title
                </th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  File Size
                </th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Uploaded
                </th>
                <th className="px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-[#FBFBFC]">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-3 py-3.5"><div className="h-4 w-4 rounded bg-slate-200" /></td>
                  <td className="px-3 py-3.5"><div className="h-4 w-4 rounded bg-slate-200" /></td>
                  <td className="px-4 py-3.5"><div className="h-10 w-14 rounded-md bg-slate-200" /></td>
                  <td className="px-4 py-3.5"><div className="h-4 w-36 rounded bg-slate-200" /></td>
                  <td className="px-4 py-3.5"><div className="h-4 w-24 rounded bg-slate-200" /></td>
                  <td className="px-4 py-3.5"><div className="h-5 w-16 rounded-full bg-slate-200" /></td>
                  <td className="px-4 py-3.5"><div className="h-4 w-20 rounded bg-slate-200" /></td>
                  <td className="px-4 py-3.5 text-right"><div className="inline-block h-6 w-20 rounded bg-slate-200" /></td>
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
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F5FA] text-[#0F172A] mb-3">
          <ImageIcon className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-[#0F172A]">No gallery images found</h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          Get started by adding your first photo to the ShreemControls website gallery.
        </p>
        <button
          type="button"
          onClick={onAddNew}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800 transition-colors"
        >
          Add Photo
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          {/* CRM White Table Header with Uppercase Muted Column Headings */}
          <thead className="border-b border-slate-200 bg-white text-slate-500">
            <tr>
              {/* 1. Drag Handle Column */}
              <th className="w-9 px-2 py-3.5 text-center" title="Drag to reorder images">
                <span className="sr-only">Reorder</span>
              </th>

              {/* 2. Checkbox Column */}
              <th className="w-9 px-2 py-3.5 text-center">
                <input
                  type="checkbox"
                  aria-label="Select all images on this page"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="rounded border-slate-300 text-black accent-black focus:ring-black"
                />
              </th>

              {/* 3. Image Thumbnail */}
              <th className="w-20 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Image
              </th>

              {/* 4. Image Title */}
              <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Image Title
              </th>

              {/* 5. File Size */}
              <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                File Size
              </th>

              {/* 6. Publication Status */}
              <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Publication Status
              </th>

              {/* 7. Uploaded Date */}
              <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Uploaded Date
              </th>

              {/* 8. Actions */}
              <th className="px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          {/* CRM Light Grey Data Rows with Subtle Row Separators */}
          <tbody className="divide-y divide-slate-100 bg-[#FBFBFC]">
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
                      ? "opacity-30 bg-slate-100"
                      : isDragOver
                      ? "border-t-2 border-black bg-slate-100/60"
                      : isSelected
                      ? "bg-[#F0F5FA] hover:bg-[#E8F0FA]"
                      : "hover:bg-[#F4F6F9]"
                  }`}
                >
                  {/* 1. Drag Handle */}
                  <td className="px-2 py-3 text-center">
                    <div
                      className={`inline-flex items-center justify-center rounded p-1 text-slate-400 ${
                        isReorderEnabled
                          ? "cursor-grab active:cursor-grabbing hover:bg-slate-200/60 hover:text-slate-700"
                          : "cursor-not-allowed opacity-30"
                      }`}
                      title={
                        isReorderEnabled
                          ? "Drag to reorder"
                          : "Clear search & filters to enable reordering"
                      }
                    >
                      <GripVertical className="h-4 w-4" />
                    </div>
                  </td>

                  {/* 2. Row Checkbox */}
                  <td className="px-2 py-3 text-center">
                    <input
                      type="checkbox"
                      aria-label={`Select ${image.title}`}
                      checked={isSelected}
                      onChange={() => onToggleSelect(image.id)}
                      className="rounded border-slate-300 text-black accent-black focus:ring-black"
                    />
                  </td>

                  {/* 3. Image Thumbnail */}
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onPreview(image)}
                      className="group/thumb relative block h-10 w-14 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-2xs hover:border-slate-400 transition-colors"
                      title="Click to preview full image"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover/thumb:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover/thumb:opacity-100">
                        <Eye className="h-3.5 w-3.5 text-white" />
                      </div>
                    </button>
                  </td>

                  {/* 4. Image Title */}
                  <td className="px-4 py-3">
                    <div className="max-w-xs font-semibold text-[#0F172A] truncate">
                      {image.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      {image.imageFileName}
                    </div>
                  </td>

                  {/* 5. File Size & Dimensions */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-[#0F172A]">
                      {formatBytes(image.imageSize)}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
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
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all hover:opacity-85 disabled:opacity-50 ${
                        image.status === "PUBLISHED"
                          ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                          : "bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]"
                      }`}
                    >
                      {togglingId === image.id ? (
                        <Loader2 className="h-2.5 w-2.5 animate-spin" />
                      ) : image.status === "PUBLISHED" ? (
                        <Check className="h-3 w-3 text-[#059669]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      )}
                      <span>{image.status === "PUBLISHED" ? "Published" : "Draft"}</span>
                    </button>
                  </td>

                  {/* 7. Uploaded Date */}
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                    {formatDate(image.createdAt)}
                  </td>

                  {/* 8. Actions (Preview, Edit, Delete) */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      {/* Preview Button */}
                      <button
                        type="button"
                        onClick={() => onPreview(image)}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                        title="Preview image"
                        aria-label="Preview image"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => onEdit(image)}
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
                        title="Edit image"
                        aria-label="Edit image"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDelete(image)}
                        className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete image"
                        aria-label="Delete image"
                      >
                        <Trash2 className="h-4 w-4" />
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
