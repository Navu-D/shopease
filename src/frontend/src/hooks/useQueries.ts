import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from "@/api";
import { createActor } from "@/backend";
import type { Category, Order, Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// Products
export function useProducts(category?: string) {
  void useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      // Return sample data — replace with actor calls once backend methods exist
      if (category && category !== "all") {
        return SAMPLE_PRODUCTS.filter((p) => p.category === category);
      }
      return SAMPLE_PRODUCTS;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: string) {
  void useActor(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      return SAMPLE_PRODUCTS.find((p) => p.id === id) ?? null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => SAMPLE_CATEGORIES,
    staleTime: 1000 * 60 * 10,
  });
}

// Orders
export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrder(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}
