"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

const STORAGE_KEY = "vietnamai_admin_token";
const STORAGE_EXPIRES_KEY = "vietnamai_admin_expires";

type AdminAuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    const expiresAt = localStorage.getItem(STORAGE_EXPIRES_KEY);
    
    if (storedToken && expiresAt) {
      const expTime = parseInt(expiresAt, 10);
      if (expTime > Date.now()) {
        setToken(storedToken);
      } else {
        // Token đã hết hạn
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_EXPIRES_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json().catch(() => null) as {
        ok?: boolean;
        error?: string;
        token?: string;
        expiresAt?: number;
      } | null;
      
      if (!res.ok || !data?.ok) {
        return { ok: false, error: data?.error ?? "Đăng nhập thất bại" };
      }
      
      if (data.token && data.expiresAt) {
        localStorage.setItem(STORAGE_KEY, data.token);
        localStorage.setItem(STORAGE_EXPIRES_KEY, data.expiresAt.toString());
        setToken(data.token);
      }
      
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Lỗi kết nối" };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_EXPIRES_KEY);
    setToken(null);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}

/**
 * Helper để lấy token (dùng cho fetch requests)
 */
export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  
  const storedToken = localStorage.getItem(STORAGE_KEY);
  const expiresAt = localStorage.getItem(STORAGE_EXPIRES_KEY);
  
  if (!storedToken || !expiresAt) return null;
  
  const expTime = parseInt(expiresAt, 10);
  if (expTime <= Date.now()) {
    // Token hết hạn
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_EXPIRES_KEY);
    return null;
  }
  
  return storedToken;
}
