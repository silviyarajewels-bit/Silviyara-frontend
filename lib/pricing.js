/**
 * ─── Cart ke daam ko live products se milana ────────────────────────────────
 *
 * Cart har item ka daam ADD karte waqt localStorage mein save kar leta hai.
 * Baad mein admin daam badal de ya flash sale khatam ho jaye, to cart purana
 * daam hi dikhata rehta tha — aur backend order reject kar deta tha. Customer
 * "refresh" karta, par cart wahi rehta. Phansa reh jaata.
 *
 * ⚠️ lowestPrice() ka formula backend ke silviyara-backend/lib/pricing.js se
 *    BILKUL match hona chahiye. Ek jagah badlo to doosri jagah bhi badlo,
 *    warna har order "daam badal gaya" bol kar reject hoga.
 */

export function lowestPrice(p) {
  let min = p.price;
  if (p.isFlashSale && p.originalPrice) {
    const disc = p.flashSaleDiscount || 30;
    min = Math.min(min, Math.round(p.originalPrice * (1 - disc / 100)));
  }
  return min;
}

const isObjectId = (s) => /^[a-f0-9]{24}$/i.test(String(s || ''));

/**
 * Cart ko live products ke hisaab se theek karo.
 *   • Jo product ab nahi hai / out of stock hai → hata do
 *   • Daam sahi range se bahar ho → server jaisa hi clamp karo
 *   • Demo id (demo-1, '3') wale item ko asli product ki id do
 *
 * Lautata hai { next, changes } — changes customer ko dikhane wali lines hain.
 */
export function reconcileCart(cart, live) {
  const changes = [];
  const next = [];

  for (const item of cart) {
    const id = item.id || item._id;
    const p = isObjectId(id)
      ? live.find((x) => x._id === id)
      : live.find((x) => x.name === item.name);

    if (!p) {
      changes.push(`"${item.name}" ab available nahi hai — cart se hata diya`);
      continue;
    }
    if (p.inStock === false) {
      changes.push(`"${p.name}" abhi out of stock hai — cart se hata diya`);
      continue;
    }

    const min = lowestPrice(p);
    const old = Number(item.price);
    const price = Math.min(Math.max(Number.isFinite(old) ? old : p.price, min), p.price);
    if (price !== old) {
      changes.push(`"${p.name}" ka daam ₹${old} se ₹${price} ho gaya`);
    }

    // Demo aur asli item ek hi product ban jaayein to qty jod do
    const dup = next.find((x) => x.id === p._id);
    if (dup) {
      dup.qty += item.qty || 1;
      continue;
    }

    next.push({
      ...item,
      id: p._id,
      _id: p._id,
      name: p.name,
      price,
      sku: p.sku || '',
      image: p.image || item.image || '',
      category: p.category || '',
      qty: item.qty || 1,
    });
  }

  return { next, changes };
}
