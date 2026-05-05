import { c as createLucideIcon, e as useCart, j as jsxRuntimeExports, L as Link, B as Badge, a as Button, g as ShoppingCart, h as ue } from "./index-Bez7_rsT.js";
import { f as formatPrice } from "./api-CWnklUSV.js";
import { m as motion } from "./proxy-BNrr1GTP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function ProductCard({ product, index = 0 }) {
  const { addItem, isInCart } = useCart();
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    ue.success("Added to cart!", {
      description: product.name,
      duration: 3e3
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.05 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/products/$id",
          params: { id: product.id },
          className: "group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-elevated transition-smooth",
          "data-ocid": `product.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "h-full w-full object-cover transition-smooth group-hover:scale-105",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              product.stock <= 5 && product.stock > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "destructive",
                  className: "absolute top-2 left-2 text-xs",
                  children: [
                    "Only ",
                    product.stock,
                    " left"
                  ]
                }
              ),
              product.stock === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "absolute top-2 left-2 text-xs",
                  children: "Out of stock"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-secondary text-secondary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    product.rating,
                    " (",
                    product.reviewCount,
                    ")"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: isInCart(product.id) ? "secondary" : "default",
                    onClick: handleAddToCart,
                    disabled: product.stock === 0,
                    className: "shrink-0",
                    "data-ocid": `product.add_button.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5 mr-1" }),
                      isInCart(product.id) ? "In Cart" : "Add"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  ProductCard as P,
  Star as S
};
