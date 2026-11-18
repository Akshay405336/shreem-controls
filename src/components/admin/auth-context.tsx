"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { AdminSafeUser } from "@/lib/auth/domain/types";

interface AdminAuthContextType {
  admin: AdminSafeUser | null;
  isLoading: boolean;
  refreshAdmin: () => Promise<AdminSafeUser | null>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

let inFlightRefresh: Promise<AdminSafeUser | null> | null = null;

async function executeRefresh(): Promise<AdminSafeUser | null> {
  if (inFlightRefresh) {
    return inFlightRefresh;
  }

  inFlightRefresh = (async () => {
    try {
      const res = await fetch("/api/admin/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        return null;
      }

      const json = await res.json();
      return json.success ? (json.data as AdminSafeUser) : null;
    } catch {
      return null;
    } finally {
      inFlightRefresh = null;
    }
  })();

  return inFlightRefresh;
}

export function AdminAuthProvider({
  children,
  initialAdmin = null,
}: {
  children: ReactNode;
  initialAdmin?: AdminSafeUser | null;
}) {
  const [admin, setAdmin] = useState<AdminSafeUser | null>(initialAdmin);
  const [isLoading, setIsLoading] = useState(!initialAdmin);
  const router = useRouter();

  const refreshAdmin = useCallback(async (): Promise<AdminSafeUser | null> => {
    try {
      const res = await fetch("/api/admin/auth/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const fetchedAdmin = json.data as AdminSafeUser;
          setAdmin(fetchedAdmin);
          return fetchedAdmin;
        }
      }

      // If /me returned 401, attempt silent refresh once
      const refreshedAdmin = await executeRefresh();
      setAdmin(refreshedAdmin);
      return refreshedAdmin;
    } catch {
      setAdmin(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!initialAdmin) {
      fetch("/api/admin/auth/me")
        .then((res) => {
          if (res.ok) return res.json();
          if (res.status === 401) return executeRefresh();
          return null;
        })
        .then((data) => {
          if (isMounted && data) {
            const user = (data && "data" in data) ? (data.data as AdminSafeUser) : (data as AdminSafeUser);
            if (user && user.email) {
              setAdmin(user);
            }
          }
        })
        .catch(() => {})
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    }

    // Background interval to proactively rotate access tokens before 15m expiration
    const refreshInterval = setInterval(() => {
      executeRefresh().then((refreshed) => {
        if (isMounted && refreshed) {
          setAdmin(refreshed);
        }
      });
    }, 10 * 60 * 1000); // 10 minutes

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, [initialAdmin]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      setAdmin(null);
      if (typeof window !== "undefined" && !process.env.VITEST) {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/admin/login";
      } else {
        router.push("/admin/login");
        router.refresh();
      }
    }
  }, [router]);

  const logoutAll = useCallback(async () => {
    try {
      await fetch("/api/admin/auth/logout-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      setAdmin(null);
      if (typeof window !== "undefined" && !process.env.VITEST) {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/admin/login";
      } else {
        router.push("/admin/login");
        router.refresh();
      }
    }
  }, [router]);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isLoading,
        refreshAdmin,
        logout,
        logoutAll,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
