export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  description: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  badge?: "new" | "sale" | "bestseller" | "limited";
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

// Premium placeholder images using UI Avatars-style approach with SVG data URIs
// Each product gets a unique, elegant visual identity
function createProductImage(
  bg: string,
  fg: string,
  shape: string,
  label: string
): string {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0.85"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="600" height="750" fill="url(#g)"/>
  ${shape}
  <text x="300" y="680" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="${fg}" opacity="0.5" letter-spacing="3">${label}</text>
</svg>`)}`;
}

function createCategoryImage(bg: string, fg: string, icon: string): string {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="400" y="280" text-anchor="middle" font-family="Georgia,serif" font-size="64" fill="${fg}" opacity="0.6">${icon}</text>
</svg>`)}`;
}

const tshirtShape = `<ellipse cx="300" cy="320" rx="140" ry="180" fill="none" stroke="#ffffff20" stroke-width="2" filter="url(#shadow)"/>
  <path d="M200 240 Q300 200 400 240 Q420 280 400 320 Q300 500 200 320 Q180 280 200 240Z" fill="#ffffff12" stroke="#ffffff18" stroke-width="1"/>`;

const shoeShape = `<path d="M180 380 Q200 300 280 280 Q360 260 400 300 Q440 340 450 380 Q460 420 420 430 L200 430 Q160 430 160 400Z" fill="#ffffff15" stroke="#ffffff20" stroke-width="1.5" filter="url(#shadow)"/>
  <path d="M200 380 Q280 360 420 380" fill="none" stroke="#ffffff10" stroke-width="1"/>`;

const watchShape = `<circle cx="300" cy="340" r="90" fill="none" stroke="#ffffff25" stroke-width="2" filter="url(#shadow)"/>
  <circle cx="300" cy="340" r="80" fill="none" stroke="#ffffff15" stroke-width="1"/>
  <line x1="300" y1="340" x2="300" y2="290" stroke="#ffffff30" stroke-width="2" stroke-linecap="round"/>
  <line x1="300" y1="340" x2="330" y2="340" stroke="#ffffff20" stroke-width="1.5" stroke-linecap="round"/>
  <rect x="288" y="240" width="24" height="30" rx="4" fill="#ffffff12" stroke="#ffffff18" stroke-width="1"/>
  <rect x="288" y="410" width="24" height="30" rx="4" fill="#ffffff12" stroke="#ffffff18" stroke-width="1"/>`;

const bagShape = `<rect x="220" y="260" width="160" height="180" rx="8" fill="#ffffff12" stroke="#ffffff20" stroke-width="1.5" filter="url(#shadow)"/>
  <path d="M260 260 Q260 220 300 200 Q340 220 340 260" fill="none" stroke="#ffffff20" stroke-width="2"/>`;

const glassesShape = `<ellipse cx="240" cy="330" rx="55" ry="45" fill="none" stroke="#ffffff25" stroke-width="2" filter="url(#shadow)"/>
  <ellipse cx="360" cy="330" rx="55" ry="45" fill="none" stroke="#ffffff25" stroke-width="2"/>
  <path d="M295 330 L305 330" stroke="#ffffff20" stroke-width="2"/>
  <path d="M185 325 L150 315" stroke="#ffffff18" stroke-width="1.5"/>
  <path d="M415 325 L450 315" stroke="#ffffff18" stroke-width="1.5"/>`;

const hoodieShape = `<path d="M210 240 Q300 200 390 240 Q410 260 400 290 Q380 310 370 300 Q370 500 300 520 Q230 500 230 300 Q220 310 200 290 Q190 260 210 240Z" fill="#ffffff12" stroke="#ffffff18" stroke-width="1" filter="url(#shadow)"/>
  <ellipse cx="300" cy="280" rx="30" ry="20" fill="none" stroke="#ffffff15" stroke-width="1"/>`;

const jacketShape = `<path d="M200 230 L300 210 L400 230 L410 500 L200 500Z" fill="#ffffff10" stroke="#ffffff18" stroke-width="1.5" filter="url(#shadow)"/>
  <line x1="300" y1="210" x2="300" y2="500" stroke="#ffffff12" stroke-width="1"/>
  <path d="M200 230 Q250 260 270 300" fill="none" stroke="#ffffff15" stroke-width="1"/>
  <path d="M400 230 Q350 260 330 300" fill="none" stroke="#ffffff15" stroke-width="1"/>`;

export const categories: Category[] = [
  {
    id: "footwear",
    name: "Footwear",
    slug: "footwear",
    image: createCategoryImage("#1a1a1a", "#d4c5a9", "👟"),
    productCount: 5,
  },
  {
    id: "hoodies",
    name: "Hoodies",
    slug: "hoodies",
    image: createCategoryImage("#1f1f1f", "#c4b896", "🧥"),
    productCount: 4,
  },
  {
    id: "t-shirts",
    name: "T-Shirts",
    slug: "t-shirts",
    image: createCategoryImage("#222222", "#bfb394", "👕"),
    productCount: 5,
  },
  {
    id: "jackets",
    name: "Jackets",
    slug: "jackets",
    image: createCategoryImage("#181818", "#d9ccad", "🧥"),
    productCount: 4,
  },
  {
    id: "bags",
    name: "Bags",
    slug: "bags",
    image: createCategoryImage("#1e1e1e", "#c8b999", "👜"),
    productCount: 4,
  },
  {
    id: "watches",
    name: "Watches",
    slug: "watches",
    image: createCategoryImage("#1c1c1c", "#d1c3a2", "⌚"),
    productCount: 4,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    image: createCategoryImage("#1b1b1b", "#c7b896", "🕶️"),
    productCount: 3,
  },
];

export const products: Product[] = [
  {
    id: "luma-ess-tee-01",
    name: "Essential Crew Tee",
    brand: "LUMA",
    price: 48,
    category: "t-shirts",
    description:
      "Crafted from 100% organic Supima cotton with a relaxed, modern fit. Pre-washed for a lived-in softness from the first wear. A wardrobe essential refined to its purest form.",
    features: [
      "100% Organic Supima Cotton",
      "Relaxed Modern Fit",
      "Pre-washed for Softness",
      "Reinforced Collar",
      "Side-seamed Construction",
    ],
    colors: [
      { name: "Ivory", hex: "#F5F0EB" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Sage", hex: "#8B9A7D" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 247,
    badge: "bestseller",
    images: [
      createProductImage("#2a2a2a", "#e8e0d0", tshirtShape, "LUMA"),
      createProductImage("#333333", "#d4c5a9", tshirtShape, "LUMA"),
    ],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "luma-stride-01",
    name: "Stride Minimal Runner",
    brand: "LUMA",
    price: 165,
    originalPrice: 195,
    category: "footwear",
    description:
      "Engineered with a lightweight EVA midsole and premium suede upper. The silhouette balances athletic performance with refined aesthetics.",
    features: [
      "Premium Suede Upper",
      "Lightweight EVA Midsole",
      "Memory Foam Insole",
      "Rubber Outsole",
      "Breathable Lining",
    ],
    colors: [
      { name: "Stone", hex: "#C4B896" },
      { name: "Onyx", hex: "#2A2A2A" },
      { name: "Cloud", hex: "#E8E4DF" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.7,
    reviewCount: 183,
    badge: "sale",
    images: [
      createProductImage("#1f1f1f", "#c4b896", shoeShape, "LUMA"),
      createProductImage("#282828", "#d4c5a9", shoeShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-chronos-01",
    name: "Chronos Automatic",
    brand: "LUMA",
    price: 340,
    category: "watches",
    description:
      "Japanese automatic movement housed in a 40mm brushed titanium case. Sapphire crystal glass with exhibition caseback. Water-resistant to 50 meters.",
    features: [
      "Japanese Automatic Movement",
      "Brushed Titanium Case",
      "Sapphire Crystal Glass",
      "50m Water Resistant",
      "Italian Leather Strap",
    ],
    colors: [
      { name: "Titanium", hex: "#A8A8A8" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Gold", hex: "#C9A96E" },
    ],
    sizes: ["40mm", "42mm"],
    rating: 4.9,
    reviewCount: 92,
    badge: "limited",
    images: [
      createProductImage("#1c1c1c", "#d1c3a2", watchShape, "LUMA"),
      createProductImage("#252525", "#c9a96e", watchShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-arc-tote-01",
    name: "Arc Leather Tote",
    brand: "LUMA",
    price: 225,
    category: "bags",
    description:
      "Full-grain vegetable-tanned leather with a structured silhouette. Interior features a zip pocket and two slip pockets. Hand-stitched handles.",
    features: [
      "Full-Grain Vegetable-Tanned Leather",
      "Structured Silhouette",
      "Interior Zip Pocket",
      "Hand-Stitched Handles",
      "Cotton Canvas Lining",
    ],
    colors: [
      { name: "Cognac", hex: "#8B5E3C" },
      { name: "Noir", hex: "#1A1A1A" },
      { name: "Dune", hex: "#C4B896" },
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 156,
    badge: "bestseller",
    images: [
      createProductImage("#1e1e1e", "#c8b999", bagShape, "LUMA"),
      createProductImage("#262626", "#d4c5a9", bagShape, "LUMA"),
    ],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "luma-onyx-sunglass-01",
    name: "Onyx Aviator",
    brand: "LUMA",
    price: 145,
    category: "accessories",
    description:
      "Hand-polished acetate frames with polarized CR-39 lenses. UV400 protection with anti-reflective coating. Comes with a leather case.",
    features: [
      "Hand-Polished Acetate",
      "Polarized CR-39 Lenses",
      "UV400 Protection",
      "Anti-Reflective Coating",
      "Leather Case Included",
    ],
    colors: [
      { name: "Onyx", hex: "#1A1A1A" },
      { name: "Tortoise", hex: "#6B4423" },
      { name: "Crystal", hex: "#D4D0CB" },
    ],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 214,
    images: [
      createProductImage("#1b1b1b", "#c7b896", glassesShape, "LUMA"),
      createProductImage("#232323", "#d4c5a9", glassesShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-drift-hoodie-01",
    name: "Drift French Terry Hoodie",
    brand: "LUMA",
    price: 128,
    category: "hoodies",
    description:
      "Heavyweight 400gsm French terry with a brushed interior. Dropped shoulders, kangaroo pocket, and a refined silhouette that layers effortlessly.",
    features: [
      "400gsm French Terry",
      "Brushed Interior",
      "Dropped Shoulders",
      "Kangaroo Pocket",
      "Ribbed Cuffs & Hem",
    ],
    colors: [
      { name: "Heather Grey", hex: "#9A9A9A" },
      { name: "Washed Black", hex: "#2A2A2A" },
      { name: "Sand", hex: "#C4B896" },
      { name: "Forest", hex: "#2D4A3E" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewCount: 312,
    badge: "bestseller",
    images: [
      createProductImage("#1f1f1f", "#c4b896", hoodieShape, "LUMA"),
      createProductImage("#272727", "#d4c5a9", hoodieShape, "LUMA"),
    ],
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: "luma-shell-jacket-01",
    name: "Shell Tech Jacket",
    brand: "LUMA",
    price: 275,
    category: "jackets",
    description:
      "Waterproof 3-layer construction with seam-sealed seams. Lightweight yet protective, with a minimal design that transitions from trail to city.",
    features: [
      "Waterproof 3-Layer Shell",
      "Seam-Sealed Seams",
      "Adjustable Hood",
      "Zip Pockets",
      "Packable Design",
    ],
    colors: [
      { name: "Obsidian", hex: "#1A1A1A" },
      { name: "Slate", hex: "#5A5A5A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 89,
    badge: "new",
    images: [
      createProductImage("#181818", "#d9ccad", jacketShape, "LUMA"),
      createProductImage("#212121", "#c4b896", jacketShape, "LUMA"),
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-comfort-runner-01",
    name: "Cloud Walk Trainer",
    brand: "LUMA",
    price: 148,
    category: "footwear",
    description:
      "Ultra-lightweight knit upper with responsive ZoomFoam cushioning. Designed for all-day comfort with a clean, contemporary profile.",
    features: [
      "Engineered Knit Upper",
      "ZoomFoam Cushioning",
      "Ortholite Insole",
      "Flex Groove Outsole",
      "Pull Tab",
    ],
    colors: [
      { name: "White", hex: "#F0EDE8" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Grey", hex: "#8A8A8A" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.6,
    reviewCount: 167,
    images: [
      createProductImage("#222222", "#c4b896", shoeShape, "LUMA"),
      createProductImage("#2b2b2b", "#d4c5a9", shoeShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-signature-tee-01",
    name: "Signature Logo Tee",
    brand: "LUMA",
    price: 55,
    category: "t-shirts",
    description:
      "Premium heavyweight 220gsm cotton with a relaxed drop-shoulder fit. Subtle tonal logo embossing on the chest. Built to hold its shape wash after wash.",
    features: [
      "220gsm Heavyweight Cotton",
      "Drop-Shoulder Fit",
      "Tonal Logo Embossing",
      "Pre-shrunk",
      "Double-Stitched Hem",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F0EB" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 198,
    badge: "new",
    images: [
      createProductImage("#2a2a2a", "#d4c5a9", tshirtShape, "LUMA"),
      createProductImage("#343434", "#c4b896", tshirtShape, "LUMA"),
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-minimal-tee-01",
    name: "Studio Minimal Tee",
    brand: "LUMA",
    price: 42,
    category: "t-shirts",
    description:
      "Clean, minimal design on premium 180gsm cotton. Boxy fit with a straight hem. The foundation of any thoughtful wardrobe.",
    features: [
      "180gsm Cotton",
      "Boxy Fit",
      "Straight Hem",
      "Side-Seamed",
      "Tagless Label",
    ],
    colors: [
      { name: "Ecru", hex: "#E8E4DF" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Rust", hex: "#8B4513" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 134,
    images: [
      createProductImage("#262626", "#d4c5a9", tshirtShape, "LUMA"),
      createProductImage("#2f2f2f", "#c4b896", tshirtShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-heritage-hoodie-01",
    name: "Heritage Zip Hoodie",
    brand: "LUMA",
    price: 148,
    category: "hoodies",
    description:
      "Premium zip-through hoodie in 380gsm brushed fleece. Features a two-way zipper, ribbed trims, and a slightly oversized fit.",
    features: [
      "380gsm Brushed Fleece",
      "Two-Way Zipper",
      "Ribbed Trims",
      "Oversized Fit",
      "Kangaroo Pockets",
    ],
    colors: [
      { name: "Washed Navy", hex: "#2A3A5A" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Cream", hex: "#E8E0D0" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 178,
    images: [
      createProductImage("#1f1f1f", "#c4b896", hoodieShape, "LUMA"),
      createProductImage("#282828", "#d4c5a9", hoodieShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-cozy-hoodie-01",
    name: "Cozy Pullover Hoodie",
    brand: "LUMA",
    price: 118,
    originalPrice: 138,
    category: "hoodies",
    description:
      "Ultra-soft loopback cotton hoodie with a relaxed fit. Perfect weight for year-round layering. Minimal branding for a clean aesthetic.",
    features: [
      "Loopback Cotton",
      "Relaxed Fit",
      "Kangaroo Pocket",
      "Adjustable Drawstring",
      "Ribbed Hem",
    ],
    colors: [
      { name: "Midnight", hex: "#1A1A2E" },
      { name: "Slate", hex: "#5A5A5A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 145,
    badge: "sale",
    images: [
      createProductImage("#1d1d1d", "#c4b896", hoodieShape, "LUMA"),
      createProductImage("#262626", "#d4c5a9", hoodieShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-formal-tee-01",
    name: "Pima V-Neck Tee",
    brand: "LUMA",
    price: 58,
    category: "t-shirts",
    description:
      "Elevated Pima cotton v-neck with a tailored fit. Ultra-fine gauge knit gives a silky hand feel. Perfect layering piece or standalone essential.",
    features: [
      "100% Pima Cotton",
      "Tailored V-Neck",
      "Fine Gauge Knit",
      "Side-Seamed",
      "Reinforced Neckline",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F0EB" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 102,
    images: [
      createProductImage("#282828", "#d4c5a9", tshirtShape, "LUMA"),
      createProductImage("#313131", "#c4b896", tshirtShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-urban-tee-01",
    name: "Urban Graphic Tee",
    brand: "LUMA",
    price: 62,
    category: "t-shirts",
    description:
      "Oversized graphic tee on premium 200gsm cotton. Features an abstract tonal print on the back. A statement piece with restrained execution.",
    features: [
      "200gsm Premium Cotton",
      "Oversized Fit",
      "Tonal Back Print",
      "Dropped Shoulders",
      "Pre-washed",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Stone", hex: "#C4B896" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.3,
    reviewCount: 87,
    badge: "new",
    images: [
      createProductImage("#222222", "#d4c5a9", tshirtShape, "LUMA"),
      createProductImage("#2c2c2c", "#c4b896", tshirtShape, "LUMA"),
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-trail-boot-01",
    name: "Trail Tech Boot",
    brand: "LUMA",
    price: 198,
    category: "footwear",
    description:
      "Waterproof nubuck leather with Vibram outsole. Gusseted tongue and a reinforced toe cap for all-terrain confidence. Refined enough for the city.",
    features: [
      "Waterproof Nubuck",
      "Vibram Outsole",
      "Gusseted Tongue",
      "Reinforced Toe",
      "Cushioned Ankle Collar",
    ],
    colors: [
      { name: "Dark Earth", hex: "#4A3A2A" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["8", "9", "10", "11", "12"],
    rating: 4.8,
    reviewCount: 76,
    badge: "new",
    images: [
      createProductImage("#1a1a1a", "#c4b896", shoeShape, "LUMA"),
      createProductImage("#242424", "#d4c5a9", shoeShape, "LUMA"),
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-mid-sneaker-01",
    name: "Mid Canvas Sneaker",
    brand: "LUMA",
    price: 128,
    category: "footwear",
    description:
      "Clean mid-top silhouette in organic canvas with vulcanized rubber sole. Minimal branding and a timeless profile.",
    features: [
      "Organic Canvas",
      "Vulcanized Rubber Sole",
      "Metal Eyelets",
      "Ortholite Insole",
      "Reinforced Toe",
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { name: "Natural", hex: "#E8E0D0" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    rating: 4.5,
    reviewCount: 119,
    images: [
      createProductImage("#202020", "#c4b896", shoeShape, "LUMA"),
      createProductImage("#292929", "#d4c5a9", shoeShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-flight-jacket-01",
    name: "Flight Bomber Jacket",
    brand: "LUMA",
    price: 320,
    category: "jackets",
    description:
      "Reimagined bomber silhouette in lightweight ripstop nylon with a satin finish. Ribbed collar and cuffs, with two-way zip closure.",
    features: [
      "Ripstop Nylon",
      "Satin Finish",
      "Ribbed Collar & Cuffs",
      "Two-Way Zip",
      "Interior Pocket",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#3A4A30" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 64,
    images: [
      createProductImage("#181818", "#d9ccad", jacketShape, "LUMA"),
      createProductImage("#202020", "#c4b896", jacketShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-wool-overcoat-01",
    name: "Wool Overcoat",
    brand: "LUMA",
    price: 395,
    originalPrice: 450,
    category: "jackets",
    description:
      "Double-breasted overcoat in Italian virgin wool. Structured shoulders with a clean drape. A modern investment piece for cooler months.",
    features: [
      "Italian Virgin Wool",
      "Double-Breasted",
      "Structured Shoulders",
      "Wool Lining",
      "Two Front Pockets",
    ],
    colors: [
      { name: "Camel", hex: "#C4A87A" },
      { name: "Charcoal", hex: "#3A3A3A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 41,
    badge: "limited",
    images: [
      createProductImage("#1a1a1a", "#d4c5a9", jacketShape, "LUMA"),
      createProductImage("#232323", "#c4b896", jacketShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-parka-01",
    name: "Insulated Parka",
    brand: "LUMA",
    price: 365,
    category: "jackets",
    description:
      "Down-filled parka with a water-resistant shell. Removable hood, storm cuffs, and a clean silhouette that avoids bulk.",
    features: [
      "Down Insulation",
      "Water-Resistant Shell",
      "Removable Hood",
      "Storm Cuffs",
      "Internal Media Pocket",
    ],
    colors: [
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 53,
    images: [
      createProductImage("#191919", "#d4c5a9", jacketShape, "LUMA"),
      createProductImage("#222222", "#c4b896", jacketShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-crossbody-01",
    name: "Crossbody Sling",
    brand: "LUMA",
    price: 95,
    category: "bags",
    description:
      "Compact crossbody in ballistic nylon with leather trim. Adjustable strap and multiple compartments for organized carry.",
    features: [
      "Ballistic Nylon",
      "Leather Trim",
      "Adjustable Strap",
      "RFID Pocket",
      "YKK Zippers",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 108,
    images: [
      createProductImage("#1e1e1e", "#c8b999", bagShape, "LUMA"),
      createProductImage("#272727", "#d4c5a9", bagShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-weekender-01",
    name: "Weekender Duffel",
    brand: "LUMA",
    price: 285,
    category: "bags",
    description:
      "Full-grain leather duffel with brass hardware and a detachable shoulder strap. Designed for the perfect weekend escape.",
    features: [
      "Full-Grain Leather",
      "Brass Hardware",
      "Detachable Strap",
      "Shoe Compartment",
      "Canvas Lining",
    ],
    colors: [
      { name: "Cognac", hex: "#8B5E3C" },
      { name: "Noir", hex: "#1A1A1A" },
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 67,
    badge: "new",
    images: [
      createProductImage("#1c1c1c", "#c8b999", bagShape, "LUMA"),
      createProductImage("#252525", "#d4c5a9", bagShape, "LUMA"),
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-mini-clutch-01",
    name: "Mini Leather Clutch",
    brand: "LUMA",
    price: 78,
    category: "bags",
    description:
      "Sleek zip-around clutch in smooth calfskin. Card slots and a note compartment keep essentials organized.",
    features: [
      "Smooth Calfskin",
      "Zip-Around Closure",
      "4 Card Slots",
      "Note Compartment",
      "Gold-Tone Hardware",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Ivory", hex: "#F5F0EB" },
      { name: "Burgundy", hex: "#5A1A2A" },
    ],
    sizes: ["One Size"],
    rating: 4.4,
    reviewCount: 93,
    images: [
      createProductImage("#1f1f1f", "#c8b999", bagShape, "LUMA"),
      createProductImage("#282828", "#d4c5a9", bagShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-field-watch-01",
    name: "Field Explorer Watch",
    brand: "LUMA",
    price: 195,
    category: "watches",
    description:
      "Military-inspired field watch with a 38mm stainless steel case. Swiss quartz movement, luminous indices, and a NATO strap.",
    features: [
      "Swiss Quartz Movement",
      "38mm Stainless Steel",
      "Luminous Indices",
      "NATO Strap",
      "100m Water Resistant",
    ],
    colors: [
      { name: "Sand/Green", hex: "#C4B896" },
      { name: "Black/Black", hex: "#1A1A1A" },
    ],
    sizes: ["38mm"],
    rating: 4.7,
    reviewCount: 134,
    images: [
      createProductImage("#1c1c1c", "#d1c3a2", watchShape, "LUMA"),
      createProductImage("#252525", "#c9a96e", watchShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-minimal-watch-01",
    name: "Minimal Dress Watch",
    brand: "LUMA",
    price: 265,
    category: "watches",
    description:
      "Ultra-thin dress watch with a 36mm case and mesh bracelet. Swiss movement with a sunray dial that shifts with the light.",
    features: [
      "Swiss Quartz Movement",
      "36mm Ultra-Thin Case",
      "Sunray Dial",
      "Mesh Bracelet",
      "Sapphire Crystal",
    ],
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Gold", hex: "#C9A96E" },
    ],
    sizes: ["36mm"],
    rating: 4.8,
    reviewCount: 89,
    badge: "bestseller",
    images: [
      createProductImage("#1d1d1d", "#d1c3a2", watchShape, "LUMA"),
      createProductImage("#262626", "#c9a96e", watchShape, "LUMA"),
    ],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "luma-diver-watch-01",
    name: "Diver Pro Watch",
    brand: "LUMA",
    price: 420,
    category: "watches",
    description:
      "Professional dive watch with 300m water resistance. Unidirectional bezel, helium escape valve, and Super-Luminova indices.",
    features: [
      "Automatic Movement",
      "300m Water Resistant",
      "Unidirectional Bezel",
      "Helium Escape Valve",
      "Super-Luminova",
    ],
    colors: [
      { name: "Black/Steel", hex: "#2A2A2A" },
      { name: "Blue/Steel", hex: "#1B2A4A" },
    ],
    sizes: ["42mm", "44mm"],
    rating: 4.9,
    reviewCount: 56,
    badge: "limited",
    images: [
      createProductImage("#1a1a1a", "#d1c3a2", watchShape, "LUMA"),
      createProductImage("#232323", "#c9a96e", watchShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-leather-belt-01",
    name: "Heritage Leather Belt",
    brand: "LUMA",
    price: 85,
    category: "accessories",
    description:
      "Full-grain Italian leather belt with a brushed stainless steel buckle. Hand-burnished edges for a refined finish.",
    features: [
      "Full-Grain Italian Leather",
      "Brushed Steel Buckle",
      "Hand-Burnished Edges",
      "32mm Width",
      "Gift Box Included",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cognac", hex: "#8B5E3C" },
    ],
    sizes: ["S (28-30)", "M (31-33)", "L (34-36)", "XL (37-40)"],
    rating: 4.6,
    reviewCount: 178,
    images: [
      createProductImage("#1b1b1b", "#c7b896", watchShape, "LUMA"),
      createProductImage("#242424", "#d4c5a9", watchShape, "LUMA"),
    ],
    inStock: true,
  },
  {
    id: "luma-wallet-01",
    name: "Slim Card Wallet",
    brand: "LUMA",
    price: 65,
    category: "accessories",
    description:
      "Ultra-slim bifold wallet in vegetable-tanned leather. Six card slots, a note pocket, and RFID protection. Gets better with age.",
    features: [
      "Vegetable-Tanned Leather",
      "6 Card Slots",
      "RFID Protection",
      "Note Pocket",
      "Slim 8mm Profile",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Natural", hex: "#C4B896" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 203,
    images: [
      createProductImage("#1e1e1e", "#c7b896", bagShape, "LUMA"),
      createProductImage("#272727", "#d4c5a9", bagShape, "LUMA"),
    ],
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew).slice(0, 4);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller).slice(0, 4);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
