import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Category = {
    id : Nat;
    name : Text;
    description : Text;
  };

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    stock : Nat;
    imageBlob : ?Storage.ExternalBlob;
    isActive : Bool;
    createdAt : Int;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    stock : Nat;
    imageBlob : ?Storage.ExternalBlob;
    isActive : Bool;
  };

  public type CategoryInput = {
    name : Text;
    description : Text;
  };
};
