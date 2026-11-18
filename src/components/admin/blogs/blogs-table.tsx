
"use client";

import { useState } from "react";
import {
  SquarePen,
  Eye,
  Check,
  Loader2,
  Newspaper,
  Power,
  Trash2,
} from "lucide-react";
import { formatDate } from "@/lib/blogs/utils";
import type { BlogDto } from "@/lib/blogs/types";

interface BlogsTableProps {
  items: BlogDto[];
  isLoading: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (blog: BlogDto) => void;
  onDelete: (blog: BlogDto) => void;
  onPreview: (blog: BlogDto) => void;
  onStatusToggle: (blog: BlogDto) => Promise<void>;
  onAddNew: () => void;
}

export function BlogsTable({
  items,
  isLoading,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
  onPreview,
  onStatusToggle,
  onAddNew,
}: BlogsTableProps) {
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const isAllSelected =
    items.length > 0 && items.every((blog) => selectedIds.has(blog.id));

  const isPartiallySelected =
    items.length > 0 &&
    items.some((blog) => selectedIds.has(blog.id)) &&
    !isAllSelected;

  const handleToggleStatus = async (blog: BlogDto) => {
    if (togglingId) return;

    setTogglingId(blog.id);

    try {
      await onStatusToggle(blog);
    } finally {
      setTogglingId(null);
    }
  };

  // Loading State
  if (isLoading && items.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-[#E2ECEB] bg-white shadow-[0_2px_12px_rgba(24,64,61,0.045)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#E2ECEB] bg-[#F3F8F7] text-[#71817F]">
              <tr>
                <th className="w-10 px-3 py-3" />
                <th className="w-24 px-4 py-3"> </th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">Blog Title</th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">Slug</th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">Status</th>
                <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">Created Date</th>
                <th className="px-4 py-3 text-right text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAF0EF] bg-white">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-3 py-3"><div className="h-3.5 w-3.5 rounded bg-[#DDECEB]/70" /></td>
                  <td className="px-4 py-3"><div className="h-10 w-14 rounded-lg bg-[#DDECEB]/60" /></td>
                  <td className="px-4 py-3"><div className="h-3.5 w-40 rounded bg-[#DDECEB]/60" /></td>
                  <td className="px-4 py-3"><div className="h-3.5 w-24 rounded bg-[#DDECEB]/60" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-20 rounded-full bg-[#DDECEB]/60" /></td>
                  <td className="px-4 py-3"><div className="h-3.5 w-24 rounded bg-[#DDECEB]/60" /></td>
                  <td className="px-4 py-3 text-right"><div className="inline-block h-6 w-20 rounded bg-[#DDECEB]/60" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Empty State
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E2ECEB] bg-white p-10 text-center shadow-xs">
        <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF9F8] text-[#009E98]">
          <Newspaper className="h-6 w-6" />
        </div>

        <h3 className="font-display text-[16px] font-medium text-[#252A2A]">
          No blogs found
        </h3>

        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-[#71817F]">
          No articles match your search or filter. Create your first blog to
          publish news and guides on your website.
        </p>

        <button
          type="button"
          onClick={onAddNew}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-4 py-2 text-[13px] font-medium text-white shadow-xs transition-all hover:opacity-95"
        >
          + Add Blog
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E2ECEB] bg-white shadow-[0_2px_12px_rgba(24,64,61,0.045)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Table Header */}
          <thead className="border-b border-[#E2ECEB] bg-[#F8FAFA]">
            <tr>
              {/* Checkbox */}
              <th className="w-10 px-3 py-3 text-center">
                <input
                  type="checkbox"
                  aria-label="Select all blogs on this page"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-[#E2ECEB] text-[#009E98] accent-[#009E98] focus:ring-[#009E98]"
                />
              </th>

              {/* Cover Image */}
              <th className="w-24 px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Image
              </th>

              {/* Blog Title */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Blog Title
              </th>

              {/* Slug */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Slug
              </th>

              {/* Status */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Status
              </th>

              {/* Created Date */}
              <th className="px-4 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Created Date
              </th>

              {/* Actions */}
              <th className="px-4 py-3 text-right text-[12px] font-semibold tracking-[0.02em] text-[#52615F]">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Rows */}
          <tbody className="divide-y divide-[#EAF0EF] bg-white">
            {items.map((blog) => {
              const isSelected = selectedIds.has(blog.id);
              const isTogglingThis = togglingId === blog.id;
              const isActive = blog.status === "ACTIVE";

              return (
                <tr
                  key={blog.id}
                  className={`group transition-colors ${
                    isSelected
                      ? "bg-[#EFF9F8] hover:bg-[#E5F5F3]"
                      : "hover:bg-[#F5FAF9]"
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      aria-label={`Select ${blog.title}`}
                      checked={isSelected}
                      onChange={() => onToggleSelect(blog.id)}
                      className="h-4 w-4 rounded border-[#E2ECEB] text-[#009E98] accent-[#009E98] focus:ring-[#009E98]"
                    />
                  </td>

                  {/* Cover Image */}
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onPreview(blog)}
                      className="group/thumb relative block h-10 w-14 overflow-hidden rounded-lg border border-[#E2ECEB] bg-[#F5FAF9] shadow-2xs transition-colors hover:border-[#009E98]"
                      title="Click to preview full image"
                      aria-label={`Preview ${blog.title}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover/thumb:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity group-hover/thumb:opacity-100">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  </td>

                  {/* Blog Title */}
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate text-[13px] font-medium text-[#252A2A]">
                      {blog.title}
                    </div>
                    <div className="mt-0.5 max-w-xs truncate font-mono text-[11px] text-[#81908E]">
                      {blog.excerpt}
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="font-mono text-[11px] text-[#81908E]">
                      /{blog.slug}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(blog)}
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

                  {/* Created Date */}
                  <td className="whitespace-nowrap px-4 py-3 text-[12px] text-[#71817F]">
                    {formatDate(blog.createdAt)}
                  </td>

{/* Actions: View → Status → Edit → Delete */}
<td className="whitespace-nowrap px-4 py-3 text-right">
  <div className="inline-flex items-center gap-1">
    {/* View */}
    <button
      type="button"
      onClick={() => onPreview(blog)}
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#252A2A] transition-colors hover:bg-[#252A2A]/10 hover:text-black"
      title="View blog"
      aria-label="View blog"
    >
      <Eye className="h-3.5 w-3.5" />
    </button>

    {/* Active / Inactive */}
    <button
      type="button"
      onClick={() => handleToggleStatus(blog)}
      disabled={isTogglingThis}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors disabled:opacity-50 ${
        isActive
          ? "text-green-600 hover:bg-green-50 hover:text-green-700"
          : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      }`}
      title={isActive ? "Deactivate blog" : "Activate blog"}
      aria-label={isActive ? "Deactivate blog" : "Activate blog"}
    >
      {isTogglingThis ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Power className="h-3.5 w-3.5" />
      )}
    </button>

    {/* Edit */}
    <button
      type="button"
      onClick={() => onEdit(blog)}
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-orange-500 transition-colors hover:bg-orange-50 hover:text-orange-600"
      title="Edit blog"
      aria-label="Edit blog"
    >
      <SquarePen className="h-3 w-3" strokeWidth={1.8} />
    </button>

    {/* Delete */}
    <button
      type="button"
      onClick={() => onDelete(blog)}
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
      title="Delete blog"
      aria-label="Delete blog"
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
