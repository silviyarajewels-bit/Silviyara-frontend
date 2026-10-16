'use client';

import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/lib/useProducts';
import { ProductIcon, IcWishlistOn, IcClose } from '@/lib/icons';

export default function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen } = useUI();
  const { wishlist, toggleWishlist } = useCart();
  const { products } = useProducts();

  // Original openWishlistDrawer() allProducts se product ka emoji uthata tha —
  // ab category se icon aata hai
  const categoryOf = (id) =>
    products.find((x) => (x._id || x.id) === id)?.category || '';

  const close = () => setWishlistOpen(false);

  return (
    <>
      <div className={`cart-overlay ${wishlistOpen ? 'open' : ''}`} onClick={close} />

      <div className={`cart-sidebar ${wishlistOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <h3><IcWishlistOn style={{ color: '#e0555f' }} /> My Wishlist</h3>
          <button className="cart-close" onClick={close} aria-label="Close"><IcClose /></button>
        </div>

        <div className="cart-body">
          {wishlist.length === 0 ? (
            <div className="cart-empty">
              <p>Your wishlist is empty</p>
              <p style={{ fontSize: '.85rem', color: 'var(--text2)', marginTop: '.5rem' }}>
                Save items you love <IcWishlistOn style={{ color: '#e0555f' }} />
              </p>
            </div>
          ) : (
            wishlist.map((w) => (
              <div className="cart-item" key={w.id}>
                <div className="cart-item-img"><ProductIcon category={categoryOf(w.id)} /></div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{w.name}</p>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => toggleWishlist({ id: w.id, name: w.name })}
                  title="Remove"
                >
                  <IcClose />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
