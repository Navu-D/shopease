export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: number;
  updatedAt: number;
  trackingNumber?: string;
}

export interface User {
  principal: string;
  role: "admin" | "user" | "guest";
}
