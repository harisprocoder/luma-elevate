import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Truck, RotateCcw, Shield, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, getNewArrivals, getBestsellers } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();
  const displayCategories = categories.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px), radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
            >
              New Season Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.05] mb-6"
            >
              Essentials,
              <br />
              <span className="italic text-muted-foreground/60">elevated.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              Thoughtfully crafted essentials that balance refined aesthetics with everyday comfort.
              Built to last, designed to endure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-all duration-200 hover:shadow-lg hover:shadow-foreground/10"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop?category=new-arrivals"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-muted/50 transition-all duration-200"
              >
                Explore New Arrivals
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { icon: Truck, label: "Free Shipping", desc: "On orders over $100" },
              { icon: RotateCcw, label: "Easy Returns", desc: "30-day free returns" },
              { icon: Shield, label: "Secure Checkout", desc: "100% encrypted payment" },
              { icon: Star, label: "Premium Quality", desc: "Curated with care" },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-3 py-6 px-4 md:px-6"
              >
                <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Browse by
              </p>
              <h2 className="text-3xl font-serif font-semibold text-foreground">
                Categories
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {displayCategories.map((cat, i) => (
              <motion.div key={cat.id} variants={fadeUp} custom={i + 1}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block relative aspect-[4/5] rounded-xl overflow-hidden bg-card border border-border/50"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm font-medium text-foreground mb-0.5">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 p-1.5 bg-background/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-3.5 w-3.5 text-foreground" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 lg:py-28 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Just Arrived
              </p>
              <h2 className="text-3xl font-serif font-semibold text-foreground">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop?category=new-arrivals"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {newArrivals.map((product, i) => (
              <motion.div key={product.id} variants={fadeUp} custom={i + 1}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] p-10 sm:p-16 lg:p-20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/3 rounded-full blur-3xl" />
            <div className="relative max-w-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200/60 mb-4">
                Summer Collection
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-4">
                Designed for the season ahead.
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Explore our latest collection of lightweight, breathable essentials crafted for warm
                days and cooler evenings.
              </p>
              <Link
                to="/shop?category=new-arrivals"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 lg:py-28 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Customer Favorites
              </p>
              <h2 className="text-3xl font-serif font-semibold text-foreground">
                Bestsellers
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {bestsellers.map((product, i) => (
              <motion.div key={product.id} variants={fadeUp} custom={i + 1}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
