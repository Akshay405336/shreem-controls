// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogsTable } from "../src/components/admin/blogs/blogs-table";
import { BlogFormModal } from "../src/components/admin/blogs/blog-form-modal";
import { DeleteBlogDialog } from "../src/components/admin/blogs/delete-blog-dialog";
import { BlogPreviewModal } from "../src/components/admin/blogs/blog-preview-modal";
import type { BlogDto } from "@/lib/blogs/types";

describe("Blogs UI Components", () => {
  const mockBlogs: BlogDto[] = [
    {
      id: "blog-1",
      title: "Smart Lighting In Architectural Design",
      slug: "smart-lighting-architectural-design",
      excerpt: "How intelligent illumination elevates residential spaces.",
      content: "<h2>Overview</h2><p>Lighting is the soul of architecture.</p>",
      coverImage: "/blogs/blog-1.webp",
      coverImageFileName: "blog-1.webp",
      coverImageMimeType: "image/webp",
      coverImageSize: 1024 * 250,
      status: "ACTIVE",
      metaTitle: "Smart Lighting Design",
      metaDescription: "Architectural lighting guide.",
      createdAt: new Date("2026-03-01T10:00:00Z"),
      updatedAt: new Date("2026-03-01T10:00:00Z"),
    },
    {
      id: "blog-2",
      title: "Whole Home Climate Automation",
      slug: "whole-home-climate-automation",
      excerpt: "Energy efficiency and comfort through intelligent HVAC.",
      content: "<p>Smart thermostats and zonal controls.</p>",
      coverImage: "/blogs/blog-2.webp",
      coverImageFileName: "blog-2.webp",
      coverImageMimeType: "image/webp",
      coverImageSize: 1024 * 320,
      status: "INACTIVE",
      metaTitle: null,
      metaDescription: null,
      createdAt: new Date("2026-03-05T14:30:00Z"),
      updatedAt: new Date("2026-03-05T14:30:00Z"),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("BlogsTable", () => {
    it("renders table rows with title, slug, and status badge", () => {
      render(
        <BlogsTable
          items={mockBlogs}
          isLoading={false}
          selectedIds={new Set()}
          onToggleSelect={vi.fn()}
          onToggleSelectAll={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onPreview={vi.fn()}
          onStatusToggle={vi.fn()}
          onAddNew={vi.fn()}
        />,
      );

      expect(screen.getByText("Smart Lighting In Architectural Design")).toBeInTheDocument();
      expect(screen.getByText("Whole Home Climate Automation")).toBeInTheDocument();
      expect(screen.getByText("/smart-lighting-architectural-design")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });

    it("renders empty state when no blogs are found", () => {
      const onAddNew = vi.fn();
      render(
        <BlogsTable
          items={[]}
          isLoading={false}
          selectedIds={new Set()}
          onToggleSelect={vi.fn()}
          onToggleSelectAll={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onPreview={vi.fn()}
          onStatusToggle={vi.fn()}
          onAddNew={onAddNew}
        />,
      );

      expect(screen.getByText("No blogs found")).toBeInTheDocument();
      const addBtn = screen.getByRole("button", { name: /\+ Add Blog/i });
      fireEvent.click(addBtn);
      expect(onAddNew).toHaveBeenCalledTimes(1);
    });

    it("triggers status toggle when clicking status badge", async () => {
      const onStatusToggle = vi.fn().mockResolvedValue(undefined);
      render(
        <BlogsTable
          items={mockBlogs}
          isLoading={false}
          selectedIds={new Set()}
          onToggleSelect={vi.fn()}
          onToggleSelectAll={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onPreview={vi.fn()}
          onStatusToggle={onStatusToggle}
          onAddNew={vi.fn()}
        />,
      );

      const activeBadge = screen.getByText("Active");
      fireEvent.click(activeBadge);
      expect(onStatusToggle).toHaveBeenCalledWith(mockBlogs[0]);
    });
  });

  describe("BlogFormModal", () => {
    it("renders Create Blog modal with all required form controls", () => {
      render(
        <BlogFormModal
          isOpen={true}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
        />,
      );

      expect(screen.getByRole("heading", { name: "Create Blog" })).toBeInTheDocument();
      expect(screen.getByLabelText(/Blog Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/URL Slug/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Short Description \/ Excerpt/i)).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Inactive")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Create Blog/i })).toBeInTheDocument();
    });

    it("renders Edit Blog modal populated with blog details", () => {
      render(
        <BlogFormModal
          isOpen={true}
          blogToEdit={mockBlogs[0]}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
        />,
      );

      expect(screen.getByRole("heading", { name: "Edit Blog" })).toBeInTheDocument();
      expect(screen.getByDisplayValue("Smart Lighting In Architectural Design")).toBeInTheDocument();
      expect(screen.getByDisplayValue("smart-lighting-architectural-design")).toBeInTheDocument();
      expect(screen.getByDisplayValue("How intelligent illumination elevates residential spaces.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Save Changes/i })).toBeInTheDocument();
    });

    it("renders Replace and Remove action buttons on cover image preview and handles remove", () => {
      render(
        <BlogFormModal
          isOpen={true}
          blogToEdit={mockBlogs[0]}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
        />,
      );

      const replaceBtn = screen.getByTitle("Replace image");
      const removeBtn = screen.getByTitle("Remove image");
      expect(replaceBtn).toBeInTheDocument();
      expect(removeBtn).toBeInTheDocument();

      fireEvent.click(removeBtn);
      expect(screen.getByText("No cover image selected")).toBeInTheDocument();
      expect(screen.queryByTitle("Remove image")).not.toBeInTheDocument();
    });
  });

  describe("DeleteBlogDialog", () => {
    it("renders delete confirmation dialog with title and warning message", () => {
      const onConfirm = vi.fn().mockResolvedValue(undefined);
      const onClose = vi.fn();

      render(
        <DeleteBlogDialog
          isOpen={true}
          blog={mockBlogs[0]}
          onClose={onClose}
          onConfirm={onConfirm}
        />,
      );

      expect(screen.getByText("Delete Blog?")).toBeInTheDocument();
      expect(
        screen.getByText(/This blog will be permanently deleted. Its cover image will also be removed./i),
      ).toBeInTheDocument();
      expect(screen.getByText("Smart Lighting In Architectural Design")).toBeInTheDocument();

      const deleteBtn = screen.getByRole("button", { name: /Delete Permanently/i });
      fireEvent.click(deleteBtn);
      expect(onConfirm).toHaveBeenCalledWith(mockBlogs[0].id);
    });
  });

  describe("BlogPreviewModal", () => {
    it("renders blog preview modal with title and content", () => {
      render(
        <BlogPreviewModal
          isOpen={true}
          blog={mockBlogs[0]}
          onClose={vi.fn()}
        />,
      );

      expect(screen.getByText("Smart Lighting In Architectural Design")).toBeInTheDocument();
      expect(screen.getByText("How intelligent illumination elevates residential spaces.")).toBeInTheDocument();
      expect(screen.getByText("Close Preview")).toBeInTheDocument();
    });
  });
});
