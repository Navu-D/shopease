import "./index-Bez7_rsT.js";
const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Minimalist Leather Backpack",
    description: 'Clean lines, premium full-grain leather. Fits a 15" laptop with room to spare.',
    price: 12999,
    category: "accessories",
    imageUrl: "/assets/images/product-backpack.jpg",
    stock: 24,
    rating: 4.8,
    reviewCount: 142
  },
  {
    id: "2",
    name: "Premium Cotton Tee",
    description: "200 gsm organic cotton. Pre-shrunk, relaxed fit that holds its shape.",
    price: 2999,
    category: "clothing",
    imageUrl: "/assets/images/product-tee.jpg",
    stock: 86,
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: "3",
    name: "Classic White Sneakers",
    description: "Vulcanized rubber sole, canvas upper. A wardrobe essential built to last.",
    price: 3999,
    category: "shoes",
    imageUrl: "/assets/images/product-sneakers.jpg",
    stock: 45,
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: "4",
    name: "Slim-Fit Chinos",
    description: "Stretch twill fabric, tapered leg. Goes from office to weekend with ease.",
    price: 5999,
    category: "clothing",
    imageUrl: "/assets/images/product-chinos.jpg",
    stock: 32,
    rating: 4.5,
    reviewCount: 67
  },
  {
    id: "5",
    name: "Minimalist Leather Duffle",
    description: "Vegan leather weekender. Fits everything for 3 days, overhead compartment approved.",
    price: 1699,
    category: "accessories",
    imageUrl: "/assets/images/product-duffle.jpg",
    stock: 18,
    rating: 4.9,
    reviewCount: 54
  },
  {
    id: "6",
    name: "Merino Wool Sweater",
    description: "Superfine 17.5 micron Merino. Warm, breathable, and machine washable.",
    price: 8999,
    category: "clothing",
    imageUrl: "/assets/images/product-sweater.jpg",
    stock: 28,
    rating: 4.7,
    reviewCount: 91
  }
];
const SAMPLE_CATEGORIES = [
  { id: "all", name: "All", slug: "all" },
  { id: "clothing", name: "Clothing", slug: "clothing" },
  { id: "shoes", name: "Shoes", slug: "shoes" },
  { id: "accessories", name: "Accessories", slug: "accessories" }
];
function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}
function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(timestamp));
}
function getOrderStatusLabel(status) {
  const labels = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled"
  };
  return labels[status] ?? status;
}
const FREE_SHIPPING_THRESHOLD = 5e3;
const SHIPPING_COST = 699;
export {
  FREE_SHIPPING_THRESHOLD as F,
  SAMPLE_PRODUCTS as S,
  SAMPLE_CATEGORIES as a,
  SHIPPING_COST as b,
  formatDate as c,
  formatPrice as f,
  getOrderStatusLabel as g
};
