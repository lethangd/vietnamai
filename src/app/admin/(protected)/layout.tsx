import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getAdminFromCookie } from "@/lib/admin/guard";
import { redirect } from "next/navigation";

export default async function AdminProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/admin/login");

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
        { href: "/api/admin/logout", label: "Đăng xuất Admin" }
      ]}
    >
      {children}
    </DashboardShell>
  );
}

