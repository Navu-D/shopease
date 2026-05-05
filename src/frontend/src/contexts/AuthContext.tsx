import { createActor } from "@/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  login: () => void;
  logout: () => void;
  principalId: string | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const principalId = identity?.getPrincipal().toString() ?? null;

  const { actor, isFetching } = useActor(createActor);
  const { data: isAdmin = false } = useQuery<boolean>({
    queryKey: ["isAdmin", principalId],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  const logout = () => {
    clear();
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitializing,
        isLoggingIn,
        login,
        logout,
        principalId,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
