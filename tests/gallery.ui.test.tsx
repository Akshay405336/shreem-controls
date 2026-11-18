// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GalleryTable } from "../src/components/admin/gallery/gallery-table";
import { AddGalleryModal } from "../src/components/admin/gallery/add-gallery-modal";
import { EditGalleryModal } from "../src/components/admin/gallery/edit-gallery-modal";
import { DeleteGalleryDialog } from "../src/components/admin/gallery/delete-gallery-dialog";
import { ImagePreviewModal } from "../src/components/admin/gallery/image-preview-modal";
import type { GalleryImageDto } from "@/lib/gallery/types";

describe("Gallery UI Components", () => {
  const mockImages: GalleryImageDto[] = [
    {
      id: "img-1",
      title: "Smart Lighting System",
      imageUrl: "/gallery/img-1.webp",
      imageFileName: "img-1.webp",
      imageMimeType: "image/webp",
      imageSize: 1024 * 350, // 350 KB
      width: 1920,
      height: 1080,
      status: "PUBLISHED",
      sortOrder: 0,
      createdAt: new Date("2026-03-01T10:00:00Z"),
      updatedAt: new Date("2026-03-01T10:00:00Z"),
    },
    {
      id: "img-2",
      title: "Control Panel Interface",
      imageUrl: "/gallery/img-2.webp",
      imageFileName: "img-2.webp",
      imageMimeType: "image/webp",
      imageSize: 1024 * 720, // 720 KB
      width: 2400,
      height: 1600,
      status: "DRAFT",
      sortOrder: 1,
      createdAt: new Date("2026-03-02T12:00:00Z"),
      updatedAt: new Date("2026-03-02T12:00:00Z"),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GalleryTable", () => {
    it("renders gallery table rows with title, dimensions, and status", () => {
      render(
        <GalleryTable
          items={mockImages}
          isLoading={false}
          selectedIds={new Set()}
          onToggleSelect={vi.fn()}
          onToggleSelectAll={vi.fn()}
          onReorder={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onPreview={vi.fn()}
          onStatusToggle={vi.fn()}
          isReorderEnabled={true}
          onAddNew={vi.fn()}
        />
      );

      expect(screen.getByText("Smart Lighting System")).toBeInTheDocument();
      expect(screen.getByText("Control Panel Interface")).toBeInTheDocument();
      expect(screen.getByText("1920 × 1080 px")).toBeInTheDocument();
      expect(screen.getByText("Published")).toBeInTheDocument();
      expect(screen.getByText("Draft")).toBeInTheDocument();
    });

    it("renders empty state when no items are available", () => {
      const handleAddNew = vi.fn();
      render(
        <GalleryTable
          items={[]}
          isLoading={false}
          selectedIds={new Set()}
          onToggleSelect={vi.fn()}
          onToggleSelectAll={vi.fn()}
          onReorder={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onPreview={vi.fn()}
          onStatusToggle={vi.fn()}
          isReorderEnabled={true}
          onAddNew={handleAddNew}
        />
      );

      expect(screen.getByText("No gallery images found")).toBeInTheDocument();
      const addBtn = screen.getByRole("button", { name: "Add Photo" });
      fireEvent.click(addBtn);
      expect(handleAddNew).toHaveBeenCalledTimes(1);
    });

    it("triggers action callbacks when buttons are clicked", () => {
      const handleEdit = vi.fn();
      const handleDelete = vi.fn();
      const handlePreview = vi.fn();

      render(
        <GalleryTable
          items={mockImages}
          isLoading={false}
          selectedIds={new Set()}
          onToggleSelect={vi.fn()}
          onToggleSelectAll={vi.fn()}
          onReorder={vi.fn()}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPreview={handlePreview}
          onStatusToggle={vi.fn()}
          isReorderEnabled={true}
          onAddNew={vi.fn()}
        />
      );

      const editButtons = screen.getAllByTitle("Edit image");
      fireEvent.click(editButtons[0]);
      expect(handleEdit).toHaveBeenCalledWith(mockImages[0]);

      const deleteButtons = screen.getAllByTitle("Delete image");
      fireEvent.click(deleteButtons[0]);
      expect(handleDelete).toHaveBeenCalledWith(mockImages[0]);

      const previewButtons = screen.getAllByTitle("Preview image");
      fireEvent.click(previewButtons[0]);
      expect(handlePreview).toHaveBeenCalledWith(mockImages[0]);
    });
  });

  describe("AddGalleryModal", () => {
    it("does not render when isOpen is false", () => {
      render(
        <AddGalleryModal
          isOpen={false}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
        />
      );

      expect(screen.queryByText("Add Gallery Image")).not.toBeInTheDocument();
    });

    it("renders form and validates required fields", async () => {
      render(
        <AddGalleryModal
          isOpen={true}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
        />
      );

      expect(screen.getByText("Add Gallery Image")).toBeInTheDocument();
      const submitBtn = screen.getByRole("button", { name: "Save Image" });
      fireEvent.click(submitBtn);

      // Should prompt validation for title
      await waitFor(() => {
        expect(screen.getByPlaceholderText("Enter image title")).toBeInTheDocument();
      });
    });
  });

  describe("EditGalleryModal", () => {
    it("renders pre-populated image data", () => {
      render(
        <EditGalleryModal
          isOpen={true}
          image={mockImages[0]}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
        />
      );

      expect(screen.getByText("Edit Gallery Image")).toBeInTheDocument();
      const titleInput = screen.getByDisplayValue("Smart Lighting System") as HTMLInputElement;
      expect(titleInput).toBeInTheDocument();
    });
  });

  describe("DeleteGalleryDialog", () => {
    it("displays image title and triggers onConfirm", async () => {
      const handleConfirm = vi.fn().mockResolvedValue(undefined);
      const handleClose = vi.fn();

      render(
        <DeleteGalleryDialog
          isOpen={true}
          image={mockImages[0]}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      );

      expect(screen.getByRole("heading", { name: "Delete Image" })).toBeInTheDocument();
      expect(screen.getByText("Smart Lighting System")).toBeInTheDocument();

      const confirmBtn = screen.getByRole("button", { name: /Delete Image/i });
      fireEvent.click(confirmBtn);

      await waitFor(() => {
        expect(handleConfirm).toHaveBeenCalledWith("img-1");
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });

  describe("ImagePreviewModal", () => {
    it("renders preview lightbox with metadata", () => {
      const handleClose = vi.fn();
      render(
        <ImagePreviewModal
          isOpen={true}
          image={mockImages[0]}
          onClose={handleClose}
        />
      );

      expect(screen.getByText("Smart Lighting System")).toBeInTheDocument();
      expect(screen.getByText("1920 × 1080 px")).toBeInTheDocument();
      expect(screen.getByAltText("Smart Lighting System")).toHaveAttribute("src", "/gallery/img-1.webp");

      const closeBtn = screen.getByLabelText("Close preview");
      fireEvent.click(closeBtn);
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
