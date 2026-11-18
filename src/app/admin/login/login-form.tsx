"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your admin email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        setErrorMessage(
          data.error || "Invalid credentials. Please verify your email and password.",
        );
        setIsLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      if (typeof window !== "undefined" && !process.env.VITEST) {
        // Full document navigation ensures HTTP-only cookies are committed to the browser cookie jar
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/admin/dashboard";
      }
    } catch {
      setErrorMessage("A network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 py-12 sm:px-6">
      <div className="w-full max-w-sm">
        {/* Brand header */}
        <div className="mb-6 text-center">
          <h1 className="text-sm font-bold tracking-wider text-neutral-900">
            SHREEMCONTROLS
          </h1>
          <p className="mt-0.5 text-xs font-semibold tracking-wider text-[#009E98]">
            ADMINISTRATION
          </p>
          <p className="mt-3 text-xs text-neutral-500">
            Sign in to access the administration dashboard.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          {errorMessage && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            data-testid="login-form"
            className="space-y-4"
            noValidate
          >
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1 block text-xs font-medium text-neutral-700"
              >
                Email address
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shreemcontrols.com"
                className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 transition-colors focus:border-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98] disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1 block text-xs font-medium text-neutral-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 pr-9 text-xs text-neutral-900 placeholder-neutral-400 transition-colors focus:border-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98] disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 transition-colors hover:text-neutral-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center rounded-md bg-[#009E98] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#087F7B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009E98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[11px] text-neutral-400">
          ShreemControls Administration Portal
        </p>
      </div>
    </div>
  );
}
