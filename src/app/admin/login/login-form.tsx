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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFA] px-4 py-12 font-sans sm:px-6">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex items-center justify-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-[#009E98]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#087F7B]">
              CONTROL CENTER
            </span>
            <span className="h-[2px] w-6 rounded-full bg-[#009E98]" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-[0.14em] text-[#252A2A]">
            SHREEMCONTROLS
          </h1>
          <p className="mt-1 text-xs font-semibold tracking-[0.25em] text-[#009E98]">
            ADMINISTRATION
          </p>
          <p className="mt-3 text-[15px] text-[#737B7A] leading-relaxed">
            Sign in to access the administration dashboard.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-[#DDECEB] bg-white p-8 shadow-[0_6px_24px_rgba(37,42,42,0.05)]">
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            data-testid="login-form"
            className="space-y-5"
            noValidate
          >
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-[15px] sm:text-[16px] font-medium text-[#252A2A]"
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
                className="block h-11 w-full rounded-lg border border-[#DDECEB] bg-[#F4FBFA] px-3.5 text-[15px] sm:text-[16px] text-[#252A2A] placeholder-[#737B7A]/50 transition-colors focus:border-[#009E98] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#009E98] disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-[15px] sm:text-[16px] font-medium text-[#252A2A]"
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
                  className="block h-11 w-full rounded-lg border border-[#DDECEB] bg-[#F4FBFA] px-3.5 pr-10 text-[15px] sm:text-[16px] text-[#252A2A] placeholder-[#737B7A]/50 transition-colors focus:border-[#009E98] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#009E98] disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#737B7A] transition-colors hover:text-[#252A2A] focus:outline-none"
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
              className="mt-3 flex h-11 w-full items-center justify-center rounded-lg bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-[15px] sm:text-[16px] font-medium text-white shadow-[0_6px_18px_rgba(0,158,152,0.2)] transition-all hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)] hover:shadow-[0_8px_22px_rgba(0,158,152,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009E98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[13px] text-[#737B7A]">
          ShreemControls Administration Portal
        </p>
      </div>
    </div>
  );
}
