import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isInitializing, isAdmin } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
