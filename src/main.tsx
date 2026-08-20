import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { OrdersProvider } from "@/contexts/OrdersContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import "./index.css";

// Lazy load route components
const Home = lazy(() => import("./pages/Home.tsx"));
const Shop = lazy(() => import("./pages/Shop.tsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <OrdersProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppLayout />
              <Toaster position="bottom-right" />
            </BrowserRouter>
          </OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
