import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import Common "types/common";
import ProductTypes "types/product";
import CartTypes "types/cart";
import OrderTypes "types/order";
import ProductApi "mixins/product-api";
import CartApi "mixins/cart-api";
import OrderApi "mixins/order-api";
import AdminApi "mixins/admin-api";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Products & Categories
  let products = Map.empty<Common.ProductId, ProductTypes.Product>();
  let categories = Map.empty<Common.CategoryId, ProductTypes.Category>();
  let nextProductId = { var value : Nat = 1 };
  let nextCategoryId = { var value : Nat = 1 };
  include ProductApi(accessControlState, products, categories, nextProductId, nextCategoryId);

  // Cart
  let carts = Map.empty<Principal, [CartTypes.CartItem]>();
  include CartApi(accessControlState, carts);

  // Orders
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();
  let nextOrderId = { var value : Nat = 1 };
  include OrderApi(accessControlState, orders, nextOrderId);

  // Admin
  include AdminApi(accessControlState, orders);

  // Stripe
  let stripeConfig = { var value : ?Stripe.StripeConfiguration = null };

  public query func isStripeConfigured() : async Bool {
    stripeConfig.value != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig.value := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let config = switch (stripeConfig.value) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfig.value) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};

