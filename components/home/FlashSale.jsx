'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { formatPrice } from '@/lib/constants';
import { ProductIcon, IcFlash } from '@/lib/icons';

// 20 ghante ka countdown — original site jaisa
function useCountdown(hours = 20) {
  const [t, setT] = useState({ h: '00', m: '00', s: '00' });
  const end = useRef(null);

  useEffect(() => {
    end.current = Date.now() + hours * 3600000;
    const tick = () => {
      const d = end.current - Date.now();
      if (d <= 0) return;
      setT({
        h: String(Math.floor(d / 3600000)).padStart(2, '0'),
        m: String(Math.floor((d % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((d % 60000) / 1000)).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hours]);

  return t;
}

function FlashCard({ product }) {
  const { addToCart } = useCart();
  const { setCartOpen } = useUI();
  const [imgFailed, setImgFailed] = useState(false);

  const disc = product.flashSaleDiscount || 30;
  const salePrice = product.originalPrice
    ? Math.round(product.originalPrice * (1 - disc / 100))
    : product.price;

  return (
    <div className="flash-card">
      <div className="flash-card-icon">
        {product.image && !imgFailed ? (
          // tasveer ab poore card ki chaudai leti hai (pehle sirf 60x60 thi)
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : <ProductIcon category={product.category} />}
      </div>

      <p className="flash-card-name">{product.name}</p>

      <div className="flash-price-row">
        {product.originalPrice && (
          <span className="flash-old">{formatPrice(product.originalPrice)}</span>
        )}
        <span className="flash-new">{formatPrice(salePrice)}</span>
        <span className="flash-disc">{disc}% OFF</span>
      </div>

      <button
        className="btn-flash"
        onClick={() => {
          addToCart({ ...product, price: salePrice });
          setCartOpen(true);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default function FlashSale({ products, loading }) {
  const { h, m, s } = useCountdown();

  // FIX: original mein `filter(...) || slice(0,3)` tha — filter hamesha array
  // deta hai (truthy), isliye fallback kabhi chalta hi nahi tha. Ab chalta hai.
  const flashItems = products.filter((p) => p.isFlashSale);
  const shown = (flashItems.length > 0 ? flashItems : products.slice(0, 3)).slice(0, 3);

  return (
    <section className="flash-section">
      <div className="flash-badge"><IcFlash /> Limited Time Offer</div>
      <h2 className="flash-title">
        Flash Sale<br />
        <em style={{ fontStyle: 'italic', color: 'var(--gold-accent)' }}>Up to 40% Off</em>
      </h2>

      <div className="countdown">
        <div className="count-unit">
          <span className="count-num">{h}</span>
          <span className="count-label">Hours</span>
        </div>
        <span className="count-sep">:</span>
        <div className="count-unit">
          <span className="count-num">{m}</span>
          <span className="count-label">Minutes</span>
        </div>
        <span className="count-sep">:</span>
        <div className="count-unit">
          <span className="count-num">{s}</span>
          <span className="count-label">Seconds</span>
        </div>
      </div>

      <div className="flash-products">
        {loading ? (
          <div style={{ color: '#a89b8c', fontSize: '.9rem' }}>Loading flash sale...</div>
        ) : shown.length === 0 ? (
          <p style={{ color: '#a89b8c' }}>No flash sale active</p>
        ) : (
          shown.map((p) => <FlashCard key={p._id} product={p} />)
        )}
      </div>

      <Link
        href="/flash-sale"
        className="btn-primary"
        style={{ display: 'inline-block', marginTop: '2.5rem', background: 'var(--gold-accent)' }}
      >
        View All Deals
      </Link>
    </section>
  );
}
