export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Layout trống để `/admin/login` không bị redirect.
  // Các trang admin thật nằm trong route group `admin/(protected)` và sẽ được guard ở đó.
  return <>{children}</>;
}

