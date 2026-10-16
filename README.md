# Silviyara Jewels — Next.js Frontend

Purani HTML site ka Next.js version. **Sirf frontend.**

Backend aapka purana Express wala (`Silviyara_website/server.js` + `routes/` + `models/`) hi chalta rahega — usme ek line bhi change nahi hui.

UI, theme, colors, fonts, spacing — sab exactly wahi hain.

---

## Architecture

```
Browser  →  Next.js (:4000)  →  Express (:3000)  →  MongoDB
             frontend            aapka purana        wahi data
                                  backend
```

Frontend ka saara code `fetch('/api/products')` jaise **relative path** use karta hai — bilkul jaise purani site mein tha. Next.js un requests ko chupke se Express par forward kar deta hai (`next.config.mjs` mein `rewrites`).

Iska matlab:

- Backend ka URL frontend code mein kahin likha hi nahi — ek jagah (`.env.local`) badlo, bas
- **CORS ki koi dikkat nahi** — browser ke liye sab ek hi origin hai
- Express backend bilkul untouched — purani site bhi saath mein chalti rahegi

---

## Chalane ke steps

### 1. Backend chalao (purana project)

```bash
cd D:\Persenol\Silviyara_website
node server.js
```
→ port 3000 par chalega

### 2. Frontend chalao (ye project) — naya terminal

```bash
cd D:\Persenol\silviyara-next
npm install
```

**Phir 2 files copy karo purane project se** (badi thi isliye zip mein nahi bheji):

| Kya | Kahan se | Kahan |
|---|---|---|
| `images/` folder | `Silviyara_website\public\images\` | `silviyara-next\public\images\` |
| `silver-bg.mp4` | `Silviyara_website\public\` | `silviyara-next\public\` |

**Fir `.env.local` banao:**

```bash
copy .env.example .env.local
```

Usme bas ek line hai:
```
BACKEND_URL=http://localhost:3000
```

**Ab chalao:**

```bash
npm run dev -- -p 4000
```

→ http://localhost:4000

> Port 4000 isliye kyunki 3000 par Express chal raha hai.

---

## Kya ban chuka hai

| | |
|---|---|
| `app/globals.css` | Poora design system — 572 CSS rules, purani site ke 5 pages se nikale, duplicates hataye |
| `fonts/` | Playfair Display + DM Sans, self-hosted (Google se request nahi jaati) |
| `context/` | Theme, Cart, Auth, UI (modals) — 4 providers |
| `components/` | Navbar, MobileDrawer, Footer, CartSidebar, WishlistDrawer, AuthModal, ContactModal, CheckoutModal, Chatbot, WhatsAppFloat, ProductCard, QuickViewModal |
| `app/page.js` | **Homepage — pura** |

**Baaki pages abhi banne hain:** shop, product, account, track, flash-sale, custom-design, 13 policy pages, admin panel.

---

## Sabse bada structural fayda

Pehle navbar / cart / auth modal / checkout ka code **3 files mein copy-paste** tha (`index.html`, `shop.html`, `product.html`). Auth modal to byte-identical tha. Ek button badalna ho to 3 jagah edit karna padta tha.

Ab `components/Navbar.jsx` mein ek baar change karo → poori site par lag jata hai.

---

## Frontend ke bugs jo is version mein fix ho gaye

Ye sab **frontend** ke bugs the, isliye rewrite mein apne aap theek ho gaye:

**1. Cart mein quantity thi hi nahi**
`cart.push({...})` — na `qty` field na dedupe. Same item 2 baar add karo to 2 alag entries banti thi. Customer 3 rings select kare to order mein 1 hi jata tha.
→ `context/CartContext.jsx` mein proper qty, cart mein +/− buttons

**2. Search kaam nahi karta tha**
Navbar `/shop?search=` par bhejta tha, par `shop.html` sirf `cat` param padhta tha — har search unfiltered catalogue par land karta tha.
→ ab `search` param handle hoga (shop page banne par)

**3. Flash sale ka fallback dead code tha**
`filter(...) || slice(0,3)` — `filter` hamesha array (truthy) deta hai, to `||` kabhi chalta hi nahi tha.
→ ab length check karke sahi fallback (`components/home/FlashSale.jsx`)

**4. Shop page ka 2-second timeout**
`index.html` 8s use karta tha, `shop.html` sirf 2s. Vercel cold start par 2s kam padta tha — fake demo products dikh jate the jinke fake IDs par customer payment kar sakta tha.
→ dono jagah 8s (`lib/useProducts.js`)

**5. Newsletter fake tha**
Sirf `alert('Subscribed!')` — email kahin save hi nahi hoti thi.
→ ab actually `POST /api/contact` par jaati hai

**6. Homepage par `hair-accessories` filter button missing tha**
Baaki 6 categories the, ye nahi. Us category ka product homepage se filter hi nahi ho sakta tha.
→ ab saari 7 categories

**7. XSS hole `shop.html:792`**
`onclick="addToCart('${p.name}', ...)"` — product name escape nahi hota tha. `Women's Ring` naam ka product button tod deta tha.
→ React mein ye problem structurally hoti hi nahi

---

## ⚠️ Backend ke bugs — ye abhi bhi hain

Ye aapke Express backend mein hain. Maine backend chhua nahi, isliye **ye abhi bhi live hain**:

**1. 🔴 Har customer ko SAB customers ke orders dikhte hain**
`routes/orders.js:88` — JWT payload mein email hai hi nahi, to Mongoose query
`{$or: [{customerId}, {}]}` ban jaati hai. MongoDB mein `{}` **saare documents** se
match karta hai. Koi bhi logged-in customer poore database ke orders dekh sakta hai —
naam, phone, pura address, PIN.

**2. 🔴 Admin API par koi auth nahi**
`GET /api/orders`, `GET /api/contact`, `POST/PUT/DELETE /api/products`,
`PUT /api/orders/:id` — koi bhi bina token ke call kar sakta hai.

**3. 🔴 Secrets code mein hardcoded**
`routes/admin.js:4-6` aur `routes/auth.js:7` — JWT secret, admin username/password,
admin token. GitHub par public hain.

**4. 🟠 `customerId` client se aata hai**
`routes/orders.js` — order banate waqt body se liya jata hai, koi bhi kisi aur ka
ID bhej sakta hai.

**5. 🟠 `memoryOrders is not defined`**
`routes/orders.js:105` — ye variable poore repo mein kahin declare hi nahi hai.
DB down hone par ReferenceError.

> Ye 5 fixes purane Express backend mein alag se kar sakte hain — files chhoti hain,
> ~1 session ka kaam hai. Bolna ho to bata dena.

---

## UI verification

Dono versions ke screenshots leke measure kiya:

| Element | Original | Next.js |
|---|---|---|
| nav position | top 26px, height 133px | **same** ✅ |
| nav secondary row | top 82px | **same** ✅ |
| category tabs | top 118px | **same** ✅ |
| hero section | 900px | **same** ✅ |
| product cards | 8 | 8 ✅ |

---

## Ek cheez jo maine ADD ki hai

Cart mein **quantity +/− buttons**. Original cart mein quantity ka concept hi nahi tha — ye bug #1 ka fix hai. Design site ke apne tokens se banaya hai, alag nahi lagta.

Nahi chahiye to `components/CartSidebar.jsx` mein `qty-control` wala div hata dena. Iske alawa UI mein kuch nahi badla.

---

## Deploy

Do alag cheezein deploy hongi:

1. **Express backend** — jaise abhi deploy karte ho (`vercel.json` ke saath)
2. **Ye frontend** — alag Vercel project, usme sirf ek env var:
   `BACKEND_URL=https://aapka-express-url.vercel.app`

Frontend ko `MONGODB_URI` ya kisi secret ki zarurat nahi — wo database ko kabhi touch nahi karta.
