import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from "@/api";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Package,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TRUST_BADGES = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over $50" },
  {
    icon: ShieldCheck,
    label: "Secure Checkout",
    sub: "256-bit SSL encryption",
  },
  { icon: Package, label: "Premium Quality", sub: "Curated essentials" },
  { icon: RotateCcw, label: "Free Returns", sub: "30-day no-hassle returns" },
];

const FEATURED = SAMPLE_PRODUCTS.slice(0, 4);
const DISPLAY_CATEGORIES = SAMPLE_CATEGORIES.filter((c) => c.slug !== "all");

const CATEGORY_IMAGES: Record<string, string> = {
  clothing:
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  accessories:
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen" data-ocid="home.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card"
        data-ocid="home.hero.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/generated/hero-fashion.dim_1400x700.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-40">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <Badge
              variant="secondary"
              className="mb-4 text-xs tracking-widest uppercase font-semibold"
            >
              New Collection 2026
            </Badge>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-primary-foreground leading-tight">
              Elevate Your Style.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-primary-foreground/80 leading-relaxed">
              Discover the new collection \u2014 premium essentials crafted for
              the modern wardrobe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="font-semibold px-8"
                data-ocid="home.hero.shop_now_button"
              >
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
                data-ocid="home.hero.browse_button"
              >
                <Link to="/products">Browse All</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 py-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="bg-background py-16 sm:py-20"
        data-ocid="home.featured.section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                Handpicked for you
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Featured Products
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="hidden sm:flex text-primary hover:text-primary"
              data-ocid="home.featured.view_all_button"
            >
              <Link to="/products">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FEATURED.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              data-ocid="home.featured.view_all_mobile_button"
            >
              <Link to="/products">
                View all products <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section
        className="bg-muted/30 py-16 sm:py-20"
        data-ocid="home.categories.section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
              Explore
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Shop by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {DISPLAY_CATEGORIES.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to="/products"
                  search={{ category: category.slug }}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
                  data-ocid={`home.category.item.${i + 1}`}
                >
                  <img
                    src={
                      CATEGORY_IMAGES[category.slug] ??
                      "/assets/images/placeholder.svg"
                    }
                    alt={category.name}
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-display font-bold text-primary-foreground text-lg sm:text-xl">
                      {category.name}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-primary-foreground/70 mt-0.5 group-hover:text-primary-foreground transition-colors">
                      Shop now <ArrowRight className="h-3 w-3" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="bg-primary py-16 sm:py-20"
        data-ocid="home.newsletter.section"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-2">
              Stay in the loop
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
              Get 10% Off Your First Order
            </h2>
            <p className="mt-3 text-primary-foreground/70 text-base">
              Subscribe for exclusive deals, new arrivals, and style
              inspiration.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-6 py-3"
                data-ocid="home.newsletter.success_state"
              >
                <ShieldCheck className="h-5 w-5 text-primary-foreground" />
                <span className="text-primary-foreground font-medium">
                  You're subscribed \u2014 check your inbox!
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                data-ocid="home.newsletter.form"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground"
                  data-ocid="home.newsletter.input"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="font-semibold shrink-0"
                  data-ocid="home.newsletter.submit_button"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
