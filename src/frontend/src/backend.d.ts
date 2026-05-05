import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ProductInput {
    imageBlob?: ExternalBlob;
    name: string;
    description: string;
    isActive: boolean;
    stock: bigint;
    category: string;
    price: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CategoryInput {
    name: string;
    description: string;
}
export interface ShippingAddress {
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
}
export interface OrderItem {
    name: string;
    productId: bigint;
    quantity: bigint;
    price: bigint;
}
export interface OrderInput {
    total: bigint;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    customerEmail: string;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    total: bigint;
    createdAt: bigint;
    shippingAddress: ShippingAddress;
    customerId: Principal;
    items: Array<OrderItem>;
    customerEmail: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Cart {
    items: Array<CartItem>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface CartItem {
    name: string;
    productId: bigint;
    quantity: bigint;
    price: bigint;
}
export interface Product {
    id: bigint;
    imageBlob?: ExternalBlob;
    name: string;
    createdAt: bigint;
    description: string;
    isActive: boolean;
    stock: bigint;
    category: string;
    price: bigint;
}
export interface Category {
    id: bigint;
    name: string;
    description: string;
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdmin(user: Principal): Promise<void>;
    addToCart(item: CartItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCategory(input: CategoryInput): Promise<Category>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(input: OrderInput): Promise<Order>;
    createProduct(input: ProductInput): Promise<Product>;
    deleteProduct(id: bigint): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Cart>;
    getCategories(): Promise<Array<Category>>;
    getCustomerOrders(): Promise<Array<Order>>;
    getOrder(id: bigint): Promise<Order | null>;
    getProductById(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getStats(): Promise<{
        totalOrders: bigint;
        totalRevenue: bigint;
    }>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeAdmin(user: Principal): Promise<void>;
    removeFromCart(productId: bigint): Promise<void>;
    searchProducts(term: string): Promise<Array<Product>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartItem(productId: bigint, quantity: bigint): Promise<void>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: bigint, input: ProductInput): Promise<Product | null>;
}
