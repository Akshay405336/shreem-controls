"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type { GalleryImageDto, GalleryListResponse, GalleryStatus } from "@/lib/gallery/types";
import { GalleryTable } from "./gallery-table";
import { AddGalleryModal } from "./add-gallery-modal";
import { EditGalleryModal } from "./edit-gallery-modal";
import { DeleteGalleryDialog } from "./delete-gallery-dialog";
import { ImagePreviewModal } from "./image-preview-modal";

export function GalleryClientView() {
  const [, startTransition] = useTransition();

  // Data state
  const [items, setItems] = useState<GalleryImageDto[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Pagination state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<GalleryStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImageDto | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImageDto | null>(null);
  const [previewImage, setPreviewImage] = useState<GalleryImageDto | null>(null);

  // Toast / feedback message
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Debounce search query (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Reload trigger token
  const [refreshToken, setRefreshToken] = useState(0);
  const triggerReload = useCallback(() => {
    setIsLoading(true);
    setRefreshToken((t) => t + 1);
  }, []);

  // Fetch images from API on filter/pagination/refresh changes
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }

        if (statusFilter !== "ALL") {
          params.append("status", statusFilter);
        }

        const res = await fetch(`/api/admin/gallery?${params.toString()}`);
        if (!res.ok) {
          throw new Error("Failed to load gallery images");
        }

        const json: GalleryListResponse = await res.json();
        if (!isCancelled && json.success && json.data) {
          setItems(json.data.items);
          setTotal(json.data.pagination.totalItems);
          setTotalPages(json.data.pagination.totalPages);
        }
      } catch {
        if (!isCancelled) {
          showToast("Failed to fetch gallery images.", "error");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [page, limit, debouncedSearch, statusFilter, refreshToken]);

  // Checkbox selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (items.length === 0) return;
    const allSelected = items.every((img) => selectedIds.has(img.id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((img) => img.id)));
    }
  };

  // Drag-and-drop Reorder handler
  const handleReorder = async (reorderedItems: GalleryImageDto[]) => {
    const previousItems = [...items];
    setItems(reorderedItems);

    try {
      const imageIds = reorderedItems.map((img) => img.id);
      const res = await fetch("/api/admin/gallery/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageIds }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to persist new order");
      }

      showToast("Gallery display order updated.");
    } catch (err: unknown) {
      setItems(previousItems);
      const msg = err instanceof Error ? err.message : "Reordering failed";
      showToast(msg, "error");
    }
  };

  // Quick Status Toggle Handler
  const handleStatusToggle = async (image: GalleryImageDto) => {
    const newStatus: GalleryStatus = image.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const previousItems = [...items];

    startTransition(() => {
      setItems((prev) =>
        prev.map((item) => (item.id === image.id ? { ...item, status: newStatus } : item))
      );
    });

    try {
      const res = await fetch(`/api/admin/gallery/${image.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update status");
      }

      showToast(`Status changed to ${newStatus === "PUBLISHED" ? "Published" : "Draft"}.`);
    } catch (err: unknown) {
      setItems(previousItems);
      const msg = err instanceof Error ? err.message : "Status update failed";
      showToast(msg, "error");
    }
  };

  // Delete Confirm Handler
  const handleDeleteConfirm = async (id: string) => {
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "DELETE",
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete image");
    }

    showToast("Image deleted successfully.");
    triggerReload();
  };

  // Bulk Status change
  const handleBulkStatusChange = async (newStatus: GalleryStatus) => {
    if (selectedIds.size === 0) return;

    try {
      const ids = Array.from(selectedIds);
      let successCount = 0;

      for (const id of ids) {
        const res = await fetch(`/api/admin/gallery/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) successCount++;
      }

      showToast(`Updated ${successCount} image(s) to ${newStatus === "PUBLISHED" ? "Published" : "Draft"}.`);
      setSelectedIds(new Set());
      triggerReload();
    } catch {
      showToast("Bulk status update encountered errors.", "error");
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    const confirm = window.confirm(
      `Are you sure you want to delete ${selectedIds.size} selected image(s)? This cannot be undone.`
    );
    if (!confirm) return;

    try {
      const ids = Array.from(selectedIds);
      let deletedCount = 0;

      for (const id of ids) {
        const res = await fetch(`/api/admin/gallery/${id}`, {
          method: "DELETE",
        });
        if (res.ok) deletedCount++;
      }

      showToast(`Deleted ${deletedCount} image(s).`);
      setSelectedIds(new Set());
      triggerReload();
    } catch {
      showToast("Bulk deletion encountered errors.", "error");
    }
  };

  const isReorderEnabled = !debouncedSearch && statusFilter === "ALL";

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg border px-4 py-3 text-xs font-medium shadow-lg animate-in fade-in slide-in-from-bottom-5 ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 rounded p-1 hover:bg-black/5"
            aria-label="Dismiss message"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* CRM Breadcrumb & Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {/* Breadcrumb: Dashboard / Gallery */}
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-slate-400">
            <Link
              href="/admin/dashboard"
              className="transition-colors hover:text-slate-600"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-medium text-[#0F172A]">Gallery</span>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Gallery
          </h1>
          <p className="mt-0.5 text-xs text-slate-500">
            Manage images displayed on your website.
          </p>
        </div>

        {/* Primary Action Button: CRM Black Button */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={triggerReload}
            disabled={isLoading}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 disabled:opacity-50"
            title="Refresh gallery list"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-black px-3.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Photo</span>
          </button>
        </div>
      </div>

      {/* CRM Toolbar: Pale blue search input, white filter button, rows selector */}
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        {/* Search with pale-blue background */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
              setSelectedIds(new Set());
            }}
            placeholder="Search gallery images..."
            className="h-9 w-full rounded-md border border-slate-200 bg-[#F0F5FA] pl-8 pr-7 text-xs text-[#0F172A] placeholder-slate-400 transition-colors focus:border-[#0F172A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F172A]"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
                setSelectedIds(new Set());
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter & Rows Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter Pill Button Group */}
          <div className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5 text-xs">
            <span className="hidden px-2 text-[11px] font-medium text-slate-400 md:inline-flex items-center gap-1">
              <Filter className="h-3 w-3" /> Status:
            </span>
            {(["ALL", "PUBLISHED", "DRAFT"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setPage(1);
                  setSelectedIds(new Set());
                }}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-white text-[#0F172A] shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {st === "ALL" ? "All" : st === "PUBLISHED" ? "Published" : "Draft"}
              </button>
            ))}
          </div>

          {/* Rows per page selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <label htmlFor="gallery-limit" className="text-[11px]">Rows:</label>
            <select
              id="gallery-limit"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
                setSelectedIds(new Set());
              }}
              className="h-9 rounded-md border border-slate-200 bg-white px-2.5 text-xs text-[#0F172A] transition-colors focus:border-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating / Inline Bulk Actions Bar (if any selected) */}
      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-[#F0F5FA] px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2 text-[#0F172A] font-medium">
            <span className="rounded-full bg-black px-2 py-0.5 text-[11px] font-bold text-white">
              {selectedIds.size}
            </span>
            <span>image{selectedIds.size > 1 ? "s" : ""} selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleBulkStatusChange("PUBLISHED")}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => handleBulkStatusChange("DRAFT")}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              Set Draft
            </button>
            <button
              type="button"
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white shadow-2xs hover:bg-red-700"
            >
              <Trash2 className="h-3 w-3" />
              <span>Delete</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-slate-500 hover:text-slate-800 underline ml-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <GalleryTable
        items={items}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onReorder={handleReorder}
        onEdit={(img) => setEditingImage(img)}
        onDelete={(img) => setDeletingImage(img)}
        onPreview={(img) => setPreviewImage(img)}
        onStatusToggle={handleStatusToggle}
        isReorderEnabled={isReorderEnabled}
        onAddNew={() => setIsAddModalOpen(true)}
      />

      {/* CRM Pagination & Footer */}
      {items.length > 0 && (
        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span>
              Showing{" "}
              <span className="font-semibold text-[#0F172A]">
                {total === 0 ? 0 : (page - 1) * limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-[#0F172A]">
                {Math.min(page * limit, total)}
              </span>{" "}
              of <span className="font-semibold text-[#0F172A]">{total}</span> entries
            </span>
            {!isReorderEnabled && (
              <span className="text-[11px] text-slate-400 italic">
                (Reordering is paused while filters or search are active)
              </span>
            )}
          </div>

          {/* CRM Pagination Buttons */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            <button
              type="button"
              onClick={() => {
                setPage(1);
                setSelectedIds(new Set());
              }}
              disabled={page <= 1 || isLoading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40"
              aria-label="First page"
              title="First page"
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                setSelectedIds(new Set());
              }}
              disabled={page <= 1 || isLoading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40"
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            {/* Page indicator (Active: Black pill, Inactive: border) */}
            <div className="inline-flex items-center gap-1">
              <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md bg-black px-2.5 text-xs font-semibold text-white shadow-xs">
                {page}
              </span>
              <span className="px-1 text-slate-400">/</span>
              <span className="text-slate-600 font-medium">{totalPages}</span>
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => {
                setPage((p) => Math.min(totalPages, p + 1));
                setSelectedIds(new Set());
              }}
              disabled={page >= totalPages || isLoading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40"
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            {/* Last Page */}
            <button
              type="button"
              onClick={() => {
                setPage(totalPages);
                setSelectedIds(new Set());
              }}
              disabled={page >= totalPages || isLoading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40"
              aria-label="Last page"
              title="Last page"
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Add Image Modal */}
      <AddGalleryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          showToast("Image added to gallery successfully.");
          triggerReload();
        }}
      />

      {/* Edit Image Modal */}
      <EditGalleryModal
        isOpen={!!editingImage}
        image={editingImage}
        onClose={() => setEditingImage(null)}
        onSuccess={() => {
          showToast("Image details updated successfully.");
          triggerReload();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteGalleryDialog
        isOpen={!!deletingImage}
        image={deletingImage}
        onClose={() => setDeletingImage(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Full Image Preview Modal */}
      <ImagePreviewModal
        isOpen={!!previewImage}
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}
