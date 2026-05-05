import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/order";
import Common "../types/common";
import OrderLib "../lib/order";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  nextOrderId : { var value : Nat },
) {
  public shared ({ caller }) func createOrder(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    OrderLib.create(orders, id, caller, input);
  };

  public query ({ caller }) func getOrder(id : Nat) : async ?OrderTypes.Order {
    switch (OrderLib.getById(orders, id)) {
      case (?order) {
        if (Principal.equal(order.customerId, caller) or AccessControl.isAdmin(accessControlState, caller)) {
          ?order;
        } else {
          Runtime.trap("Unauthorized");
        };
      };
      case null null;
    };
  };

  public query ({ caller }) func getCustomerOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    OrderLib.getByCustomer(orders, caller);
  };

  public query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    OrderLib.getAll(orders);
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : OrderTypes.OrderStatus) : async ?OrderTypes.Order {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    OrderLib.updateStatus(orders, id, status);
  };
};
