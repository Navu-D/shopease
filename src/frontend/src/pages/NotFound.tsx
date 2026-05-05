import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center px-4"
      data-ocid="not_found.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-md"
      >
        <div className="font-display text-8xl font-bold text-muted/60">404</div>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Page not found
          </h1>
          <p className="text-muted-foreground">
            The page you\'re looking for doesn\'t exist or has been moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button asChild data-ocid="not_found.home_button">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" /> Go home
            </Link>
          </Button>
          <Button variant="outline" asChild data-ocid="not_found.browse_button">
            <Link to="/products">
              <Search className="h-4 w-4 mr-2" /> Browse products
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
