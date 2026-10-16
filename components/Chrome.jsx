'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Navbar from './Navbar';
import MinimalNav from './MinimalNav';
import AccountHeader from './AccountHeader';
import MobileDrawer from './MobileDrawer';
import FlashBanner from './FlashBanner';
import Footer from './Footer';
import MinimalFooter from './MinimalFooter';
import CartSidebar from './CartSidebar';
import WishlistDrawer from './WishlistDrawer';
import AuthModal from './AuthModal';
import ContactModal from './ContactModal';
import CheckoutModal from './CheckoutModal';
import QuickViewModal from './QuickViewModal';
import Chatbot from './Chatbot';
import WhatsAppFloat from './WhatsAppFloat';
import WishlistToast from './WishlistToast';

import { chromeFor } from '@/lib/chromeMap';

/**
 * Site ka "chrome" — navbar, footer aur saare overlays.
 * Pehle ye har HTML page mein copy-paste tha. Ab ek jagah.
 *
 * Kaunse page par kya dikhega, wo lib/chromeMap.js decide karta hai —
 * bilkul waise jaise original HTML files mein tha.
 */
export default function Chrome({ children }) {
  const pathname = usePathname() || '/';
  const { banner, nav, footer, widgets } = chromeFor(pathname);

  // Banner nav ke saath chhupta hai — scroll state yahan
  const [bannerHidden, setBannerHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    if (!banner) return;
    const onScroll = () => {
      const y = window.scrollY;
      setBannerHidden(y > 150 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [banner]);

  // Admin panel ka apna layout hai — usme site ka chrome bilkul nahi aata
  if (pathname.startsWith('/admin')) return <>{children}</>;

  return (
    <>
      {banner && <FlashBanner hidden={bannerHidden} />}

      {nav === 'full' && <Navbar hasBanner={banner} />}
      {nav === 'full' && <MobileDrawer />}
      {nav === 'minimal' && <MinimalNav />}
      {nav === 'none' && <AccountHeader />}

      <main>{children}</main>

      {footer === 'full' && <Footer />}
      {footer === 'minimal' && <MinimalFooter />}

      {widgets ? (
        <>
          <CartSidebar />
          <WishlistDrawer />
          <AuthModal />
          <ContactModal />
          <CheckoutModal />
          <QuickViewModal />
          <Chatbot />
          <WhatsAppFloat />
          <WishlistToast />
        </>
      ) : (
        // Auth modal widgets ke bina bhi chahiye — account page login maangta hai
        <AuthModal />
      )}
    </>
  );
}
