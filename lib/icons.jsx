'use client';

/**
 * ─── Silviyara — Icons ────────────────────────────────────────────────────────
 *
 * Pehle poori site emoji use karti thi (🔍 📦 ✅ 💎 ...). Dikkat ye thi ki emoji
 * har device par alag dikhte hain — Windows par ek tarah, iPhone par doosri,
 * Android par teesri. Colour bhi apna hi hota hai, theme ke saath match nahi karta.
 *
 * Ab har jagah react-icons ke SVG icons hain. Fayda:
 *   • Har browser/device par bilkul same
 *   • Rang khud theme se le lete hain (currentColor) — dark mode mein bhi sahi
 *   • Size parent ke font-size se aata hai (default 1em) — CSS chhedni nahi padi
 *
 * ⚠️ Yahan sirf DIKHNE WALE icons hain. Jo emoji WhatsApp message, invoice ke
 *    HTML ya chatbot ke text mein jaate hain wo waise ke waise emoji hi rahenge —
 *    unhe SVG se replace nahi kiya ja sakta (WhatsApp SVG nahi samajhta).
 *
 * Ek hi jagah se aate hain, to kabhi icon badalna ho to sirf yahi file chhedni hai.
 */

import {
  FiSearch, FiMapPin, FiUser, FiUserCheck, FiShoppingCart, FiShoppingBag,
  FiHeart, FiSun, FiMoon, FiX, FiMenu, FiHome, FiZap, FiMessageCircle,
  FiPhone, FiMail, FiLogOut, FiLock, FiRefreshCw, FiCheck, FiCheckCircle,
  FiXCircle, FiClock, FiSettings, FiTruck, FiRotateCcw, FiPackage, FiGift,
  FiCreditCard, FiFileText, FiCopy, FiPaperclip, FiUploadCloud, FiImage,
  FiEdit3, FiAlertTriangle, FiShield, FiCamera, FiSlash, FiAward,
  FiBarChart2, FiPlusCircle, FiPenTool, FiGrid, FiList,
} from 'react-icons/fi';

import { FaWhatsapp, FaHeart } from 'react-icons/fa6';
import { LuSparkles, LuHandshake } from 'react-icons/lu';
import { TbCurrencyRupee } from 'react-icons/tb';

import {
  GiGemPendant, GiDropEarrings, GiDiamondRing, GiGemChain, GiPrayerBeads,
  GiPearlNecklace, GiTiara, GiCutDiamond, GiCoins,
  GiPartyPopper, GiFlowerEmblem, GiLinkedRings,
} from 'react-icons/gi';

/* ─── Navbar / header ─────────────────────────────────────────────────────── */
export const IcSearch    = FiSearch;        // 🔍
export const IcTrack     = FiMapPin;        // 📍
export const IcUser      = FiUser;          // 👤
export const IcWishlist  = FiHeart;         // ♡
export const IcWishlistOn = FaHeart;        // ❤️  (bhara hua — wishlist mein hai)
export const IcCart      = FiShoppingCart;  // 🛒
export const IcSun       = FiSun;           // ☀️
export const IcMoon      = FiMoon;          // 🌙
export const IcMenu      = FiMenu;          // ☰
export const IcClose     = FiX;             // ✕
export const IcHome      = FiHome;          // 🏠
export const IcFlash     = FiZap;           // ⚡
export const IcDesign    = FiPenTool;       // 🎨  (chhote size par bhi saaf dikhta hai)
export const IcLogout    = FiLogOut;        // 🚪
export const IcLock      = FiLock;          // 🔐

/* ─── Contact / support ───────────────────────────────────────────────────── */
export const IcWhatsApp  = FaWhatsapp;      // 💬 (WhatsApp wale buttons — asli logo)
export const IcChat      = FiMessageCircle; // 💬 (aam chat/support)
export const IcPhone     = FiPhone;         // 📞
export const IcMail      = FiMail;          // ✉ 📧
export const IcSparkle   = LuSparkles;      // ✨

/* ─── Order status ────────────────────────────────────────────────────────── */
export const IcClock      = FiClock;        // 🕐 ⏳
export const IcProcessing = FiSettings;     // ⚙️
export const IcShipped    = FiTruck;        // 🚚
export const IcDelivered  = FiCheckCircle;  // ✅
export const IcCancelled  = FiXCircle;      // ❌
export const IcPacked     = FiPackage;      // 📬
export const IcCheck      = FiCheck;        // ✓
export const IcSuccess    = FiCheckCircle;  // ✅
export const IcError      = FiXCircle;      // ❌

/* ─── Product / trust badges ──────────────────────────────────────────────── */
export const IcSilver    = GiCoins;         // 🪙  925 sterling silver
export const IcShipping  = FiPackage;       // 📦  free delivery
export const IcReturns   = FiRotateCcw;     // ↩️  easy returns
export const IcAward     = FiAward;         // 🏅  hallmark / guarantee
export const IcShield    = FiShield;        // 🛡️
export const IcAlert     = FiAlertTriangle; // ⚠️ 🚨
export const IcCamera    = FiCamera;        // 📸
export const IcBlocked   = FiSlash;         // 🚫
export const IcHandshake = LuHandshake;     // 🤝
export const IcDiamond   = GiCutDiamond;    // 💎

/* ─── Checkout / payment ──────────────────────────────────────────────────── */
export const IcCard      = FiCreditCard;    // 💳
export const IcCod       = FiHome;          // 🏠  cash on delivery
export const IcGift      = FiGift;          // 🎁 💝
export const IcRupee     = TbCurrencyRupee; // 💰

/* ─── Admin panel ─────────────────────────────────────────────────────────── */
export const IcDashboard = FiBarChart2;     // 📊
export const IcProducts  = FiShoppingBag;   // 🛍
export const IcOrders    = FiPackage;       // 📦
export const IcNewOrders = FiPlusCircle;    // 🆕
export const IcRefresh   = FiRefreshCw;     // 🔄
export const IcInvoice   = FiFileText;      // 📄
export const IcCopy      = FiCopy;          // 📋
export const IcAttach    = FiPaperclip;     // 📎
export const IcUpload    = FiUploadCloud;   // 📁
export const IcImage     = FiImage;         // 🖼️
export const IcFile      = FiFileText;      // 📄
export const IcEdit      = FiEdit3;         // ✏️ ✍️
export const IcExpert    = FiUserCheck;     // 👨‍🎨

/* ─── Gifting occasions (home page) ───────────────────────────────────────── */
export const IcBirthday    = FiGift;         // 💝
export const IcAnniversary = GiDiamondRing;  // 💍
export const IcWedding     = GiLinkedRings;  // 👰
export const IcFestive     = GiPartyPopper;  // 🎉
export const IcFriendship  = GiFlowerEmblem; // 🌸
export const IcRing        = GiDiamondRing;  // 💍  (chatbot quick reply)
export const IcGridView    = FiGrid;         // ⊞  shop ka grid view
export const IcListView    = FiList;         // ☰  shop ka list view

/* ─── Product categories ──────────────────────────────────────────────────── *
 *
 * Pehle har product ke saath ek emoji DB mein save hota tha (product.emoji).
 * Ab icon category se aata hai — matlab purane orders/products bhi apne aap
 * sahi icon dikhayenge, DB mein kuch badalne ki zarurat nahi.
 *
 * DB ka `emoji` field waise hi pada rahega (WhatsApp message mein use hota hai).
 */
export const CATEGORY_ICON = {
  'pendant':          GiGemPendant,     // 🔮
  'ear-jewellery':    GiDropEarrings,   // ✨
  'rings':            GiDiamondRing,    // 💍
  'anklets':          GiGemChain,       // 🌿
  'bracelets':        GiPrayerBeads,    // 🪬
  'necklaces':        GiPearlNecklace,  // 📿
  'hair-accessories': GiTiara,          // 🌸

  // Chatbot ka apna chhota catalog thode alag naam use karta hai
  'pendants':  GiGemPendant,
  'earrings':  GiDropEarrings,
  'hair':      GiTiara,
};

/**
 * Purane orders ke liye — un items mein sirf emoji save hua tha, category nahi.
 * Isse wo bhi sahi icon dikhate hain, DB chhede bina.
 */
const EMOJI_ICON = {
  '🔮': GiGemPendant,
  '✨': GiDropEarrings,
  '💍': GiDiamondRing,
  '🌿': GiGemChain,
  '🪬': GiPrayerBeads,
  '🧿': GiPrayerBeads,
  '📿': GiPearlNecklace,
  '🌸': GiTiara,
  '💎': GiCutDiamond,
};

/**
 * Kisi bhi product ka icon.
 *   1. Pehle category dekhta hai
 *   2. Category na ho (purane order items) to emoji se pehchanta hai
 *   3. Warna heera — jaise pehle 💎 fallback tha
 *
 *   <ProductIcon category={product.category} />
 *   <ProductIcon category={item.category} emoji={item.emoji} />
 */
export function ProductIcon({ category, emoji, ...rest }) {
  const Icon = CATEGORY_ICON[category] || EMOJI_ICON[emoji] || GiCutDiamond;
  return <Icon {...rest} />;
}

/**
 * Order ka status icon — "Pending", "Shipped" waghairah.
 *
 *   <StatusIcon status={order.status} />
 */
export const STATUS_ICON = {
  pending:    FiClock,
  processing: FiSettings,
  shipped:    FiTruck,
  delivered:  FiCheckCircle,
  cancelled:  FiXCircle,
};

export function StatusIcon({ status, ...rest }) {
  const Icon = STATUS_ICON[String(status || '').toLowerCase()] || FiClock;
  return <Icon {...rest} />;
}
