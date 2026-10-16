'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { IcFlash } from '@/lib/icons';

/**
 * Original mein ye sirf homepage par tha.
 *
 * Banner ki unchai fix nahi hoti — chhoti screen par text do line mein tut
 * jaata hai (desktop par 24px, phone par 49px). Pehle navbar ka `top` CSS
 * mein 26px likha hua tha, isliye phone par nav banner ke peeche chala
 * jaata tha aur logo aadha kat jaata tha.
 *
 * Ab banner apni asli unchai naap kar `--banner-h` mein daal deta hai, aur
 * nav wahi se apni jagah leta hai. Text kitna bhi lamba ho, kisi bhi screen
 * par — nav hamesha banner ke theek neeche rahega.
 */
export default function FlashBanner({ hidden }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--banner-h', h + 'px');
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener('resize', apply);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
      // banner wale page se hatte hi value saaf kar do
      document.documentElement.style.removeProperty('--banner-h');
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flash-banner"
      style={hidden ? { transform: 'translateY(-100%)' } : undefined}
    >
      <IcFlash /> Flash Sale Live — Up to 40% Off Selected Pieces{' '}
      <Link href="/flash-sale">Shop Now →</Link>
    </div>
  );
}
