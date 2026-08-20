import { useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Wishlist() {
  const { items } = useWishlist();

  const wishlistProducts = useMemo(
    () => items.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products,
    [items]
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">Your wishlist is empty</h1>
          <p className="text-sm text-muted-foreground mb-8">Save items you love for later.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors"
          >
            Browse Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">Wishlist</h1>
        <p className="text-sm text-muted-foreground mb-8">{wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
