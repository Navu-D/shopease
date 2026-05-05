import { c as createLucideIcon, u as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, S as Search, X, B as Badge } from "./index-Bez7_rsT.js";
import { a as SAMPLE_CATEGORIES } from "./api-CWnklUSV.js";
import { E as EmptyState } from "./EmptyState-DIs7dtLp.js";
import { P as ProductCard } from "./ProductCard-9X7QSFoX.js";
import { I as Input } from "./input-CzAeOwUF.js";
import { S as Skeleton } from "./skeleton-C7iwNq6X.js";
import { u as useProducts } from "./useQueries-DcoAORz1.js";
import "./proxy-BNrr1GTP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function ProductGridSkeleton() {
  const skeletonIds = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: skeletonIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 rounded-md" })
          ] })
        ] })
      ]
    },
    id
  )) });
}
function Catalog() {
  var _a;
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false });
  const activeCategory = searchParams.category ?? "all";
  const [query, setQuery] = reactExports.useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = reactExports.useState(false);
  const { data: products, isLoading } = useProducts(
    activeCategory === "all" ? void 0 : activeCategory
  );
  const filtered = reactExports.useMemo(() => {
    if (!products) return [];
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [products, query]);
  const handleCategory = (slug) => {
    navigate({
      to: "/products",
      search: slug === "all" ? {} : { category: slug }
    });
  };
  const activeCategoryLabel = ((_a = SAMPLE_CATEGORIES.find((c) => c.slug === activeCategory)) == null ? void 0 : _a.name) ?? "All";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Shop All Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-muted-foreground", children: [
        activeCategoryLabel,
        " collection"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: "hidden lg:block w-56 shrink-0",
          "data-ocid": "catalog.filter_sidebar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-2", children: "Categories" }),
            SAMPLE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleCategory(cat.slug),
                className: `w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${activeCategory === cat.slug ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`,
                "data-ocid": `catalog.category.${cat.slug}`,
                children: cat.name
              },
              cat.id
            ))
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search products…",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                className: "pl-9 bg-card",
                "data-ocid": "catalog.search_input"
              }
            ),
            query && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setQuery(""),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setMobileFiltersOpen((v) => !v),
              className: "lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-smooth",
              "data-ocid": "catalog.mobile_filter_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
                "Filter"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: isLoading ? "…" : `${filtered.length} products` })
        ] }),
        mobileFiltersOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden flex flex-wrap gap-2 mb-5", children: SAMPLE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              handleCategory(cat.slug);
              setMobileFiltersOpen(false);
            },
            className: "transition-smooth",
            "data-ocid": `catalog.mobile_category.${cat.slug}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: activeCategory === cat.slug ? "default" : "outline",
                className: "cursor-pointer px-3 py-1 text-sm",
                children: cat.name
              }
            )
          },
          cat.id
        )) }),
        activeCategory !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Filtering:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
            activeCategoryLabel,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleCategory("all"),
                className: "ml-1 hover:text-destructive transition-colors",
                "aria-label": "Clear filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
              }
            )
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: PackageSearch,
            title: "No products found",
            description: query ? `No results for "${query}". Try a different search term.` : "No products in this category yet.",
            action: {
              label: "Clear filters",
              onClick: () => {
                setQuery("");
                handleCategory("all");
              }
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
            "data-ocid": "catalog.product_grid",
            children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Catalog as default
};
