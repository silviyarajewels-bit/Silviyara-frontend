'use client';

import { useState, useEffect } from 'react';
import { FALLBACK_PRODUCTS } from './constants';

/**
 * Products fetch karta hai. API fail/khaali ho to demo products dikhata hai.
 *
 * FIX: original site mein index.html 8s aur shop.html 2s timeout use karta tha.
 * 2s Vercel cold start ke liye kam tha — isliye fake products dikh jaate the.
 * Ab dono jagah 8s.
 */
export function useProducts(category, fallback = FALLBACK_PRODUCTS) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    (async () => {
      try {
        const url = category ? `/api/products?category=${category}` : '/api/products';
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (cancelled) return;

        if (Array.isArray(data) && data.length) {
          setProducts(data);
          setIsDemo(false);
        } else {
          throw new Error('empty');
        }
      } catch (e) {
        if (cancelled) return;
        const demo = category
          ? fallback.filter((p) => p.category === category)
          : fallback;
        setProducts(demo);
        setIsDemo(true);
      } finally {
        clearTimeout(timer);
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [category, fallback]);

  return { products, loading, isDemo };
}
