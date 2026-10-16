'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { formatPrice, WHATSAPP_NUMBER } from '@/lib/constants';
import { ProductIcon, IcClose, IcSilver, IcShipping, IcReturns, IcWhatsApp, IcCheck } from '@/lib/icons';
import { getReviews, getAvgRating } from '@/lib/reviews';

// ProductCard jaisa hi stable review count (Math.random hydration tod deta hai)
function reviewCount(id) {
  const s = String(id);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 20) + 15;
}

export default function QuickViewModal() {
  const { quickView: product, setQuickView } = useUI();
  const { addToCart } = useCart();
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => { setImgFailed(false); }, [product]);

  const close = () => setQuickView(null);

  if (!product) {
    // Overlay hamesha DOM mein rehta hai taaki transition chale
    return <div className="product-modal-overlay" />;
  }

  const disc = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const reviews = getReviews(product.category).slice(0, 2);

  const handleAdd = () => {
    addToCart(product);
    close();
  };

  return (
    <div
      className="product-modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="product-modal">
        <button className="product-modal-close" onClick={close} aria-label="Close"><IcClose /></button>

        <div className="product-modal-grid">
          <div className="product-modal-img">
            {product.image && !imgFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgFailed(true)}
              />
            ) : <ProductIcon category={product.category} />}
          </div>

          <div className="product-modal-info">
            <p className="pm-cat">{(product.category || '').replace(/-/g, ' ')}</p>
            <h2 className="pm-name">{product.name}</h2>

            <div style={{ color: '#c9a84c', fontSize: '.85rem', marginBottom: '1rem', marginTop: '-.5rem' }}>
              ★★★★★{' '}
              <span style={{ color: 'var(--text2)', fontSize: '.75rem' }}>
                ({reviewCount(product._id || product.id)} Reviews)
              </span>
            </div>

            <div className="pm-price-row">
              <span className="pm-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="pm-original">{formatPrice(product.originalPrice)}</span>
                  <span className="pm-disc">{disc}% OFF</span>
                </>
              )}
            </div>

            <p className="pm-desc">
              {product.description ||
                'A beautiful handcrafted piece from our sterling silver collection. Each item is carefully selected for quality and design. Perfect for everyday wear or as a thoughtful gift.'}
            </p>

            <div className="pm-features">
              <div className="pm-feature"><span className="pm-feature-icon"><IcSilver /></span><span>925 Sterling Silver — Hallmarked</span></div>
              <div className="pm-feature"><span className="pm-feature-icon"><IcShipping /></span><span>Free delivery above ₹999</span></div>
              <div className="pm-feature"><span className="pm-feature-icon"><IcReturns /></span><span>7-day easy returns</span></div>
              <div className="pm-feature"><span className="pm-feature-icon"><IcWhatsApp /></span><span>WhatsApp support</span></div>
            </div>

            <div className="pm-actions">
              <button className="pm-btn-cart" onClick={handleAdd}>Add to Cart</button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi! I want to order ${product.name} for \u20B9${product.price}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn-wa"
              >
                <IcWhatsApp /> Order on WhatsApp
              </a>
            </div>

            <div className="pm-reviews">
              <div className="pm-reviews-title">Customer Reviews ★ {getAvgRating()}</div>
              {reviews.map((r, i) => (
                <div className="pm-review" key={i}>
                  <div className="pm-review-header">
                    <span>
                      <span className="pm-review-name">{r.name}</span>
                      {r.verified && <span className="pm-review-badge"><IcCheck /> Verified</span>}
                    </span>
                    <span>
                      <span className="pm-review-stars">{'★'.repeat(r.stars)}</span>{' '}
                      <span className="pm-review-date">{r.date}</span>
                    </span>
                  </div>
                  <div className="pm-review-text">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
