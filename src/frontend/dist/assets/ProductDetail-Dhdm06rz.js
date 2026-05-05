import { c as createLucideIcon, d as useParams, e as useCart, r as reactExports, j as jsxRuntimeExports, L as Link, a as Button, B as Badge, f as Separator, g as ShoppingCart } from "./index-Bez7_rsT.js";
import { S as SAMPLE_PRODUCTS, f as formatPrice } from "./api-CWnklUSV.js";
import { S as Star, P as ProductCard } from "./ProductCard-9X7QSFoX.js";
import { S as Skeleton } from "./skeleton-C7iwNq6X.js";
import { a as useProduct } from "./useQueries-DcoAORz1.js";
import { P as Package } from "./package-Di4YZLsY.js";
import { C as CircleCheck } from "./circle-check-D6vAlkAV.js";
import { M as Minus, P as Plus } from "./plus-DbGgDy6a.js";
import { T as Truck } from "./truck-CclLN0Sn.js";
import "./proxy-BNrr1GTP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-1/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
      ] })
    ] })
  ] });
}
function ProductDetail() {
  const { id } = useParams({ strict: false });
  const { data: product, isLoading } = useProduct(id);
  const { addItem, isInCart, getItemQuantity } = useCart();
  const [qty, setQty] = reactExports.useState(1);
  const [added, setAdded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setQty(1);
    setAdded(false);
  }, []);
  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2e3);
  };
  const relatedProducts = product ? SAMPLE_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4) : [];
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold text-foreground", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Back to catalog" }) })
    ] });
  }
  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);
  const maxQty = product.stock;
  const stockLow = product.stock > 0 && product.stock <= 5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "hover:text-foreground transition-colors",
          "data-ocid": "product_detail.breadcrumb_home",
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/products",
          className: "hover:text-foreground transition-colors",
          "data-ocid": "product_detail.breadcrumb_products",
          children: "Products"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[160px]", children: product.name })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border bg-muted aspect-square", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: product.imageUrl,
          alt: product.name,
          className: "h-full w-full object-cover",
          onError: (e) => {
            e.target.src = "/assets/images/placeholder.svg";
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3 capitalize", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground leading-tight", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((pos) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: `h-4 w-4 ${pos <= Math.round(product.rating) ? "fill-secondary text-secondary" : "text-border fill-border"}`
              },
              pos
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              product.rating,
              " (",
              product.reviewCount,
              " reviews)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold text-foreground", children: formatPrice(product.price) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: product.stock === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-destructive", children: "Out of stock" })
        ] }) : stockLow ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-secondary", children: [
            "Only ",
            product.stock,
            " left in stock"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-accent", children: "In stock" })
        ] }) }),
        product.stock > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center border border-border rounded-lg overflow-hidden bg-card",
              "data-ocid": "product_detail.qty_selector",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setQty((q) => Math.max(1, q - 1)),
                    disabled: qty <= 1,
                    className: "px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth disabled:opacity-40",
                    "aria-label": "Decrease quantity",
                    "data-ocid": "product_detail.qty_minus",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "px-4 py-2.5 text-sm font-semibold text-foreground min-w-[3rem] text-center border-x border-border",
                    "data-ocid": "product_detail.qty_value",
                    children: qty
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setQty((q) => Math.min(maxQty, q + 1)),
                    disabled: qty >= maxQty,
                    className: "px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth disabled:opacity-40",
                    "aria-label": "Increase quantity",
                    "data-ocid": "product_detail.qty_plus",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "flex-1",
              onClick: handleAddToCart,
              variant: added ? "secondary" : "default",
              "data-ocid": "product_detail.add_to_cart_button",
              children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 mr-2" }),
                "Added to Cart!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5 mr-2" }),
                inCart ? `Add More (${cartQty} in cart)` : "Add to Cart"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" }),
            "Free shipping over $50"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
            "Easy 30-day returns"
          ] })
        ] })
      ] })
    ] }) }),
    relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "You might also like" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products",
            search: { category: product.category },
            className: "text-sm text-primary hover:underline flex items-center gap-1",
            "data-ocid": "product_detail.view_all_related",
            children: [
              "See all",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
          "data-ocid": "product_detail.related_grid",
          children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id))
        }
      )
    ] }) })
  ] });
}
export {
  ProductDetail as default
};
