import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  Star,
  Minus,
  Plus,
} from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const inWishlist = product ? isInWishlist(product.id) : false;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-4">Product not found</h1>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
        color: product.colors[selectedColor]?.name || "",
        size: product.sizes[selectedSize] || "",
      });
    }
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const accordions = [
    { key: "details", title: "Product Details", content: product.description },
    { key: "features", title: "Features & Materials", content: product.features.join(" • ") },
    { key: "shipping", title: "Shipping & Returns", content: "Free standard shipping on orders over $100. Express shipping available. Free 30-day returns on all orders. Items must be unworn with tags attached." },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border/50">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium uppercase tracking-wider rounded-lg">
                  {product.badge}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-xl overflow-hidden bg-card border-2 transition-colors cursor-pointer",
                      i === 0 ? "border-foreground" : "border-border hover:border-foreground/30"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-semibold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs font-medium rounded">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-3">
                  Color: <span className="text-muted-foreground font-normal">{product.colors[selectedColor]?.name}</span>
                </p>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(i)}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 transition-all",
                        selectedColor === i ? "border-foreground scale-110" : "border-border hover:border-foreground/30"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">
                    Size: <span className="text-muted-foreground font-normal">{product.sizes[selectedSize]}</span>
                  </p>
                  <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      className={cn(
                        "min-w-[48px] h-11 px-4 rounded-lg border text-sm font-medium transition-all",
                        selectedSize === i
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card text-foreground border-border hover:border-foreground/30"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
              <div className="inline-flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-all hover:shadow-lg hover:shadow-foreground/10"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart — ${product.price * quantity}
              </button>
              <button
                onClick={() => toggleItem(product.id)}
                className={cn(
                  "h-12 w-12 flex items-center justify-center rounded-xl border transition-all",
                  inWishlist
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground border-border hover:border-foreground/30"
                )}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "30-Day Returns" },
                { icon: Shield, label: "Secure Checkout" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-3 bg-card border border-border/50 rounded-xl">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground text-center">{label}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-border">
              {accordions.map(({ key, title, content }) => (
                <div key={key} className="border-b border-border">
                  <button
                    onClick={() => toggleAccordion(key)}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-foreground"
                  >
                    {title}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        activeAccordion === key && "rotate-180"
                      )}
                    />
                  </button>
                  {activeAccordion === key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pb-4"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
