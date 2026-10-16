'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminGet, fmt } from '@/lib/adminApi';
import {
  IcRupee, IcOrders, IcNewOrders, IcClock, IcCard, IcCod, IcProducts,
  IcMail, IcRefresh, IcPhone, IcSuccess,
} from '@/lib/icons';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

const Card = ({ accent, Icon, label, value, sub }) => (
  <div className="stat-card">
    <div className="stat-card-accent" style={{ background: accent }} />
    <span className="stat-icon" style={{ color: accent }}><Icon /></span>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-sub">{sub}</div>
  </div>
);

export default function StatsPanel({ active }) {
  const [s, setS] = useState(null);
  const [orders, setOrders] = useState(null);
  const [greet, setGreet] = useState('');

  const load = useCallback(async () => {
    const [pr, ms, or] = await Promise.all([
      adminGet('/api/products'),
      adminGet('/api/contact'),
      adminGet('/api/orders'),
    ]);
    const allOrders = Array.isArray(or) ? or : [];
    const products = Array.isArray(pr) ? pr : [];
    const messages = Array.isArray(ms) ? ms : [];

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayOrders = allOrders.filter((o) => new Date(o.createdAt) >= today);

    setOrders(allOrders);
    setS({
      totalRevenue: allOrders.reduce((a, o) => a + (o.totalAmount || 0), 0),
      onlineRevenue: allOrders.filter((o) => o.paymentMethod === 'Razorpay')
        .reduce((a, o) => a + (o.totalAmount || 0), 0),
      totalOrders: allOrders.length,
      delivered: allOrders.filter((o) => o.status === 'Delivered').length,
      today: todayOrders.length,
      todayRevenue: todayOrders.reduce((a, o) => a + (o.totalAmount || 0), 0),
      pending: allOrders.filter((o) => o.status === 'Pending').length,
      online: allOrders.filter((o) => o.paymentMethod === 'Razorpay').length,
      paid: allOrders.filter((o) => o.paymentStatus === 'Paid').length,
      cod: allOrders.filter((o) => o.paymentMethod !== 'Razorpay').length,
      products: products.length,
      flash: products.filter((p) => p.isFlashSale).length,
      messages: messages.length,
    });
  }, []);

  useEffect(() => {
    setGreet(greeting());
    if (active) load();
  }, [active, load]);

  const recent = (orders || []).slice(0, 8);

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="panel-head">
        <div className="panel-title">Dashboard</div>
        <div className="panel-subtitle">
          {greet ? `${greet}! Here's your store overview for today.` : "Here's your store overview."}
        </div>
      </div>

      <div className="stats-grid">
        <Card accent="#c9a84c" Icon={IcRupee} label="Total Revenue"
              value={s ? fmt(s.totalRevenue) : '—'}
              sub={s ? `Online: ${fmt(s.onlineRevenue)}` : 'All orders combined'} />
        <Card accent="#27ae60" Icon={IcOrders} label="Total Orders"
              value={s ? s.totalOrders : '—'}
              sub={s ? `${s.delivered} delivered` : 'All time'} />
        <Card accent="#e67e22" Icon={IcNewOrders} label="New Orders Today"
              value={s ? s.today : '—'}
              sub={s ? `${fmt(s.todayRevenue)} today` : 'Received today'} />
        <Card accent="#e74c3c" Icon={IcClock} label="Pending Orders"
              value={s ? s.pending : '—'} sub="Awaiting processing" />
        <Card accent="#5a4ff3" Icon={IcCard} label="Online Payments"
              value={s ? s.online : '—'}
              sub={s ? `${s.paid} paid` : 'Via Razorpay'} />
        <Card accent="#16a085" Icon={IcCod} label="COD Orders"
              value={s ? s.cod : '—'} sub="Cash on delivery" />
        <Card accent="#8e44ad" Icon={IcProducts} label="Total Products"
              value={s ? s.products : '—'}
              sub={s ? `${s.flash} on flash sale` : 'In your store'} />
        <Card accent="#004085" Icon={IcMail} label="Messages"
              value={s ? s.messages : '—'} sub="Customer inquiries" />
      </div>

      {/* Recent Orders — dashboard par hi last 8 orders */}
      <div className="table-card">
        <div className="table-header">
          <h3><IcClock /> Recent Orders</h3>
          <button className="btn btn-outline btn-sm" onClick={load}><IcRefresh /> Refresh</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr>
            </thead>
            <tbody>
              {orders === null ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: 28 }}>Loading...</td></tr>
              ) : recent.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: 28 }}>No orders yet</td></tr>
              ) : recent.map((o) => (
                <tr key={o._id}>
                  <td>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>
                      {new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </div>
                  </td>
                  <td>
                    <strong>{o.customerName}</strong>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}><IcPhone /> {o.customerMobile}</div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text2)' }}>
                    {(o.items || []).map((i) => i.name).join(', ')}
                  </td>
                  <td><strong>{fmt(o.totalAmount)}</strong></td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {o.paymentMethod === 'Razorpay'
                        ? <span className="pay-badge-rzp"><IcCard />Online</span>
                        : <span className="pay-badge-cod"><IcCod />COD</span>}
                      {o.paymentStatus === 'Paid'
                        ? <span className="pay-badge-paid"><IcSuccess />Paid</span>
                        : <span className="pay-badge-pending"><IcClock />Unpaid</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${String(o.status || 'pending').toLowerCase()}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
