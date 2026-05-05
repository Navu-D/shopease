module {
  public type OrderStatus = { #pending; #shipped; #delivered };

  public type OrderItem = {
    productId : Nat;
    name : Text;
    price : Nat;
    quantity : Nat;
  };

  public type ShippingAddress = {
    fullName : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };

  public type Order = {
    id : Nat;
    customerId : Principal;
    customerEmail : Text;
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    total : Nat;
    status : OrderStatus;
    createdAt : Int;
  };

  public type OrderInput = {
    customerEmail : Text;
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    total : Nat;
  };
};
