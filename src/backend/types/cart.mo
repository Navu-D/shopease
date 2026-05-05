module {
  public type CartItem = {
    productId : Nat;
    name : Text;
    price : Nat;
    quantity : Nat;
  };

  public type Cart = {
    items : [CartItem];
  };
};
