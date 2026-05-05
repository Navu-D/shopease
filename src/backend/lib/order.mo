import Map "mo:core/Map";
import Types "../types/order";
import Common "../types/common";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public func create(orders : Map.Map<Common.OrderId, Types.Order>, nextId : Nat, caller : Principal, input : Types.OrderInput) : Types.Order {
    let order : Types.Order = {
      id = nextId;
      customerId = caller;
      customerEmail = input.customerEmail;
      items = input.items;
      shippingAddress = input.shippingAddress;
      total = input.total;
      status = #pending;
      createdAt = Time.now();
    };
    orders.add(nextId, order);
    order;
  };

  public func getById(orders : Map.Map<Common.OrderId, Types.Order>, id : Common.OrderId) : ?Types.Order {
    orders.get(id);
  };

  public func getByCustomer(orders : Map.Map<Common.OrderId, Types.Order>, customerId : Principal) : [Types.Order] {
    orders.values().filter(func(o : Types.Order) : Bool { Principal.equal(o.customerId, customerId) }).toArray();
  };

  public func getAll(orders : Map.Map<Common.OrderId, Types.Order>) : [Types.Order] {
    orders.values().toArray();
  };

  public func updateStatus(orders : Map.Map<Common.OrderId, Types.Order>, id : Common.OrderId, status : Types.OrderStatus) : ?Types.Order {
    switch (orders.get(id)) {
      case (?order) {
        let updated = { order with status };
        orders.add(id, updated);
        ?updated;
      };
      case null null;
    };
  };

  public func totalRevenue(orders : Map.Map<Common.OrderId, Types.Order>) : Nat {
    orders.values().foldLeft(0, func(acc : Nat, o : Types.Order) : Nat { acc + o.total });
  };
};
