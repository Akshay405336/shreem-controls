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
import type {
  VisitingCardDto,
  VisitingCardListResult,
  VisitingCardStatus,
} from "@/lib/visiting-cards/types";
import { VisitingCardsTable } from "./visiting-cards-table";
import { VisitingCardFormModal } from "./visiting-card-form-modal";
import { VisitingCardDeleteDialog } from "./visiting-card-delete-dialog";
import { VisitingCardViewModal } from "./visiting-card-view-modal";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

type SortBy = "sortOrder" | "createdAt" | "fullName" | "companyName";

export function VisitingCardsClientView() {
  const [, startTransition] = useTransition();

  const [items, setItems] = useState<VisitingCardDto[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VisitingCardStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<VisitingCardDto | null>(null);
  const [deletingCard, setDeletingCard] = useState<VisitingCardDto | null>(null);
  const [viewingCard, setViewingCard] = useState<VisitingCardDto | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const [refreshToken, setRefreshToken] = useState(0);
  const triggerReload = useCallback(() => {
    setIsLoading(true);
    setRefreshToken((t) => t + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sortBy,
          sortDir,
        });
        if (debouncedSearch) params.append("search", debouncedSearch);
        if (statusFilter !== "ALL") params.append("status", statusFilter);

        const res = await fetch(`/api/admin/visiting-cards?${params}`);
        if (!res.ok) throw new Error("Failed to load");

        const json: ApiResponse<VisitingCardListResult> = await res.json();
        if (!cancelled && json.success && json.data) {
          setItems(json.data.items);
          setTotal(json.data.pagination.totalItems);
          setTotalPages(json.data.pagination.totalPages);
        }
      } catch {
        if (!cancelled) showToast("Failed to fetch visiting cards.", "error");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [page, limit, debouncedSearch, statusFilter, sortBy, sortDir, refreshToken]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (items.length === 0) return;
    const all = items.every((c) => selectedIds.has(c.id));
    setSelectedIds(all ? new Set() : new Set(items.map((c) => c.id)));
  };

  const handleStatusToggle = async (card: VisitingCardDto) => {
    const newStatus: VisitingCardStatus =
      card.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const previous = [...items];

    startTransition(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === card.id ? { ...item, status: newStatus } : item,
        ),
      );
    });

    try {
      const res = await fetch(`/api/admin/visiting-cards/${card.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update status");
      }
      showToast(`Card is now ${newStatus === "ACTIVE" ? "active" : "inactive"}.`);
    } catch (err: unknown) {
      setItems(previous);
      showToast(err instanceof Error ? err.message : "Status update failed", "error");
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    const res = await fetch(`/api/admin/visiting-cards/${id}`, { method: "DELETE" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete visiting card");
    }
    showToast("Visiting card deleted.");
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    triggerReload();
  };

  const handleBulkStatusChange = async (newStatus: VisitingCardStatus) => {
    if (selectedIds.size === 0) return;
    try {
      let count = 0;
      for (const id of Array.from(selectedIds)) {
        const res = await fetch(`/api/admin/visiting-cards/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) count++;
      }
      showToast(`Updated ${count} card(s).`);
      setSelectedIds(new Set());
      triggerReload();
    } catch {
      showToast("Bulk status update failed.", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (
      !window.confirm(
        `Delete ${selectedIds.size} selected visiting card(s)? This cannot be undone.`,
      )
    ) {
      return;
    }
    try {
      let count = 0;
      for (const id of Array.from(selectedIds)) {
        const res = await fetch(`/api/admin/visiting-cards/${id}`, { method: "DELETE" });
        if (res.ok) count++;
      }
      showToast(`Deleted ${count} card(s).`);
      setSelectedIds(new Set());
      triggerReload();
    } catch {
      showToast("Bulk delete failed.", "error");
    }
  };

  return (
    <div className="space-y-4 font-sans text-[13px] text-[#344542]">
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg border px-4 py-3 text-xs font-medium shadow-lg ${
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
          <button type="button" onClick={() => setToast(null)} aria-label="Dismiss">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[#879491]">
            <Link href="/admin/dashboard" className="hover:text-[#009E98]">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#252A2A]">Visiting Cards</span>
          </nav>
          <h1 className="font-display text-[23px] font-bold tracking-[-0.045em] text-[#263332]">
            Visiting Cards
          </h1>
          <p className="mt-1 text-[12px] text-[#879491]">
            Manage digital business cards, QR codes, and public profile pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerReload}
            disabled={isLoading}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#DCE9E7] bg-white px-3.5 text-[12px] font-medium disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-gradient-to-r from-[#009E98] to-[#007D78] px-3.5 text-[12px] font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Card
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-[#E2ECEA] bg-white p-3 shadow-[0_2px_10px_rgba(34,65,60,0.035)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737B7A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
              setSelectedIds(new Set());
            }}
            placeholder="Search by name, company, slug…"
            className="h-9 w-full rounded-lg border border-[#E1EBE9] bg-[#F8FBFA] pl-9 pr-8 text-[12px] focus:border-[#8BCFC9] focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center rounded-lg border border-[#DDECEB] bg-[#F4FBFA] p-1">
            <span className="hidden px-2 md:inline-flex items-center gap-1 text-[12px] text-[#737B7A]">
              <Filter className="h-3.5 w-3.5 text-[#009E98]" />
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
                className={`rounded-md px-3 py-1.5 text-[12px] font-medium ${
                  statusFilter === st ? "bg-white shadow-xs font-semibold" : ""
                }`}
              >
                {st === "ALL" ? "All" : st === "ACTIVE" ? "Active" : "Inactive"}
              </button>
            ))}
          </div>

          <select
            value={`${sortBy}-${sortDir}`}
            onChange={(e) => {
              const [sb, sd] = e.target.value.split("-") as [SortBy, "asc" | "desc"];
              setSortBy(sb);
              setSortDir(sd);
              setPage(1);
            }}
            className="h-9 rounded-lg border border-[#E1EBE9] bg-white px-2.5 text-[12px]"
          >
            <option value="createdAt-desc">Newest</option>
            <option value="createdAt-asc">Oldest</option>
            <option value="fullName-asc">Name A–Z</option>
            <option value="fullName-desc">Name Z–A</option>
            <option value="companyName-asc">Company A–Z</option>
            <option value="sortOrder-asc">Sort order</option>
          </select>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="h-9 rounded-lg border border-[#E1EBE9] bg-white px-2.5 text-[12px]"
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#D5EAE7] bg-[#F1F9F8] px-4 py-2.5">
          <span className="font-medium">
            <span className="mr-2 rounded-full bg-[#252A2A] px-2 py-0.5 text-xs text-white">
              {selectedIds.size}
            </span>
            selected
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleBulkStatusChange("ACTIVE")}
              className="rounded-lg border bg-white px-3 py-1.5 text-[12px]"
            >
              Activate
            </button>
            <button
              type="button"
              onClick={() => handleBulkStatusChange("INACTIVE")}
              className="rounded-lg border bg-white px-3 py-1.5 text-[12px]"
            >
              Deactivate
            </button>
            <button
              type="button"
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-[12px] text-white"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="text-[12px] underline text-[#737B7A]"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <VisitingCardsTable
        items={items}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onEdit={setEditingCard}
        onDelete={setDeletingCard}
        onView={setViewingCard}
        onStatusToggle={handleStatusToggle}
        onAddNew={() => setIsAddModalOpen(true)}
      />

      {total > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-[#E2ECEA] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[12px] text-[#879491]">
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border disabled:opacity-40"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-[12px] font-semibold">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border disabled:opacity-40"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <VisitingCardFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          showToast("Visiting card created.");
          triggerReload();
        }}
      />

      <VisitingCardFormModal
        isOpen={Boolean(editingCard)}
        cardToEdit={editingCard}
        onClose={() => setEditingCard(null)}
        onSuccess={() => {
          showToast("Visiting card updated.");
          triggerReload();
        }}
      />

      <VisitingCardDeleteDialog
        isOpen={Boolean(deletingCard)}
        card={deletingCard}
        onClose={() => setDeletingCard(null)}
        onConfirm={handleDeleteConfirm}
      />

      <VisitingCardViewModal
        isOpen={Boolean(viewingCard)}
        card={viewingCard}
        onClose={() => setViewingCard(null)}
      />
    </div>
  );
}