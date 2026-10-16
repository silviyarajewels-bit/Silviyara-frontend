'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UIContext';
import { formatPrice } from '@/lib/constants';
import { ProductIcon, IcOrders, IcUser, IcLogout, IcCheck } from '@/lib/icons';

export default function AccountPage() {
  const router = useRouter();
  const { user, token, logout, loading: authLoading } = useAuth();
  const { openAuth } = useUI();

  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // FIX: original /login.html par redirect karta tha — wo file exist hi nahi karti thi (404).
  // Ab login modal khulta hai aur user homepage par rehta hai.
  useEffect(() => {
    if (!authLoading && !token) {
      openAuth('login');
      router.replace('/');
    }
  }, [authLoading, token, openAuth, router]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/orders/my-orders', { headers: { 'x-auth-token': token } });
        if (res.status === 401) { logout(); return; }
        const data = await res.json();
        if (!cancelled) setOrders(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setErr('Could not load your orders. Please try again.');
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [token, logout]);

  const handleLogout = () => { logout(); router.push('/'); };

  if (authLoading || !token) {
    return (
      <div className="layout">
        <div className="content"><p style={{ color: 'var(--text2)' }}>Loading...</p></div>
      </div>
    );
  }

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar-av">{(user?.name || '?')[0].toUpperCase()}</div>
        <h3 style={{ marginBottom: 5, fontFamily: 'var(--font-playfair),serif' }}>
          {user?.name || 'User'}
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.8rem', marginBottom: 20 }}>
          {user?.email || ''}
        </p>

        <a
          href="#" className={`nav-link ${tab === 'orders' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setTab('orders'); }}
        ><IcOrders /> My Orders</a>
        <a
          href="#" className={`nav-link ${tab === 'profile' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setTab('profile'); }}
        ><IcUser /> Profile Details</a>
        <a
          href="#" className="nav-link"
          onClick={(e) => { e.preventDefault(); handleLogout(); }}
        ><IcLogout /> Logout</a>
      </div>

      <div className="content">
        {tab === 'orders' ? (
          <>
            <h2 className="section-title">Order History</h2>
            {loading ? (
              <p style={{ color: 'var(--text2)' }}>Loading orders...</p>
            ) : err ? (
              <p style={{ color: '#c0392b' }}>{err}</p>
            ) : orders.length === 0 ? (
              <p style={{ color: 'var(--text2)' }}>
                You have no orders yet.{' '}
                <Link href="/shop" style={{ color: 'var(--gold-accent)' }}>Explore shop</Link>
              </p>
            ) : (
              orders.map((o) => {
                const date = new Date(o.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric',
                });
                const sClass = 'bg-' + String(o.status || 'pending').toLowerCase();
                return (
                  <div className="order-card" key={o._id}>
                    <div className="order-header">
                      <div>
                        <strong>Order {o.orderNumber || '#' + String(o._id).slice(-8).toUpperCase()}</strong> • {date}
                      </div>
                      <div className={`status-badge ${sClass}`}>{o.status}</div>
                    </div>

                    {(o.items || []).map((i, idx) => (
                      <div className="order-item" key={idx}>
                        <div className="item-emoji"><ProductIcon category={i.category} emoji={i.emoji} /></div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{i.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>
                            Qty: {i.qty || 1} • {formatPrice(i.price)}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="order-footer">
                      <span style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>
                        {o.paymentMethod || 'COD'}
                        {o.paymentStatus === 'Paid' ? <> • Paid <IcCheck /></> : ''}
                      </span>
                      <strong>{formatPrice(o.totalAmount)}</strong>
                    </div>
                  </div>
                );
              })
            )}
          </>
        ) : (
          <>
            <h2 className="section-title">Profile Details</h2>
            <div className="profile-info">
              <div className="info-row">
                <div className="info-label">Full Name</div>
                <div className="info-val">{user?.name || '-'}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Email</div>
                <div className="info-val">{user?.email || '-'}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Mobile</div>
                <div className="info-val">{user?.phone || '-'}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
