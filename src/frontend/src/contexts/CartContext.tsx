import type { Cart, CartItem, Product } from "@/types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" };

function computeCart(items: CartItem[]): Cart {
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return { items, total, itemCount };
}

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_ITEM": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find(
        (i) => i.productId === action.product.id,
      );
      const items = existing
        ? state.items.map((i) =>
            i.productId === action.product.id
              ? { ...i, quantity: i.quantity + qty }
              : i,
          )
        : [
            ...state.items,
            {
              productId: action.product.id,
              product: action.product,
              quantity: qty,
            },
          ];
      return computeCart(items);
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.productId !== action.productId);
      return computeCart(items);
    }
    case "UPDATE_QTY": {
      const items =
        action.quantity <= 0
          ? state.items.filter((i) => i.productId !== action.productId)
          : state.items.map((i) =>
              i.productId === action.productId
                ? { ...i, quantity: action.quantity }
                : i,
            );
      return computeCart(items);
    }
    case "CLEAR":
      return computeCart([]);
    default:
      return state;
  }
}

interface CartContextValue {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "shopease-cart";

function loadCartFromStorage(): Cart {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Cart;
  } catch {
    // ignore parse errors
  }
  return { items: [], total: 0, itemCount: 0 };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    undefined,
    loadCartFromStorage,
  );

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", product, quantity });
  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", productId });
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR" });
  const isInCart = (productId: string) =>
    cart.items.some((i) => i.productId === productId);
  const getItemQuantity = (productId: string) =>
    cart.items.find((i) => i.productId === productId)?.quantity ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
