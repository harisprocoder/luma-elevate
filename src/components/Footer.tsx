import { Link } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list", {
        description: "We'll let you know about new collections and exclusive offers.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="py-12 border-b border-border">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
              Stay in the Loop
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Be the first to know about new collections, limited releases, and exclusive member
              offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-10 px-4 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
              <button
                type="submit"
                className="h-10 px-6 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {["New Arrivals", "Bestsellers", "Footwear", "T-Shirts", "Hoodies"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/shop?category=${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground mb-4">
              Help
            </h4>
            <ul className="space-y-2.5">
              {["Shipping & Returns", "Size Guide", "Track Order", "Contact Us", "FAQ"].map(
                (link) => (
                  <li key={link}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default">
                      {link}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground mb-4">
              About
            </h4>
            <ul className="space-y-2.5">
              {["Our Story", "Sustainability", "Careers", "Press"].map((link) => (
                <li key={link}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {["Instagram", "Twitter", "Pinterest", "TikTok"].map((link) => (
                <li key={link}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-serif font-semibold text-foreground">LUMA</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Luma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
