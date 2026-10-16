'use client';

import Link from 'next/link';
import { useUI } from '@/context/UIContext';

export default function Footer() {
  const { setContactOpen } = useUI();

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo">
            Silviyara <span style={{ color: 'var(--silver)', fontStyle: 'italic' }}>Jewels</span>
          </Link>
          <p>
            Handpicked sterling silver jewellery from Lucknow. Crafted for the modern woman who
            values elegance and authenticity.
          </p>
        </div>

        <div className="footer-col">
          <h4>Collections</h4>
          <Link href="/shop?cat=pendant">Pendant</Link>
          <Link href="/shop?cat=ear-jewellery">Ear Jewellery</Link>
          <Link href="/shop?cat=rings">Rings</Link>
          <Link href="/shop?cat=anklets">Anklets</Link>
          <Link href="/shop?cat=bracelets">Bracelets</Link>
          <Link href="/shop?cat=necklaces">Necklaces</Link>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link href="/shop">Shop All</Link>
          <Link href="/flash-sale">Flash Sale</Link>
          <Link href="/custom-design">Custom Design</Link>
          <Link href="/about">About Us</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); setContactOpen(true); }}>Contact</a>
          <Link href="/size-guide">Size Guide</Link>
          <Link href="/care-instructions">Care Instructions</Link>
        </div>

        <div className="footer-col">
          <h4>Policies</h4>
          <Link href="/shipping-policy">Shipping Policy</Link>
          <Link href="/return-policy">Return Policy</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/authenticity">Authenticity Guarantee</Link>
          <Link href="/fraud-protection">Fraud Protection</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Silviyara Jewels. All rights reserved.</span>
        <span>Made with ♥ in Lucknow</span>
      </div>
    </footer>
  );
}
