import { j as jsxRuntimeExports, a as Button } from "./index-Bez7_rsT.js";
function EmptyState({
  icon: Icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-4 py-16 px-4 text-center",
      "data-ocid": "empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: action.onClick, "data-ocid": "empty_state_button", children: action.label })
      ]
    }
  );
}
export {
  EmptyState as E
};
