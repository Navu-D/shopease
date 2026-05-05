import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/product";
import Common "../types/common";
import ProductLib "../lib/product";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, Types.Product>,
  categories : Map.Map<Common.CategoryId, Types.Category>,
  nextProductId : { var value : Nat },
  nextCategoryId : { var value : Nat },
) {
  // Seed data on first deploy
  private func seedIfEmpty() {
    if (not categories.isEmpty()) { return };

    let catElectronics = ProductLib.createCategory(categories, nextCategoryId.value, { name = "Electronics"; description = "Gadgets, devices, and tech accessories" });
    nextCategoryId.value += 1;
    let catClothing = ProductLib.createCategory(categories, nextCategoryId.value, { name = "Clothing"; description = "Apparel for men, women, and children" });
    nextCategoryId.value += 1;
    let catBooks = ProductLib.createCategory(categories, nextCategoryId.value, { name = "Books"; description = "Fiction, non-fiction, educational and more" });
    nextCategoryId.value += 1;
    let catHome = ProductLib.createCategory(categories, nextCategoryId.value, { name = "Home & Garden"; description = "Furniture, decor, and garden supplies" });
    nextCategoryId.value += 1;
    let catSports = ProductLib.createCategory(categories, nextCategoryId.value, { name = "Sports"; description = "Equipment and gear for all sports" });
    nextCategoryId.value += 1;
    let catToys = ProductLib.createCategory(categories, nextCategoryId.value, { name = "Toys"; description = "Toys and games for all ages" });
    nextCategoryId.value += 1;

    ignore ProductLib.create(products, nextProductId.value, { name = "Wireless Noise-Cancelling Headphones"; description = "Premium over-ear headphones with 30-hour battery life and active noise cancellation"; price = 24999; category = catElectronics.name; stock = 50; imageBlob = null; isActive = true });
    nextProductId.value += 1;
    ignore ProductLib.create(products, nextProductId.value, { name = "4K Smart TV 55\""; description = "Ultra HD OLED smart TV with built-in streaming apps and voice control"; price = 79999; category = catElectronics.name; stock = 20; imageBlob = null; isActive = true });
    nextProductId.value += 1;
    ignore ProductLib.create(products, nextProductId.value, { name = "Men's Classic Oxford Shirt"; description = "100% cotton slim-fit dress shirt, wrinkle-resistant, available in multiple colors"; price = 4999; category = catClothing.name; stock = 150; imageBlob = null; isActive = true });
    nextProductId.value += 1;
    ignore ProductLib.create(products, nextProductId.value, { name = "Women's Running Sneakers"; description = "Lightweight breathable running shoes with memory foam insole and anti-slip sole"; price = 8999; category = catClothing.name; stock = 80; imageBlob = null; isActive = true });
    nextProductId.value += 1;
    ignore ProductLib.create(products, nextProductId.value, { name = "The Art of Programming"; description = "A comprehensive guide to software development best practices and algorithms"; price = 3499; category = catBooks.name; stock = 200; imageBlob = null; isActive = true });
    nextProductId.value += 1;
    ignore ProductLib.create(products, nextProductId.value, { name = "Ergonomic Office Chair"; description = "Adjustable lumbar support, breathable mesh back, and padded armrests for all-day comfort"; price = 34999; category = catHome.name; stock = 30; imageBlob = null; isActive = true });
    nextProductId.value += 1;
    ignore ProductLib.create(products, nextProductId.value, { name = "Professional Yoga Mat"; description = "Extra thick 6mm non-slip yoga mat with alignment lines and carrying strap"; price = 2999; category = catSports.name; stock = 100; imageBlob = null; isActive = true });
    nextProductId.value += 1;
    ignore ProductLib.create(products, nextProductId.value, { name = "LEGO Architecture Skyline"; description = "Build iconic city skylines with this 600-piece LEGO set, suitable for ages 12+"; price = 5999; category = catToys.name; stock = 60; imageBlob = null; isActive = true });
    nextProductId.value += 1;
  };

  seedIfEmpty();

  public query func getProducts() : async [Types.Product] {
    ProductLib.getAll(products);
  };

  public query func getProductById(id : Nat) : async ?Types.Product {
    ProductLib.getById(products, id);
  };

  public query func getProductsByCategory(category : Text) : async [Types.Product] {
    ProductLib.getByCategory(products, category);
  };

  public query func searchProducts(term : Text) : async [Types.Product] {
    ProductLib.search(products, term);
  };

  public shared ({ caller }) func createProduct(input : Types.ProductInput) : async Types.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let id = nextProductId.value;
    nextProductId.value += 1;
    ProductLib.create(products, id, input);
  };

  public shared ({ caller }) func updateProduct(id : Nat, input : Types.ProductInput) : async ?Types.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.update(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.delete(products, id);
  };

  public query func getCategories() : async [Types.Category] {
    ProductLib.getAllCategories(categories);
  };

  public shared ({ caller }) func createCategory(input : Types.CategoryInput) : async Types.Category {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };
    let id = nextCategoryId.value;
    nextCategoryId.value += 1;
    ProductLib.createCategory(categories, id, input);
  };
};
