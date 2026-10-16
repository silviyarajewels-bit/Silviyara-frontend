'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { formatPrice, WHATSAPP_NUMBER, FALLBACK_PRODUCTS } from '@/lib/constants';
import {
  ProductIcon, IcDiamond, IcSparkle, IcSilver, IcShipping, IcReturns, IcWhatsApp,
} from '@/lib/icons';

const DEMO = {
  _id: 'demo',
  name: 'Moon Pendant',
  category: 'pendant',
  price: 1299,
  originalPrice: 1800,
  description:
    'A beautiful handcrafted sterling silver pendant featuring a crescent moon design. Perfect for everyday wear or as a thoughtful gift.',
  inStock: true,
  badge: 'New',
};

function ProductContent() {
  const params = useSearchParams();
  const id = params.get('id');

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [imgFailed, setImgFailed] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [thumbFailed, setThumbFailed] = useState(false);

  const { addToCart } = useCart();
  const { setCartOpen } = useUI();

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    // FIX: original 2s use karta tha — Vercel cold start par kam padta tha
    const timer = setTimeout(() => controller.abort(), 8000);

    (async () => {
      let p = null;
      try {
        if (id) {
          const r = await fetch(`/api/products/${id}`, { signal: controller.signal });
          if (r.ok) {
            const data = await r.json();
            if (data && data.name) p = data;
          }
        }
      } catch (e) {}
      if (!cancelled) {
        // API fail ho to demo products mein se dhundo, warna default
        setProduct(p || FALLBACK_PRODUCTS.find((x) => x._id === id) || DEMO);
        setLoading(false);
      }
      clearTimeout(timer);
    })();

    return () => { cancelled = true; clearTimeout(timer); controller.abort(); };
  }, [id]);

  useEffect(() => {
    if (product?.name) document.title = `${product.name} — Silviyara Jewels`;
  }, [product]);

  if (loading || !product) {
    return (
      <section className="product-section">
        <p className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span>Product</span>
        </p>
        <div className="product-layout">
          <div className="product-visual">
            <div className="main-img"><IcDiamond /></div>
          </div>
          <div className="product-info">
            <p style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1.2rem', color: 'var(--text2)' }}>
              Loading product...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const disc = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const showImg = product.image && !imgFailed;

  const handleAdd = () => {
    addToCart(product, qty);
    setCartOpen(true);
  };

  return (
    <section className="product-section">
      <p className="breadcrumb">
        <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span>{product.name}</span>
      </p>

      <div className="product-layout">
        <div className="product-visual">
          <div className="main-img">
            {showImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgFailed(true)}
              />
            ) : (
              <span style={{ fontSize: '10rem' }}><ProductIcon category={product.category} /></span>
            )}
          </div>

          <div className="thumb-row">
            {[showImg && !thumbFailed ? 'img' : 'cat', 'sparkle', 'diamond'].map((t, i) => (
              <div
                key={i}
                className={`thumb ${activeThumb === i ? 'active' : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                {t === 'img' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setThumbFailed(true)}
                  />
                ) : t === 'cat' ? (
                  <ProductIcon category={product.category} />
                ) : t === 'sparkle' ? (
                  <IcSparkle />
                ) : (
                  <IcDiamond />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="product-cat">{(product.category || '').replace('-', ' ')}</p>
          <h1 className="product-name">{product.name}</h1>

          <div className="product-price-block">
            <span className="price-main">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="price-orig">{formatPrice(product.originalPrice)}</span>
                <span className="price-disc">{disc}% OFF</span>
              </>
            )}
          </div>

          <p className="product-desc">
            {product.description ||
              'A beautiful handcrafted piece from our sterling silver collection. Each item is carefully selected for quality and design.'}
          </p>

          <div className="product-features">
            <div className="feature-item"><span className="feature-icon"><IcSilver /></span><span>925 Sterling Silver — Hallmarked &amp; Certified</span></div>
            <div className="feature-item"><span className="feature-icon"><IcShipping /></span><span>Free delivery above ₹999 — 3 to 5 days</span></div>
            <div className="feature-item"><span className="feature-icon"><IcReturns /></span><span>7-day easy returns — no questions asked</span></div>
            <div className="feature-item"><span className="feature-icon"><IcWhatsApp /></span><span>WhatsApp support — we respond within hours</span></div>
          </div>

          <div className="qty-row">
            <span className="qty-label">Quantity</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <input type="text" className="qty-num" value={qty} readOnly />
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            {/* FIX: original qty ko ignore karke sirf 1 item add karta tha */}
            <button className="btn-add-cart" onClick={handleAdd}>Add to Cart</button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi! I want to order ${product.name} for \u20B9${product.price}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-order"
            >
              <IcWhatsApp /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<section className="product-section"><p className="breadcrumb">Loading...</p></section>}>
      <ProductContent />
    </Suspense>
  );
}
