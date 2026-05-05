import { createActor } from "@/backend";
import type { Category, Order, Product, ShippingAddress } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";

// Re-export useActor hook with createActor bound
export function useBackendActor() {
  return useActor(createActor);
}

// Utility to handle backend errors gracefully
export function handleError(
  error: unknown,
  fallback = "An error occurred",
): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
}

// Product sample data for UI when backend not yet wired
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Leather Backpack",
    description:
      'Clean lines, premium full-grain leather. Fits a 15" laptop with room to spare.',
    price: 12999,
    category: "accessories",
    imageUrl: "/assets/images/product-backpack.jpg",
    stock: 24,
    rating: 4.8,
    reviewCount: 142,
  },
  {
    id: "2",
    name: "Premium Cotton Tee",
    description:
      "200 gsm organic cotton. Pre-shrunk, relaxed fit that holds its shape.",
    price: 2999,
    category: "clothing",
    imageUrl: "/assets/images/product-tee.jpg",
    stock: 86,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Classic White Sneakers",
    description:
      "Vulcanized rubber sole, canvas upper. A wardrobe essential built to last.",
    price: 3999,
    category: "shoes",
    imageUrl: "/assets/images/product-sneakers.jpg",
    stock: 45,
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "4",
    name: "Slim-Fit Chinos",
    description:
      "Stretch twill fabric, tapered leg. Goes from office to weekend with ease.",
    price: 5999,
    category: "clothing",
    imageUrl: "/assets/images/product-chinos.jpg",
    stock: 32,
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: "5",
    name: "Minimalist Leather Duffle",
    description:
      "Vegan leather weekender. Fits everything for 3 days, overhead compartment approved.",
    price: 1699,
    category: "accessories",
    imageUrl: "/assets/images/product-duffle.jpg",
    stock: 18,
    rating: 4.9,
    reviewCount: 54,
  },
  {
    id: "6",
    name: "Merino Wool Sweater",
    description:
      "Superfine 17.5 micron Merino. Warm, breathable, and machine washable.",
    price: 8999,
    category: "clothing",
    imageUrl: "/assets/images/product-sweater.jpg",
    stock: 28,
    rating: 4.7,
    reviewCount: 91,
  },
];

export const SAMPLE_CATEGORIES: Category[] = [
  { id: "all", name: "All", slug: "all" },
  { id: "clothing", name: "Clothing", slug: "clothing" },
  { id: "shoes", name: "Shoes", slug: "shoes" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
];

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] ?? status;
}

export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_COST = 699;
