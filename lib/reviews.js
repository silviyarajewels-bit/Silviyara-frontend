// Original index.html (L1251–1283) ka DEMO_REVIEWS — jaisa ka waisa

export const DEMO_REVIEWS = {
  pendant: [
    { name: 'Priya S.', stars: 5, date: 'Aug 2026', text: 'Absolutely stunning! The moon pendant is delicate and beautiful. Got so many compliments.', verified: true },
    { name: 'Neha R.', stars: 5, date: 'Jul 2026', text: 'Perfect gift for my sister. She loved it! Quality is exactly as described.', verified: true },
  ],
  rings: [
    { name: 'Anjali M.', stars: 5, date: 'Aug 2026', text: 'The twisted band ring fits perfectly and looks so elegant on my finger!', verified: true },
    { name: 'Shreya K.', stars: 4, date: 'Jul 2026', text: 'Really nice quality silver. Exactly what I was looking for.', verified: true },
  ],
  anklets: [
    { name: 'Divya P.', stars: 5, date: 'Aug 2026', text: 'Ordered 3 anklets — they are gorgeous! Great for everyday wear.', verified: true },
    { name: 'Ritu A.', stars: 5, date: 'Jun 2026', text: 'Love the delicate design. Very comfortable to wear daily.', verified: true },
  ],
  bracelets: [
    { name: 'Pooja G.', stars: 5, date: 'Jul 2026', text: 'The charm bracelet is so cute! Great quality, very happy with my purchase.', verified: true },
    { name: 'Megha S.', stars: 5, date: 'Jul 2026', text: 'Beautiful piece, looks exactly like the photo. Fast delivery too!', verified: true },
  ],
  'ear-jewellery': [
    { name: 'Kavya T.', stars: 5, date: 'Aug 2026', text: 'The jhumkas are so pretty! Lightweight and comfortable for all-day wear.', verified: true },
    { name: 'Sunita R.', stars: 5, date: 'Jul 2026', text: 'Bought these for a wedding — everyone asked where I got them from!', verified: true },
  ],
  necklaces: [
    { name: 'Aisha K.', stars: 5, date: 'Aug 2026', text: 'The silver choker is stunning. Perfect weight, not too heavy.', verified: true },
    { name: 'Ritika M.', stars: 4, date: 'Jun 2026', text: 'Beautiful design and great quality for the price.', verified: true },
  ],
  'hair-accessories': [
    { name: 'Swati N.', stars: 5, date: 'Jul 2026', text: 'The floral hair pin is adorable! Great quality silver.', verified: true },
  ],
  default: [
    { name: 'Priya S.', stars: 5, date: 'Aug 2026', text: 'Beautiful quality! Exactly as described. Will definitely order again.', verified: true },
    { name: 'Anjali M.', stars: 5, date: 'Jul 2026', text: 'Wonderful piece, great packaging, fast delivery!', verified: true },
  ],
};

export const getReviews = (category) => DEMO_REVIEWS[category] || DEMO_REVIEWS.default;
export const getAvgRating = () => 4.8;
export const renderStars = (rating) =>
  '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');

// Original L1147–1156 ka PRODUCT_DETAILS
export const PRODUCT_DETAILS = {
  pendant: { weight: '2.1g', size: 'Chain: 18 inch', detail: 'Lobster clasp closure' },
  rings: { weight: '2.8g', size: 'Adjustable / Size 6-9', detail: '925 hallmark engraved inside' },
  anklets: { weight: '3.5g', size: 'Length: 10 inch + 1 inch extender', detail: 'Spring ring clasp' },
  bracelets: { weight: '4.2g', size: 'Length: 7.5 inch + 1 inch extender', detail: 'Spring ring clasp' },
  'ear-jewellery': { weight: '3.6g (pair)', size: 'Drop length: 3-4 cm', detail: 'Push back closure' },
  necklaces: { weight: '6.1g', size: 'Chain: 16–18 inch adjustable', detail: 'Lobster clasp closure' },
  'hair-accessories': { weight: '1.8g', size: 'Standard size', detail: 'French barrette style' },
  default: { weight: '~3g', size: 'Standard', detail: '925 sterling silver' },
};

export const getDetails = (category) => PRODUCT_DETAILS[category] || PRODUCT_DETAILS.default;
