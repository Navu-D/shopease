import Map "mo:core/Map";
import Types "../types/cart";

module {
  public func get(carts : Map.Map<Principal, [Types.CartItem]>, owner : Principal) : Types.Cart {
    let items = switch (carts.get(owner)) {
      case (?items) items;
      case null [];
    };
    { items };
  };

  public func addItem(carts : Map.Map<Principal, [Types.CartItem]>, owner : Principal, item : Types.CartItem) {
    let existing = switch (carts.get(owner)) {
      case (?items) items;
      case null [];
    };
    // If item already exists, increase quantity; otherwise append
    let found = existing.find(func(i : Types.CartItem) : Bool { i.productId == item.productId });
    let updated = switch (found) {
      case (?_existing_item) {
        existing.map(func(i : Types.CartItem) : Types.CartItem {
          if (i.productId == item.productId) { { i with quantity = i.quantity + item.quantity } }
          else i
        })
      };
      case null { existing.concat([item]) };
    };
    carts.add(owner, updated);
  };

  public func removeItem(carts : Map.Map<Principal, [Types.CartItem]>, owner : Principal, productId : Nat) {
    let existing = switch (carts.get(owner)) {
      case (?items) items;
      case null [];
    };
    let updated = existing.filter(func(i : Types.CartItem) : Bool { i.productId != productId });
    carts.add(owner, updated);
  };

  public func updateItem(carts : Map.Map<Principal, [Types.CartItem]>, owner : Principal, productId : Nat, quantity : Nat) {
    if (quantity == 0) {
      removeItem(carts, owner, productId);
    } else {
      let existing = switch (carts.get(owner)) {
        case (?items) items;
        case null [];
      };
      let updated = existing.map(func(i : Types.CartItem) : Types.CartItem {
        if (i.productId == productId) { { i with quantity } } else i
      });
      carts.add(owner, updated);
    };
  };

  public func clear(carts : Map.Map<Principal, [Types.CartItem]>, owner : Principal) {
    carts.add(owner, []);
  };
};
