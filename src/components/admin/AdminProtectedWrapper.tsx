"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Client-side admin authentication wrapper
 * Kiểm tra JWT token trong localStorage
 */
export function AdminProtectedWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("vietnamai_admin_token");
    const expires = localStorage.getItem("vietnamai_admin_expires");
    
    if (!token || !expires) {
      router.replace("/admin/login");
      return;
    }
    
    const expTime = parseInt(expires, 10);
    if (expTime <= Date.now()) {
      // Token hết hạn
      localStorage.removeItem("vietnamai_admin_token");
      localStorage.removeItem("vietnamai_admin_expires");
      router.replace("/admin/login");
      return;
    }
    
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("vietnamai_admin_token");
    localStorage.removeItem("vietnamai_admin_expires");
    router.replace("/admin/login");
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <Spinner /> Đang kiểm tra đăng nhập…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardShell
      title="Admin"
      nav={[
        { href: "/admin", label: "Tổng quan" },
        { href: "/admin/products", label: "Sản phẩm" },
        { href: "/admin/categories", label: "Thể loại" },
        { href: "/admin/settings", label: "Cài đặt (Zalo/Tele/Giảm giá)" },
        { href: "/admin/orders", label: "Đơn hàng" },
        { href: "/admin/attendance", label: "Chấm công (quản lý)" },
        { href: "/admin/staff", label: "Tài khoản staff" },
      ]}
      onLogout={handleLogout}
    >
      {children}
    </DashboardShell>
  );
}
