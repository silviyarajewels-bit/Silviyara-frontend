'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { formatPrice, WHATSAPP_NUMBER } from '@/lib/constants';
import { ProductIcon, IcWishlist, IcWishlistOn, IcWhatsApp } from '@/lib/icons';

const BADGE_CLASS = {
  Sale: 'badge-sale',
  Featured: 'badge-featured',
  Bestseller: 'badge-bestseller',
  New: 'badge-new',
};

/**
 * Original code review count ke liye Math.random() use karta tha —
 * React mein wo server aur client par alag value deta hai (hydration error).
 * Isliye product id se ek stable number banate hain: same product = same count.
 */
function reviewCount(id) {
  const s = String(id);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 20) + 15;
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist } = useCart();
  const { setCartOpen, setQuickView } = useUI();
  const [imgFailed, setImgFailed] = useState(false);

  const id = product._id || product.id;
  const wished = inWishlist(id);
  const showImg = product.image && !imgFailed;

  return (
    <div className="product-card" onClick={() => setQuickView(product)}>
      <div className="product-img">
        {product.badge && (
          <span className={`badge ${BADGE_CLASS[product.badge] || 'badge-new'}`}>
            {product.badge}
          </span>
        )}

        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="product-img-inner"><ProductIcon category={product.category} /></span>
        )}
      </div>

      <div className="product-body">
        <p className="product-cat">{(product.category || '').replace('-', ' ')}</p>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-stars">
          <span className="star">★★★★★</span>
          <span className="star-count">({reviewCount(id)})</span>
        </div>

        <div className="product-price">
          {product.originalPrice > product.price && (
            <span className="price-old">{formatPrice(product.originalPrice)}</span>
          )}
          <span className="price-new">{formatPrice(product.price)}</span>
        </div>

        <div className="product-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className={`btn-wish ${wished ? 'wished' : ''}`}
            onClick={() => toggleWishlist(product)}
            title="Add to wishlist"
          >
            {wished ? <IcWishlistOn /> : <IcWishlist />}
          </button>
          <button
            className="btn-cart"
            onClick={() => { addToCart(product); setCartOpen(true); }}
          >
            Add to Cart
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hi! I want to order ${product.name} for \u20B9${product.price}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
            title="Order on WhatsApp"
          >
            <IcWhatsApp />
          </a>
        </div>
      </div>
    </div>
  );
}
