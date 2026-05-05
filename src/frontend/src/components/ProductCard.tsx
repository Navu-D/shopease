import { formatPrice } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success("Added to cart!", {
      description: product.name,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-elevated transition-smooth"
        data-ocid={`product.item.${index + 1}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {product.stock <= 5 && product.stock > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 text-xs"
            >
              Only {product.stock} left
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge
              variant="secondary"
              className="absolute top-2 left-2 text-xs"
            >
              Out of stock
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="font-display font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            <Button
              size="sm"
              variant={isInCart(product.id) ? "secondary" : "default"}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="shrink-0"
              data-ocid={`product.add_button.${index + 1}`}
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
              {isInCart(product.id) ? "In Cart" : "Add"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
