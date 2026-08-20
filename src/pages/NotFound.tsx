import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-7xl font-serif font-bold text-foreground mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors"
        >
          Return Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
