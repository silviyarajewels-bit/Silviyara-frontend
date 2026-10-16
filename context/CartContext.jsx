'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { reconcileCart } from '@/lib/pricing';

const CartContext = createContext(null);

const CART_KEY = 'silviyara_cart';
const WISH_KEY = 'silviyara_wishlist';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);   // wishlist toast (original L1241)
                                              // { text, added } — icon WishlistToast lagata hai

  // localStorage sirf browser mein hota hai — isliye useEffect ke andar
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      const w = JSON.parse(localStorage.getItem(WISH_KEY) || '[]');
      // Purani site ke cart items mein qty nahi hoti thi — yahan default 1 laga dete hain
      setCart(Array.isArray(c) ? c.map((i) => ({ ...i, qty: i.qty || 1 })) : []);
      setWishlist(Array.isArray(w) ? w : []);
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
  }, [cart, loaded]);

  /**
   * Cart ke daam live products se milao (wajah lib/pricing.js mein).
   *
   * Site khulte hi ek baar chalta hai, aur checkout har order se pehle dobara
   * chalata hai. Lautata hai badlavon ki list — khaali = sab theek.
   * API down ho / demo data aaye to cart ko haath nahi lagate.
   */
  const cartRef = useRef(cart);
  cartRef.current = cart;
  const [cartNotice, setCartNotice] = useState([]);

  const syncCart = useCallback(async () => {
    if (!cartRef.current.length) return [];
    let live;
    try {
      const res = await fetch('/api/products');
      if (!res.ok) return [];
      live = await res.json();
    } catch {
      return [];
    }
    if (!Array.isArray(live) || !live.length) return [];

    const { next, changes } = reconcileCart(cartRef.current, live);
    if (changes.length) {
      setCart(next);
      setCartNotice(changes);
    }
    return changes;
  }, []);

  useEffect(() => {
    if (loaded) syncCart();
  }, [loaded, syncCart]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist, loaded]);

  // ── FIX: ab same item dobara add karne par qty badhti hai, duplicate entry nahi banti ──
  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const id = product.id || product._id;
      const idx = prev.findIndex((i) => (i.id || i._id) === id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 1) + qty };
        return next;
      }
      return [
        ...prev,
        {
          id,
          _id: id,
          name: product.name,
          price: product.price,
          emoji: product.emoji || '💎',
          image: product.image || '',
          sku: product.sku || '',
          category: product.category || '',
          qty,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => (i.id || i._id) !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => (i.id || i._id) !== id));
      return;
    }
    setCart((prev) =>
      prev.map((i) => ((i.id || i._id) === id ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product) => {
    const id = product.id || product._id;
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === id);
      setToast({
        added: !exists,
        text: exists
          ? `Removed from wishlist — ${product.name}`
          : `Added to wishlist — ${product.name}`,
      });
      if (exists) return prev.filter((w) => w.id !== id);
      return [...prev, { id, name: product.name }];
    });
  }, []);

  // Toast 2.5s baad apne aap gayab (original jaisa)
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const inWishlist = useCallback(
    (id) => wishlist.some((w) => w.id === id),
    [wishlist]
  );

  // qty ko dhyan mein rakhte hue count aur total
  const cartCount = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        loaded,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        inWishlist,
        cartCount,
        cartTotal,
        syncCart,
        cartNotice,
        clearCartNotice: () => setCartNotice([]),
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
