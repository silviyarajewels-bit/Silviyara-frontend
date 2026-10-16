'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { useProducts } from '@/lib/useProducts';
import { formatPrice, WHATSAPP_NUMBER, FLASH_FALLBACK } from '@/lib/constants';
import { ProductIcon, IcWhatsApp, IcFlash } from '@/lib/icons';

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
  const [failed, setFailed] = useState(false);

  const disc = product.flashSaleDiscount || 30;
  const salePrice = product.price;
  const orig = product.originalPrice || Math.round(product.price / (1 - disc / 100));
  const saved = orig - salePrice;

  return (
    <div className="flash-card">
      <div className="flash-img">
        <span className="disc-badge">{disc}% OFF</span>
        {product.image && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setFailed(true)}
          />
        ) : (
          <span style={{ fontSize: '4.5rem' }}><ProductIcon category={product.category} /></span>
        )}
      </div>

      <div className="flash-body">
        <p className="flash-cat">{(product.category || '').replace('-', ' ')}</p>
        <h3 className="flash-name">{product.name}</h3>
        <div className="flash-prices">
          <span className="price-original">{formatPrice(orig)}</span>
          <span className="price-sale">{formatPrice(salePrice)}</span>
          <span className="price-save">Save {formatPrice(saved)}</span>
        </div>
        <div className="flash-actions">
          <button
            className="btn-cart"
            onClick={() => { addToCart(product); setCartOpen(true); }}
          >
            Add to Cart
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hi! Flash sale order: ${product.name} for \u20B9${salePrice}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
          >
            <IcWhatsApp />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FlashSalePage() {
  const { h, m, s } = useCountdown();
  const { products, loading } = useProducts(undefined, FLASH_FALLBACK);

  // Original: isFlashSale wale, warna pehle 6
  const flash = products.filter((p) => p.isFlashSale);
  const shown = flash.length ? flash : products.slice(0, 6);

  return (
    <>
      <section className="flash-hero">
        <div className="flash-tag"><IcFlash /> Limited Time Only</div>
        <h1>Flash Sale<br /><em>Up to 40% Off</em></h1>
        <p>Exclusive deals on handpicked silver jewellery. Hurry before stock runs out!</p>
        <div className="countdown-wrap">
          <div className="count-unit"><span className="count-num">{h}</span><span className="count-label">Hours</span></div>
          <span className="count-sep">:</span>
          <div className="count-unit"><span className="count-num">{m}</span><span className="count-label">Minutes</span></div>
          <span className="count-sep">:</span>
          <div className="count-unit"><span className="count-num">{s}</span><span className="count-label">Seconds</span></div>
        </div>
      </section>

      <section className="flash-products-section">
        <p className="section-label">✦ Today&apos;s Deals</p>
        <h2 className="section-title">Flash Sale Products</h2>
        <div className="flash-grid">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text2)', gridColumn: '1/-1' }}>
              <p style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1.2rem' }}>Loading deals...</p>
            </div>
          ) : shown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text2)', gridColumn: '1/-1' }}>
              <p style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1.2rem' }}>No deals active right now</p>
            </div>
          ) : (
            shown.map((p) => <FlashCard key={p._id} product={p} />)
          )}
        </div>
      </section>
    </>
  );
}
