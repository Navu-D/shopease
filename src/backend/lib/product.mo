import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/product";
import Common "../types/common";

module {
  public func getAll(products : Map.Map<Common.ProductId, Types.Product>) : [Types.Product] {
    products.values().filter(func(p) { p.isActive }).toArray();
  };

  public func getById(products : Map.Map<Common.ProductId, Types.Product>, id : Common.ProductId) : ?Types.Product {
    products.get(id);
  };

  public func getByCategory(products : Map.Map<Common.ProductId, Types.Product>, category : Text) : [Types.Product] {
    products.values().filter(func(p) { p.isActive and p.category == category }).toArray();
  };

  public func search(products : Map.Map<Common.ProductId, Types.Product>, term : Text) : [Types.Product] {
    let lower = term.toLower();
    products.values().filter(func(p) {
      p.isActive and (p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower))
    }).toArray();
  };

  public func create(products : Map.Map<Common.ProductId, Types.Product>, nextId : Nat, input : Types.ProductInput) : Types.Product {
    let product : Types.Product = {
      id = nextId;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      stock = input.stock;
      imageBlob = input.imageBlob;
      isActive = input.isActive;
      createdAt = Time.now();
    };
    products.add(nextId, product);
    product;
  };

  public func update(products : Map.Map<Common.ProductId, Types.Product>, id : Common.ProductId, input : Types.ProductInput) : ?Types.Product {
    switch (products.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Product = {
          existing with
          name = input.name;
          description = input.description;
          price = input.price;
          category = input.category;
          stock = input.stock;
          imageBlob = input.imageBlob;
          isActive = input.isActive;
        };
        products.add(id, updated);
        ?updated;
      };
    };
  };

  public func delete(products : Map.Map<Common.ProductId, Types.Product>, id : Common.ProductId) {
    switch (products.get(id)) {
      case null {};
      case (?existing) {
        products.add(id, { existing with isActive = false });
      };
    };
  };

  public func getAllCategories(categories : Map.Map<Common.CategoryId, Types.Category>) : [Types.Category] {
    categories.values().toArray();
  };

  public func createCategory(categories : Map.Map<Common.CategoryId, Types.Category>, nextId : Nat, input : Types.CategoryInput) : Types.Category {
    let category : Types.Category = {
      id = nextId;
      name = input.name;
      description = input.description;
    };
    categories.add(nextId, category);
    category;
  };
};
