import { c as createLucideIcon, e as useCart, i as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, a as Button, f as Separator } from "./index-Bez7_rsT.js";
import { f as formatPrice, F as FREE_SHIPPING_THRESHOLD, b as SHIPPING_COST } from "./api-CWnklUSV.js";
import { I as Input } from "./input-CzAeOwUF.js";
import { L as Label } from "./label-Cy1x3w5t.js";
import { C as CircleCheck } from "./circle-check-D6vAlkAV.js";
import { S as ShoppingBag } from "./shopping-bag-5F9sgoBO.js";
import { M as MapPin } from "./map-pin-Cn-VJGMW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const STEP_ORDER = ["shipping", "review", "payment"];
const STEP_LABELS = {
  shipping: "Shipping",
  review: "Review",
  payment: "Payment"
};
const STEP_ICONS = {
  shipping: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
  review: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
  payment: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" })
};
const INITIAL_ADDRESS = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US"
};
function validateAddress(addr) {
  const errors = {};
  if (!addr.fullName.trim()) errors.fullName = "Full name is required.";
  if (!addr.line1.trim()) errors.line1 = "Address line 1 is required.";
  if (!addr.city.trim()) errors.city = "City is required.";
  if (!addr.state.trim()) errors.state = "State is required.";
  if (!addr.postalCode.trim()) errors.postalCode = "Postal code is required.";
  if (!addr.country.trim()) errors.country = "Country is required.";
  return errors;
}
function Checkout() {
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState("shipping");
  const [address, setAddress] = reactExports.useState(INITIAL_ADDRESS);
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [paymentError, setPaymentError] = reactExports.useState(null);
  const subtotal = cart.total;
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const currentStepIndex = STEP_ORDER.indexOf(step);
  function handleAddressChange(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: void 0 }));
    }
  }
  function handleShippingSubmit(e) {
    e.preventDefault();
    const errors = validateAddress(address);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setStep("review");
  }
  async function handlePlaceOrder() {
    setIsLoading(true);
    setPaymentError(null);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      const mockOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
      clearCart();
      navigate({ to: "/checkout/success", search: { orderId: mockOrderId } });
    } catch {
      setPaymentError("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please log in to continue." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-0 mb-10",
        "data-ocid": "checkout.stepper",
        children: STEP_ORDER.map((s, i) => {
          const isDone = currentStepIndex > i;
          const isActive = s === step;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1 last:flex-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? "text-primary" : isDone ? "text-accent-foreground" : "text-muted-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors ${isActive ? "bg-primary text-primary-foreground" : isDone ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`,
                      children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : STEP_ICONS[s]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: STEP_LABELS[s] })
                ]
              }
            ),
            i < STEP_ORDER.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex-1 h-px mx-4 transition-colors ${currentStepIndex > i ? "bg-accent" : "bg-border"}`
              }
            )
          ] }, s);
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        step === "shipping" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleShippingSubmit,
            className: "bg-card border rounded-xl p-6 shadow-subtle space-y-5",
            "data-ocid": "checkout.shipping_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Shipping Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullName", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fullName",
                    value: address.fullName,
                    onChange: (e) => handleAddressChange("fullName", e.target.value),
                    placeholder: "Jane Smith",
                    "data-ocid": "checkout.fullname_input"
                  }
                ),
                fieldErrors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "checkout.fullname_field_error",
                    children: fieldErrors.fullName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "line1", children: "Address Line 1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "line1",
                    value: address.line1,
                    onChange: (e) => handleAddressChange("line1", e.target.value),
                    placeholder: "123 Main St",
                    "data-ocid": "checkout.address1_input"
                  }
                ),
                fieldErrors.line1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "checkout.address1_field_error",
                    children: fieldErrors.line1
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "line2", children: [
                  "Address Line 2",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "line2",
                    value: address.line2 ?? "",
                    onChange: (e) => handleAddressChange("line2", e.target.value),
                    placeholder: "Apt 4B",
                    "data-ocid": "checkout.address2_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "city",
                      value: address.city,
                      onChange: (e) => handleAddressChange("city", e.target.value),
                      placeholder: "New York",
                      "data-ocid": "checkout.city_input"
                    }
                  ),
                  fieldErrors.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.city_field_error",
                      children: fieldErrors.city
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", children: "State" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "state",
                      value: address.state,
                      onChange: (e) => handleAddressChange("state", e.target.value),
                      placeholder: "NY",
                      "data-ocid": "checkout.state_input"
                    }
                  ),
                  fieldErrors.state && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.state_field_error",
                      children: fieldErrors.state
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "postalCode", children: "Postal Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "postalCode",
                      value: address.postalCode,
                      onChange: (e) => handleAddressChange("postalCode", e.target.value),
                      placeholder: "10001",
                      "data-ocid": "checkout.postal_input"
                    }
                  ),
                  fieldErrors.postalCode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.postal_field_error",
                      children: fieldErrors.postalCode
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: "Country" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "country",
                      value: address.country,
                      onChange: (e) => handleAddressChange("country", e.target.value),
                      placeholder: "US",
                      "data-ocid": "checkout.country_input"
                    }
                  ),
                  fieldErrors.country && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.country_field_error",
                      children: fieldErrors.country
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  size: "lg",
                  "data-ocid": "checkout.shipping_submit_button",
                  children: "Continue to Review"
                }
              )
            ]
          }
        ),
        step === "review" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border rounded-xl p-6 shadow-subtle space-y-5",
            "data-ocid": "checkout.review_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Review Your Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "checkout.review_list", children: cart.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-4 py-3 border-b last:border-0",
                  "data-ocid": `checkout.review_item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.imageUrl,
                        alt: item.product.name,
                        className: "w-14 h-14 object-cover rounded-lg bg-muted shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: item.product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                        "Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium shrink-0", children: formatPrice(item.product.price * item.quantity) })
                  ]
                },
                item.productId
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-4 space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground uppercase text-xs tracking-wide mb-2", children: "Shipping To" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: address.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  address.line1,
                  address.line2 ? `, ${address.line2}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  address.city,
                  ", ",
                  address.state,
                  " ",
                  address.postalCode
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: address.country })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setStep("shipping"),
                    "data-ocid": "checkout.review_back_button",
                    children: "Edit Address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "flex-1",
                    onClick: () => setStep("payment"),
                    "data-ocid": "checkout.review_continue_button",
                    children: "Continue to Payment"
                  }
                )
              ] })
            ]
          }
        ),
        step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border rounded-xl p-6 shadow-subtle space-y-5",
            "data-ocid": "checkout.payment_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 rounded-lg px-4 py-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your payment is secured with 256-bit SSL encryption." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4 text-sm space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Stripe Checkout" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You'll be redirected to Stripe's secure payment page to complete your purchase." })
              ] }),
              paymentError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3",
                  "data-ocid": "checkout.payment_error_state",
                  children: paymentError
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setStep("review"),
                    disabled: isLoading,
                    "data-ocid": "checkout.payment_back_button",
                    children: "Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "flex-1",
                    size: "lg",
                    onClick: handlePlaceOrder,
                    disabled: isLoading,
                    "data-ocid": "checkout.place_order_button",
                    children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "flex items-center gap-2",
                        "data-ocid": "checkout.payment_loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" }),
                          "Processing…"
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
                      "Pay ",
                      formatPrice(total)
                    ] })
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border rounded-xl p-5 shadow-subtle sticky top-24",
          "data-ocid": "checkout.summary_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-4", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm mb-4", children: cart.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate", children: [
                    item.product.name,
                    " × ",
                    item.quantity
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: formatPrice(item.product.price * item.quantity) })
                ]
              },
              item.productId
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(subtotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: shippingFree ? "Free" : formatPrice(shipping) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
              ] })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  Checkout as default
};
