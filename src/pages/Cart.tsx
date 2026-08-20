import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, shipping, total, freeShippingThreshold, shippingProgress } = useCart();

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">Your bag is empty</h1>
          <p className="text-sm text-muted-foreground mb-8">Start adding items to your bag.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-semibold text-foreground mb-8">Shopping Bag</h1>

        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 && (
          <div className="mb-8 p-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-foreground">
                <span className="font-medium">${amountToFreeShipping.toFixed(2)}</span> away from free shipping
              </p>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${shippingProgress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 p-4 bg-card border border-border rounded-xl"
                >
                  <Link
                    to={`/product/${item.productId}`}
                    className="w-20 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{item.brand}</p>
                        <Link to={`/product/${item.productId}`} className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                          {item.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.color, item.size)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.color} / {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={cn("text-foreground", shipping === 0 && "text-green-600 dark:text-green-400")}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total</span>
                  <span className="text-lg font-semibold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors mb-3"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="w-full block text-center py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
