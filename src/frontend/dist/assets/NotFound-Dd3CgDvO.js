import { c as createLucideIcon, j as jsxRuntimeExports, a as Button, L as Link, S as Search } from "./index-Bez7_rsT.js";
import { m as motion } from "./proxy-BNrr1GTP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode);
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex min-h-[60vh] items-center justify-center px-4",
      "data-ocid": "not_found.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "text-center space-y-6 max-w-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-8xl font-bold text-muted/60", children: "404" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Page not found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The page you\\'re looking for doesn\\'t exist or has been moved." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "not_found.home_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4 mr-2" }),
                " Go home"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, "data-ocid": "not_found.browse_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 mr-2" }),
                " Browse products"
              ] }) })
            ] })
          ]
        }
      )
    }
  );
}
export {
  NotFound as default
};
