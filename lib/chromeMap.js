/**
 * ─── Har page par kaunsa chrome dikhta hai ──────────────────────────────────
 *
 * Original site har page par alag chrome use karti thi (aksar bina wajah ke).
 * Ye map wahi exactly copy karta hai — HTML files se verify karke banaya gaya.
 *
 *   banner  : flash sale ka upar wala strip
 *   nav     : 'full'    = 3-row navbar (search, cart, category tabs)
 *             'minimal' = sirf logo + 3 links + theme toggle (track page)
 *             'none'    = page ka apna header (account page)
 *   footer  : 'full'    = 4-column footer
 *             'minimal' = ek line "© 2026 Silviyara Jewels, Lucknow"
 *             'none'    = koi footer nahi
 *   widgets : cart sidebar, wishlist, modals, chatbot, WhatsApp float
 *
 * ✅ FIX: original mein /shop, /product, /flash-sale aur /contact par footer
 *    THA HI NAHI — shop page se koi policy link (shipping, returns, privacy)
 *    tak pahunch hi nahi sakta tha. Ab in chaaron par full footer hai.
 */

const DEFAULT = { banner: false, nav: 'full', footer: 'minimal', widgets: true };

const MAP = {
  '/':                   { banner: true,  nav: 'full',    footer: 'full',    widgets: true },
  '/shop':               { banner: false, nav: 'full',    footer: 'full',    widgets: true },
  '/product':            { banner: false, nav: 'full',    footer: 'full',    widgets: true },
  '/flash-sale':         { banner: false, nav: 'full',    footer: 'full',    widgets: true },
  '/custom-design':      { banner: false, nav: 'full',    footer: 'full',    widgets: true },
  '/contact':            { banner: false, nav: 'full',    footer: 'full',    widgets: true },
  '/about':              { banner: false, nav: 'full',    footer: 'minimal', widgets: true },
  '/faq':                { banner: false, nav: 'full',    footer: 'minimal', widgets: false },
  '/track':              { banner: false, nav: 'minimal', footer: 'none',    widgets: false },
  '/account':            { banner: false, nav: 'none',    footer: 'none',    widgets: false },

  // Policy pages — sab ek jaise
  '/terms':              DEFAULT,
  '/privacy-policy':     DEFAULT,
  '/return-policy':      DEFAULT,
  '/shipping-policy':    DEFAULT,
  '/size-guide':         DEFAULT,
  '/care-instructions':  DEFAULT,
  '/authenticity':       DEFAULT,
  '/fraud-protection':   DEFAULT,
};

export function chromeFor(pathname) {
  return MAP[pathname] || DEFAULT;
}
