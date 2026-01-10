import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <DashboardShell
        title="Staff"
        nav={[
          { href: "/staff", label: "Chấm công" },
          { href: "/staff/history", label: "Lịch sử chấm công" }
        ]}
      >
        {children}
      </DashboardShell>
    </RequireAuth>
  );
}

