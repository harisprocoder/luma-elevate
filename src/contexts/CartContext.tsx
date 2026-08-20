import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  shippingProgress: number;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "luma-cart";
const FREE_SHIPPING_THRESHOLD = 100;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success("Added to cart", { description: `${item.name} (${item.color} / ${item.size})` });
  }, []);

  const removeItem = useCallback((productId: string, color: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.color === color && i.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, color: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.productId === productId && i.color === color && i.size === size)));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.color === color && i.size === size ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;
  const total = subtotal + shipping;
  const shippingProgress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        shippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
