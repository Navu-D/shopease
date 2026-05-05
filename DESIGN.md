# Design Brief: ShopEase

## Summary
ShopEase is a modern, minimal e-commerce storefront prioritizing product discovery and fast checkout. Trust-focused design using refined typography, strategic color accents, and fast-loading surfaces.

## Tone & Purpose
Refined minimalism for commerce. Goal-oriented, trust-building interface. Clear hierarchy, high contrast, product-first layout. Think Stripe checkout, Apple retail, Vercel — professional confidence without decoration.

## Color Palette

| Token | OKLCH Value | Use |
|-------|-------------|-----|
| Primary | `52 0.12 260` (indigo) | Primary CTAs, headers, navigation focus |
| Secondary | `71 0.15 60` (warm amber) | Product highlights, secondary actions, hover states |
| Accent | `58 0.14 150` (emerald green) | Success states, confirmations, trust signals |
| Destructive | `60 0.28 30` (red) | Warnings, cancellations, errors |
| Foreground | Light: `15 0 0`, Dark: `97 0 0` | Body text, primary content |
| Background | Light: `99 0 0`, Dark: `12 0 0` | Page background, clean slate |
| Card | Light: `100 0 0`, Dark: `16 0 0` | Product cards, elevated surfaces |
| Muted | Light: `93 0.01 0`, Dark: `22 0.01 0` | Disabled states, secondary text |

## Typography
- **Display & Body**: GeneralSans (modern, geometric sans-serif) — headlines, product names, descriptions, UI text
- **Mono**: GeistMono — prices, order IDs, technical data, code examples
- **Hierarchy**: H1 28px, H2 22px, Body 16px, Small 14px, Label 12px

## Shape Language
- **Border radius**: 6px (default), 4px (buttons/inputs), 0px (images, strict product presentation)
- **Shadows**: Subtle (1px), Elevated (10px) — minimal depth to keep focus on products
- **No decorative elements**: Gradients or blur used strategically, not as atmosphere

## Structural Zones

| Zone | Surface | Treatment |
|------|---------|----------|
| Header | Primary indigo | White text, navigation links, search bar, cart icon |
| Sidebar (Categories) | Card/elevated | Subtle shadow, border on hover, full-height mobile modal |
| Hero/Featured | Background | Large image or product grid, amber CTAs |
| Product Grid | Background | Card surfaces with subtle shadows, hover: slight lift |
| Product Detail | Card | Image dominant, details beside, green "Add to Cart" |
| Cart/Checkout | Card | Stripped-down form surfaces, indigo submit button |
| Footer | Muted/border-top | Dark background, smaller type, company links |
| Admin Panel | Background/card | Tool aesthetic — dark mode optimized, data tables, action buttons |

## Component Patterns
- **Buttons**: Primary (indigo, full-width CTAs), Secondary (outline, white), Danger (red, confirmations), Ghost (minimal)
- **Product Cards**: Image + overlay on hover (semi-transparent), title, price, "Add to Cart" action
- **Forms**: Floating labels, 4px inputs, 6px focused border, no arbitrary Tailwind colors
- **Navigation**: Top header with search + cart, collapsible mobile menu, breadcrumbs on detail pages
- **Cart**: Quantity controls (-, number, +), line items with images thumbnails, order summary sticky on desktop

## Motion & Interactions
- **Fade-in**: 0.3s ease-out for page loads, list items
- **Smooth hover**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for button/card transitions
- **No bounce or overshoot**: Restraint matches minimalist aesthetic
- **Loading states**: Skeleton cards or pulsing text, never spinners

## Constraints
- No rainbow palettes or scattered accent colors — only indigo/amber/green used intentionally
- No full-page gradients or atmospheric effects
- Images must have high contrast with backgrounds
- All text must meet WCAG AA contrast (lightness difference ≥ 0.7)
- Mobile-first responsive: 1 col (mobile), 2 col (tablet), 3-4 col (desktop)

## Signature Detail
Amber accent on product hover and secondary CTAs creates visual warmth and interaction confidence — differentiates from sterile e-commerce defaults while maintaining professionalism.

## Dark Mode
Optimized for both light and dark. Dark mode reverses contrast values while maintaining saturation — primary becomes lighter indigo (0.72 L), backgrounds go to near-black (0.12 L), cards rise to 0.16 L. Accent green brightens to maintain visibility.

## Differentiation
Fast, distraction-free shopping. Product-centric layout with minimal chrome. Trust built through clarity, not decoration. Admin panel feels like a professional tool, not a store — dark mode default, dense information layout, action-oriented buttons.
