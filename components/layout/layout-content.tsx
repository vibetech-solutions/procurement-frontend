"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { AppShellLayout } from "./app-shell";
import { protectedRoutes } from "@/lib/utils/constants";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return <>{children}</>;
  }

  return <AppShellLayout>{children}</AppShellLayout>;
}
