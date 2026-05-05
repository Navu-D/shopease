import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
