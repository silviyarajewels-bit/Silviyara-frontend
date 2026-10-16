'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { CATEGORIES } from '@/lib/constants';
import { IcClose, IcSearch, IcHome, IcFlash, IcDesign, IcTrack, IcUser, IcSun, IcMoon } from '@/lib/icons';

export default function MobileDrawer() {
  const router = useRouter();
  const { drawerOpen, setDrawerOpen, setContactOpen, openAuth } = useUI();
  const { isLoggedIn } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();
  const [query, setQuery] = useState('');

  const close = () => setDrawerOpen(false);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/shop?search=${encodeURIComponent(q)}`);
      close();
    }
  };

  return (
    <>
      <div
        className={`mobile-drawer-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={close}
      />
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-head">
          <h3>Menu</h3>
          <button className="mobile-drawer-close" onClick={close} aria-label="Close"><IcClose /></button>
        </div>

        <div className="mobile-drawer-body">
          <div style={{ padding: '.75rem 1.5rem 1rem' }}>
            <form className="nav-search" style={{ maxWidth: '100%', display: 'block' }} onSubmit={submitSearch}>
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search jewellery..."
                style={{ width: '100%' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="nav-search-btn" aria-label="Search"><IcSearch /></button>
            </form>
          </div>

          <Link href="/" className="mobile-nav-item" onClick={close} style={{ color: 'var(--text)', fontWeight: 500 }}>
            <IcHome /> Home
          </Link>
          <Link href="/shop" className="mobile-nav-item" onClick={close}>Shop All</Link>

          <div className="mobile-nav-divider">Collections</div>
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={`/shop?cat=${c.key}`} className="mobile-nav-item" onClick={close}>
              {c.label}
            </Link>
          ))}

          <div className="mobile-nav-divider">More</div>
          <Link href="/flash-sale" className="mobile-nav-item" onClick={close}>Flash Sale <IcFlash /></Link>
          <Link href="/custom-design" className="mobile-nav-item" onClick={close}>Custom Design <IcDesign /></Link>
          <Link href="/about" className="mobile-nav-item" onClick={close}>About</Link>
          <a
            href="#"
            className="mobile-nav-item"
            onClick={(e) => { e.preventDefault(); setContactOpen(true); close(); }}
          >
            Contact
          </a>
          <Link href="/track" className="mobile-nav-item" onClick={close}>Track Order <IcTrack /></Link>
          {/* Phone par top bar mein jagah nahi thi, isliye account yahan */}
          <a
            href="/account"
            className="mobile-nav-item"
            onClick={(e) => {
              e.preventDefault();
              close();
              if (isLoggedIn) router.push('/account');
              else openAuth('login');
            }}
          >
            My Account <IcUser />
          </a>

          <div className="mobile-nav-divider">Category</div>
          <Link href="/shop?cat=silver" className="mobile-nav-item" onClick={close} style={{ color: 'var(--gold-accent)' }}>
            ✦ Silver Jewellery
          </Link>
          <a href="#" className="mobile-nav-item" style={{ opacity: 0.45 }} onClick={(e) => e.preventDefault()}>
            Gold Jewellery (Coming Soon)
          </a>
        </div>

        <div className="mobile-drawer-foot">
          <button className="theme-toggle" onClick={toggleTheme}>
            {mounted && theme === 'dark' ? <IcSun /> : <IcMoon />}
          </button>
        </div>
      </div>
    </>
  );
}
