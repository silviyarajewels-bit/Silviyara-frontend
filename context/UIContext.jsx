'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const UIContext = createContext(null);

/**
 * Saare overlays (cart, drawer, modals) ek jagah se control hote hain.
 * Purani site mein ye openCart() / closeCart() jaise global functions the —
 * ab React state hai, par behaviour bilkul same.
 */
export function UIProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [contactOpen, setContactOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);

  const anyOpen =
    cartOpen || drawerOpen || wishlistOpen || authOpen || contactOpen || checkoutOpen || !!quickView;

  // Koi overlay khula ho to background scroll band — jaisa original site mein tha
  useEffect(() => {
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [anyOpen]);

  // Escape dabane par sabse upar wala overlay band ho
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (quickView) return setQuickView(null);
      if (checkoutOpen) return setCheckoutOpen(false);
      if (authOpen) return setAuthOpen(false);
      if (contactOpen) return setContactOpen(false);
      if (wishlistOpen) return setWishlistOpen(false);
      if (cartOpen) return setCartOpen(false);
      if (drawerOpen) return setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [quickView, checkoutOpen, authOpen, contactOpen, wishlistOpen, cartOpen, drawerOpen]);

  const openAuth = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const value = {
    cartOpen, setCartOpen,
    drawerOpen, setDrawerOpen,
    wishlistOpen, setWishlistOpen,
    authOpen, setAuthOpen, authMode, setAuthMode, openAuth,
    contactOpen, setContactOpen,
    checkoutOpen, setCheckoutOpen,
    quickView, setQuickView,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
