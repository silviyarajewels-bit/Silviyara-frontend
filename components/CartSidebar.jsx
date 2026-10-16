'use client';

import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import { formatPrice, WHATSAPP_NUMBER } from '@/lib/constants';
import { ProductIcon, IcClose, IcWhatsApp } from '@/lib/icons';
import { useState } from 'react';

export default function CartSidebar() {
  const { cartOpen, setCartOpen, setCheckoutOpen } = useUI();
  const { cart, cartTotal, removeFromCart, updateQty } = useCart();

  const close = () => setCartOpen(false);

  // WhatsApp par bhejne wale message mein emoji hi rahega — WhatsApp SVG nahi samajhta
  const checkoutWhatsApp = () => {
    if (!cart.length) return;
    const lines = cart
      .map((i) => `${i.emoji || '💎'} ${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty)}`)
      .join('%0A');
    const msg = `Hi Silviyara! I want to order:%0A%0A${lines}%0A%0A*Total: ${formatPrice(cartTotal)}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={close} />

      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={close} aria-label="Close"><IcClose /></button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <p style={{ fontSize: '.8rem', marginTop: '.5rem' }}>
                Add some beautiful pieces!
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const id = item.id || item._id;
              return (
                <div className="cart-item" key={id}>
                  <div className="cart-item-img">
                    <CartItemImage item={item} />
                  </div>

                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    {item.category && (
                      <p className="cart-item-cat">{item.category.replace(/-/g, ' ')}</p>
                    )}
                    <p className="cart-item-price">{formatPrice(item.price * (item.qty || 1))}</p>

                    {/* Quantity controls — original site mein ye nahi tha (bug) */}
                    <div className="qty-control">
                      <button onClick={() => updateQty(id, (item.qty || 1) - 1)} aria-label="Decrease">−</button>
                      <span>{item.qty || 1}</span>
                      <button onClick={() => updateQty(id, (item.qty || 1) + 1)} aria-label="Increase">+</button>
                    </div>
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(id)}
                    title="Remove"
                  >
                    <IcClose />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total-row">
              <span>Total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <button
              className="btn-checkout"
              style={{ background: 'var(--text)', color: 'var(--bg)', marginBottom: 10 }}
              onClick={() => { close(); setCheckoutOpen(true); }}
            >
              Proceed to Checkout
            </button>
            <button
              className="btn-checkout"
              style={{ background: 'transparent', color: '#25d366', border: '1px solid #25d366' }}
              onClick={checkoutWhatsApp}
            >
              <IcWhatsApp /> Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Cart item ki tasveer. Image na ho (ya load na ho) to category ka icon.
 * Pehle yahan DOM ko seedha chheda ja raha tha (textContent = emoji) —
 * React mein wo galat hai, isliye ab state se.
 */
function CartItemImage({ item }) {
  const [failed, setFailed] = useState(false);
  if (item.image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.image}
        alt={item.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={() => setFailed(true)}
      />
    );
  }
  return <ProductIcon category={item.category} />;
}
