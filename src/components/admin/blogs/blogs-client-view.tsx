
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
import type { BlogDto, BlogListResult, BlogStatus } from "@/lib/blogs/types";
import { BlogsTable } from "./blogs-table";
import { BlogFormModal } from "./blog-form-modal";
import { DeleteBlogDialog } from "./delete-blog-dialog";
import { BlogPreviewModal } from "./blog-preview-modal";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function BlogsClientView() {
  const [, startTransition] = useTransition();

  // Data state
  const [items, setItems] = useState<BlogDto[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Pagination state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BlogStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"createdAt" | "title" | "status">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogDto | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<BlogDto | null>(null);
  const [previewBlog, setPreviewBlog] = useState<BlogDto | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Debounce search query
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

  // Fetch blogs from API
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sortBy,
          sortDir,
        });

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }

        if (statusFilter !== "ALL") {
          params.append("status", statusFilter);
        }

        const res = await fetch(`/api/admin/blogs?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to load blogs");
        }

        const json: ApiResponse<BlogListResult> = await res.json();

        if (!isCancelled && json.success && json.data) {
          setItems(json.data.items);
          setTotal(json.data.pagination.totalItems);
          setTotalPages(json.data.pagination.totalPages);
        }
      } catch {
        if (!isCancelled) {
          showToast("Failed to fetch blog articles.", "error");
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
  }, [page, limit, debouncedSearch, statusFilter, sortBy, sortDir, refreshToken]);

  // Selection handlers
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

    const allSelected = items.every((b) => selectedIds.has(b.id));

    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((b) => b.id)));
    }
  };

  // Status toggle handler
  const handleStatusToggle = async (blog: BlogDto) => {
    const newStatus: BlogStatus =
      blog.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const previousItems = [...items];

    // Optimistic UI update
    startTransition(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === blog.id ? { ...item, status: newStatus } : item
        )
      );
    });

    try {
      const res = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update status");
      }

      showToast(
        `Blog is now ${newStatus === "ACTIVE" ? "Active (Live)" : "Inactive"}.`
      );
    } catch (err: unknown) {
      setItems(previousItems);

      const msg =
        err instanceof Error ? err.message : "Status update failed";

      showToast(msg, "error");
    }
  };

  // Delete confirm handler
  const handleDeleteConfirm = async (id: string) => {
    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "DELETE",
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete blog");
    }

    showToast("Blog and associated cover image permanently deleted.");

    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

    triggerReload();
  };

  // Bulk status change
  const handleBulkStatusChange = async (newStatus: BlogStatus) => {
    if (selectedIds.size === 0) return;

    try {
      const ids = Array.from(selectedIds);
      let successCount = 0;

      for (const id of ids) {
        const res = await fetch(`/api/admin/blogs/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });

        if (res.ok) successCount++;
      }

      showToast(
        `Updated ${successCount} blog(s) to ${
          newStatus === "ACTIVE" ? "Active" : "Inactive"
        }.`
      );

      setSelectedIds(new Set());
      triggerReload();
    } catch {
      showToast("Bulk status update encountered errors.", "error");
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    const confirm = window.confirm(
      `Are you sure you want to permanently delete ${selectedIds.size} selected blog(s)? This will delete their database records and remove their cover images. This cannot be undone.`
    );

    if (!confirm) return;

    try {
      const ids = Array.from(selectedIds);
      let deletedCount = 0;

      for (const id of ids) {
        const res = await fetch(`/api/admin/blogs/${id}`, {
          method: "DELETE",
        });

        if (res.ok) deletedCount++;
      }

      showToast(`Permanently deleted ${deletedCount} blog(s).`);

      setSelectedIds(new Set());
      triggerReload();
    } catch {
      showToast("Bulk deletion encountered errors.", "error");
    }
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-lg border px-3.5 py-2.5 text-[12px] font-medium shadow-lg animate-in fade-in slide-in-from-bottom-5 ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          )}

          <span>{toast.message}</span>

          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-1 rounded p-1 transition-colors hover:bg-black/5"
            aria-label="Dismiss message"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[#879491]">
            <Link
              href="/admin/dashboard"
              className="transition-colors hover:text-[#009E98]"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="font-semibold text-[#252A2A]">Blogs</span>
          </nav>

          <h1 className="font-display text-[23px] font-bold leading-tight tracking-[-0.045em] text-[#263332]">
            Blog Management
          </h1>

          <p className="mt-1 text-[12px] leading-5 text-[#879491]">
            Manage articles and content published on your website.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerReload}
            disabled={isLoading}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#DDECEB] bg-white px-3.5 text-[12px] font-medium text-[#252A2A] shadow-2xs transition-colors hover:border-[#009E98] hover:bg-[#F4FBFA] disabled:opacity-50"
            title="Refresh blogs list"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-[#009E98] ${
                isLoading ? "animate-spin" : ""
              }`}
            />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-4 text-[12px] font-medium text-white shadow-xs transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009E98]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Blog</span>
          </button>
        </div>
      </div>

      {/* Search, Filter, Sort and Rows Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#DDECEB] bg-white p-3 shadow-xs xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}
        <div className="relative w-full flex-1 xl:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#737B7A]" />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
              setSelectedIds(new Set());
            }}
            placeholder="Search blogs..."
            className="h-9 w-full rounded-lg border border-[#DDECEB] bg-[#F7FAFF] pl-9 pr-9 text-[12px] text-[#252A2A] placeholder:text-[#A0AAAA] transition-colors focus:border-[#009E98] focus:bg-white focus:outline-none"
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
                setSelectedIds(new Set());
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737B7A] transition-colors hover:text-[#252A2A]"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="inline-flex items-center rounded-lg border border-[#DDECEB] bg-[#F7FAFF] p-1">
            <span className="hidden items-center gap-1.5 px-2 text-[11px] font-medium text-[#737B7A] md:inline-flex">
              <Filter className="h-3 w-3 text-[#009E98]" />
              Status
            </span>

            {(["ALL", "ACTIVE", "INACTIVE"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setPage(1);
                  setSelectedIds(new Set());
                }}
                className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-white text-[#252A2A] shadow-2xs"
                    : "text-[#737B7A] hover:text-[#252A2A]"
                }`}
              >
                {st === "ALL"
                  ? "All"
                  : st === "ACTIVE"
                    ? "Active"
                    : "Inactive"}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#737B7A]">
            <label htmlFor="blog-sort" className="font-medium">
              Sort
            </label>

            <select
              id="blog-sort"
              value={`${sortBy}-${sortDir}`}
              onChange={(e) => {
                const [sb, sd] = e.target.value.split("-") as [
                  "createdAt" | "title" | "status",
                  "asc" | "desc",
                ];

                setSortBy(sb);
                setSortDir(sd);
                setPage(1);
              }}
              className="h-9 rounded-lg border border-[#DDECEB] bg-[#F7FAFF] px-2.5 text-[11px] font-medium text-[#252A2A] transition-colors focus:border-[#009E98] focus:bg-white focus:outline-none"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="status-asc">Status</option>
            </select>
          </div>

          {/* Rows */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#737B7A]">
            <label htmlFor="blog-limit" className="font-medium">
              Rows
            </label>

            <select
              id="blog-limit"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
                setSelectedIds(new Set());
              }}
              className="h-9 rounded-lg border border-[#DDECEB] bg-[#F7FAFF] px-2.5 text-[11px] font-medium text-[#252A2A] transition-colors focus:border-[#009E98] focus:bg-white focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#DDECEB] bg-[#EFF9F8] px-4 py-2.5">
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#252A2A]">
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#252A2A] px-1.5 text-[10px] font-semibold text-white">
              {selectedIds.size}
            </span>

            <span>
              blog{selectedIds.size > 1 ? "s" : ""} selected
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleBulkStatusChange("ACTIVE")}
              className="rounded-lg border border-[#DDECEB] bg-white px-3 py-1.5 text-[11px] font-medium text-green-700 transition-colors hover:border-green-300 hover:bg-green-50"
            >
              Activate
            </button>

            <button
              type="button"
              onClick={() => handleBulkStatusChange("INACTIVE")}
              className="rounded-lg border border-[#DDECEB] bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              Deactivate
            </button>

            <button
              type="button"
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-medium text-white shadow-xs transition-colors hover:bg-red-700"
            >
              <Trash2 className="h-3 w-3" />
              <span>Delete Permanently</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="ml-1 text-[11px] text-[#737B7A] underline transition-colors hover:text-[#252A2A]"
            >
              Deselect all
            </button>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <BlogsTable
        items={items}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onEdit={(blog) => setEditingBlog(blog)}
        onDelete={(blog) => setDeletingBlog(blog)}
        onPreview={(blog) => setPreviewBlog(blog)}
        onStatusToggle={handleStatusToggle}
        onAddNew={() => setIsAddModalOpen(true)}
      />

      {/* Pagination Footer */}
      {total > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-[#DDECEB] bg-white px-4 py-3 text-[12px] text-[#737B7A] shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div>
            Showing{" "}
            <span className="font-semibold text-[#252A2A]">
              {(page - 1) * limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-[#252A2A]">
              {Math.min(page * limit, total)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#252A2A]">{total}</span>{" "}
            articles
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] bg-white text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#F4FBFA] hover:text-[#252A2A] disabled:cursor-not-allowed disabled:opacity-40"
              title="First Page"
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] bg-white text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#F4FBFA] hover:text-[#252A2A] disabled:cursor-not-allowed disabled:opacity-40"
              title="Previous Page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            {/* Page Indicator */}
            <div className="inline-flex items-center gap-1.5 px-1">
              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#252A2A] px-2.5 text-[12px] font-semibold text-white">
                {page}
              </span>

              <span className="text-[#737B7A]/60">/</span>

              <span className="text-[12px] font-semibold text-[#252A2A]">
                {totalPages}
              </span>
            </div>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] bg-white text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#F4FBFA] hover:text-[#252A2A] disabled:cursor-not-allowed disabled:opacity-40"
              title="Next Page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] bg-white text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#F4FBFA] hover:text-[#252A2A] disabled:cursor-not-allowed disabled:opacity-40"
              title="Last Page"
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Add Blog Modal */}
      <BlogFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          showToast("Blog created successfully.");
          triggerReload();
        }}
      />

      {/* Edit Blog Modal */}
      <BlogFormModal
        isOpen={Boolean(editingBlog)}
        blogToEdit={editingBlog}
        onClose={() => setEditingBlog(null)}
        onSuccess={() => {
          showToast("Blog updated successfully.");
          triggerReload();
        }}
      />

      {/* Delete Blog Dialog */}
      <DeleteBlogDialog
        isOpen={Boolean(deletingBlog)}
        blog={deletingBlog}
        onClose={() => setDeletingBlog(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Blog Preview Modal */}
      <BlogPreviewModal
        isOpen={Boolean(previewBlog)}
        blog={previewBlog}
        onClose={() => setPreviewBlog(null)}
      />
    </div>
  );
}
