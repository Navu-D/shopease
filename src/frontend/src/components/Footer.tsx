import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/products?category=new" },
      { label: "Clothing", href: "/products?category=clothing" },
      { label: "Shoes", href: "/products?category=shoes" },
      { label: "Accessories", href: "/products?category=accessories" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Orders", href: "/orders" },
      { label: "Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              to="/"
              className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors"
            >
              ShopEase
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Refined essentials for the modern wardrobe. Thoughtfully curated,
              responsibly made.
            </p>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>🚚 Free shipping $50+</span>
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>&copy; {year} ShopEase. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
