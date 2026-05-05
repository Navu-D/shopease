import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartTypes "../types/cart";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Principal, [CartTypes.CartItem]>,
) {
  public query ({ caller }) func getCart() : async CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.get(carts, caller);
  };

  public shared ({ caller }) func addToCart(item : CartTypes.CartItem) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.addItem(carts, caller, item);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.removeItem(carts, caller, productId);
  };

  public shared ({ caller }) func updateCartItem(productId : Nat, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.updateItem(carts, caller, productId, quantity);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.clear(carts, caller);
  };
};
