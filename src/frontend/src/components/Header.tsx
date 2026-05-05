import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "New", category: "new" },
  { label: "Clothing", category: "clothing" },
  { label: "Shoes", category: "shoes" },
  { label: "Accessories", category: "accessories" },
  { label: "Sale", category: "sale" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout,
    isAdmin,
  } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle"
      data-ocid="header"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl font-bold text-foreground tracking-tight hover:text-primary transition-colors"
            data-ocid="header.logo_link"
          >
            ShopEase
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to="/products"
                search={{ category: link.category }}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                data-ocid={`header.nav.${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search (desktop) */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-muted-foreground hover:text-foreground"
              onClick={() => navigate({ to: "/products" })}
              aria-label="Search products"
              data-ocid="header.search_button"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
              onClick={() => navigate({ to: "/cart" })}
              aria-label={`Cart (${cart.itemCount} items)`}
              data-ocid="header.cart_button"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.itemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground"
                  data-ocid="header.cart_badge"
                >
                  {cart.itemCount > 99 ? "99+" : cart.itemCount}
                </Badge>
              )}
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hidden md:flex text-muted-foreground"
                  >
                    <Link to="/admin" data-ocid="header.admin_link">
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate({ to: "/orders" })}
                  aria-label="My orders"
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="header.orders_button"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Log out"
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="header.logout_button"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isInitializing || isLoggingIn}
                data-ocid="header.login_button"
              >
                {isInitializing
                  ? "Loading..."
                  : isLoggingIn
                    ? "Signing in..."
                    : "Sign in"}
              </Button>
            )}

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="header.mobile_menu_button"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2"
          data-ocid="header.mobile_menu"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to="/products"
                search={{ category: link.category }}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                onClick={() => setMobileOpen(false)}
              >
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
