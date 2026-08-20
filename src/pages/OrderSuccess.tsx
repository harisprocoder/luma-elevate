import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight } from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === id);

  return (
    <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto text-center px-4"
      >
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-foreground flex items-center justify-center"
        >
          <Check className="h-8 w-8 text-background" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-serif font-semibold text-foreground mb-3"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mb-2"
        >
          Thank you for your purchase.
        </motion.p>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-6 my-8 text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-foreground font-medium">Order #{order.id}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Estimated delivery: <span className="text-foreground">{order.estimatedDelivery}</span>
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3 mt-6"
        >
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors"
          >
            View My Orders
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/shop"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
