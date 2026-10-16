// Site-wide constants — ek jagah, taaki 3 files mein badalna na pade

export const WHATSAPP_NUMBER = '918004703038';
export const WHATSAPP_DISPLAY = '+91 8004703038';

/**
 * Har category ka `emoji` ab SCREEN par nahi dikhta — screen par icon aata hai
 * (dekho lib/icons.jsx ka CATEGORY_ICON).
 *
 * Ye emoji sirf DATA ke liye rakhe hain:
 *   • naye order ke saath DB mein save hote hain
 *   • WhatsApp message mein jaate hain (wahan SVG nahi chal sakta)
 *   • purane orders/products isi se pehchane jaate hain
 */
export const CATEGORIES = [
  { key: 'pendant', label: 'Pendant', emoji: '🔮' },
  { key: 'ear-jewellery', label: 'Ear Jewellery', emoji: '✨' },
  { key: 'rings', label: 'Rings', emoji: '💍' },
  { key: 'anklets', label: 'Anklets', emoji: '🌿' },
  { key: 'bracelets', label: 'Bracelets', emoji: '🪬' },
  { key: 'necklaces', label: 'Necklaces', emoji: '📿' },
  { key: 'hair-accessories', label: 'Hair Accessories', emoji: '🌸' },
];

// Category → emoji. UI mein iski jagah ab CATEGORY_ICON use hota hai
// (lib/icons.jsx), par WhatsApp message aur DB ke liye ye zaroori hai.
export const CATEGORY_EMOJI = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.emoji])
);

export const FREE_SHIPPING_ABOVE = 999;

// API down / khaali hone par yahi products dikhte hain (original site jaisa hi)
export const FALLBACK_PRODUCTS = [
  { _id: 'demo-1', name: 'Moon Pendant', category: 'pendant', price: 1299, originalPrice: 1800, emoji: '🔮', badge: 'New', inStock: true, image: '/images/pendant.png', isDemo: true },
  { _id: 'demo-2', name: 'Jhumka Earrings', category: 'ear-jewellery', price: 899, emoji: '✨', badge: 'Bestseller', inStock: true, image: '/images/ear-jewellery.png', isDemo: true },
  { _id: 'demo-3', name: 'Twisted Band Ring', category: 'rings', price: 699, originalPrice: 999, emoji: '💍', badge: 'Sale', inStock: true, image: '/images/rings.png', isFlashSale: true, isDemo: true },
  { _id: 'demo-4', name: 'Silver Anklet Chain', category: 'anklets', price: 599, emoji: '🌿', inStock: true, image: '/images/anklets.png', isDemo: true },
  { _id: 'demo-5', name: 'Charm Bracelet', category: 'bracelets', price: 1099, emoji: '🪬', badge: 'New', inStock: true, image: '/images/bracelets.png', isFlashSale: true, isDemo: true },
  { _id: 'demo-6', name: 'Silver Choker', category: 'necklaces', price: 1499, originalPrice: 1999, emoji: '📿', badge: 'Sale', inStock: true, image: '/images/necklaces.png', isFlashSale: true, isDemo: true },
  { _id: 'demo-7', name: 'Floral Hair Pin', category: 'hair-accessories', price: 399, emoji: '🌸', inStock: true, image: '/images/hair-accessories.png', isDemo: true },
  { _id: 'demo-8', name: 'Lotus Pendant', category: 'pendant', price: 999, emoji: '🔮', badge: 'Featured', inStock: true, image: '/images/pendant.png', isDemo: true },
];

// ── Page-specific demo fallbacks ────────────────────────────────────────────
// Original site ke har page ka apna demo fallback tha (naam aur prices alag).
// API down ho to bilkul wahi dikhega jo pehle dikhta tha.

// shop.html se — 6 products, alag naam ("Set", "Layered")
export const SHOP_FALLBACK = [
  { _id: '1', name: 'Moon Pendant',        category: 'pendant',       price: 1299, originalPrice: 1800, inStock: true, badge: 'New',        emoji: '🔮', image: '/images/pendant.png',       isDemo: true },
  { _id: '2', name: 'Jhumka Earrings Set', category: 'ear-jewellery', price: 899,                       inStock: true, badge: 'Bestseller', emoji: '✨', image: '/images/ear-jewellery.png', isDemo: true },
  { _id: '3', name: 'Twisted Band Ring',   category: 'rings',         price: 699,  originalPrice: 999,  inStock: true, badge: 'Sale',       emoji: '💍', image: '/images/rings.png',         isDemo: true },
  { _id: '4', name: 'Layered Anklet',      category: 'anklets',       price: 599,                       inStock: true,                      emoji: '🌿', image: '/images/anklets.png',       isDemo: true },
  { _id: '5', name: 'Charm Bracelet',      category: 'bracelets',     price: 1099,                      inStock: true, badge: 'New',        emoji: '🪬', image: '/images/bracelets.png',     isDemo: true },
  { _id: '6', name: 'Choker Set',          category: 'necklaces',     price: 1499, originalPrice: 1999, inStock: true, badge: 'Sale',       emoji: '📿', image: '/images/necklaces.png',     isDemo: true },
];

// flash-sale.html se — pehle se discount lage hue prices
export const FLASH_FALLBACK = [
  { _id: '1', name: 'Moon Pendant',        category: 'pendant',       price: 1080, originalPrice: 1800, flashSaleDiscount: 40, isFlashSale: true, emoji: '🔮', image: '/images/pendant.png',       isDemo: true },
  { _id: '2', name: 'Jhumka Earrings Set', category: 'ear-jewellery', price: 629,  originalPrice: 899,  flashSaleDiscount: 30, isFlashSale: true, emoji: '✨', image: '/images/ear-jewellery.png', isDemo: true },
  { _id: '3', name: 'Twisted Band Ring',   category: 'rings',         price: 489,  originalPrice: 699,  flashSaleDiscount: 30, isFlashSale: true, emoji: '💍', image: '/images/rings.png',         isDemo: true },
  { _id: '4', name: 'Layered Anklet',      category: 'anklets',       price: 419,  originalPrice: 599,  flashSaleDiscount: 30, isFlashSale: true, emoji: '🌿', image: '/images/anklets.png',       isDemo: true },
  { _id: '5', name: 'Charm Bracelet',      category: 'bracelets',     price: 769,  originalPrice: 1099, flashSaleDiscount: 30, isFlashSale: true, emoji: '🪬', image: '/images/bracelets.png',     isDemo: true },
  { _id: '6', name: 'Choker Set',          category: 'necklaces',     price: 1049, originalPrice: 1499, flashSaleDiscount: 30, isFlashSale: true, emoji: '📿', image: '/images/necklaces.png',     isDemo: true },
];

export const formatPrice = (n) =>
  '₹' + Number(n || 0).toLocaleString('en-IN');
