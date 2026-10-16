'use client';

/**
 * Admin API helper.
 * Har request par x-admin-token bhejta hai — original dashboard sirf
 * custom-design par bhejta tha, par sab par bhejna zyada sahi hai
 * (aur backend ignore kare to bhi kuch toota nahi).
 */
export function adminToken() {
  try { return localStorage.getItem('Silviyara_admin_token') || ''; } catch { return ''; }
}

export async function adminFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      'x-admin-token': adminToken(),
      ...(options.headers || {}),
    },
  });
  return res;
}

export const adminGet = async (url, fallback = []) => {
  try {
    const r = await adminFetch(url);
    const d = await r.json();
    return d;
  } catch { return fallback; }
};

export const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export const fmtDateTime = (d) =>
  new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

export const CATEGORIES = [
  { key: 'pendant', label: 'Pendant' },
  { key: 'ear-jewellery', label: 'Ear Jewellery' },
  { key: 'rings', label: 'Rings' },
  { key: 'anklets', label: 'Anklets' },
  { key: 'bracelets', label: 'Bracelets' },
  { key: 'necklaces', label: 'Necklaces' },
  { key: 'hair-accessories', label: 'Hair Accessories' },
];

export const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
