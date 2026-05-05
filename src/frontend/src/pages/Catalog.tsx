import { SAMPLE_CATEGORIES } from "@/api";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useQueries";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

function ProductGridSkeleton() {
  const skeletonIds = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skeletonIds.map((id) => (
        <div
          key={id}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Catalog() {
  const navigate = useNavigate();
  // Read ?category= from URL
  const searchParams = useSearch({ strict: false }) as { category?: string };
  const activeCategory = searchParams.category ?? "all";
  const [query, setQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: products, isLoading } = useProducts(
    activeCategory === "all" ? undefined : activeCategory,
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [products, query]);

  const handleCategory = (slug: string) => {
    navigate({
      to: "/products",
      search: slug === "all" ? {} : { category: slug },
    });
  };

  const activeCategoryLabel =
    SAMPLE_CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? "All";

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Shop All Products
          </h1>
          <p className="mt-1 text-muted-foreground">
            {activeCategoryLabel} collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside
            className="hidden lg:block w-56 shrink-0"
            data-ocid="catalog.filter_sidebar"
          >
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-2">
                Categories
              </p>
              {SAMPLE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategory(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    activeCategory === cat.slug
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`catalog.category.${cat.slug}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search products…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 bg-card"
                  data-ocid="catalog.search_input"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {/* Mobile filter toggle */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen((v) => !v)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-smooth"
                data-ocid="catalog.mobile_filter_toggle"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>

              <span className="text-sm text-muted-foreground shrink-0">
                {isLoading ? "…" : `${filtered.length} products`}
              </span>
            </div>

            {/* Mobile category chips */}
            {mobileFiltersOpen && (
              <div className="lg:hidden flex flex-wrap gap-2 mb-5">
                {SAMPLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      handleCategory(cat.slug);
                      setMobileFiltersOpen(false);
                    }}
                    className="transition-smooth"
                    data-ocid={`catalog.mobile_category.${cat.slug}`}
                  >
                    <Badge
                      variant={
                        activeCategory === cat.slug ? "default" : "outline"
                      }
                      className="cursor-pointer px-3 py-1 text-sm"
                    >
                      {cat.name}
                    </Badge>
                  </button>
                ))}
              </div>
            )}

            {/* Active filter badge */}
            {activeCategory !== "all" && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">
                  Filtering:
                </span>
                <Badge variant="secondary" className="gap-1">
                  {activeCategoryLabel}
                  <button
                    type="button"
                    onClick={() => handleCategory("all")}
                    className="ml-1 hover:text-destructive transition-colors"
                    aria-label="Clear filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}

            {/* Grid */}
            {isLoading ? (
              <ProductGridSkeleton />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={PackageSearch}
                title="No products found"
                description={
                  query
                    ? `No results for "${query}". Try a different search term.`
                    : "No products in this category yet."
                }
                action={{
                  label: "Clear filters",
                  onClick: () => {
                    setQuery("");
                    handleCategory("all");
                  },
                }}
              />
            ) : (
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                data-ocid="catalog.product_grid"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
