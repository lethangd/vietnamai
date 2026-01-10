"use client";

import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-6xl items-center justify-center px-4">
        <Spinner className="h-5 w-5" />
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}

