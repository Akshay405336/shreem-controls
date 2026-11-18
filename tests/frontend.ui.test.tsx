// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../src/app/admin/login/login-form";
import { DashboardView } from "../src/app/admin/(authenticated)/dashboard/dashboard-view";
import { AdminAuthProvider } from "../src/components/admin/auth-context";

// Mock next/navigation
const mockPush = vi.fn();
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  usePathname: () => "/admin/dashboard",
}));

describe("Frontend Admin UI Components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("LoginForm", () => {
    it("renders login form with fields and submit button", () => {
      render(<LoginForm />);

      expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Sign in/i }),
      ).toBeInTheDocument();
    });

    it("displays error message when submitted with empty fields", async () => {
      render(<LoginForm />);

      const form = screen.getByTestId("login-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Please enter your admin email address.",
        );
      });
    });

    it("toggles password visibility when the eye button is clicked", () => {
      render(<LoginForm />);

      const passwordInput = screen.getByLabelText(/^Password$/i);
      expect(passwordInput).toHaveAttribute("type", "password");

      const toggleButton = screen.getByRole("button", { name: /Show password/i });
      fireEvent.click(toggleButton);

      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("displays server error message on rejected login", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          success: false,
          error: "Invalid email or password.",
        }),
      } as unknown as Response);

      render(<LoginForm />);

      fireEvent.change(screen.getByLabelText(/Email address/i), {
        target: { value: "wrong@shreemcontrols.com" },
      });
      fireEvent.change(screen.getByLabelText(/^Password$/i), {
        target: { value: "WrongPass123!" },
      });

      const form = screen.getByTestId("login-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Invalid email or password.",
        );
      });
    });

    it("redirects to dashboard upon successful login", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            id: "test-admin-id",
            name: "Super Admin",
            email: "admin@shreemcontrols.com",
            role: "SUPER_ADMIN",
          },
        }),
      } as unknown as Response);

      render(<LoginForm />);

      fireEvent.change(screen.getByLabelText(/Email address/i), {
        target: { value: "admin@shreemcontrols.com" },
      });
      fireEvent.change(screen.getByLabelText(/^Password$/i), {
        target: { value: "SuperSecretPassword123!" },
      });

      const form = screen.getByTestId("login-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/admin/dashboard");
      });
    });
  });

  describe("DashboardView", () => {
    const mockAdmin = {
      id: "admin-123",
      name: "Akshay Super Admin",
      email: "akshay@shreemcontrols.com",
      role: "SUPER_ADMIN" as const,
    };

    it("displays welcome message with the verified admin name and role", () => {
      render(
        <AdminAuthProvider initialAdmin={mockAdmin}>
          <DashboardView initialAdmin={mockAdmin} />
        </AdminAuthProvider>,
      );

      expect(
        screen.getByText(/Welcome back, Akshay Super Admin/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Here's an overview of your admin account/i),
      ).toBeInTheDocument();
      expect(screen.getByText("Account details")).toBeInTheDocument();
      expect(screen.getByText("Security")).toBeInTheDocument();
      expect(screen.getByText("SUPER_ADMIN")).toBeInTheDocument();
      expect(screen.getByText("akshay@shreemcontrols.com")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders session logout controls", () => {
      render(
        <AdminAuthProvider initialAdmin={mockAdmin}>
          <DashboardView initialAdmin={mockAdmin} />
        </AdminAuthProvider>,
      );

      expect(
        screen.getByRole("button", { name: /Sign out of all devices/i }),
      ).toBeInTheDocument();
    });
  });
});
