import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import OrderTypes "../types/order";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
) {
  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func addAdmin(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add admins");
    };
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  public shared ({ caller }) func removeAdmin(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove admins");
    };
    AccessControl.assignRole(accessControlState, caller, user, #user);
  };

  public query ({ caller }) func getStats() : async { totalOrders : Nat; totalRevenue : Nat } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view stats");
    };
    var totalRevenue : Nat = 0;
    for ((_, order) in orders.entries()) {
      totalRevenue += order.total;
    };
    { totalOrders = orders.size(); totalRevenue };
  };
};
