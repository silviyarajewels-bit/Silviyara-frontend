'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UIContext';
import { useTheme } from '@/context/ThemeContext';
import { CATEGORIES } from '@/lib/constants';
import { IcSearch, IcTrack, IcUser, IcWishlist, IcCart, IcSun, IcMoon, IcFlash } from '@/lib/icons';

export default function Navbar({ hasBanner = false }) {
  const router = useRouter();
  const { cartCount, wishlist } = useCart();
  const { isLoggedIn } = useAuth();
  const { setCartOpen, setDrawerOpen, setWishlistOpen, setContactOpen, openAuth, drawerOpen } = useUI();
  const { theme, toggleTheme, mounted } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [query, setQuery] = useState('');
  const lastY = useRef(0);

  // Scroll par nav shrink + neeche scroll karne par nav aur banner dono chhup jaana
  // (original index.html L1104–1117 ke thresholds: 60 / 150)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 150 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (e) => {
    e?.preventDefault();
    const q = query.trim();
    if (q) router.push(`/shop?search=${encodeURIComponent(q)}`);
  };

  const onAccountClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) router.push('/account');
    else openAuth('login');
  };

  return (
    <>
      <nav
        id="mainNav"
        className={[
          hasBanner ? '' : 'no-banner',
          scrolled ? 'scrolled' : '',
          hidden && !drawerOpen ? 'nav-hidden' : '',
        ].filter(Boolean).join(' ')}
      >
        <div className="nav-main-row">
          <Link href="/" className="logo">
            Silviyara <span>Jewels</span>
          </Link>

          <form className="nav-search" onSubmit={submitSearch}>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search for pendants, rings, anklets…"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="nav-search-btn" aria-label="Search">
              <IcSearch />
            </button>
          </form>

          <div className="nav-right">
            <Link href="/track" className="nav-icon-btn nav-icon-track" title="Track Order">
              <span className="nav-icon-symbol"><IcTrack /></span>
              <span className="nav-icon-label">Track</span>
            </Link>

            <a
              href="/account"
              className="nav-icon-btn nav-icon-account"
              title="My Account"
              style={{ textDecoration: 'none' }}
              onClick={onAccountClick}
            >
              <span className="nav-icon-symbol"><IcUser /></span>
              <span className="nav-icon-label">Account</span>
            </a>

            <button
              className="nav-icon-btn"
              title="Wishlist"
              onClick={() => setWishlistOpen(true)}
            >
              <span className="nav-icon-symbol"><IcWishlist /></span>
              <span className="nav-icon-label">Wishlist</span>
              {mounted && wishlist.length > 0 && (
                <span className="cart-badge wishlist-badge" style={{ background: '#e74c3c' }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            <button className="nav-icon-btn" onClick={() => setCartOpen(true)} title="Cart">
              <span className="nav-icon-symbol"><IcCart /></span>
              <span className="nav-icon-label">Cart</span>
              {/* khaali cart par gol "0" ka nishaan ajeeb lagta tha — ab sirf saamaan hone par */}
              {mounted && cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* theme toggle shopping actions nahi hai — isliye ek halki lakeer se alag */}
            <span className="nav-divider" aria-hidden="true" />

            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {mounted && theme === 'dark' ? <IcSun /> : <IcMoon />}
            </button>

            <button
              className={`hamburger ${drawerOpen ? 'active' : ''}`}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div className="nav-secondary-row">
          <ul className="nav-links">
            <li className="dropdown">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Shop by Category ▾
              </a>
              <div className="dropdown-menu">
                {CATEGORIES.map((c) => (
                  <Link key={c.key} href={`/shop?cat=${c.key}`}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </li>
            <li><Link href="/shop">Shop All</Link></li>
            <li><Link href="/flash-sale">Flash Sale <IcFlash /></Link></li>
            <li><Link href="/custom-design">Custom Design</Link></li>
            <li><Link href="/about">About</Link></li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setContactOpen(true); }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-category-tabs">
          <Link href="/shop?cat=silver" className="cat-tab active">Silver Jewellery</Link>
          <a href="#" className="cat-tab disabled" onClick={(e) => e.preventDefault()}>
            Gold Jewellery <span className="coming-soon-tag">Soon</span>
          </a>
          <Link href="/shop" className="cat-tab">All Collections</Link>
        </div>
      </nav>
    </>
  );
}
