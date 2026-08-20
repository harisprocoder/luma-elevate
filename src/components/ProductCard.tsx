import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const inWishlist = isInWishlist(product.id);

  const badgeLabel =
    product.badge === "new"
      ? "New"
      : product.badge === "sale"
        ? "Sale"
        : product.badge === "bestseller"
          ? "Best"
          : product.badge === "limited"
            ? "Limited"
            : null;

  return (
    <motion.div
      className={cn("group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-card border border-border/50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Badge */}
          {badgeLabel && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-foreground text-background text-[10px] font-medium uppercase tracking-wider rounded-md">
              {badgeLabel}
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleItem(product.id);
            }}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
              inWishlist
                ? "bg-foreground text-background"
                : "bg-background/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 hover:bg-background"
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </button>

          {/* Hover Actions */}
          <motion.div
            className="absolute bottom-3 left-3 right-3 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  productId: product.id,
                  name: product.name,
                  brand: product.brand,
                  price: product.price,
                  image: product.images[0],
                  color: product.colors[0]?.name || "",
                  size: product.sizes[0] || "",
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </button>
            <Link
              to={`/product/${product.id}`}
              className="flex items-center justify-center p-2.5 bg-background/90 backdrop-blur-sm text-foreground rounded-lg hover:bg-background transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="Quick view"
            >
              <Eye className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 px-1">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">
          {product.brand}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-3 h-3 rounded-full border border-border/60"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-muted-foreground">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
