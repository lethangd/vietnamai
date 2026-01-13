import { AdminProtectedWrapper } from "@/components/admin/AdminProtectedWrapper";

export default function AdminProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminProtectedWrapper>{children}</AdminProtectedWrapper>;
}

