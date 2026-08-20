import { Link } from "react-router";
import { motion } from "framer-motion";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-500/10 text-blue-500",
  processing: "bg-amber-500/10 text-amber-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
};

export default function Orders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">No orders yet</h1>
          <p className="text-sm text-muted-foreground mb-8">When you place an order, it will appear here.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors"
          >
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">My Orders</h1>
        <p className="text-sm text-muted-foreground mb-8">{orders.length} {orders.length === 1 ? "order" : "orders"}</p>

        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Order #{order.id}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-lg capitalize",
                    statusColors[order.status] || "bg-muted text-muted-foreground"
                  )}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2">
                {order.items.slice(0, 4).map((item) => (
                  <div
                    key={`${item.productId}-${item.color}-${item.size}`}
                    className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="w-14 h-14 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{order.items.length - 4}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  {order.estimatedDelivery && (
                    <span className="ml-2">• Est. {order.estimatedDelivery}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-foreground">${order.total.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
