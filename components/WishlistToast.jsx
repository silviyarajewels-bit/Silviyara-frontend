'use client';

import { useCart } from '@/context/CartContext';
import { IcWishlist, IcWishlistOn } from '@/lib/icons';

// Original index.html L1241 ka showWishlistToast()
// Pehle text mein ❤️ emoji tha, ab uski jagah icon.
export default function WishlistToast() {
  const { toast } = useCart();
  return (
    <div className={`wishlist-toast ${toast ? 'show' : ''}`}>
      {toast ? (
        <>
          {toast.added ? <IcWishlistOn style={{ color: '#e0555f' }} /> : <IcWishlist />}{' '}
          {toast.text}
        </>
      ) : ''}
    </div>
  );
}
