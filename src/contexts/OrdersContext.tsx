import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { CartItem } from "./CartContext";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
  status: "confirmed" | "processing" | "shipped" | "delivered";
  estimatedDelivery: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status" | "estimatedDelivery">) => Order;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

const ORDERS_KEY = "luma-orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback(
    (orderData: Omit<Order, "id" | "date" | "status" | "estimatedDelivery">) => {
      const id = `LM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const now = new Date();
      const delivery = new Date(now);
      delivery.setDate(delivery.getDate() + 5);

      const order: Order = {
        ...orderData,
        id,
        date: now.toISOString(),
        status: "confirmed",
        estimatedDelivery: delivery.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };

      setOrders((prev) => [order, ...prev]);
      return order;
    },
    []
  );

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
}
