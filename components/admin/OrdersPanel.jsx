'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { adminFetch, adminGet, fmt, fmtDateTime } from '@/lib/adminApi';
import {
  IcOrders, IcSearch, IcRefresh, IcPhone, IcMail, IcTrack, IcGift,
  IcCard, IcCod, IcSuccess, IcClock, IcWhatsApp, IcInvoice, IcCopy, IcCheck,
  IcClose, IcCancelled, IcAlert,
  ProductIcon,
} from '@/lib/icons';

// NOTE: <option> ke andar sirf plain text ja sakta hai — SVG icon nahi chalta
// (browser ki apni dropdown hai). Isliye yahan emoji hata kar saaf text rakha hai.
const STATUS_OPTIONS = [
  { v: 'Pending',    l: 'Pending' },
  { v: 'Processing', l: 'Processing' },
  { v: 'Shipped',    l: 'Shipped' },
  { v: 'Delivered',  l: 'Delivered' },
  { v: 'Cancelled',  l: 'Cancelled' },
];

// Customer ko bhejne wala WhatsApp message (original ka exact text)
const waMessage = (o) =>
  `Hi ${o.customerName}! Your Silviyara Jewels order (${(o.items || []).map((i) => i.name).join(', ')}) ` +
  `of \u20B9${o.totalAmount} is being processed. We'll share tracking details soon. Thank you! 🙏`;

const PAY_FILTERS = [
  { v: 'all', l: 'All Payments' },
  { v: 'Razorpay', l: 'Online Only' },
  { v: 'COD', l: 'COD Only' },
  { v: 'Paid', l: 'Paid Only' },
  { v: 'Pending', l: 'Unpaid Only' },
];

const STATUS_FILTERS = [
  { v: 'all', l: 'All Status' },
  { v: 'Pending', l: 'Pending' },
  { v: 'Processing', l: 'Processing' },
  { v: 'Shipped', l: 'Shipped' },
  { v: 'Delivered', l: 'Delivered' },
  { v: 'Cancelled', l: 'Cancelled' },
];

// Invoice ek alag window mein plain HTML ke roop mein khulta hai — wahan React
// nahi chalta, isliye uske andar ka 🎁 emoji hi rahega (SVG kaam nahi karega).
function buildInvoice(o) {
  const items = (o.items || []).map((i) => `
    <tr>
      <td>${i.name}${i.sku ? ` <span style="color:#888;font-size:11px">(${i.sku})</span>` : ''}</td>
      <td style="text-align:center">${i.qty || 1}</td>
      <td style="text-align:right">₹${Number(i.price || 0).toLocaleString('en-IN')}</td>
      <td style="text-align:right">₹${Number((i.price || 0) * (i.qty || 1)).toLocaleString('en-IN')}</td>
    </tr>`).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${o.orderNumber || o._id}</title>
<style>
  *{box-sizing:border-box}
  body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#1c1814;padding:40px;max-width:800px;margin:0 auto}
  h1{font-size:26px;margin:0;letter-spacing:.04em}
  .muted{color:#6b5f52;font-size:13px}
  .head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #c9a84c;padding-bottom:16px;margin-bottom:24px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px}
  .box{border:1px solid #e8e0d5;padding:14px;border-radius:4px}
  .box h4{margin:0 0 8px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#8a8a9a}
  table{width:100%;border-collapse:collapse;margin-bottom:20px}
  th{text-align:left;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#8a8a9a;border-bottom:1px solid #e8e0d5;padding:8px 6px}
  td{padding:9px 6px;border-bottom:1px solid #f2ede6;font-size:14px}
  .total{text-align:right;font-size:18px;font-weight:600;padding-top:10px}
  .foot{margin-top:36px;padding-top:14px;border-top:1px solid #e8e0d5;font-size:12px;color:#6b5f52;text-align:center}
  @media print{body{padding:0}}
</style></head><body>
  <div class="head">
    <div>
      <h1>Silviyara <em style="color:#c9a84c">Jewels</em></h1>
      <p class="muted">925 Sterling Silver · Lucknow, Uttar Pradesh<br>+91 8004703038</p>
    </div>
    <div style="text-align:right">
      <h2 style="margin:0;font-size:18px">INVOICE</h2>
      <p class="muted">${o.orderNumber || String(o._id).slice(-8).toUpperCase()}<br>${new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
    </div>
  </div>

  <div class="grid">
    <div class="box">
      <h4>Bill To</h4>
      <strong>${o.customerName || ''}</strong><br>
      <span class="muted">${o.customerMobile || ''}<br>${o.customerEmail || ''}</span>
    </div>
    <div class="box">
      <h4>Ship To</h4>
      <span class="muted">
        ${o.customerAddress || ''}${o.customerLandmark ? ', ' + o.customerLandmark : ''}<br>
        ${o.customerCity || ''}${o.customerState ? ', ' + o.customerState : ''} — ${o.customerPin || ''}
      </span>
    </div>
  </div>

  <table>
    <thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Amount</th></tr></thead>
    <tbody>${items}</tbody>
  </table>

  <p class="total">Total: ₹${Number(o.totalAmount || 0).toLocaleString('en-IN')}</p>
  <p class="muted" style="text-align:right">
    Payment: ${o.paymentMethod || 'COD'} — ${o.paymentStatus || 'Pending'}
    ${o.paymentId ? `<br>Payment ID: ${o.paymentId}` : ''}
  </p>
  ${o.giftWrap ? `<div class="box" style="margin-top:16px"><h4>🎁 Gift Wrap</h4><span class="muted">${o.giftMessage || 'No message'}</span></div>` : ''}

  <div class="foot">
    Thank you for shopping with Silviyara Jewels · All pieces are hallmarked 925 sterling silver<br>
    7-day easy returns · silviyara.com
  </div>
  <script>window.onload=function(){window.print()}<\/script>
</body></html>`;
}

export default function OrdersPanel({ active }) {
  const [orders, setOrders] = useState(null);
  const [search, setSearch] = useState('');
  const [pay, setPay] = useState('all');
  const [status, setStatus] = useState('all');
  const [copied, setCopied] = useState(null);
  const [saved, setSaved] = useState(null);

  // Accept / Reject ke liye
  const [busyId, setBusyId] = useState(null);      // kis order par abhi request chal rahi hai
  const [rejectId, setRejectId] = useState(null);  // kis row mein reason ka box khula hai
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');              // error / info line

  const load = useCallback(async () => {
    const d = await adminGet('/api/orders');
    setOrders(Array.isArray(d) ? d : []);
  }, []);

  useEffect(() => { if (active) load(); }, [active, load]);

  // Original 30s auto-refresh karta tha
  useEffect(() => {
    if (!active) return;
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [active, load]);

  const filtered = useMemo(() => {
    let list = orders || [];
    if (status !== 'all') list = list.filter((o) => o.status === status);
    if (pay === 'Razorpay') list = list.filter((o) => o.paymentMethod === 'Razorpay');
    else if (pay === 'COD') list = list.filter((o) => o.paymentMethod !== 'Razorpay');
    else if (pay === 'Paid') list = list.filter((o) => o.paymentStatus === 'Paid');
    else if (pay === 'Pending') list = list.filter((o) => o.paymentStatus !== 'Paid');

    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter((o) =>
        (o.customerName || '').toLowerCase().includes(q) ||
        (o.customerMobile || '').includes(q) ||
        (o.orderNumber || '').toLowerCase().includes(q) ||
        String(o._id).slice(-8).toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, status, pay, search]);

  const pendingCount = useMemo(
    () => (orders || []).filter((o) => (o.status || 'Pending') === 'Pending').length,
    [orders]
  );

  const updateStatus = async (id, newStatus) => {
    await adminFetch(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
    });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o)));
    setSaved(id);                       // green flash — original jaisa
    setTimeout(() => setSaved(null), 1500);
  };

  /**
   * Accept / Reject — backend ke naye endpoints.
   *
   * Accept  → status 'Processing' + acceptedAt save
   * Reject  → status 'Cancelled'  + rejectedAt + reason save
   *
   * Server hamesha poora updated order wapas bhejta hai, isliye local state
   * usi se bhar dete hain — dobara poori list fetch karne ki zarurat nahi.
   */
  const decide = async (o, what, why = '') => {
    setBusyId(o._id);
    setMsg('');
    try {
      const res = await adminFetch(`/api/orders/${o._id}/${what}`, {
        method: 'PATCH',
        body: JSON.stringify(what === 'reject' ? { reason: why } : {}),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setMsg(data.message || `Order ${what} nahi ho paaya (${res.status})`);
        return;
      }

      setOrders((prev) => prev.map((x) => (x._id === o._id ? { ...x, ...data.order } : x)));
      setSaved(o._id);
      setTimeout(() => setSaved(null), 1500);
      setRejectId(null);
      setReason('');
    } catch {
      setMsg('Server se connection nahi ho paaya. Backend chal raha hai?');
    } finally {
      setBusyId(null);
    }
  };

  const copyDetails = (o) => {
    const txt =
      `Order: ${o.orderNumber || String(o._id).slice(-8).toUpperCase()}\n` +
      `Name: ${o.customerName}\nPhone: ${o.customerMobile}\nEmail: ${o.customerEmail || '-'}\n` +
      `Address: ${o.customerAddress}${o.customerLandmark ? ', ' + o.customerLandmark : ''}, ` +
      `${o.customerCity}${o.customerState ? ', ' + o.customerState : ''} — ${o.customerPin}\n` +
      `Items: ${(o.items || []).map((i) => `${i.name} × ${i.qty || 1}`).join(', ')}\n` +
      `Total: ${fmt(o.totalAmount)}\nPayment: ${o.paymentMethod} (${o.paymentStatus})`;
    navigator.clipboard?.writeText(txt);
    setCopied(o._id);
    setTimeout(() => setCopied(null), 2000);
  };

  const invoice = (o) => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(buildInvoice(o));
    w.document.close();
  };

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="panel-head">
        <div className="panel-title">
          <IcOrders /> Orders
          {/* Kitne naye order faisle ka intezaar kar rahe hain */}
          {pendingCount > 0 && (
            <span
              onClick={() => setStatus('Pending')}
              title="Sirf naye orders dikhao"
              style={{
                marginLeft: 10, background: '#c0392b', color: '#fff', fontSize: 11,
                padding: '2px 9px', borderRadius: 20, fontWeight: 600,
                cursor: 'pointer', verticalAlign: 'middle',
              }}
            >
              {pendingCount} new
            </span>
          )}
        </div>
        <div className="panel-subtitle">
          Naye order ko Accept ya Reject karein — uske baad status se delivery track karein.
        </div>
      </div>

      <div className="table-card" style={{ overflowX: 'auto' }}>
        <div className="table-header" style={{ flexWrap: 'wrap', gap: 10 }}>
          <h3>All Orders</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* placeholder text-only hota hai — icon alag se input ke aage */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <IcSearch style={{ color: 'var(--text3)' }} />
              <input
                type="text" className="filter-select" placeholder="Search name, phone, order ID..."
                style={{ width: 200, padding: '6px 10px' }}
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </span>
            <select className="filter-select" value={pay} onChange={(e) => setPay(e.target.value)}>
              {PAY_FILTERS.map((f) => <option key={f.v} value={f.v}>{f.l}</option>)}
            </select>
            <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUS_FILTERS.map((f) => <option key={f.v} value={f.v}>{f.l}</option>)}
            </select>
            <button className="btn btn-outline btn-sm" onClick={load}><IcRefresh /> Refresh</button>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>
              {orders ? `Showing ${filtered.length} of ${orders.length} orders` : ''}
            </span>
          </div>
        </div>

        {msg && (
          <div style={{
            margin: '0 16px 10px', padding: '8px 12px', fontSize: 12,
            color: '#c0392b', background: 'rgba(192,57,43,.08)',
            border: '1px solid rgba(192,57,43,.25)', borderRadius: 4,
          }}>
            <IcAlert /> {msg}
          </div>
        )}

        <table style={{ minWidth: 1080 }}>
          <thead>
            <tr>
              <th>Order</th><th>Customer &amp; Contact</th><th>Items</th>
              <th>Total</th><th>Payment</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders === null ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>No orders found.</td></tr>
            ) : filtered.map((o) => (
              <tr key={o._id}>
                <td>
                  <strong>{o.orderNumber || '#' + String(o._id).slice(-8).toUpperCase()}</strong>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{fmtDateTime(o.createdAt)}</div>
                </td>
                <td>
                  <strong>{o.customerName}</strong>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                    <IcPhone /> {o.customerMobile}<br />
                    {o.customerEmail && <><IcMail /> {o.customerEmail}<br /></>}
                    <IcTrack /> {o.customerAddress}{o.customerLandmark ? `, ${o.customerLandmark}` : ''},{' '}
                    {o.customerCity}{o.customerState ? `, ${o.customerState}` : ''} — {o.customerPin}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text2)' }}>
                    {(o.items || []).map((i, k) => (
                      <div key={k}>
                        <ProductIcon category={i.category} /> {i.name} × {i.qty || 1}
                        {i.sku && (
                          <code style={{
                            fontSize: 9, background: 'var(--tag-bg)', padding: '1px 4px',
                            borderRadius: 2, color: 'var(--gold)', marginLeft: 4,
                          }}>{i.sku}</code>
                        )}
                        <span style={{ color: 'var(--text3)' }}> — {fmt(i.price)}</span>
                      </div>
                    ))}
                    {o.giftWrap && (
                      <div style={{ color: '#c9a84c', marginTop: 3 }}>
                        <IcGift /> Gift wrapped
                        {o.giftMessage && (
                          <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic' }}>
                            &quot;{o.giftMessage}&quot;
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td><strong>{fmt(o.totalAmount)}</strong></td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {o.paymentMethod === 'Razorpay'
                      ? <span className="pay-badge-rzp"><IcCard />Razorpay</span>
                      : <span className="pay-badge-cod"><IcCod />COD</span>}
                    {o.paymentStatus === 'Paid'
                      ? <span className="pay-badge-paid"><IcSuccess />Paid</span>
                      : <span className="pay-badge-pending"><IcClock />Pending</span>}
                    {o.paymentId && (
                      <div style={{ fontSize: 9, color: 'var(--text3)', wordBreak: 'break-all', maxWidth: 100 }}>
                        ID: {o.paymentId}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {/* Naya order aaya hai — pehle Accept/Reject ka faisla */}
                  {(o.status || 'Pending') === 'Pending' && rejectId !== o._id && (
                    <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                      <button
                        onClick={() => decide(o, 'accept')}
                        disabled={busyId === o._id}
                        style={{
                          flex: 1, background: '#27ae60', color: '#fff', border: 'none',
                          padding: '6px 8px', fontSize: 11, borderRadius: 3, fontWeight: 600,
                          cursor: busyId === o._id ? 'wait' : 'pointer', opacity: busyId === o._id ? .6 : 1,
                        }}
                      >
                        <IcCheck /> Accept
                      </button>
                      <button
                        onClick={() => { setRejectId(o._id); setReason(''); setMsg(''); }}
                        disabled={busyId === o._id}
                        style={{
                          flex: 1, background: 'transparent', color: '#c0392b',
                          border: '1px solid rgba(192,57,43,.45)', padding: '6px 8px',
                          fontSize: 11, borderRadius: 3, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        <IcClose /> Reject
                      </button>
                    </div>
                  )}

                  {/* Reject ki wajah — browser ka native prompt page ko block kar
                      deta hai, isliye yahan inline box rakha hai */}
                  {rejectId === o._id && (
                    <div style={{ marginBottom: 6 }}>
                      <input
                        type="text"
                        className="filter-select"
                        autoFocus
                        placeholder="Wajah (optional)"
                        value={reason}
                        maxLength={300}
                        onChange={(e) => setReason(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') decide(o, 'reject', reason); }}
                        style={{ width: 150, padding: '5px 8px', fontSize: 11 }}
                      />
                      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                        <button
                          onClick={() => decide(o, 'reject', reason)}
                          disabled={busyId === o._id}
                          style={{
                            flex: 1, background: '#c0392b', color: '#fff', border: 'none',
                            padding: '5px 8px', fontSize: 11, borderRadius: 3, fontWeight: 600,
                            cursor: busyId === o._id ? 'wait' : 'pointer', opacity: busyId === o._id ? .6 : 1,
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => { setRejectId(null); setReason(''); }}
                          style={{
                            flex: 1, background: 'var(--tag-bg)', color: 'var(--text2)',
                            border: '1px solid var(--border2)', padding: '5px 8px',
                            fontSize: 11, borderRadius: 3, cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <select
                    className="filter-select"
                    style={{
                      width: 150,
                      borderColor: saved === o._id ? '#27ae60' : undefined,
                      transition: 'border-color .3s',
                    }}
                    value={o.status || 'Pending'}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((st) => <option key={st.v} value={st.v}>{st.l}</option>)}
                  </select>

                  {/* Faisla ho chuka — kab hua, aur reject tha to kyun */}
                  {o.acceptedAt && (
                    <div style={{ fontSize: 10, color: '#27ae60', marginTop: 5, lineHeight: 1.5 }}>
                      <IcCheck /> Accepted {fmtDateTime(o.acceptedAt)}
                    </div>
                  )}
                  {o.rejectedAt && (
                    <div style={{ fontSize: 10, color: '#c0392b', marginTop: 5, lineHeight: 1.5 }}>
                      <IcCancelled /> Rejected {fmtDateTime(o.rejectedAt)}
                      {o.rejectionReason && (
                        <div style={{ color: 'var(--text3)', fontStyle: 'italic' }}>
                          &quot;{o.rejectionReason}&quot;
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td>
                  {/* WhatsApp button — customer ko seedha order update bhejne ke liye */}
                  <a
                    href={`https://wa.me/91${String(o.customerMobile || '').replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(waMessage(o))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block', background: '#25d366', color: '#fff', textAlign: 'center',
                      padding: '6px 10px', fontSize: 11, textDecoration: 'none',
                      borderRadius: 3, fontWeight: 600, marginBottom: 4,
                    }}
                  >
                    <IcWhatsApp /> WhatsApp
                  </a>
                  <button
                    onClick={() => invoice(o)}
                    style={{
                      display: 'block', width: '100%', background: 'var(--gold)', color: '#111',
                      border: 'none', textAlign: 'center', padding: '6px 10px', fontSize: 11,
                      borderRadius: 3, fontWeight: 600, cursor: 'pointer', marginBottom: 4,
                    }}
                  >
                    <IcInvoice /> Invoice
                  </button>
                  <button
                    onClick={() => copyDetails(o)}
                    style={{
                      display: 'block', width: '100%', border: '1px solid var(--border2)',
                      background: 'var(--tag-bg)', color: 'var(--text2)', textAlign: 'center',
                      padding: '6px 10px', fontSize: 11, borderRadius: 3, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {copied === o._id
                      ? <><IcCheck /> Copied</>
                      : <><IcCopy /> Copy Details</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
