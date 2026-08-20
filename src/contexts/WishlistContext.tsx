import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";

interface WishlistContextType {
  items: string[];
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const WISHLIST_KEY = "luma-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const toggleItem = useCallback((productId: string) => {
    setItems((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        toast.info("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      }
      toast.success("Added to wishlist");
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => items.includes(productId), [items]);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
