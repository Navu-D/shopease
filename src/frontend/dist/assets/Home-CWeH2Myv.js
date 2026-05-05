import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Badge, a as Button, L as Link } from "./index-Bez7_rsT.js";
import { S as SAMPLE_PRODUCTS, a as SAMPLE_CATEGORIES } from "./api-CWnklUSV.js";
import { P as ProductCard } from "./ProductCard-9X7QSFoX.js";
import { I as Input } from "./input-CzAeOwUF.js";
import { m as motion } from "./proxy-BNrr1GTP.js";
import { A as ArrowRight } from "./arrow-right-kAZdtOg_.js";
import { T as Truck } from "./truck-CclLN0Sn.js";
import { P as Package } from "./package-Di4YZLsY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const TRUST_BADGES = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over $50" },
  {
    icon: ShieldCheck,
    label: "Secure Checkout",
    sub: "256-bit SSL encryption"
  },
  { icon: Package, label: "Premium Quality", sub: "Curated essentials" },
  { icon: RotateCcw, label: "Free Returns", sub: "30-day no-hassle returns" }
];
const FEATURED = SAMPLE_PRODUCTS.slice(0, 4);
const DISPLAY_CATEGORIES = SAMPLE_CATEGORIES.filter((c) => c.slug !== "all");
const CATEGORY_IMAGES = {
  clothing: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  accessories: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
};
function Home() {
  const [email, setEmail] = reactExports.useState("");
  const [subscribed, setSubscribed] = reactExports.useState(false);
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card",
        "data-ocid": "home.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center",
              style: {
                backgroundImage: `url('/assets/generated/hero-fashion.dim_1400x700.jpg')`
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -40 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, ease: "easeOut" },
              className: "max-w-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "mb-4 text-xs tracking-widest uppercase font-semibold",
                    children: "New Collection 2026"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-6xl font-bold text-primary-foreground leading-tight", children: "Elevate Your Style." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg sm:text-xl text-primary-foreground/80 leading-relaxed", children: "Discover the new collection \\u2014 premium essentials crafted for the modern wardrobe." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "font-semibold px-8",
                      "data-ocid": "home.hero.shop_now_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                        "Shop Now ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold",
                      "data-ocid": "home.hero.browse_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Browse All" })
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: TRUST_BADGES.map(({ icon: Icon, label, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: sub })
      ] })
    ] }, label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-16 sm:py-20",
        "data-ocid": "home.featured.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "flex items-end justify-between mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-1", children: "Handpicked for you" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Featured Products" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "ghost",
                    className: "hidden sm:flex text-primary hover:text-primary",
                    "data-ocid": "home.featured.view_all_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                      "View all ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
                    ] })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: FEATURED.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              "data-ocid": "home.featured.view_all_mobile_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                "View all products ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
              ] })
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-16 sm:py-20",
        "data-ocid": "home.categories.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-1", children: "Explore" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Shop by Category" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6", children: DISPLAY_CATEGORIES.map((category, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: i * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/products",
                  search: { category: category.slug },
                  className: "group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-muted",
                  "data-ocid": `home.category.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: CATEGORY_IMAGES[category.slug] ?? "/assets/images/placeholder.svg",
                        alt: category.name,
                        className: "h-full w-full object-cover transition-smooth group-hover:scale-105",
                        onError: (e) => {
                          e.target.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 sm:p-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-primary-foreground text-lg sm:text-xl", children: category.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-primary-foreground/70 mt-0.5 group-hover:text-primary-foreground transition-colors", children: [
                        "Shop now ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
                      ] })
                    ] })
                  ]
                }
              )
            },
            category.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary py-16 sm:py-20",
        "data-ocid": "home.newsletter.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-2", children: "Stay in the loop" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-primary-foreground", children: "Get 10% Off Your First Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-primary-foreground/70 text-base", children: "Subscribe for exclusive deals, new arrivals, and style inspiration." }),
              subscribed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  className: "mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-6 py-3",
                  "data-ocid": "home.newsletter.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-primary-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-medium", children: "You're subscribed \\u2014 check your inbox!" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubscribe,
                  className: "mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
                  "data-ocid": "home.newsletter.form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "email",
                        placeholder: "your@email.com",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        required: true,
                        className: "flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground",
                        "data-ocid": "home.newsletter.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        variant: "secondary",
                        className: "font-semibold shrink-0",
                        "data-ocid": "home.newsletter.submit_button",
                        children: "Subscribe"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  Home as default
};
