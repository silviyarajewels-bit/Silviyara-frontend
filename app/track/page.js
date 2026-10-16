'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/constants';
import { StatusIcon, IcCheck } from '@/lib/icons';

// Icon ab lib/icons.jsx se aata hai (StatusIcon), yahan sirf CSS class
const STATUS = {
  pending:    { cls: 'status-pending' },
  processing: { cls: 'status-processing' },
  shipped:    { cls: 'status-shipped' },
  delivered:  { cls: 'status-delivered' },
  cancelled:  { cls: 'status-cancelled' },
};

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [contact, setContact] = useState('');
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setErr(''); setOrder(null); setBusy(true);
    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderId.trim(), contact: contact.trim() }),
      });
      const data = await res.json();
      if (data.success && data.order) setOrder(data.order);
      else setErr(data.msg || 'Order not found. Please check your details.');
    } catch {
      setErr('Could not reach the server. Please try again.');
    }
    setBusy(false);
  };

  const st = order ? (STATUS[String(order.status || 'pending').toLowerCase()] || STATUS.pending) : null;

  return (
    <div className="track-wrap">
      <div className="track-card">
        <div className="track-card-header">
          <p className="track-eyebrow">✦ Order Tracking</p>
          <h1>Track your <em>order.</em></h1>
          <p>Enter your Order ID and the mobile number or email you used at checkout.</p>
        </div>

        <div className="track-body">
          <form onSubmit={handleTrack}>
            <div className="form-group">
              <label>Order ID</label>
              <input
                type="text" placeholder="e.g. SLV-00001 or your full order ID" required
                value={orderId} onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number or Email</label>
              <input
                type="text" placeholder="Used when placing the order" required
                value={contact} onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-track" disabled={busy}>
              {busy ? 'Searching...' : 'Track Order'}
            </button>
            {err && <p className="error-msg" style={{ display: 'block' }}>{err}</p>}
          </form>

          {order && (
            <div id="result" style={{ display: 'block' }}>
              <div className={`status-pill ${st.cls}`}><StatusIcon status={order.status} /> {order.status}</div>

              <div className="res-row">
                <span className="res-label">Order Date</span>
                <span className="res-val">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              </div>
              <div className="res-row">
                <span className="res-label">Customer</span>
                <span className="res-val">{order.customerName}</span>
              </div>
              <div className="res-row">
                <span className="res-label">Items</span>
                <span className="res-val">
                  {(order.items || [])
                    .map((i) => `${i.name} × ${i.qty || 1}`)
                    .join(', ')}
                </span>
              </div>
              <div className="res-row">
                <span className="res-label">Payment</span>
                <span className="res-val">
                  {order.paymentMethod || 'COD'}
                  {order.paymentStatus === 'Paid' ? <> • Paid <IcCheck /></> : ' • Pending'}
                </span>
              </div>
              <div className="res-row">
                <span className="res-label">Total Amount</span>
                <span className="res-val res-total">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
