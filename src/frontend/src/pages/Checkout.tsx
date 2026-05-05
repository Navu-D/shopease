import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, formatPrice } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import type { ShippingAddress } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

type Step = "shipping" | "review" | "payment";

const STEP_ORDER: Step[] = ["shipping", "review", "payment"];

const STEP_LABELS: Record<Step, string> = {
  shipping: "Shipping",
  review: "Review",
  payment: "Payment",
};

const STEP_ICONS: Record<Step, React.ReactNode> = {
  shipping: <MapPin className="h-4 w-4" />,
  review: <ShoppingBag className="h-4 w-4" />,
  payment: <CreditCard className="h-4 w-4" />,
};

const INITIAL_ADDRESS: ShippingAddress = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
};

type FieldErrors = Partial<Record<keyof ShippingAddress, string>>;

function validateAddress(addr: ShippingAddress): FieldErrors {
  const errors: FieldErrors = {};
  if (!addr.fullName.trim()) errors.fullName = "Full name is required.";
  if (!addr.line1.trim()) errors.line1 = "Address line 1 is required.";
  if (!addr.city.trim()) errors.city = "City is required.";
  if (!addr.state.trim()) errors.state = "State is required.";
  if (!addr.postalCode.trim()) errors.postalCode = "Postal code is required.";
  if (!addr.country.trim()) errors.country = "Country is required.";
  return errors;
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("shipping");
  const [address, setAddress] = useState<ShippingAddress>(INITIAL_ADDRESS);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const subtotal = cart.total;
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const currentStepIndex = STEP_ORDER.indexOf(step);

  function handleAddressChange(field: keyof ShippingAddress, value: string) {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleShippingSubmit(e: React.FormEvent) {
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
      // Simulate Stripe checkout session — replace with real actor call
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
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Please log in to continue.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10" data-ocid="checkout.page">
      {/* Progress stepper */}
      <div
        className="flex items-center gap-0 mb-10"
        data-ocid="checkout.stepper"
      >
        {STEP_ORDER.map((s, i) => {
          const isDone = currentStepIndex > i;
          const isActive = s === step;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : isDone
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isDone
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    STEP_ICONS[s]
                  )}
                </span>
                <span className="hidden sm:inline">{STEP_LABELS[s]}</span>
              </div>
              {i < STEP_ORDER.length - 1 && (
                <div
                  className={`flex-1 h-px mx-4 transition-colors ${
                    currentStepIndex > i ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === "shipping" && (
            <form
              onSubmit={handleShippingSubmit}
              className="bg-card border rounded-xl p-6 shadow-subtle space-y-5"
              data-ocid="checkout.shipping_form"
            >
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={address.fullName}
                  onChange={(e) =>
                    handleAddressChange("fullName", e.target.value)
                  }
                  placeholder="Jane Smith"
                  data-ocid="checkout.fullname_input"
                />
                {fieldErrors.fullName && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="checkout.fullname_field_error"
                  >
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="line1">Address Line 1</Label>
                <Input
                  id="line1"
                  value={address.line1}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  placeholder="123 Main St"
                  data-ocid="checkout.address1_input"
                />
                {fieldErrors.line1 && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="checkout.address1_field_error"
                  >
                    {fieldErrors.line1}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="line2">
                  Address Line 2{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="line2"
                  value={address.line2 ?? ""}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  placeholder="Apt 4B"
                  data-ocid="checkout.address2_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    placeholder="New York"
                    data-ocid="checkout.city_input"
                  />
                  {fieldErrors.city && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.city_field_error"
                    >
                      {fieldErrors.city}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    placeholder="NY"
                    data-ocid="checkout.state_input"
                  />
                  {fieldErrors.state && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.state_field_error"
                    >
                      {fieldErrors.state}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={address.postalCode}
                    onChange={(e) =>
                      handleAddressChange("postalCode", e.target.value)
                    }
                    placeholder="10001"
                    data-ocid="checkout.postal_input"
                  />
                  {fieldErrors.postalCode && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.postal_field_error"
                    >
                      {fieldErrors.postalCode}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={address.country}
                    onChange={(e) =>
                      handleAddressChange("country", e.target.value)
                    }
                    placeholder="US"
                    data-ocid="checkout.country_input"
                  />
                  {fieldErrors.country && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.country_field_error"
                    >
                      {fieldErrors.country}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                data-ocid="checkout.shipping_submit_button"
              >
                Continue to Review
              </Button>
            </form>
          )}

          {/* Step 2: Review */}
          {step === "review" && (
            <div
              className="bg-card border rounded-xl p-6 shadow-subtle space-y-5"
              data-ocid="checkout.review_panel"
            >
              <h2 className="text-xl font-semibold">Review Your Order</h2>
              <div className="space-y-3" data-ocid="checkout.review_list">
                {cart.items.map((item, idx) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 py-3 border-b last:border-0"
                    data-ocid={`checkout.review_item.${idx + 1}`}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-muted shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-muted/40 p-4 space-y-2 text-sm">
                <p className="font-medium text-muted-foreground uppercase text-xs tracking-wide mb-2">
                  Shipping To
                </p>
                <p className="font-medium">{address.fullName}</p>
                <p className="text-muted-foreground">
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}
                </p>
                <p className="text-muted-foreground">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-muted-foreground">{address.country}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("shipping")}
                  data-ocid="checkout.review_back_button"
                >
                  Edit Address
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep("payment")}
                  data-ocid="checkout.review_continue_button"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === "payment" && (
            <div
              className="bg-card border rounded-xl p-6 shadow-subtle space-y-5"
              data-ocid="checkout.payment_panel"
            >
              <h2 className="text-xl font-semibold">Payment</h2>
              <div className="flex items-center gap-2 bg-muted/40 rounded-lg px-4 py-3 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 shrink-0" />
                <span>
                  Your payment is secured with 256-bit SSL encryption.
                </span>
              </div>
              <div className="border rounded-lg p-4 text-sm space-y-2">
                <p className="font-medium">Stripe Checkout</p>
                <p className="text-muted-foreground">
                  You'll be redirected to Stripe's secure payment page to
                  complete your purchase.
                </p>
              </div>
              {paymentError && (
                <p
                  className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                  data-ocid="checkout.payment_error_state"
                >
                  {paymentError}
                </p>
              )}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("review")}
                  disabled={isLoading}
                  data-ocid="checkout.payment_back_button"
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  data-ocid="checkout.place_order_button"
                >
                  {isLoading ? (
                    <span
                      className="flex items-center gap-2"
                      data-ocid="checkout.payment_loading_state"
                    >
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay {formatPrice(total)}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div
            className="bg-card border rounded-xl p-5 shadow-subtle sticky top-24"
            data-ocid="checkout.summary_panel"
          >
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between gap-2"
                >
                  <span className="text-muted-foreground truncate">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="mb-3" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingFree ? "Free" : formatPrice(shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
