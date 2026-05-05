import { SAMPLE_PRODUCTS, formatPrice } from "@/api";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { useProduct } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-4 w-48 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: product, isLoading } = useProduct(id);
  const { addItem, isInCart, getItemQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Reset qty when product changes
  useEffect(() => {
    setQty(1);
    setAdded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = product
    ? SAMPLE_PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id,
      ).slice(0, 4)
    : [];

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-foreground">
          Product not found
        </p>
        <Link to="/products">
          <Button variant="outline">Back to catalog</Button>
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);
  const maxQty = product.stock;
  const stockLow = product.stock > 0 && product.stock <= 5;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              to="/"
              className="hover:text-foreground transition-colors"
              data-ocid="product_detail.breadcrumb_home"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              to="/products"
              className="hover:text-foreground transition-colors"
              data-ocid="product_detail.breadcrumb_products"
            >
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[160px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-border bg-muted aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            {/* Title + rating */}
            <div>
              <Badge variant="outline" className="mb-3 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-display font-bold text-foreground leading-tight">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {([1, 2, 3, 4, 5] as const).map((pos) => (
                    <Star
                      key={pos}
                      className={`h-4 w-4 ${
                        pos <= Math.round(product.rating)
                          ? "fill-secondary text-secondary"
                          : "text-border fill-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-display font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
            </div>

            <Separator />

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              {product.stock === 0 ? (
                <>
                  <Package className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">
                    Out of stock
                  </span>
                </>
              ) : stockLow ? (
                <>
                  <Package className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">
                    Only {product.stock} left in stock
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">
                    In stock
                  </span>
                </>
              )}
            </div>

            {/* Quantity selector + Add to cart */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center border border-border rounded-lg overflow-hidden bg-card"
                  data-ocid="product_detail.qty_selector"
                >
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth disabled:opacity-40"
                    aria-label="Decrease quantity"
                    data-ocid="product_detail.qty_minus"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span
                    className="px-4 py-2.5 text-sm font-semibold text-foreground min-w-[3rem] text-center border-x border-border"
                    data-ocid="product_detail.qty_value"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    disabled={qty >= maxQty}
                    className="px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth disabled:opacity-40"
                    aria-label="Increase quantity"
                    data-ocid="product_detail.qty_plus"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  variant={added ? "secondary" : "default"}
                  data-ocid="product_detail.add_to_cart_button"
                >
                  {added ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {inCart ? `Add More (${cartQty} in cart)` : "Add to Cart"}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                Free shipping over $50
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                Easy 30-day returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                You might also like
              </h2>
              <Link
                to="/products"
                search={{ category: product.category }}
                className="text-sm text-primary hover:underline flex items-center gap-1"
                data-ocid="product_detail.view_all_related"
              >
                See all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              data-ocid="product_detail.related_grid"
            >
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
