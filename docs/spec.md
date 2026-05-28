# KIFAYAT.CO - COMPLETE WEBSITE SPECIFICATION DOCUMENT

**Brand Name:** Kifayat  
**Domain:** Kifayat.co  
**Business Model:** E-commerce Dropshipping Platform (via HHC Virtual Warehouse)  
**Target Market:** Karachi, Pakistan (Urban & Semi-urban)  
**Design Aesthetic:** Professional & Corporate  
**Primary Colors:** Green/Teal (growth, trust)  
**Launch Timeline:** 1 Month  

---

## TABLE OF CONTENTS

1. [Brand Identity & Design System](#1-brand-identity--design-system)
2. [Website Structure & Information Architecture](#2-website-structure--information-architecture)
3. [Page Specifications](#3-page-specifications)
4. [UI/UX Components & Patterns](#4-uiux-components--patterns)
5. [Feature Requirements](#5-feature-requirements)
6. [Admin Dashboard Specifications](#6-admin-dashboard-specifications)
7. [Technical Specifications](#7-technical-specifications)
8. [Integration Requirements](#8-integration-requirements)
9. [Performance & SEO](#9-performance--seo)
10. [Content Requirements](#10-content-requirements)

---

## 1. BRAND IDENTITY & DESIGN SYSTEM

### 1.1 Color Palette

```
PRIMARY COLORS:
├─ Primary Green/Teal: #1ABC9C (Main brand color - buttons, links, accents)
├─ Dark Green/Teal: #16A085 (Hover states, active states)
├─ Light Green/Teal: #D5F4E6 (Light backgrounds, highlights)
└─ Teal Accent: #0E7C7B (Secondary accent)

NEUTRAL COLORS:
├─ White: #FFFFFF (Primary background)
├─ Light Gray: #F5F5F5 (Secondary background)
├─ Medium Gray: #CCCCCC (Borders, dividers)
├─ Dark Gray: #333333 (Primary text)
└─ Light Text: #666666 (Secondary text)

SUPPORTING COLORS:
├─ Error Red: #E74C3C
├─ Success Green: #27AE60
├─ Warning Yellow: #F39C12
├─ Info Blue: #3498DB
└─ Neutral Black: #000000 (Text emphasis)
```

### 1.2 Typography

**Font Stack:**
```
Display Font (Headings H1-H3):
  Font Family: "Poppins" or "Montserrat" (Google Fonts)
  Weight: 700, 600
  Line Height: 1.3
  Letter Spacing: -0.5px

Body Font (Copy, P, Body text):
  Font Family: "Inter" or "Roboto" (Google Fonts)
  Weight: 400, 500, 600
  Line Height: 1.6
  Letter Spacing: 0px

Monospace (Code, SKU):
  Font Family: "JetBrains Mono" or "Courier New"
  Weight: 400, 500
  Line Height: 1.5
```

**Font Sizes (Responsive):**
```
H1: 48px (desktop) → 32px (mobile)
H2: 36px (desktop) → 24px (mobile)
H3: 28px (desktop) → 20px (mobile)
H4: 24px (desktop) → 18px (mobile)
Body Large: 18px (desktop) → 16px (mobile)
Body Regular: 16px (desktop) → 14px (mobile)
Body Small: 14px (desktop) → 12px (mobile)
Label: 12px (desktop) → 11px (mobile)
```

### 1.3 Spacing System (8px Grid)

```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
7: 28px
8: 32px
9: 36px
10: 40px
11: 44px
12: 48px
16: 64px
20: 80px
24: 96px
32: 128px
```

### 1.4 Shadow System (Material Design)

```
Elevation 1 (Cards, Input boxes):
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

Elevation 2 (Dropdowns, Modals):
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12)

Elevation 3 (Floating buttons, Tooltips):
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15)

Elevation 4 (Sticky headers):
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15)
```

### 1.5 Border Radius System

```
Corner Radius: 8px (primary)
  Used on: Cards, buttons, input fields, modals, product cards

Variations:
├─ xs: 4px (small elements, tabs)
├─ sm: 8px (buttons, inputs, cards)
├─ md: 12px (larger components)
└─ pill: 50px (pill buttons, badges)
```

### 1.6 Animation & Motion

```
Transition Speed:
├─ Fast: 150ms (hover states, quick feedback)
├─ Normal: 300ms (modal opens, page transitions)
├─ Slow: 500ms (carousel slides, large animations)
└─ Very Slow: 800ms (parallax, complex animations)

Easing Functions:
├─ ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) (default)
├─ ease-out: cubic-bezier(0, 0, 0.2, 1) (entrance)
├─ ease-in: cubic-bezier(0.4, 0, 1, 1) (exit)
└─ custom: cubic-bezier(0.34, 1.56, 0.64, 1) (bounce)

Animation Types:
├─ Fade: opacity change
├─ Slide: transform translateX/Y
├─ Scale: transform scale
├─ Rotate: transform rotate
└─ Parallax: background-position or transform on scroll
```

---

## 2. WEBSITE STRUCTURE & INFORMATION ARCHITECTURE

### 2.1 Site Map

```
Kifayat.co/
├── Home (/)
│   ├── Hero Carousel
│   ├── Featured Products Section
│   ├── Category Showcase
│   ├── New Arrivals
│   ├── Testimonials
│   └── Newsletter Signup
│
├── Products (/products)
│   ├── Product Listing Page (with filters, search)
│   ├── Search Results (/search)
│   ├── Category Pages (/category/:categoryName)
│   └── Product Detail Page (/product/:productId)
│
├── Shopping (/shopping)
│   ├── Shopping Cart (/cart)
│   └── Checkout (/checkout)
│       ├── Cart Review
│       ├── Shipping Address
│       ├── Payment Method
│       └── Order Confirmation
│
├── User Account (/account)
│   ├── Login (/login)
│   ├── Register (/register)
│   ├── Profile (/account/profile)
│   ├── Order History (/account/orders)
│   ├── Order Details (/account/orders/:orderId)
│   ├── Addresses (/account/addresses)
│   ├── Wishlist (/account/wishlist)
│   ├── Payment Methods (/account/payment-methods)
│   └── Reviews (/account/reviews)
│
├── Content Pages
│   ├── About Us (/about)
│   ├── Blog (/blog)
│   │   ├── Blog Listing
│   │   └── Blog Post (/blog/:postId)
│   ├── FAQ (/faq)
│   ├── Contact (/contact)
│   ├── Return & Refund Policy (/return-policy)
│   ├── Privacy Policy (/privacy)
│   ├── Terms & Conditions (/terms)
│   └── Shipping Policy (/shipping-policy)
│
└── Admin Portal (/admin)
    ├── Dashboard
    ├── Products Management
    ├── Orders Management
    ├── Users Management
    ├── Inventory Management
    ├── Reports & Analytics
    ├── Content Management
    ├── Settings
    └── Notifications
```

### 2.2 Navigation Structure

**Header Navigation (Mega Menu):**
```
Kifayat Logo | Search Bar | User Account | Wishlist | Cart

Categories (Mega Menu Dropdown):
├─ Electronics & Gadgets
│   ├─ Phone Accessories
│   ├─ Cables & Chargers
│   ├─ Screen Protectors
│   └─ Other Electronics
├─ Fashion & Apparel
│   ├─ Men's Clothing
│   ├─ Women's Clothing
│   ├─ Kids Clothing
│   └─ Footwear
├─ Home & Kitchen
│   ├─ Kitchenware
│   ├─ Home Decor
│   ├─ Bed & Bath
│   └─ Lighting
├─ Beauty & Personal Care
│   ├─ Skincare
│   ├─ Hair Care
│   ├─ Cosmetics
│   └─ Fragrances
├─ Sports & Fitness
│   ├─ Sports Equipment
│   ├─ Activewear
│   └─ Accessories
├─ Books & Stationery
├─ Toys & Games
├─ Pet Supplies
├─ Office Equipment
├─ Health & Wellness
└─ Baby Products

Secondary Menu:
├─ About Us
├─ Blog
├─ Contact
├─ FAQ
└─ My Account
```

**Mobile Navigation (Bottom Navigation + Hamburger):**
```
Bottom Navigation Bar (Fixed, 5 items):
├─ Home (icon)
├─ Search (icon)
├─ Categories (icon)
├─ Wishlist (icon)
└─ Account (icon)

Hamburger Menu (Top left):
├─ My Account
├─ Orders
├─ Addresses
├─ Wishlist
├─ About Us
├─ Blog
├─ FAQ
├─ Contact
├─ Help & Support
├─ Settings
└─ Logout
```

---

## 3. PAGE SPECIFICATIONS

### 3.1 HOMEPAGE (/)

#### Layout Structure
```
┌─────────────────────────────────────────────────┐
│ HEADER (Sticky, hides on scroll down)           │
├─────────────────────────────────────────────────┤
│ HERO CAROUSEL (Full-width)                      │
│ - Auto-rotate every 5 seconds                   │
│ - Navigation arrows (prev/next)                 │
│ - Dot indicators                                │
│ - CTA buttons on each slide                     │
├─────────────────────────────────────────────────┤
│ BANNER ADS (Optional below hero)                │
│ - 2-3 promotional banners                       │
│ - Clickable to category or product              │
├─────────────────────────────────────────────────┤
│ FEATURED PRODUCTS SECTION                       │
│ - "Featured For You" heading                    │
│ - 4 columns × 2 rows product grid               │
│ - Load More button (pagination)                 │
├─────────────────────────────────────────────────┤
│ CATEGORY SHOWCASE SECTION                       │
│ - "Shop by Category" heading                    │
│ - Category cards (images + names)               │
│ - 4 columns per row                             │
│ - Hover effect: overlay with arrow              │
├─────────────────────────────────────────────────┤
│ NEW ARRIVALS SECTION                            │
│ - "New Arrivals" heading                        │
│ - 4 columns × 2 rows product grid               │
│ - "See All" link                                │
├─────────────────────────────────────────────────┤
│ AI RECOMMENDATIONS SECTION                      │
│ - "Trending Now" carousel                       │
│ - Horizontal scroll (8 products)                │
│ - Prev/Next buttons                             │
├─────────────────────────────────────────────────┤
│ TESTIMONIALS SECTION (1-2 testimonials)         │
│ - Customer quote + image + name                 │
│ - 5-star rating                                 │
│ - Carousel or static display                    │
├─────────────────────────────────────────────────┤
│ NEWSLETTER SIGNUP                               │
│ - Heading + description                         │
│ - Email input + Subscribe button                │
│ - Optional: checkbox for SMS                    │
├─────────────────────────────────────────────────┤
│ FOOTER (Mega footer)                            │
└─────────────────────────────────────────────────┘
```

#### Hero Carousel Specifications
- **Slides:** 3-5 slides with images/banners
- **Content per slide:**
  - Large background image (1920×600px)
  - Headline (H1: 48px)
  - Subheading (18px)
  - CTA button (Pill style, green)
  - Optional: Badge (e.g., "50% OFF")
- **Behavior:**
  - Auto-rotate every 5 seconds
  - Pause on hover
  - Smooth fade transition (300ms)
  - Navigation arrows (left/right)
  - Dot indicators with current slide highlight
  - Mobile: Full-width, reduced height (300px)

#### Product Grid (Featured & New Arrivals)
- **Desktop:** 4 columns
- **Tablet:** 3 columns
- **Mobile:** 2 columns
- **Card content:**
  - Product image (400×400px)
  - On hover: Overlay with
    - Product name (16px, bold)
    - Price (18px, green)
    - Star rating + review count (12px)
    - "Add to Cart" button (small pill button)
    - Quick View link (underline)
- **Pagination:** Previous/Next buttons (not page numbers)

#### Category Showcase
- **Layout:** 4 columns per row
- **Card content:**
  - Category image (300×300px)
  - Category name (18px, centered)
  - Hover effect: Image darkens, show arrow icon
  - Click → Category page

#### Testimonials Section
- Display 1-2 testimonials
- Content: Quote, customer name, image, 5-star rating
- Optional carousel if multiple testimonials
- Styling: White card with left green accent border

#### Newsletter Signup
- **Placement:** Before footer
- **Background:** Light gray (#F5F5F5)
- **Content:**
  - Heading: "Subscribe to Our Newsletter"
  - Subtext: "Get exclusive offers and updates"
  - Email input field (floating label)
  - Subscribe button (green pill)
  - Optional: Checkbox "Also subscribe to SMS"
- **Responsive:** Full-width on mobile, contained on desktop

### 3.2 PRODUCTS LISTING PAGE (/products, /category/:categoryName, /search)

#### Layout Structure
```
┌─────────────────────────────────────────────────┐
│ HEADER                                          │
├─────────────────────────────────────────────────┤
│ BREADCRUMB NAVIGATION                           │
│ Home > Category > Subcategory                   │
├─────────────────────────────────────────────────┤
│ PAGE TITLE & SORT/VIEW OPTIONS                  │
│ "All Products" | "Showing 1-20 of 250"          │
│ Sort by: [Dropdown: Relevance, Price, Rating]  │
│ View: [Grid | List] [12 | 24 | 48 per page]    │
├──────────────┬──────────────────────────────────┤
│ LEFT SIDEBAR │ MAIN CONTENT AREA               │
│ FILTERS      │ ┌─────────────────────────────┐ │
│              │ │ Product Grid (4 cols)       │ │
│ ├─ Category  │ │                             │ │
│ ├─ Price     │ │ [Card] [Card] [Card] [Card] │ │
│ ├─ Brand     │ │ [Card] [Card] [Card] [Card] │ │
│ ├─ Rating    │ │ [Card] [Card] [Card] [Card] │ │
│ ├─ Color     │ │                             │ │
│ └─ Material  │ └─────────────────────────────┘ │
│              │                                 │
│ [Clear All]  │ PAGINATION                     │
│              │ [< Previous] [Next >]          │
│              │                                 │
└──────────────┴──────────────────────────────────┘
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

#### Left Sidebar Filters
**Filter Groups:**
1. **Category Filter** (Checkbox)
   - Electronics
   - Fashion
   - Home & Kitchen
   - (etc.)
   - [Expand/Collapse button]

2. **Price Range Slider**
   - Min: 0 PKR, Max: 100,000 PKR
   - Visual: Dual-handle slider
   - Display: "PKR 1,000 - PKR 50,000"
   - Button: "Apply Price Filter"

3. **Brand Filter** (Checkbox, Searchable)
   - Search box: "Search brands..."
   - Checkboxes for top brands
   - [Show More] button for additional brands

4. **Rating Filter** (Stars)
   - ⭐ 5 Stars (150)
   - ⭐ 4+ Stars (320)
   - ⭐ 3+ Stars (510)
   - ⭐ 2+ Stars (580)

5. **Color Filter** (Color swatches)
   - Color circles (clickable)
   - Show color name on hover
   - Multiple selection allowed

6. **Material Filter** (Checkbox)
   - Cotton
   - Polyester
   - Leather
   - (etc.)

**Filter Actions:**
- [Clear All Filters] button at top
- [Apply Filters] button at bottom
- Real-time product count update
- Selected filters shown as tags above products

#### Product Cards (Grid View)
```
┌──────────────────┐
│                  │
│  Product Image   │  (400×400px, rounded corners)
│  (hoverable)     │
│                  │
├──────────────────┤
│                  │
│ On Hover Overlay:│
│ ┌──────────────┐ │
│ │ Product Name │ │ (16px, bold)
│ │ PKR 2,500    │ │ (18px, green)
│ │ ⭐⭐⭐⭐⭐ (45) │ │ (12px)
│ │ [Add to Cart] │ │ (pill button)
│ │ [Quick View ] │ │ (link)
│ └──────────────┘ │
│                  │
└──────────────────┘
```

#### Product Cards (List View)
```
┌─────────────────────────────────────────────────────┐
│ Image   │ Product Name                              │
│ (150×   │ ⭐⭐⭐⭐⭐ (45 reviews)                      │
│ 150px)  │ Description snippet...                    │
│ Hover:  │ PKR 2,500  |  [Add to Cart]  [Wishlist]  │
│ Zoom    │                                           │
└─────────────────────────────────────────────────────┘
```

#### Pagination
- **Type:** Previous/Next buttons (centered at bottom)
- **Display:** "Showing 1-20 of 250 products"
- **Options:** 12, 24, 48 items per page (dropdown)
- **Styling:** Green buttons with white text on hover

#### Search Results Page (/search)
- Same layout as products listing
- Add search term in header: "Results for: 'laptop'"
- Show: "Showing X results for 'laptop'"
- If no results: "No products found for 'laptop'. Try different keywords."
- Suggestions: "Did you mean: laptop bag?" (if applicable)

### 3.3 PRODUCT DETAIL PAGE (/product/:productId)

#### Layout Structure (2 Column)
```
┌─────────────────────────────────────────────────┐
│ HEADER                                          │
├─────────────────────────────────────────────────┤
│ BREADCRUMB: Home > Category > Product Name      │
├──────────────────┬──────────────────────────────┤
│ LEFT COLUMN      │ RIGHT COLUMN                 │
│ (40% width)      │ (60% width)                  │
│                  │                              │
│ IMAGE GALLERY    │ PRODUCT DETAILS             │
│ ┌──────────────┐ │ ┌──────────────────────────┐│
│ │              │ │ │ Product Name (H2)        ││
│ │   Main Image │ │ │ SKU: HHC-ELEC-001        ││
│ │   (500×500)  │ │ │ ⭐⭐⭐⭐⭐ (123 reviews)   ││
│ │              │ │ │                          ││
│ │ [◄] [►]      │ │ │ Price: PKR 5,000         ││
│ └──────────────┘ │ │ Original: PKR 7,500 (33%)││
│                  │ │                          ││
│ Thumbnails:      │ │ Variants:                ││
│ [T1] [T2] [T3]   │ │ ┌─ Color: [Black][White] ││
│ [T4] [T5] [T6]   │ │ ┌─ Size: [S][M][L][XL]   ││
│ [Show More]      │ │ ┌─ Material: [Cotton]    ││
│                  │ │                          ││
│                  │ │ Quantity: [−] [1] [+]    ││
│                  │ │ [Add to Cart]            ││
│                  │ │ [♡ Wishlist]             ││
│                  │ │                          ││
│                  │ │ ✓ In Stock                ││
│                  │ │ ⚡ Fast Shipping         ││
│                  │ │ 🔄 Easy Returns          ││
│                  │ │                          ││
│                  │ │ [Share on Social]        ││
│                  │ │ Facebook | WhatsApp | etc││
│                  │ └──────────────────────────┘│
└──────────────────┴──────────────────────────────┘
├─────────────────────────────────────────────────┤
│ DESCRIPTION / SPECS / REVIEWS (Tabs or accordion)│
├─────────────────────────────────────────────────┤
│ RELATED PRODUCTS                                │
├─────────────────────────────────────────────────┤
│ SUGGESTED PRODUCTS (AI Recommendations)         │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

#### Image Gallery (Left Column)
- **Main image:** 500×500px, centered, rounded corners
- **Navigation:**
  - Previous (◄) / Next (►) arrows on sides
  - Smooth slide animation (300ms)
- **Thumbnails:** 5-6 thumbnail images below (80×80px)
  - Scrollable if more than 6 images
  - Active thumbnail highlighted with green border
  - Hover shows image number (1/8, etc.)
- **Zoom:** On image hover, show zoom icon
  - Click → Full-screen image viewer (lightbox)
  - Keyboard: Left/Right arrows to navigate
  - Escape to close
- **Responsive:** On mobile, full-width image carousel

#### Product Information (Right Column)

**Section 1: Header**
- Product name (H2: 28px, bold)
- SKU: "HHC-ELEC-001" (gray text, 12px)
- Star rating: "⭐⭐⭐⭐⭐ (123 reviews)" (clickable → scroll to reviews)

**Section 2: Pricing**
```
Price: PKR 5,000 (green, 24px, bold)
Original: PKR 7,500 (gray strikethrough, 16px)
Discount: -33% (red badge)

OR if no discount:
Price: PKR 5,000 (green, 24px)
```

**Section 3: Variants (Dropdown/Buttons)**
```
Color:
[◯ Black] [◯ White] [◯ Gray]  (Color circles clickable)

Size:
[□ S] [□ M] [□ L] [□ XL]  (Pill buttons)

Material:
[◯ Cotton] [◯ Polyester] [◯ Blended]

Other attributes as needed...
```

**Section 4: Quantity & Actions**
```
Quantity: [−] [1] [+]  (Number input with +/- buttons)

[Add to Cart Button] (Full-width, green pill)
[♡ Wishlist Button] (Outline, gray → green if liked)
```

**Section 5: Trust Badges**
```
✓ In Stock (Green checkmark)
⚡ Fast Shipping (1-2 days)
🔄 Easy Returns (30-day returns)
🛡️ Secure Payment
```

**Section 6: Share**
```
Share:
[Facebook] [Twitter] [LinkedIn] [WhatsApp] [Pinterest] [Copy Link]
(Icons, hover → tooltip)
```

#### Tabs/Accordion: Description, Specs, Reviews

**Option A: Tabs (Our choice for professional design)**
```
[Description] [Specifications] [Reviews]
─────────────────────────────────────────
Tab content displays below, no page jump
```

**Description Tab:**
- Full product description
- Bullet points (benefits)
- Use cases
- Optional: Embedded product video

**Specifications Tab:**
```
Specification Table:
┌────────────────┬──────────────────────┐
│ Attribute      │ Value                │
├────────────────┼──────────────────────┤
│ Material       │ 100% Cotton          │
│ Size           │ S, M, L, XL          │
│ Color Options  │ Black, White, Gray   │
│ Weight         │ 250g                 │
│ Warranty       │ 1 Year               │
│ Brand          │ Brand Name           │
│ Model          │ Model123             │
│ Dimensions     │ 10cm × 5cm × 2cm    │
└────────────────┴──────────────────────┘
```

**Reviews Tab:**
```
REVIEWS HEADER:
Overall Rating: ⭐⭐⭐⭐⭐ 4.8/5 (123 verified purchases)

Rating Breakdown:
⭐⭐⭐⭐⭐ (5 stars) ████████████░░ 85% (105 reviews)
⭐⭐⭐⭐☆ (4 stars) ███░░░░░░░░░░░ 10% (12 reviews)
⭐⭐⭐☆☆ (3 stars) █░░░░░░░░░░░░░░ 3% (4 reviews)
⭐⭐☆☆☆ (2 stars) ░░░░░░░░░░░░░░░░ 1% (1 review)
⭐☆☆☆☆ (1 star)  ░░░░░░░░░░░░░░░░ 1% (1 review)

[Sort by: Most Helpful | Newest | Highest Rating]

REVIEW ITEMS (Moderated):
┌─────────────────────────────────────────┐
│ Ahmed K. ⭐⭐⭐⭐⭐ Verified Purchase     │
│ "Excellent product, highly recommend!"  │
│ Very helpful (👍 12)  Not helpful (👎 1)│
│ 2 days ago                              │
│                                         │
│ [Image 1] [Image 2]                    │
└─────────────────────────────────────────┘

[Load More Reviews] button
```

#### Related Products Section
- **Title:** "Similar Products"
- **Layout:** Horizontal carousel (8 products)
- **Navigation:** Previous/Next buttons
- **Card:** Same as product grid (image, name, price on hover)
- **Auto-scroll:** No auto-scroll, manual navigation only

#### Suggested Products (AI Recommendations)
- **Title:** "Customers Also Bought"
- **Layout:** Same carousel as related products
- **Based on:** Product tags, category, user browsing history

#### Breadcrumb Navigation
```
Home > Electronics > Phone Accessories > Product Name
(Last item is not clickable, others are)
```

### 3.4 SHOPPING CART PAGE (/cart)

#### Layout (Slide-out Panel)
```
┌──────────────────────────────┐
│ Cart (Slide-out from right)  │
│ ─────────────────────────────│
│ [Close button X] (top right)  │
│                              │
│ CART ITEMS:                  │
│ ┌────────────────────────────┐
│ │ Product 1                  │
│ │ [Image] × PKR 2,500  [×]   │
│ │ Qty: [−] 2 [+]             │
│ │                            │
│ │ Product 2                  │
│ │ [Image] × PKR 5,000  [×]   │
│ │ Qty: [−] 1 [+]             │
│ └────────────────────────────┘
│                              │
│ ────────────────────────────│
│ Subtotal: PKR 9,500         │
│ Shipping: PKR 250           │
│ Discount: -PKR 0            │
│ ────────────────────────────│
│ TOTAL: PKR 9,750            │
│                              │
│ [Continue Shopping]          │
│ [Proceed to Checkout]        │
│                              │
└──────────────────────────────┘
```

**Cart Panel Features:**
- Slide-out from right side (width: 400px on desktop, full on mobile)
- Overlay darkens background
- Click outside to close
- Scroll if many items
- Each item shows:
  - Product image (60×60px)
  - Product name (14px)
  - Variant info (color, size if applicable)
  - Price per unit
  - Quantity controls (−/+ buttons)
  - Remove button (×)

**Cart Summary:**
- Subtotal (all items)
- Shipping cost (based on address/weight)
- Discount (if any promo code applied)
- **Total (in green, bold)**

**Buttons:**
- "Continue Shopping" (outline, gray)
- "Proceed to Checkout" (solid, green, full-width)

**Empty Cart State:**
```
┌──────────────────────────────┐
│ 🛒 Your cart is empty        │
│                              │
│ "Continue shopping and add   │
│ some items to your cart!"    │
│                              │
│ [Continue Shopping] (button) │
└──────────────────────────────┘
```

### 3.5 CHECKOUT FLOW (/checkout)

#### Multi-Step Checkout (4 Steps)

**Step 1: Cart Review**
```
┌────────────────────────────────────────┐
│ Step 1/4: Review Cart                  │
├────────────────────────────────────────┤
│ Item 1 (Qty: 2)        PKR 5,000       │
│ Item 2 (Qty: 1)        PKR 2,500       │
│ Item 3 (Qty: 1)        PKR 1,500       │
│                                        │
│ Subtotal:              PKR 9,000       │
│ [Change Items]  [Continue]             │
└────────────────────────────────────────┘
```

**Step 2: Shipping Address**
```
┌────────────────────────────────────────┐
│ Step 2/4: Shipping Address             │
├────────────────────────────────────────┤
│ [Use existing address] or [Add new]    │
│                                        │
│ Full Name: [Input - Floating label]    │
│ Phone: [Input - 03001234567]           │
│ Address Line 1: [Input]                │
│ Address Line 2: [Input - Optional]     │
│ City: [Dropdown - Karachi selected]    │
│ Postal Code: [Input]                   │
│                                        │
│ [☐ Set as default]                    │
│                                        │
│ [Back] [Continue to Shipping]          │
└────────────────────────────────────────┘
```

**Step 3: Shipping Method**
```
┌────────────────────────────────────────┐
│ Step 3/4: Shipping Method              │
├────────────────────────────────────────┤
│ [◉] Standard Shipping  (1-2 days)     │
│     PKR 250                            │
│                                        │
│ [◉] Express Shipping  (Same day)      │
│     PKR 500                            │
│                                        │
│ [Back] [Continue to Payment]           │
└────────────────────────────────────────┘
```

**Step 4: Payment & Order Confirmation**
```
┌────────────────────────────────────────┐
│ Step 4/4: Payment & Confirmation       │
├────────────────────────────────────────┤
│ Order Summary:                         │
│ Subtotal: PKR 9,000                   │
│ Shipping: PKR 250                      │
│ Total: PKR 9,250                       │
│                                        │
│ Payment Method:                        │
│ [◉] Bank Transfer (Default)            │
│ [◉] JazzCash                           │
│ [◉] EasyPaisa                          │
│                                        │
│ Bank Transfer Details:                 │
│ Bank: [Your Bank]                      │
│ Account: [Your Account]                │
│ IBAN: [Your IBAN]                      │
│ Reference: ORD-2024-001                │
│                                        │
│ [Copy Details] [Download as PDF]       │
│                                        │
│ [ ] I agree to Terms & Conditions     │
│                                        │
│ [Back] [Place Order]                   │
└────────────────────────────────────────┘
```

**Order Confirmation Page** (/checkout/confirmation/:orderId)
```
┌────────────────────────────────────────┐
│ ✅ Order Placed Successfully!          │
├────────────────────────────────────────┤
│ Order ID: ORD-2024-001                 │
│ Order Date: Nov 28, 2024, 2:30 PM     │
│                                        │
│ Payment Status: PENDING                │
│ "Please complete the payment within   │
│ 24 hours to confirm your order"       │
│                                        │
│ Shipping Address:                      │
│ Ahmed Khan                             │
│ House 123, Street Name                │
│ Karachi, 75500                         │
│                                        │
│ Items:                                 │
│ Item 1 (Qty: 2)   PKR 5,000           │
│ Item 2 (Qty: 1)   PKR 2,500           │
│ Item 3 (Qty: 1)   PKR 1,500           │
│                                        │
│ Total: PKR 9,250                       │
│                                        │
│ [Track Order] [Download Receipt]       │
│ [Continue Shopping]                    │
└────────────────────────────────────────┘
```

**Checkout Behavior:**
- Progress indicator at top (Step 1/4 → Step 2/4 → etc.)
- Back button always available (except step 1)
- Can't proceed without completing required fields
- Form validation on real-time (show errors inline)
- Auto-save progress (in case of page refresh)
- Mobile: Full-screen steps, no sidebar

### 3.6 USER AUTHENTICATION PAGES

#### Login Page (/login)

```
┌─────────────────────────────────┐
│ KIFAYAT LOGO (top center)       │
├─────────────────────────────────┤
│                                 │
│ Sign In to Your Account         │
│                                 │
│ Email: [Input - Floating label] │
│ Password: [Input - Floating]    │
│                                 │
│ [Forgot Password?] (link)       │
│                                 │
│ [Sign In] (green pill button)   │
│                                 │
│ ──── OR ────                    │
│                                 │
│ Don't have account?             │
│ [Create Account] (link)         │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Email validation (real-time feedback)
- Show/hide password toggle
- "Forgot Password" link → password reset flow
- Error messages: "Invalid email or password"
- After login success: Redirect to /account/profile or previous page
- "Remember me" checkbox (optional)

#### Register Page (/register)

```
┌─────────────────────────────────┐
│ KIFAYAT LOGO                    │
├─────────────────────────────────┤
│                                 │
│ Create Your Account             │
│                                 │
│ First Name: [Input]             │
│ Last Name: [Input]              │
│ Email: [Input]                  │
│ Phone: [Input - 03xx format]    │
│ Password: [Input]               │
│ Confirm Password: [Input]       │
│                                 │
│ [☐] I agree to Terms           │
│ [☐] Subscribe to newsletter     │
│                                 │
│ [Create Account] (green)        │
│                                 │
│ Already have account?           │
│ [Sign In] (link)                │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Real-time validation (email format, password strength)
- Password strength indicator
- Confirm password field
- Terms & Conditions checkbox (required)
- Newsletter opt-in checkbox (optional)
- After signup success: Redirect to /account/profile with welcome message

### 3.7 USER ACCOUNT DASHBOARD (/account)

#### Account Dashboard Layout

```
┌──────────────────────────────────────┐
│ HEADER: My Account                   │
├──────────────────────────────────────┤
│ Sidebar Menu         │ Main Content  │
│ ┌──────────────────┐ │              │
│ │ ➤ Dashboard      │ │ Account      │
│ │ ➤ Orders         │ │ Overview     │
│ │ ➤ Addresses      │ │              │
│ │ ➤ Wishlist       │ │ ┌──────────┐│
│ │ ➤ Payment Methods│ │ │ Name:    ││
│ │ ➤ Reviews        │ │ │ Ahmed K. ││
│ │ ➤ Settings       │ │ │          ││
│ │ ➤ Logout         │ │ │ Email:   ││
│ │                  │ │ │ ah..@    ││
│ │                  │ │ │          ││
│ │                  │ │ │ Phone:   ││
│ │                  │ │ │ 03001... ││
│ │                  │ │ │          ││
│ │                  │ │ │ [Edit]   ││
│ │                  │ │ └──────────┘│
│ │                  │ │              │
│ │                  │ │ Recent Orders│
│ │                  │ │ [Order 1]   │
│ │                  │ │ [Order 2]   │
│ │                  │ │ [View All]  │
│ │                  │ │              │
│ └──────────────────┘ │              │
└──────────────────────┴──────────────┘
```

**Mobile:** Sidebar becomes hamburger menu at top

#### Dashboard Home (Default view)
- Welcome message: "Welcome back, Ahmed!"
- Quick stats:
  - Total Orders: 5
  - Account Created: Nov 2024
  - Loyalty Points: 250
- Recent Orders (last 3)
  - Order ID, Date, Status, Amount
  - "View All Orders" link
- Quick actions:
  - [Reorder from Previous] (if applicable)
  - [Continue Shopping]

#### Orders Page (/account/orders)

```
Order History:

┌───────┬─────────────┬──────────┬───────────┬────────┐
│ Order │ Date        │ Status   │ Total     │ Action │
├───────┼─────────────┼──────────┼───────────┼────────┤
│ORD-1  │ Nov 28, 24  │ Shipped  │ 9,250    │ Track  │
│ORD-2  │ Nov 27, 24  │ Delivered│ 5,500    │ View   │
│ORD-3  │ Nov 25, 24  │ Pending  │ 3,200    │ Cancel │
└───────┴─────────────┴──────────┴───────────┴────────┘

[Filters: All | Pending | Shipped | Delivered] [Sort]
```

#### Order Details Page (/account/orders/:orderId)

```
┌────────────────────────────────────────┐
│ Order #ORD-2024-001                    │
│ Placed on Nov 28, 2024 at 2:30 PM      │
├────────────────────────────────────────┤
│                                        │
│ ORDER STATUS:                          │
│                                        │
│ ✓ Confirmed   ✓ Picked   ⧗ Shipped   │
│ ⧖ Out for Delivery   ⧖ Delivered     │
│                                        │
│ Status: In Transit                     │
│ Tracking: PKG-123456                   │
│ [Track on HHC] (link)                  │
│                                        │
│ ITEMS:                                 │
│ ┌────────────────────────────────────┐ │
│ │ Product 1 (Qty: 2)    PKR 5,000   │ │
│ │ Product 2 (Qty: 1)    PKR 2,500   │ │
│ └────────────────────────────────────┘ │
│                                        │
│ TOTALS:                                │
│ Subtotal:  PKR 7,500                  │
│ Shipping:  PKR 250                    │
│ Total:     PKR 7,750                  │
│                                        │
│ SHIPPING ADDRESS:                      │
│ Ahmed Khan                             │
│ House 123, Street Road                │
│ Karachi 75500                          │
│                                        │
│ [Download Invoice] [Return Item]       │
│                                        │
└────────────────────────────────────────┘
```

#### Addresses Page (/account/addresses)

```
Saved Addresses:

┌────────────────────────────────────┐
│ Home (Default)                     │
│ Ahmed Khan                         │
│ House 123, Street Road             │
│ Karachi, 75500                     │
│ 03001234567                        │
│ [Edit] [Delete] [Set as Default]   │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Office                             │
│ Ahmed Khan                         │
│ Office Building, Downtown          │
│ Karachi, 75200                     │
│ 03001234567                        │
│ [Edit] [Delete]                    │
└────────────────────────────────────┘

[+ Add New Address]
```

**Add/Edit Address Modal:**
```
┌─────────────────────────────────────┐
│ Add New Address                     │
├─────────────────────────────────────┤
│ Label (Home/Office): [Input]        │
│ Full Name: [Input]                  │
│ Phone: [Input]                      │
│ Address: [Text area]                │
│ City: [Dropdown - Karachi]          │
│ Postal Code: [Input]                │
│ [☐ Set as default]                  │
│                                     │
│ [Cancel] [Save Address]             │
└─────────────────────────────────────┘
```

#### Wishlist Page (/account/wishlist)

```
My Wishlist (5 items)

[4 column grid like products page]
├─ Product 1 [Remove]
├─ Product 2 [Remove]
├─ Product 3 [Remove]
├─ Product 4 [Remove]
└─ Product 5 [Remove]

[Move to Cart] [Clear Wishlist]

Empty Wishlist: "Your wishlist is empty. 
Add items to save for later!"
```

#### Payment Methods Page (/account/payment-methods)

```
Saved Payment Methods:

Primary: Bank Transfer
- Account ending in ...567
- [Set as Default] [Delete]

Secondary: JazzCash
- Number ending in ...234
- [Set as Default] [Delete]

[+ Add Payment Method]
```

#### Reviews Page (/account/reviews)

```
My Reviews (3)

[Review 1]
Product: Phone Case
Rating: ⭐⭐⭐⭐⭐
"Great quality, very happy!"
Posted: Nov 20, 2024
[Edit] [Delete]

[Review 2]
Product: T-Shirt
Rating: ⭐⭐⭐⭐☆
"Good, but size runs small"
Posted: Nov 15, 2024
[Edit] [Delete]

[Write a Review] [View Products I've Bought]
```

### 3.8 CONTENT PAGES

#### About Us Page (/about)

```
┌────────────────────────────────────┐
│ About Kifayat                      │
├────────────────────────────────────┤
│                                    │
│ Hero Section (image + text):       │
│ [Banner Image]                     │
│ "Building Trust, One Purchase..."  │
│                                    │
│ MISSION SECTION:                   │
│ "Our mission is to provide..."     │
│                                    │
│ VALUES SECTION:                    │
│ Value 1: Quality                   │
│ Value 2: Trust                     │
│ Value 3: Service                   │
│                                    │
│ TEAM SECTION:                      │
│ [Team photos] [Names] [Roles]     │
│                                    │
│ CONTACT SECTION:                   │
│ "Have questions? Contact us!"      │
│ [Contact Us Button]                │
│                                    │
└────────────────────────────────────┘
```

#### Blog Page (/blog)

**Blog Listing:**
```
┌──────────────────────────────────┐
│ Kifayat Blog                     │
├──────────────────────────────────┤
│                                  │
│ [Search bar]                     │
│ Categories: [All] [Fashion]...   │
│                                  │
│ ┌────────────────────────────┐  │
│ │ Featured Post              │  │
│ │ [Image]                    │  │
│ │ Title: "Shopping Tips..."  │  │
│ │ Excerpt...                 │  │
│ │ Author | Date | Read time  │  │
│ │ [Read More]                │  │
│ └────────────────────────────┘  │
│                                  │
│ ┌────────┬────────┬────────┐    │
│ │ Post 1 │ Post 2 │ Post 3 │    │
│ └────────┴────────┴────────┘    │
│                                  │
│ [Load More] or [1] [2] [3]       │
│                                  │
└──────────────────────────────────┘
```

**Blog Post Page (/blog/:postId):**
```
┌────────────────────────────────────┐
│ Blog Post Title                    │
│ Published by Author | Date         │
│ 5 min read                         │
├────────────────────────────────────┤
│                                    │
│ [Featured Image]                   │
│                                    │
│ Article content...                 │
│ [Formatted text, images, etc.]     │
│                                    │
│ ────────────────────────────────── │
│ Tags: [Fashion] [Tips] [Shopping]  │
│                                    │
│ SHARE:                             │
│ [Facebook] [Twitter] [WhatsApp]   │
│                                    │
│ ────────────────────────────────── │
│ RELATED POSTS:                     │
│ [Post 1] [Post 2] [Post 3]        │
│                                    │
│ ────────────────────────────────── │
│ COMMENTS:                          │
│ [Comment form]                     │
│ [Existing comments]                │
│                                    │
└────────────────────────────────────┘
```

#### FAQ Page (/faq)

```
┌────────────────────────────────────┐
│ Frequently Asked Questions         │
│ Search: [Search FAQs...]           │
├────────────────────────────────────┤
│                                    │
│ CATEGORIES:                        │
│ [Shipping] [Returns] [Accounts]   │
│ [Payments] [Products] [Orders]    │
│                                    │
│ ACCORDION ITEMS:                   │
│ ► Q: How long does shipping take? │
│   A: 1-2 business days...         │
│                                    │
│ ► Q: What's your return policy?   │
│   A: 30 days money-back...        │
│                                    │
│ ► Q: Can I track my order?        │
│   A: Yes, using order number...   │
│                                    │
│ [Still have questions?]            │
│ [Contact Support]                  │
│                                    │
└────────────────────────────────────┘
```

#### Contact Page (/contact)

```
┌────────────────────────────────────┐
│ Contact Us                         │
├────────────────────────────────────┤
│                                    │
│ CONTACT FORM:                      │
│ Name: [Input]                      │
│ Email: [Input]                     │
│ Phone: [Input]                     │
│ Subject: [Dropdown]                │
│ Message: [Text area]               │
│ [Send Message]                     │
│                                    │
│ CONTACT INFO:                      │
│ Email: support@kifayat.co         │
│ WhatsApp: +92 300 123 4567         │
│ Hours: Mon-Fri 9AM-6PM, Sat 10-4  │
│ Address: Karachi, Pakistan         │
│                                    │
│ [Map with location]                │
│                                    │
└────────────────────────────────────┘
```

#### Return & Refund Policy (/return-policy)

```
┌────────────────────────────────────┐
│ Return & Refund Policy             │
├────────────────────────────────────┤
│                                    │
│ ACCORDION SECTIONS:                │
│                                    │
│ ► 1. Eligibility Criteria         │
│   Our return policy details...    │
│                                    │
│ ► 2. Return Process               │
│   Step by step return process...  │
│                                    │
│ ► 3. Refund Timeline              │
│   How long refunds take...        │
│                                    │
│ ► 4. Non-Returnable Items        │
│   Items that cannot be returned..│
│                                    │
│ ► 5. Damaged Products            │
│   What to do if product arrives..│
│                                    │
│ [Contact us for help]              │
│                                    │
└────────────────────────────────────┘
```

### 3.9 FOOTER

**Mega Footer Layout:**

```
┌────────────────────────────────────────────────────────┐
│                      MEGA FOOTER                       │
├─────────────┬──────────────┬──────────┬───────────────┤
│ ABOUT       │ CATEGORIES   │ HELP     │ FOLLOW US    │
├─────────────┼──────────────┼──────────┼───────────────┤
│ About Us    │ Electronics  │ Contact  │ Facebook     │
│ Blog        │ Fashion      │ FAQ      │ Twitter      │
│ Careers     │ Home & Garden│ Returns  │ Instagram    │
│ Press       │ Beauty       │ Shipping │ WhatsApp     │
│ Newsletter  │ Sports       │ Warranty │ LinkedIn     │
│             │ Books        │ Payments │              │
│             │ Toys         │ Privacy  │              │
│             │ Pet Supplies │ Terms    │              │
│             │ Office       │ Sitemap  │              │
│             │ Health       │ Careers  │              │
│             │ Baby         │          │              │
└─────────────┴──────────────┴──────────┴───────────────┘
├────────────────────────────────────────────────────────┤
│ NEWSLETTER:                                            │
│ "Get exclusive offers!"                                │
│ [Email input] [Subscribe]                              │
│ [☐ Subscribe to SMS for offers]                        │
├────────────────────────────────────────────────────────┤
│ TRUST BADGES:                                          │
│ [Secure Payment] [Fast Shipping] [Easy Returns] [24/7] │
├────────────────────────────────────────────────────────┤
│ BOTTOM FOOTER:                                         │
│ © 2024 Kifayat. All rights reserved.                   │
│ [Privacy Policy] [Terms] [Sitemap]                     │
│ Made with ❤️ in Pakistan                              │
└────────────────────────────────────────────────────────┘
```

**Footer Content Sections:**

1. **About Column** (Left)
   - About Us (link)
   - Blog (link)
   - Careers (link)
   - Press (link)
   - Newsletter signup

2. **Categories Column** (Left-Center)
   - All product categories as links
   - Organized by importance
   - Quick access to category pages

3. **Help & Support Column** (Right-Center)
   - Contact Us
   - FAQ
   - Return & Refund Policy
   - Shipping Policy
   - Warranty Information
   - Payment Methods
   - Privacy Policy
   - Terms & Conditions
   - Sitemap

4. **Follow Us Column** (Right)
   - Social media icons
   - Facebook, Twitter, Instagram, WhatsApp, LinkedIn
   - Icons are clickable (external links)

5. **Trust Badges**
   - Secure Payment icon
   - Fast Shipping icon
   - Easy Returns icon
   - 24/7 Support icon

6. **Bottom Footer**
   - Copyright notice
   - Links to key policies
   - "Made in Pakistan" tagline
   - Year auto-updates

---

## 4. UI/UX COMPONENTS & PATTERNS

### 4.1 Buttons

#### Primary Button (Call-to-Action)
```
Style: Solid green background (#1ABC9C)
Text: White, bold, 16px
Padding: 12px 32px (vertical × horizontal)
Border Radius: 50px (pill shape)
Height: 48px (on desktop), 44px (on mobile)
Hover: Darker green (#16A085), slight shadow
Active/Pressed: Even darker green, scale down 2%
Disabled: Gray (#CCCCCC), cursor not-allowed
Transition: 150ms ease-out
Cursor: pointer (on hover)

SVG Icon (optional): 16px, left or right of text
```

#### Secondary Button (Alternative Action)
```
Style: Outline (border only), no fill
Border: 2px solid green (#1ABC9C)
Text: Green, bold, 16px
Padding: 12px 32px
Border Radius: 50px
Hover: Light green background (#D5F4E6)
Active: Green background with green text
Disabled: Gray border & text

```

#### Tertiary Button (Less Important Action)
```
Style: Text only, no border or background
Text: Green, bold, 16px
Hover: Underline
Active: Darker green

Usage: Links that look like buttons (e.g., "More options")
```

#### Icon Button
```
Style: Square or circular background
Size: 40×40px or 44×44px
Icon: 20px white or green
Hover: Change background color
No text label (use tooltip on hover)

Usage: Close buttons, menu toggles, etc.
```

#### Loading Button
```
When disabled/loading:
├─ Text disappears
├─ Spinner appears (white, 20px)
├─ Button stays same width
└─ Cursor: not-allowed

Spinner: Animated rotation, 300ms
```

### 4.2 Form Elements

#### Text Input Field
```
Style: Floating label (label moves up on focus)
Border: 1px solid #CCCCCC
Padding: 16px 12px
Border Radius: 8px
Font: 16px, gray text
Placeholder: Faint gray
Focus State: Border color green, shadow
Error State: Border red, error message below

Label Behavior:
├─ Normal: Inside input (gray, 12px)
├─ Focus: Above input, green, smaller (11px)
└─ Filled: Above input (same as focus)

Validation:
├─ On blur (leaving field)
├─ Real-time if typing after error
└─ Show success checkmark on valid

Error Message: Red text, 12px, below field
Success Message: Green checkmark (icon only)
```

#### Password Input
```
Same as text input, plus:
└─ Show/hide toggle icon (eye icon on right)
  ├─ Default: Hidden dots (•••••)
  └─ On toggle: Show actual characters
```

#### Multi-Select Dropdown (with Tags)
```
Display: Tag input box with pills
└─ Each selection shows as colored tag
├─ [X] to remove individual items
└─ Input field for typing more

Behavior:
├─ Type to search options
├─ Click to select
├─ Max height: 300px, scrollable after
└─ Multiple selections allowed

Tag Styling:
├─ Background: Light green (#D5F4E6)
├─ Text: Dark gray
├─ Border Radius: 4px (small pill)
└─ Padding: 4px 8px
```

#### Toggle Switch
```
Style: Rounded rectangle
Size: 56px width × 28px height
Off State: Gray background, circle on left
On State: Green background, circle on right
Transition: 200ms smooth slide
Cursor: pointer

Usage: Binary yes/no choices
```

#### Checkbox & Radio (Custom Styled)
```
Checkbox:
├─ Unchecked: Light square border
├─ Checked: Green background with white checkmark
└─ Indeterminate: Green background with line

Radio:
├─ Unchecked: Light circle border
├─ Checked: Green filled circle
└─ Both have label text to the right
```

#### Color Swatch (for product variants)
```
Display: Circle (32×32px)
Border: 2px solid transparent
Hover: 50% opacity
Selected: 2px green border
Label: Color name in tooltip on hover

Example:
[◯ Black] [◯ White] [◯ Gray] [◯ Blue]
```

#### Star Rating (Interactive)
```
Star Size: 24px
Colors:
├─ Filled: Gold/orange (#F39C12)
├─ Empty: Light gray (#E0E0E0)
└─ Hover: Lighter gold

Behavior:
├─ Hover shows "X out of 5 stars" tooltip
├─ Click sets the rating
└─ Display count: "(45 reviews)"

Read-only Version: Just display stars + count
```

#### Search Input
```
Style: Text input with icon
├─ Search icon on left (gray)
├─ Text input field (full width)
└─ Clear button (X icon) on right when text present

Behavior:
├─ Autocomplete suggestions below on type
├─ Keyboard navigation (arrow keys)
└─ Enter key to search

Responsive:
├─ Desktop: Full-width in header
└─ Mobile: Full-width, larger touch targets
```

### 4.3 Cards & Containers

#### Product Card
```
Background: White
Border: None
Shadow: Elevation 1 (subtle shadow)
Border Radius: 8px
Padding: 0 (image flush to edges)
Hover Shadow: Elevation 2 (more prominent)
Transition: 200ms

Content:
├─ Image: 100% width, 400px height, rounded top
├─ Details overlay (on hover): Absolute positioned
│   ├─ Background: Semi-transparent dark
│   ├─ Product name: White, 16px bold
│   ├─ Price: Green, 18px bold
│   ├─ Rating: White, 12px
│   ├─ "Add to Cart" button: Green pill, small
│   └─ "Quick View" link: White underline
└─ Mobile: Details always visible below image
```

#### Feature Card (About/Services)
```
Layout: Icon on top, text below
Icon: 48×48px, colored
Title: 18px bold, dark gray
Description: 14px, light gray
Hover: Slight scale-up (102%), shadow increases
Border Radius: 8px
Padding: 24px
```

#### Testimonial Card
```
Layout: Quote + Author info
Quote: 16px italic, gray
Author: 14px bold, dark
Rating: Stars (5pt scale)
Image: Small circular avatar (48×48px)
Background: White
Border: Left 4px solid green
Border Radius: 8px
Padding: 20px
Shadow: Subtle
```

#### Shipping/Trust Badge
```
Icon: 32×32px (centered)
Label: 12px, centered below
Background: Light gray or white
Border Radius: 8px
Padding: 8px
Text Color: Dark gray

Hover: Show tooltip with explanation
```

### 4.4 Navigation & Menus

#### Mega Menu (Dropdown)
```
Trigger: "Categories" link in header
Display: On hover (desktop) or click (mobile)

Layout:
├─ 4-column grid
├─ Column 1: Main categories (bold)
├─ Columns 2-4: Subcategories
└─ Right side: Featured banner image

Animation:
├─ Fade in 150ms
├─ Slight slide down 200ms
└─ Fade out 150ms on close

Mobile:
└─ Full-width below header
  ├─ Collapse/expand arrows
  └─ Smooth accordion animation
```

#### Bottom Navigation (Mobile)
```
Position: Fixed at bottom
Height: 60px
Background: White
Border-top: 1px light gray
Icons: 24×24px, gray
Labels: 10px, gray (under icon)
Active: Green icon & label, bold label

Spacing: 5 items evenly distributed
Safe area: Account for phone notch/button
Behavior: Stays visible while scrolling
```

#### Breadcrumb Navigation
```
Style: Inline text links
Separator: ">" (gray)
Format: Home > Category > Product Name
├─ "Home" clickable (dark green)
├─ "Category" clickable (dark green)
└─ "Product Name" not clickable (gray)

Font: 12px
Hover: Underline on clickable items
Mobile: Truncate if needed, scrollable
```

### 4.5 Modals & Overlays

#### Modal Dialog
```
Overlay: Dark semi-transparent (rgba(0,0,0,0.5))
Modal Body: White, border radius 8px
Position: Centered on screen
Max Width: 600px (desktop), 90% (mobile)
Animation: Fade in 200ms + scale 1.05 → 1

Header:
├─ Close button (X) top-right
├─ Title: 24px bold
└─ Optional: Description

Content:
├─ Padding: 24px
└─ Scrollable if height > 80vh

Footer (optional):
├─ Action buttons (right-aligned)
└─ Padding: 16px
```

#### Toast Notification
```
Position: Bottom-right (or top-right on mobile)
Width: 320px (desktop), 90% (mobile)
Padding: 16px
Border Radius: 8px
Shadow: Elevation 3
Animation: Slide in from right 300ms

Success: Green background (#27AE60), white text
Error: Red background (#E74C3C), white text
Warning: Orange background (#F39C12), dark text
Info: Blue background (#3498DB), white text

Auto-close: 4 seconds (for success/info)
Keep open: 0 seconds (for error/warning)

Close button: X icon, right side
```

#### Dropdown Menu
```
Trigger: Clickable element
Display: Below/above trigger

List Items:
├─ Padding: 12px 16px
├─ Hover: Light background (gray)
├─ Font: 14px
└─ Icon (optional): Left of text

Separator: Light line between groups
Arrow: Point toward trigger
Animation: Fade in 150ms

Max height: 300px, scrollable
Width: Min 200px, max trigger width
```

### 4.6 Pagination

#### Pagination Controls
```
Style: Centered below content

Layout:
├─ [< Previous] [Next >]  (Button style)
├─ Showing page 1-20 of 250 (text)
└─ Items per page dropdown [12 ▼]

Button Style:
├─ Disabled: Gray, cursor not-allowed
├─ Active: Green background
└─ Hover: Darker green

Alternative: Page numbers [1] [2] [3]... [10]
```

### 4.7 Skeleton Loaders

```
Placeholder shapes:
├─ Rectangle: 16px border-radius, light gray
├─ Circle: For avatars
└─ Text lines: Multiple 8px-high rectangles

Animation:
├─ Gradient shimmer effect (left to right)
├─ Duration: 1500ms infinite
└─ Creates pulsing effect

Usage:
└─ Product cards while loading
  └─ Text cards while loading
  └─ Image placeholders while loading
```

---

## 5. FEATURE REQUIREMENTS

### 5.1 Product Catalog Features

#### Product Listing with Advanced Filtering
- **Display:** 4 columns per row (responsive)
- **Sorting:** Relevance, Price (Low→High, High→Low), Rating, Newest
- **Filters:**
  - Category (checkbox, expandable)
  - Price Range (dual-handle slider, 0-100,000 PKR)
  - Brand (searchable dropdown)
  - Rating (5-star, 4+, 3+, 2+ options)
  - Color (color swatches)
  - Material/Size/Other (expandable)
- **Results:** "Showing X-Y of Z results"
- **Pagination:** Previous/Next buttons

#### Product Search
- **Full-page search interface** (/search)
- Auto-complete suggestions (top searches, products)
- Search history (last 5 searches, clearable)
- Spell-check suggestions ("Did you mean: laptop?")
- Search filters apply to results
- No results: "Try different keywords" with suggestions

#### Product Detail Page
- **Image Gallery:**
  - Main image (500×500px)
  - Carousel with arrows
  - Thumbnails below (80×80px)
  - Zoom on image hover
  - Lightbox modal for full-screen view
- **Product Info:**
  - Name, SKU, Rating
  - Price & Original Price (if discount)
  - Stock status (In Stock / Out of Stock)
  - Advanced variant selection (size, color, material, etc.)
  - Quantity selector (−/+ buttons)
  - Add to Cart button
  - Wishlist toggle
- **Tabs:** Description, Specifications, Reviews
  - Description: Full details + benefits
  - Specs: Table format
  - Reviews: 5-star + written + photos + helpful votes
- **Related Products Carousel**
- **AI Recommended Products**
- **Breadcrumb Navigation**
- **Social Sharing:** Facebook, Twitter, LinkedIn, WhatsApp, Pinterest

#### Product Variants
- **Advanced variant support:** Size + Color + Material + others
- **SKU-based inventory:** Each variant has own SKU & stock
- **Visual selection:** Color swatches, size pills
- **Dependent variants:** (e.g., size availability changes with color)
- **Price variation:** Different variants can have different prices
- **Stock status per variant:** "Only 2 left in Large/Black"

#### Wishlist
- **Wishlist sync to Cart:** Move items from wishlist to cart
- **Quick add to cart:** From wishlist page
- **Remove from wishlist**
- **Wishlist persistence:** Saved per user account
- **Share wishlist:** Generate shareable link (optional)
- **Notification:** "Item added to wishlist" toast

#### Product Reviews (Moderated)
- **Who can review:** Verified buyers only
- **Review content:** 5-star rating, title, written review, optional photos
- **Media support:** Upload up to 3 images
- **Helpful voting:** "Was this helpful?" (yes/no count)
- **Moderation:** Admin approves before display
- **Sorting:** Most helpful, newest, highest rating
- **Admin dashboard:** Approve/reject/edit reviews

### 5.2 Shopping Features

#### Shopping Cart
- **Slide-out panel from right** (400px desktop, full width mobile)
- **Cart items:** Image, name, price, quantity, remove button
- **Quantity controls:** −/+ buttons with instant update
- **Cart summary:** Subtotal, shipping (if set), discount, total
- **Empty state:** "Your cart is empty. Continue shopping."
- **Persistence:** Saved in localStorage (customer-specific)
- **Actions:** Continue Shopping, Proceed to Checkout
- **Notifications:** Toast when item added/removed

#### Multi-Step Checkout (4 Steps)
1. **Cart Review:** Review items, option to edit
2. **Shipping Address:** Existing address or add new
3. **Shipping Method:** Standard (1-2 days) vs Express (same day)
4. **Payment & Confirmation:** Payment method selection, order confirmation

**Checkout Features:**
- Progress indicator (Step 1/4, etc.)
- Back button to previous step
- Form validation (real-time feedback)
- Auto-save progress (localStorage)
- Mobile-optimized (full-screen per step)
- Order number generation
- Confirmation page with order details

#### Payment Processing
- **Payment method:** Bank Transfer (default) + JazzCash, EasyPaisa options
- **Bank transfer details:** Display account info, IBAN, reference number
- **Copy functionality:** One-click copy of payment details
- **PDF download:** Receipt/payment instructions
- **Manual status update:** Admin marks payment confirmed
- **Timeout:** 24-hour payment window (show countdown)
- **Error handling:** "Payment not confirmed, try again"

#### Order Tracking
- **Order status:** Pending → Confirmed → Picked → Shipped → Delivered
- **Timeline display:** Simple status with dates
- **Tracking number:** Link to HHC tracking (if available)
- **Manual updates:** Admin updates status in dashboard
- **Notifications:** Email + SMS + WhatsApp when status changes
- **Customer view:** In account > order details

### 5.3 User Account Features

#### User Registration & Login
- **Email/Password authentication**
- **Email verification:** Link sent to confirm email
- **Password reset:** "Forgot Password" flow with email verification
- **Session management:** JWT tokens, 30-day expiry
- **Security:** Bcrypt password hashing, rate limiting on login attempts
- **Mobile:** Full-width forms, large touch targets

#### User Profile
- **Profile information:** First name, last name, email, phone
- **Avatar:** Optional profile picture upload
- **Profile editing:** Update information with save button
- **Password change:** Current + new password verification
- **Email change:** Requires verification
- **Account deletion:** Option to delete account (with confirmation)

#### Addresses Management
- **Add multiple addresses:** Home, office, other
- **Address fields:** Name, phone, address, city, postal code
- **Default address:** Mark one as default for checkout
- **Edit address:** Update existing addresses
- **Delete address:** Remove address (warning if default)
- **Address labels:** Custom labels (home, office, etc.)

#### Order History
- **Order list:** All orders with status, date, amount
- **Order filters:** All, pending, confirmed, shipped, delivered
- **Order sorting:** Newest, oldest, highest amount
- **Order details:** View full order info (items, address, total, status)
- **Invoice download:** PDF of order details
- **Reorder:** Quick reorder from previous orders
- **Order tracking:** View current status and tracking number

#### Wishlist Management
- **Save items:** Add products to wishlist from product page
- **Wishlist page:** View all wishlist items (grid layout)
- **Move to cart:** Transfer items to shopping cart
- **Remove:** Delete items from wishlist
- **Notifications:** Email when wishlist item goes on sale (optional Phase 2)

#### Payment Methods
- **Save payment methods:** Bank transfer info, JazzCash number, EasyPaisa
- **Set default:** Mark preferred payment method
- **Edit:** Update payment method details
- **Delete:** Remove saved payment method

#### Reviews Management
- **View my reviews:** All reviews left by user
- **Edit review:** Modify rating, text, photos
- **Delete review:** Remove review
- **Write review:** Direct link to reviewable products
- **Helpful count:** See how many found review helpful

### 5.4 Customer Notifications

#### Email Notifications
- **Order confirmation:** When order placed (with payment instructions)
- **Order status:** When status changes (confirmed, shipped, delivered)
- **Shipping notification:** Tracking number and link
- **Account:** Password reset, email change verification
- **Marketing:** Weekly newsletter (opt-in)

#### SMS Notifications
- **Order confirmation:** Brief order ID + total amount
- **Shipping update:** "Your order is on the way!"
- **Delivery:** "Your order has been delivered"
- **Opt-in:** Checkbox during registration/settings

#### WhatsApp Notifications
- **Order confirmation:** Order details + payment instructions
- **Status updates:** Each order status change
- **Promotional:** Weekly deals/offers (opt-in)
- **Support:** Send pre-set response templates

#### In-App Notifications (Toast)
- **Add to cart:** "Item added to cart"
- **Wishlist:** "Added to wishlist" / "Removed from wishlist"
- **Account:** "Profile updated successfully"
- **Error:** "Something went wrong, try again"
- **Success:** "Order placed successfully"

#### Customizable Templates (Admin)
- **Email templates:** Editable HTML
- **SMS templates:** Character-limited
- **WhatsApp templates:** Predefined templates
- **Variables:** {{Order ID}}, {{Customer Name}}, {{Amount}}, etc.

### 5.5 Out-of-Stock Handling
- **Out of stock badge:** "Out of Stock" label on product
- **Disabled add to cart:** Button is grayed out, hover shows "Coming soon"
- **Similar products:** "Out of stock? Here are similar options" section
- **Notify me:** Email notification when back in stock (optional)
- **Alternative suggestion:** Recommended alternatives displayed

### 5.6 Search & Discovery
- **Full-page search interface** (/search)
- **Auto-complete:** Top products, brands, categories
- **Search history:** Last 5 searches (clear option)
- **Spelling suggestions:** "Did you mean: laptop?"
- **Filter search results:** Same filters as product listing
- **No results:** Helpful message + suggestions
- **Popular searches:** "Trending searches" section

### 5.7 Social Features
- **Social sharing:** Facebook, Twitter, LinkedIn, WhatsApp, Pinterest
- **Share product:** Pre-filled product link + image
- **Share order:** (Optional) Share with friends
- **Referral program:** (Phase 2) Referral link + tracking

---

## 6. ADMIN DASHBOARD SPECIFICATIONS

### 6.1 Admin Access & Roles

**Role-based access:** Same website, different views based on user role
- **Admin Routes:** Protected by authentication
- **URL:** /admin (with role verification)
- **Navigation:** Admin menu appears for admin users in account dropdown
- **Logout:** Standard logout applies to both customer and admin mode

### 6.2 Admin Dashboard Home

```
┌──────────────────────────────────────────┐
│ Admin Dashboard                          │
├──────────────────────────────────────────┤
│                                          │
│ KEY METRICS (Cards):                     │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│ │Total │ │Total │ │Total │ │Total │    │
│ │Orders│ │Revenu│ │Users │ │Pending   │
│ │ 250  │ │500K  │ │ 120  │ │  32  │    │
│ └──────┘ └──────┘ └──────┘ └──────┘    │
│                                          │
│ CHARTS:                                  │
│ ┌─ Revenue Trend (Line chart)            │
│ │ [Last 30 days, weekly bars]           │
│ │                                       │
│ ┌─ Orders by Status (Pie chart)          │
│ │ [Pending, Confirmed, Shipped, etc.]   │
│ │                                       │
│ ┌─ Top Products (Bar chart)              │
│ │ [Top 5 by sales]                      │
│ │                                       │
│ RECENT ACTIVITY:                         │
│ ├─ New Order: ORD-001 - 2 min ago      │
│ ├─ New Review: ⭐⭐⭐⭐⭐ - 5 min ago   │
│ └─ Inventory Updated - 1 hour ago       │
│                                          │
└──────────────────────────────────────────┘
```

**Metrics Cards (KPIs):**
- Total Orders (this month)
- Total Revenue (this month)
- Total Users
- Pending Orders
- Today's Sales
- Average Order Value

**Charts:**
- **Revenue Trend:** Line/bar chart (30-day view)
- **Order Status Distribution:** Pie chart
- **Top Selling Products:** Bar chart (top 5)
- **Category Performance:** Bar chart

**Recent Activity Log:**
- Last 10 activities (orders, reviews, inventory updates)
- Activity type + time elapsed

### 6.3 Products Management

#### Products List
```
Products Table:

┌──────┬─────────────────┬──────────┬─────┬────────┐
│ ID   │ Product Name    │ Category │Price│ Action │
├──────┼─────────────────┼──────────┼─────┼────────┤
│PRD-1 │ iPhone 13 Case  │ Electronics
│ 2500 │[Edit][Delete]  │
│PRD-2 │ Cotton T-Shirt  │ Fashion  │1500 │[Edit][Delete]  │
│      │                 │          │     │        │
└──────┴─────────────────┴──────────┴─────┴────────┘

Filters: [Category ▼] [Stock Status ▼] [Price Range ▼]
Search: [Search products...]
Bulk Actions: [Select All] [Delete Selected]
Pagination: [< Previous] [Next >] [Page 1 of 10]
```

**Table Columns:**
- Product ID (SKU)
- Product Name
- Category
- Price (with cost price)
- Stock Status (In stock / Low stock / Out)
- Actions (Edit, Delete, Duplicate)

**Actions:**
- **Edit:** Opens product form
- **Delete:** With confirmation
- **Duplicate:** Create variant from existing product
- **Search:** Real-time search by name/SKU
- **Bulk import:** Upload CSV with products
- **Bulk edit:** Change prices, categories for multiple products

#### Add/Edit Product Form

```
PRODUCT INFORMATION:
┌────────────────────────────────────┐
│ Product Name: [Input]              │
│ SKU: [Input - Auto-generated]      │
│ Category: [Dropdown]               │
│ Description: [Rich text editor]    │
│ Short Description: [Textarea]      │
│                                    │
│ PRICING:                           │
│ Cost Price: [Input] (wholesale)    │
│ Selling Price: [Input] (retail)    │
│ Discount %: [Input] (optional)     │
│ Final Price: [Display - calculated]│
│                                    │
│ INVENTORY:                         │
│ HHC SKU: [Input - Link to HHC]     │
│ Current Stock: [Display - from HHC]│
│ Reorder Level: [Input] (alerts)    │
│                                    │
│ IMAGES:                            │
│ [Drag to upload or click]          │
│ [Image 1] [Image 2] [Image 3]      │
│ [Add More Images]                  │
│                                    │
│ SPECIFICATIONS:                    │
│ [Add Spec] [Spec 1] [Remove]       │
│ ├─ Material: Cotton                │
│ ├─ Size: S, M, L, XL               │
│ └─ Color: Black, White             │
│                                    │
│ VARIANTS:                          │
│ [Add Variant]                      │
│ Variant 1: Black - S - PKR 1500    │
│ Variant 2: White - M - PKR 1600    │
│ [Edit] [Delete]                    │
│                                    │
│ SEO:                               │
│ Meta Title: [Input]                │
│ Meta Description: [Textarea]       │
│ Keywords: [Tag input]              │
│                                    │
│ STATUS:                            │
│ [✓] Active / [   ] Inactive        │
│                                    │
│ [Save] [Cancel]                    │
└────────────────────────────────────┘
```

**Form Features:**
- Rich text editor for description (formatting, links, media)
- Image upload with drag-and-drop
- Multiple images (primary + secondary)
- SKU auto-generation or manual entry
- Category hierarchy (parent/child)
- Variant creation (size, color, material combinations)
- SEO fields (meta title, description, keywords)
- Auto-save draft every 30 seconds
- Publish status (active/inactive)

#### Product Inventory Management
```
Inventory Management:

Product: iPhone 13 Case
HHC SKU: HHC-ELEC-001

Current Stock: 250 units
Last Updated: Today at 2:30 PM

[Auto-sync from HHC] [Manual Update]

Stock Level Alerts:
Reorder Level: 20 units
Stock Status: ✓ Normal

Sync Status:
[✓] Connected to HHC
Last sync: 15 mins ago
[Sync Now] button

Stock History:
Date       | Qty | Type      | Notes
Nov 28     | 10  | Sold      | ORD-001
Nov 27     | 50  | Received  | HHC Restock
Nov 26     | 5   | Damaged   | QC removed
```

**Features:**
- Real-time inventory sync from HHC API
- Manual stock adjustment (for damages, adjustments)
- Low stock alerts (notification when below reorder level)
- Stock history (audit trail of changes)
- Bulk stock update (CSV import)
- Stock predictions (AI-based, Phase 2)

### 6.4 Orders Management

#### Orders List
```
Orders Table:

┌────────┬──────────────────┬──────────┬────────┬──────────────┐
│Order ID│ Customer         │ Status   │ Amount │ Action       │
├────────┼──────────────────┼──────────┼────────┼──────────────┤
│ORD-001 │ Ahmed Khan       │ Confirmed│ 9,250  │[View][Edit]  │
│ORD-002 │ Fatima Ali       │ Shipped  │ 5,500  │[View][Edit]  │
│ORD-003 │ Hassan Ahmed     │ Pending  │ 3,200  │[View][Edit]  │
│        │                  │          │        │              │
└────────┴──────────────────┴──────────┴────────┴──────────────┘

Filters: [Status ▼] [Date Range ▼] [Payment Status ▼]
Search: [Search by Order ID or Customer name...]
Pagination: [< Previous] [Next >]

Bulk Actions: [Mark as Shipped] [Mark as Delivered] [Cancel Orders]
```

**Order Details View**
```
Order #ORD-2024-001
Placed: Nov 28, 2024 at 2:30 PM

STATUS: [Pending] ▼
Customer can edit payment status here

CUSTOMER INFORMATION:
Ahmed Khan | 03001234567 | ah...@gmail.com
[View Orders from Customer]

SHIPPING ADDRESS:
House 123, Street Road
Karachi, 75500
[Edit Address] [View on Map]

ORDER ITEMS:
Item 1: iPhone Case (Black, M) × 2 @ PKR 2,500 = PKR 5,000
Item 2: Screen Protector × 1 @ PKR 1,500 = PKR 1,500

Order Summary:
Subtotal: PKR 6,500
Shipping: PKR 250 (Standard)
Discount: PKR 0
Total: PKR 6,750

PAYMENT INFORMATION:
Status: [Pending] ▼  [Mark as Confirmed]
Method: Bank Transfer
Reference: [Not provided]

[Verify Payment] [Request Payment Again]

ACTIONS:
[Print Order]
[Send Customer Notification]
[Create Refund]
[Cancel Order]
[Export]

NOTES:
Admin notes field (for internal use)
```

**Order Actions:**
- **Change status:** Pending → Confirmed → Shipped → Delivered
- **View/edit customer details**
- **View/edit shipping address**
- **Mark payment confirmed**
- **Request payment again:** Auto-send payment instructions
- **Create refund:** Initiate return/refund process
- **Cancel order:** If not yet shipped
- **Print:** Order label, receipt, packing slip
- **Send notification:** Manual email/SMS to customer
- **Export:** PDF receipt for customer

#### Order Status Management
```
Status Timeline:
✓ Confirmed (Nov 28, 2:35 PM)
⧗ Picked (Nov 28, 3:00 PM) [Edit Time]
⧗ Shipped (Nov 28, 5:30 PM) [Edit Time]
⧖ Out for Delivery
⧖ Delivered

[Update Status Dropdown]
Current Status: Picked
Set Status to: [Shipped ▼] [Update]

Tracking:
Tracking #: PKG-123456
Provider: HHC (or TCS/Leopards)
[View Tracking] (external link)

Manual tracking update (if auto-sync fails):
Tracking #: [Input]
Status: [Select]
[Update]
```

### 6.5 Users Management

#### Users List
```
Customers Table:

┌────┬──────────────┬──────────────────┬──────────┬────────┐
│ ID │ Name         │ Email            │ Orders   │ Action │
├────┼──────────────┼──────────────────┼──────────┼────────┤
│U-1 │ Ahmed Khan   │ ah...@gmail.com  │ 5        │[View]  │
│U-2 │ Fatima Ali   │ fa...@gmail.com  │ 2        │[View]  │
│U-3 │ Hassan Ahmed │ ha...@gmail.com  │ 0        │[View]  │
│    │              │                  │          │        │
└────┴──────────────┴──────────────────┴──────────┴────────┘

Filters: [Join Date ▼] [Orders ▼]
Search: [Search by name/email...]
Export: [Export to CSV]
```

**User Details:**
```
Customer Profile:
Name: Ahmed Khan
Email: ahmed@gmail.com
Phone: 03001234567
Join Date: Nov 1, 2024
Total Orders: 5
Total Spent: 40,000 PKR
Last Order: Nov 28, 2024

Status: [Active/Suspended dropdown]

ADDRESSES:
[Address 1] [Address 2] [Address 3]

ORDERS:
[Order 1] [Order 2] [Order 3]
[View All Orders]

ACTIONS:
[Edit Profile]
[Reset Password]
[Suspend Account]
[Delete Account]
[Send Email]
[View Activity Log]
```

### 6.6 Analytics & Reports

#### Dashboard Metrics (Detailed)
```
SALES METRICS:
├─ Total Revenue (today, this month, all-time)
├─ Total Orders (today, this month, all-time)
├─ Average Order Value
├─ Conversion Rate (visitors → buyers)
└─ Customer Lifetime Value

PRODUCT METRICS:
├─ Top Selling Products (top 5, 10)
├─ Top Categories (by revenue)
├─ Low Stock Products (alerts)
├─ Product Reviews (average rating, total count)
└─ Return Rate (% of orders returned)

CUSTOMER METRICS:
├─ Total Customers
├─ New Customers (this month)
├─ Repeat Customers (%)
├─ Customer Satisfaction (avg rating)
└─ Churn Rate

FINANCIAL METRICS:
├─ Profit Margin
├─ Payment Methods Used (% breakdown)
├─ Refunds (total, %)
└─ Outstanding Payments
```

#### Advanced Reports
```
SALES REPORT:
Period: [Date range picker]
├─ Daily/Weekly/Monthly breakdown
├─ Revenue by Category
├─ Revenue by Product
├─ Revenue by Customer
├─ Orders by Status
└─ Export: [PDF] [CSV] [Excel]

INVENTORY REPORT:
├─ Current Stock Levels
├─ Stock Movement (in/out)
├─ Fast-Moving Products
├─ Slow-Moving Products
├─ Out of Stock Items
└─ Stock Forecast (30/60/90 days)

CUSTOMER REPORT:
├─ Customer Acquisition Cost
├─ Customer Lifetime Value
├─ Customer Segmentation
├─ Repeat Purchase Rate
├─ Churn Analysis
└─ Cohort Analysis

FINANCIAL REPORT:
├─ Profit & Loss Statement
├─ Cash Flow
├─ Expense Breakdown
├─ Payment Method Breakdown
└─ Tax Summary

MARKETING REPORT:
├─ Top Traffic Sources
├─ Conversion by Source
├─ Campaign Performance
├─ Email Campaign Stats
└─ Social Media Performance
```

**Report Features:**
- Date range picker (preset: Today, This Week, This Month, Last 30 days, Custom)
- Charts (line, bar, pie, table)
- Filters (by category, product, customer segment)
- Export (PDF, CSV, Excel)
- Scheduled reports (email weekly/monthly)
- Comparison (vs. previous period)

### 6.7 Content Management

#### Blog Management
```
Blog Posts Table:

┌────┬──────────────────────┬──────────┬──────┬────────┐
│ ID │ Title                │ Author   │ Date │ Action │
├────┼──────────────────────┼──────────┼──────┼────────┤
│BP1 │ "Shopping Tips..."   │ Admin    │Nov28 │[Edit]  │
│BP2 │ "Fashion Trends..."  │ Writer   │Nov26 │[Edit]  │
│    │                      │          │      │        │
└────┴──────────────────────┴──────────┴──────┴────────┘

[+ New Post]

Post Editor:
Title: [Input]
Slug: [Auto-generated from title]
Content: [Rich text editor with formatting]
Featured Image: [Drag to upload]
Author: [Dropdown - current user]
Status: [Draft/Published]
Categories: [Multi-select tags]

Meta:
Meta Title: [Input]
Meta Description: [Textarea]
Keywords: [Tag input]

[Save Draft] [Publish] [Schedule] [Preview]
```

#### FAQ Management
```
FAQs Table:

┌──────┬─────────────────────────┬──────────┬────────┐
│Order │ Question                │ Category │ Action │
├──────┼─────────────────────────┼──────────┼────────┤
│ 1    │ "How long shipping take?"│ Shipping │[Edit]  │
│ 2    │ "What's return policy?" │ Returns  │[Edit]  │
│      │                         │          │        │
└──────┴─────────────────────────┴──────────┴────────┘

[+ Add FAQ]

FAQ Editor:
Question: [Input]
Answer: [Rich text editor]
Category: [Dropdown: Shipping, Returns, Payments, etc.]
Order: [Number - for sorting]
Status: [Active/Inactive]

[Save] [Delete]
```

#### Testimonials Management
```
Testimonials Table:

┌────┬────────────────┬──────────┬──────────┬────────┐
│ ID │ Author         │ Product  │ Rating   │ Action │
├────┼────────────────┼──────────┼──────────┼────────┤
│T-1 │ Ahmed Khan     │ T-Shirt  │ ⭐⭐⭐⭐⭐│[Edit]  │
│T-2 │ Fatima Ali     │ Phone C. │ ⭐⭐⭐⭐☆│[Edit]  │
│    │                │          │          │        │
└────┴────────────────┴──────────┴──────────┴────────┘

[+ Add Testimonial]

Testimonial Editor:
Author Name: [Input]
Testimonial Text: [Textarea]
Rating: [5-star selector]
Product/Category: [Dropdown]
Author Image: [Upload]
Status: [Active/Inactive]
Display on Homepage: [Checkbox]

[Save] [Delete]
```

### 6.8 Notification Templates

#### Email Template Manager
```
Notification Templates Table:

Template                  Status   Action
Order Confirmation        Active   [Edit]
Order Shipped            Active   [Edit]
Order Delivered          Active   [Edit]
Password Reset           Active   [Edit]
Newsletter              Active   [Edit]

Template Editor:
Template Name: [Display only]
Subject: [Input]

Template Body: [HTML editor]
Available Variables:
{{Customer Name}}
{{Order ID}}
{{Order Amount}}
{{Tracking Number}}
{{Support Email}}

[Preview] [Save] [Test Send]
```

**Default Templates:**
- Order Confirmation
- Order Status Updates (Confirmed, Shipped, Delivered)
- Payment Reminder
- Password Reset
- Newsletter
- Review Request
- Return Authorization

### 6.9 Settings & Configuration

#### General Settings
```
Store Settings:
Store Name: [Input] - Kifayat
Store Email: [Input] - support@kifayat.co
Support Phone: [Input]
Logo: [Upload]
Favicon: [Upload]

Currencies & Localization:
Default Currency: [PKR dropdown]
Default Language: [English dropdown]

Timezone: [Pakistan (UTC+5)]

Footer Content:
Footer Text: [Editor]
Social Links: [Inputs for Facebook, Twitter, etc.]

[Save Settings]
```

#### Payment Settings
```
Payment Method Configuration:

Bank Transfer:
[✓] Enabled
Bank Name: [Input]
Account Number: [Input]
IBAN: [Input]
Account Holder: [Input]

JazzCash:
[✓] Enabled
Account Number: [Input]
API Key: [Input]

EasyPaisa:
[✓] Enabled
Account Number: [Input]
API Key: [Input]

[Save Settings]
```

#### Shipping Settings
```
Shipping Configuration:

Shipping Methods:
Standard Shipping: [✓] Enabled
├─ Cost: PKR 250
├─ Delivery Time: 1-2 business days
└─ [Edit]

Express Shipping: [✓] Enabled
├─ Cost: PKR 500
├─ Delivery Time: Same day
└─ [Edit]

Default Shipping Method: [Standard dropdown]

HHC Integration:
[✓] Connected to HHC
HHC API Key: [Password field]
Last Sync: Today at 2:30 PM
[Test Connection] [Sync Now]

[Save Settings]
```

#### Notification Settings
```
Email Configuration:
SMTP Server: [Input]
SMTP Port: [Input]
Email Address: [Input]
Password: [Password field]
[Test Email]

SMS Configuration:
SMS Provider: [Dropdown: Twilio, etc.]
API Key: [Password field]
From Number: [Input]
[Test SMS]

WhatsApp Configuration:
[✓] Enabled
Business Account ID: [Input]
API Token: [Password field]
[Test WhatsApp Message]

[Save Settings]
```

#### Admin Users Management
```
Admin Users Table:

┌────┬──────────────┬──────────────┬──────────┬────────┐
│ ID │ Name         │ Email        │ Role     │ Action │
├────┼──────────────┼──────────────┼──────────┼────────┤
│A-1 │ Admin User   │ admin@k.co   │ Owner    │[Edit]  │
│A-2 │ Manager      │ mgr@k.co     │ Manager  │[Edit]  │
│    │              │              │          │        │
└────┴──────────────┴──────────────┴──────────┴────────┘

[+ Add Admin User]

Admin User Editor:
Name: [Input]
Email: [Input]
Role: [Owner/Manager/Staff dropdown]
Permissions: [Checkboxes]
├─ View Dashboard
├─ Manage Products
├─ Manage Orders
├─ View Reports
└─ Manage Users

Status: [Active/Inactive]
[Save] [Delete]
```

---

## 7. TECHNICAL SPECIFICATIONS

### 7.1 Technology Stack

**Frontend:**
- **Framework:** React 18+ with TypeScript
- **Routing:** React Router v6
- **State Management:** Zustand or Context API
- **UI Framework:** None (custom components with Tailwind)
- **Styling:** Tailwind CSS 3+ (utility-first CSS)
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Validation:** Zod or Yup
- **Image Optimization:** Next.js Image component (if using Next.js) or custom lazy loading
- **Component Library:** Custom built (no Material-UI or Bootstrap)
- **Icons:** Feather Icons or FontAwesome
- **Testing:** Jest + React Testing Library
- **Build Tool:** Vite or Create React App
- **Deployment:** Vercel

**Backend:**
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4+
- **Language:** JavaScript/TypeScript
- **Database:** MongoDB
- **ORM/Query Builder:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** Bcryptjs
- **Validation:** Joi or express-validator
- **HTTP Server:** Express.js built-in
- **Environment Variables:** dotenv
- **Middleware:** CORS, Helmet, Morgan (logging)
- **Email:** Nodemailer
- **SMS:** Twilio SDK
- **File Upload:** Multer
- **API Documentation:** Swagger/OpenAPI
- **Testing:** Jest + Supertest
- **Deployment:** Railway, Heroku, or DigitalOcean

**Database:**
- **Primary DB:** MongoDB (NoSQL)
- **Hosting:** MongoDB Atlas (free tier for launch)
- **Backup:** Automatic daily backups
- **Connection:** Mongoose ODM

**Infrastructure:**
- **Frontend Hosting:** Vercel (auto-deploy on GitHub push)
- **Backend Hosting:** Railway or Heroku (auto-deploy)
- **Database Hosting:** MongoDB Atlas (cloud)
- **CDN:** Vercel built-in CDN (for static assets)
- **Email Service:** SendGrid or Mailgun
- **SMS Service:** Twilio
- **Image Storage:** Cloudinary or AWS S3 (optional, Phase 2)

### 7.2 API Architecture

**Base URL:** https://api.kifayat.co/v1

**API Response Format (Standard):**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Product Name"
  },
  "message": "Operation successful"
}
```

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Email format is invalid",
    "details": "Please enter a valid email address"
  }
}
```

**HTTP Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Unprocessable Entity
- 500: Server Error

**Authentication:**
- JWT token in Authorization header: `Authorization: Bearer {token}`
- Token expiry: 30 days
- Refresh token: Store in httpOnly cookie (secure, same-site)

### 7.3 Database Schema (MongoDB)

**Collections:**

1. **users**
   - _id, email, passwordHash, firstName, lastName, phone
   - addresses: [{ type, address, city, postalCode, isDefault }]
   - createdAt, updatedAt, lastLogin

2. **products**
   - _id, name, sku, category, price, costPrice, description
   - images: [{ url, alt, isPrimary }]
   - variants: [{ sku, color, size, material, price, stock }]
   - specifications: { material, color, size, warranty, etc. }
   - hhcSku, hhcInventory, currentStock, minStock
   - rating, reviewCount, status
   - createdAt, updatedAt, deletedAt

3. **orders**
   - _id, orderId, userId, items, totalAmount, shippingCost, discount, finalAmount
   - shippingAddress, paymentStatus, paymentMethod, paymentReference
   - orderStatus, hhcOrderId, trackingNumber
   - createdAt, updatedAt, deliveredAt

4. **reviews**
   - _id, productId, userId, rating, title, comment
   - images: [{ url }], helpfulVotes, reportedCount
   - createdAt, updatedAt, status (approved/pending/rejected)

5. **carts**
   - _id, userId, items: [{ productId, variantId, quantity }]
   - expiresAt, createdAt, updatedAt

6. **wishlist**
   - _id, userId, items: [{ productId, addedAt }]
   - createdAt, updatedAt

7. **categories**
   - _id, name, slug, description, image, parentId
   - createdAt, updatedAt

8. **notifications**
   - _id, userId, type (order, review, promotion, etc.)
   - title, message, link, read, createdAt

9. **blog_posts**
   - _id, title, slug, content, excerpt, author, featured_image
   - categories, published, createdAt, updatedAt, publishedAt
   - meta: { title, description, keywords }

10. **faqs**
    - _id, question, answer, category, order, status

11. **testimonials**
    - _id, authorName, text, rating, productId, image, status
    - displayOnHomepage, createdAt

12. **notification_templates**
    - _id, name, subject, body, variables, type (email/sms/whatsapp)
    - createdAt, updatedAt

13. **admin_users**
    - _id, name, email, passwordHash, role, permissions
    - lastLogin, status, createdAt

---

## 8. INTEGRATION REQUIREMENTS

### 8.1 HHC Virtual Warehouse Integration

**API Endpoints to Integrate:**
- GET /inventory (Get current stock levels)
- POST /orders (Submit order for fulfillment)
- GET /orders/:orderId (Track order status)
- GET /shipments (Get shipping info)
- POST /returns (Initiate return)

**Data Flow:**
1. **Inventory Sync:** Daily sync at 12 AM (update stock counts)
2. **Order Submission:** Real-time when order confirmed (after payment)
3. **Status Updates:** Webhook from HHC when status changes
4. **Tracking:** Fetch tracking info when order ships

**Error Handling:**
- Retry failed API calls (3 attempts with exponential backoff)
- Alert admin if sync fails
- Manual override option for inventory

### 8.2 Email Integration (SendGrid)

**Email Templates:**
- Order Confirmation
- Order Status Updates
- Password Reset
- Welcome Email
- Newsletter

**Features:**
- Dynamic templates (variables: {{Customer Name}}, {{Order ID}})
- Tracking: Open rate, click rate
- Unsubscribe management

### 8.3 SMS Integration (Twilio)

**SMS Types:**
- Order confirmation (brief summary)
- Shipping notification (tracking link)
- Delivery confirmation
- Payment reminder
- Promotional offers (opt-in)

**Features:**
- SMS template management
- Opt-in/out handling
- Delivery tracking

### 8.4 WhatsApp Integration (Twilio WhatsApp Business API)

**WhatsApp Messages:**
- Order confirmation with payment instructions
- Status updates (shipping, delivered)
- Support responses
- Promotional messages (opt-in)

**Features:**
- Pre-approved message templates
- Media support (images, documents)
- Two-way messaging for support

### 8.5 Google Analytics Integration

**Events to Track:**
- Page views (all pages)
- Product views
- Add to cart
- Checkout steps
- Order completion
- Search queries
- Internal site search

**Goals/Conversions:**
- Registration
- First purchase
- Newsletter signup
- Contact form submission

**Implementation:**
- Google Analytics 4 (GA4) tag
- Event tracking via gtag.js
- Custom events for e-commerce

### 8.6 Google Search Console Integration

**Setup:**
- Domain verification
- Sitemap submission
- Robots.txt configuration
- Performance monitoring

---

## 9. PERFORMANCE & SEO

### 9.1 Performance Optimization

**Target Metrics:**
- Page Load Time: < 3 seconds (lighthouse score > 90)
- First Contentful Paint (FCP): < 1.5 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5 seconds

**Optimization Techniques:**
- Image optimization (lazy loading, WebP format, proper sizes)
- Code splitting (route-based, component-based)
- Minification & compression (CSS, JS, HTML)
- Caching (browser cache, CDN cache, server cache)
- Database query optimization (indexes, pagination)
- API response compression (gzip)
- Skeleton loaders (perceived performance)
- Progressive Web App (PWA) support

**Tools:**
- Lighthouse (Google Chrome DevTools)
- WebPageTest
- GTmetrix
- PageSpeed Insights

### 9.2 SEO Implementation

**On-Page SEO:**
- Meta titles (60 chars, keyword-rich)
- Meta descriptions (160 chars, compelling)
- H1 tag (one per page, keyword-rich)
- Header hierarchy (H1, H2, H3)
- Image alt text (descriptive, keyword-relevant)
- Internal linking (contextual links)
- URL structure (clean, descriptive slugs)

**Structured Data (Schema Markup):**
- Organization schema (Company info)
- Product schema (Product details, price, rating)
- Review schema (Star rating, reviewer)
- BreadcrumbList schema
- LocalBusiness schema (for Karachi location)
- AggregateRating schema

**Open Graph Tags:**
- og:title, og:description, og:image
- og:url, og:type
- twitter:card, twitter:title, twitter:description

**Technical SEO:**
- XML sitemap (auto-generated)
- Robots.txt configuration
- Mobile-responsive design
- Fast page load times
- SSL certificate (HTTPS)
- Canonical tags (prevent duplicates)
- 301 redirects (proper URL management)

**Content SEO:**
- Keyword research & targeting
- Long-form content (2000+ words for blogs)
- FAQ schema (rich snippets)
- Internal linking strategy
- Content freshness (update regularly)

### 9.3 Internationalization (i18n)

**Language Support:**
- English (primary)
- Urdu (secondary)

**Implementation:**
- i18next library for translation
- Language switcher (top-right header)
- URL structure: /en/products, /ur/products (optional, use query param instead: ?lang=ur)
- Auto-detect browser language (optional)
- Store user preference in localStorage

**Content to Translate:**
- UI labels (buttons, forms, menus)
- Page content (descriptions, copy)
- Product names (some may stay English)
- Error messages
- Email templates (partially)

---

## 10. CONTENT REQUIREMENTS

### 10.1 Copywriting Guidelines

**Tone:** Professional, trustworthy, helpful, conversational
**Voice:** Brand-consistent, confident, customer-focused
**Language:** Clear, concise, jargon-free

**Page Specific:**
- **Homepage:** Welcome visitors, value proposition, CTAs
- **Product Pages:** Features, benefits, uses, customer reviews
- **Checkout:** Reassurance, clarity, urgency (limited stock alerts)
- **About Us:** Brand story, mission, values, team
- **FAQ:** Clear Q&A format, helpful answers
- **Contact:** Professional, responsive tone

### 10.2 Product Descriptions

**Structure:**
```
Product Title
Price & discount badge

OVERVIEW (2-3 sentences):
What is it? What does it do? Why should someone buy it?

KEY FEATURES (5-7 bullet points):
✓ Feature 1
✓ Feature 2
✓ Feature 3
(etc.)

SPECIFICATIONS TABLE:
Material | Size | Color | Warranty | etc.

USE CASES:
Perfect for...
Great for...

WHAT'S INCLUDED:
- Item 1
- Item 2
- Item 3

CARE INSTRUCTIONS / NOTES:
How to maintain/use the product

SHIPPING & RETURNS:
Standard: 1-2 days
Express: Same day
30-day returns, no questions asked
```

### 10.3 Email Templates

**Transactional Emails:**
- Welcome email (after registration)
- Order confirmation
- Shipping notification
- Delivery confirmation
- Password reset
- Order cancellation

**Promotional Emails:**
- Newsletter (weekly deals)
- Abandoned cart (recovery)
- Product recommendation
- Flash sale announcement
- Birthday discount

**Email Structure:**
- Header (logo, brand colors)
- Body (main content)
- CTA button (green pill style)
- Footer (links, social, unsubscribe)
- Text-only fallback

### 10.4 Blog Topics (Initial)

1. "Top 10 Shopping Tips for Online Retail"
2. "How to Choose Quality Products"
3. "Fashion Trends This Season"
4. "Electronics: Choosing the Right Gadgets"
5. "Home Organization Ideas"
6. "Best Deals Online vs. Offline"
7. "Customer Service Excellence"
8. "Sustainable Shopping Guide"

---

## 11. DEVELOPMENT TIMELINE

**Week 1-2:** Setup, design system, basic pages
**Week 2-3:** Product features, shopping cart, checkout
**Week 3-4:** User account, admin dashboard, integration
**Week 4:** Testing, optimization, launch

---

## 12. DEPLOYMENT & LAUNCH CHECKLIST

**Pre-Launch:**
- [ ] All features tested (functional testing)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] Performance audit passed
- [ ] Security audit completed
- [ ] SSL certificate installed
- [ ] Database backups configured
- [ ] Error monitoring (Sentry) set up
- [ ] Analytics installed and tested
- [ ] Legal pages reviewed (Privacy, Terms)

**Launch Day:**
- [ ] Final code review
- [ ] Deploy to production
- [ ] Smoke tests on production
- [ ] Monitor error logs
- [ ] Check critical user flows
- [ ] Social media announcement
- [ ] Email launch announcement

**Post-Launch (Week 1):**
- [ ] Monitor performance metrics
- [ ] Bug fixes (if any)
- [ ] User feedback collection
- [ ] Analytics review

---

## 13. NOTES FOR DEVELOPER

### Design System Implementation
- Use Tailwind CSS utility classes (no custom CSS unless necessary)
- Follow the color palette strictly for consistency
- Implement responsive design from mobile-first approach
- Use the spacing system (8px grid) consistently
- Apply shadow elevation system for depth
- Implement animations using CSS transitions/keyframes

### Component Development
- Build reusable, isolated components
- Use TypeScript for type safety
- Write unit tests for critical components
- Document component props (JSDoc comments)
- Create component library documentation (Storybook optional)

### Performance Best Practices
- Lazy-load images (use Intersection Observer API)
- Code split routes and heavy components
- Minimize bundle size (check with webpack-bundle-analyzer)
- Optimize database queries (add proper indexes)
- Implement pagination (never load all products at once)
- Use caching strategies (browser cache, API response cache)

### Security Considerations
- Input validation on all forms (frontend & backend)
- Escape HTML in user-generated content (prevent XSS)
- CSRF protection on state-changing requests
- SQL/NoSQL injection prevention (use parameterized queries)
- Rate limiting on login attempts and API endpoints
- HTTPS only (no HTTP)
- Secure password hashing (bcryptjs)
- Environment variables for sensitive data (API keys, database URL)
- CORS configuration (allow only trusted domains)

### Testing Strategy
- Unit tests for utility functions and custom hooks
- Integration tests for API endpoints
- End-to-end tests for critical user flows (login, checkout, search)
- Performance testing (Lighthouse CI)
- Security testing (OWASP Top 10)

### Monitoring & Logging
- Error tracking (Sentry or similar)
- Performance monitoring (New Relic or Datadog)
- Application logs (Winston or Morgan)
- Database query monitoring
- Uptime monitoring (StatusPage)

### Documentation
- API documentation (Swagger/OpenAPI)
- Component documentation
- Architecture documentation
- Deployment guides
- Troubleshooting guides

---

## FINAL NOTES

This specification is comprehensive and detailed. Refer back to it frequently during development to ensure alignment. If anything is unclear, ask for clarification before proceeding.

**Key Points to Remember:**
1. **Mobile-first approach:** Design for mobile, then scale up
2. **User-centric:** Every feature should solve a user problem
3. **Professional design:** Green/teal with clean, modern aesthetic
4. **Performance:** Fast load times are critical for e-commerce
5. **Security:** Protect user data like your business depends on it (it does!)
6. **Testing:** Test thoroughly before launch
7. **Documentation:** Document everything for future maintenance

**Success Metrics (Month 1):**
- Website uptime: > 99%
- Page load time: < 3 seconds
- Mobile responsiveness: 100% (no broken layouts)
- Functionality: All features working as specified
- User feedback: > 4.0/5.0 satisfaction score

---

**Document Version:** 1.0  
**Last Updated:** [Today's Date]  
**Status:** Ready for Development  

**Approved By:** [Your Name]  
**Review Date:** [Review Schedule]

---

*This document should be kept updated as the project evolves. Any changes to scope, design, or requirements should be documented here.*
