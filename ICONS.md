# Emoji → React Icons

Pehle poori site emoji use karti thi (🔍 📦 ✅ 💎 …). Ab har jagah **react-icons**
ke SVG icons hain.

---

## Sabse pehle — ye chalao

```bash
npm install
```

`react-icons` naya package hai, isliye ek baar install karna zaroori hai.
Uske baad `npm run dev` ya `npm run build` — jaise pehle.

---

## Emoji ki jagah icon kyun?

| | Emoji | React Icons |
|---|---|---|
| Har device par | Windows, iPhone, Android — teeno par alag dikhta tha | Bilkul same |
| Rang | Apna hi rang, theme se match nahi | Theme ka rang le leta hai (dark mode mein bhi sahi) |
| Size | Font par depend | Parent ke font-size se (`1em`) — CSS chhedni nahi padi |
| Quality | Bitmap, zoom par blur | SVG, kitna bhi zoom karo saaf |

---

## Sab kuch ek jagah — `lib/icons.jsx`

Koi bhi icon badalna ho to **sirf yahi file** kholni hai. Poora project isi se
icons uthata hai.

```jsx
export const IcSearch   = FiSearch;       // 🔍
export const IcTrack    = FiMapPin;       // 📍
export const IcWhatsApp = FaWhatsapp;     // 💬  (asli WhatsApp logo)
…
```

Har line ke aage comment mein likha hai ki pehle wahan kaunsa emoji tha.

### Product category icons

```jsx
export const CATEGORY_ICON = {
  'pendant':          GiGemPendant,     // 🔮
  'ear-jewellery':    GiDropEarrings,   // ✨
  'rings':            GiDiamondRing,    // 💍
  'anklets':          GiGemChain,       // 🌿
  'bracelets':        GiPrayerBeads,    // 🪬
  'necklaces':        GiPearlNecklace,  // 📿
  'hair-accessories': GiTiara,          // 🌸
};
```

Use aise karo:

```jsx
<ProductIcon category={product.category} />
```

`ProductIcon` teen tarah se icon dhoondta hai:

1. **category** se (`pendant`, `rings`, …)
2. category na mile to **emoji** se — purane orders ke liye, jinme sirf emoji save tha
3. dono na mile to **heera** (jaise pehle 💎 fallback tha)

Matlab purane orders bhi apne aap sahi icon dikhayenge, DB mein kuch badle bina.

### Order status icons

```jsx
<StatusIcon status={order.status} />   // Pending / Processing / Shipped / …
```

---

## Icon ka size aur rang

`components/IconProvider.jsx` (root layout mein lagaya hua) har icon ko
`size: '1em'` deta hai. Iska matlab:

```css
.value-icon { font-size: 2.5rem; }   /* pehle emoji ko bada karti thi */
                                     /* ab icon ko karti hai — same CSS */
```

**Isliye purani CSS mein kuch badalna nahi pada.**

Rang `currentColor` se aata hai. Jahan emoji rangeen the (jaise "925 Sterling
Silver" wala 🪙) wahan `globals.css` ke last block mein gold rang set kiya hai —
`svg.ricon` class se.

---

## Jahan emoji JAAN-BOOJH KAR chhoda hai

Ye jagah SVG support hi nahi karti, isliye wahan emoji hi rahega:

| Kahan | File | Kyun |
|---|---|---|
| Owner ko naye order ka WhatsApp message | `CheckoutModal.jsx` | WhatsApp plain text leta hai |
| Customer ko order update ka message | `admin/OrdersPanel.jsx` | Same |
| Cart ka "Order via WhatsApp" message | `CartSidebar.jsx` | Same |
| Invoice (naye window mein print hota hai) | `admin/OrdersPanel.jsx` | Wo alag HTML page hai, React nahi chalta |
| Chatbot ke quick-reply ka bheja jaane wala text | `Chatbot.jsx` | Screen par icon dikhta hai, bheja emoji wala text jaata hai — taaki bot ka matching na toote |
| Chatbot ke jawab ka text | `Chatbot.jsx` | Wo message hai, icon nahi |
| Dropdown (`<option>`) ke labels | `admin/OrdersPanel.jsx` | Browser ki dropdown mein sirf plain text ja sakta hai — wahan emoji hata diye |

### Aur ye typography hai, emoji nahi — inhe chhua hi nahi

`✦` (section labels), `★` (star rating), `→` `←` (buttons ke arrow),
`♥` (footer ka "Made with ♥"), `▾` (dropdown ka caret).
Ye har device par same dikhte hain, isliye inhe badalne ki zarurat nahi thi.

---

## Backend mein ek chhota badlav

`silviyara-backend/models/Order.js` — order ke har item mein ab `category` bhi
save hota hai:

```js
items: [{
  name: String,
  price: Number,
  qty: { type: Number, default: 1 },
  emoji: String,                           // WhatsApp message ke liye (pehle jaisa)
  category: { type: String, default: '' }, // ← NAYA: admin panel ka icon isse
  …
}],
```

Ye **purane orders ko nahi todta** — unme `category` khaali rahega aur icon
`emoji` se pehchana jayega.

---

## Icon badalna ho to?

1. https://react-icons.github.io/react-icons/ par icon dhoondo
2. `lib/icons.jsx` mein us set ka import add karo (`fi`, `gi`, `fa6`, `lu`, `tb`)
3. Us line ko badal do — bas, poore project mein badal jayega

Kaun se sets use ho rahe hain:

| Set | Kahan |
|---|---|
| `fi` — Feather | Zyada tar UI icons (search, cart, user, clock…) |
| `gi` — Game Icons | Jewellery icons (pendant, earrings, ring, necklace, tiara, diamond) |
| `fa6` — Font Awesome | WhatsApp ka asli logo, bhara hua dil |
| `lu` — Lucide | Sparkle, handshake |
| `tb` — Tabler | ₹ rupee symbol (admin ka revenue card) |
