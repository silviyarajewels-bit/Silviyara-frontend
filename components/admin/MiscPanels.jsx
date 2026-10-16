'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminFetch, adminGet, fmtDate, fmtDateTime, CATEGORIES } from '@/lib/adminApi';
import { IcRefresh, IcDesign, IcAttach, IcSuccess, IcError } from '@/lib/icons';

// ─── Contact Messages ───────────────────────────────────────────────────────
export function MessagesPanel({ active }) {
  const [rows, setRows] = useState(null);

  const load = useCallback(async () => {
    setRows(null);
    const d = await adminGet('/api/contact');
    setRows(Array.isArray(d) ? d : []);
  }, []);

  useEffect(() => { if (active) load(); }, [active, load]);

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="panel-head">
        <div className="panel-title">Contact Messages</div>
        <div className="panel-subtitle">Messages received from customers.</div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>All Messages</h3>
          <button className="btn btn-outline btn-sm" onClick={load}><IcRefresh /> Refresh</button>
        </div>
        <table>
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th></tr>
          </thead>
          <tbody>
            {rows === null ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>No messages yet.</td></tr>
            ) : rows.map((m) => (
              <tr key={m._id}>
                <td>{m.name}</td>
                <td>{m.phone || '—'}</td>
                <td>{m.email || '—'}</td>
                <td>{m.subject || '—'}</td>
                <td style={{ maxWidth: 320, whiteSpace: 'pre-wrap' }}>{m.message}</td>
                <td style={{ fontSize: 12 }}>{fmtDateTime(m.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Custom Designs ─────────────────────────────────────────────────────────
export function CustomDesignsPanel({ active }) {
  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(null);

  const load = useCallback(async () => {
    setRows(null);
    const d = await adminGet('/api/custom-design');
    setRows(Array.isArray(d) ? d : []);
  }, []);

  useEffect(() => { if (active) load(); }, [active, load]);

  const viewFile = async (id) => {
    setBusy(id);
    try {
      const res = await adminFetch(`/api/custom-design/${id}/file`);
      const data = await res.json();
      if (data.success && data.fileData) {
        const w = window.open('', '_blank');
        if (w) {
          if (String(data.fileType || '').startsWith('image/')) {
            w.document.write(
              `<title>${data.fileName}</title><body style="margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh">
               <img src="${data.fileData}" style="max-width:100%;max-height:100vh"/></body>`
            );
          } else {
            w.document.write(
              `<title>${data.fileName}</title><body style="font-family:system-ui;padding:40px;text-align:center">
               <p>${data.fileName}</p>
               <a href="${data.fileData}" download="${data.fileName}"
                  style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#111;text-decoration:none;border-radius:4px">
                  Download file</a></body>`
            );
          }
          w.document.close();
        }
      } else window.alert('Could not load the file.');
    } catch { window.alert('Could not load the file.'); }
    setBusy(null);
  };

  const setStatus = async (id, status) => {
    const adminNote = window.prompt(
      status === 'Rejected'
        ? 'Reason for rejection (shown to the customer):'
        : 'Note for the customer (optional):',
      ''
    );
    if (adminNote === null) return;
    await adminFetch(`/api/custom-design/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, adminNote }),
    });
    load();
  };

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="panel-head">
        <div className="panel-title"><IcDesign /> Custom Designs</div>
        <div className="panel-subtitle">Review customer custom design requests.</div>
      </div>

      <div className="table-card" style={{ overflowX: 'auto' }}>
        <div className="table-header">
          <h3>Custom Design Submissions</h3>
          <button className="btn btn-outline btn-sm" onClick={load}><IcRefresh /> Refresh</button>
        </div>
        <table style={{ minWidth: 800 }}>
          <thead>
            <tr><th>Date</th><th>Customer</th><th>Design Title</th><th>File</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows === null ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>No submissions yet.</td></tr>
            ) : rows.map((d) => (
              <tr key={d._id}>
                <td style={{ fontSize: 12 }}>{fmtDate(d.createdAt)}</td>
                <td>
                  <strong>{d.customerName}</strong>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                    {d.customerEmail}{d.customerPhone ? <><br />{d.customerPhone}</> : null}
                  </div>
                </td>
                <td>
                  {d.designTitle}
                  {d.description && (
                    <div style={{ fontSize: 12, color: 'var(--text3)', maxWidth: 260 }}>{d.description}</div>
                  )}
                  {d.adminNote && (
                    <div style={{ fontSize: 12, color: '#c9a84c', marginTop: 4 }}>Note: {d.adminNote}</div>
                  )}
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => viewFile(d._id)} disabled={busy === d._id}>
                    {busy === d._id ? '...' : <><IcAttach /> View</>}
                  </button>
                </td>
                <td>
                  <span className={`cd-sub-status ${String(d.status).toLowerCase()}`}>{d.status}</span>
                </td>
                <td>
                  <button className="btn btn-dark btn-sm" onClick={() => setStatus(d._id, 'Accepted')}><IcSuccess /> Accept</button>{' '}
                  <button className="btn btn-danger btn-sm" onClick={() => setStatus(d._id, 'Rejected')}><IcError /> Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Edit Product Modal ─────────────────────────────────────────────────────
export function EditModal({ product, onClose, onSaved }) {
  const [f, setF] = useState(null);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (product) {
      setF({
        name: product.name || '', sku: product.sku || '', category: product.category || 'pendant',
        price: product.price ?? '', originalPrice: product.originalPrice ?? '',
        description: product.description || '', image: product.image || '',
        isFeatured: !!product.isFeatured, isFlashSale: !!product.isFlashSale,
        inStock: product.inStock !== false, flashSaleDiscount: product.flashSaleDiscount ?? '',
      });
      setMsg(null);
    }
  }, [product]);

  if (!product || !f) return <div className="modal-overlay" />;

  const set = (k) => (e) =>
    setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      const res = await adminFetch(`/api/products/${product._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...f,
          price: Number(f.price),
          originalPrice: f.originalPrice ? Number(f.originalPrice) : undefined,
          flashSaleDiscount: f.flashSaleDiscount ? Number(f.flashSaleDiscount) : 0,
        }),
      });
      const data = await res.json();
      if (res.ok && (data.success || data._id)) {
        setMsg({ ok: true, text: 'Product updated!' });
        onSaved?.();
        setTimeout(onClose, 800);
      } else setMsg({ ok: false, text: data.error || 'Error updating product.' });
    } catch { setMsg({ ok: false, text: 'Could not reach the server.' }); }
    setBusy(false);
  };

  return (
    <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-title">Edit Product</div>
        {msg && (
          <div className={`alert ${msg.ok ? 'alert-success' : 'alert-error'}`} style={{ display: 'block' }}>
            {msg.ok ? <IcSuccess /> : <IcError />} {msg.text}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group full">
            <label>Product Name *</label>
            <input type="text" value={f.name} onChange={set('name')} />
          </div>
          <div className="form-group">
            <label>SKU</label>
            <input type="text" style={{ fontFamily: 'monospace' }} value={f.sku} onChange={set('sku')} />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select value={f.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Sale Price (₹) *</label>
            <input type="number" value={f.price} onChange={set('price')} />
          </div>
          <div className="form-group">
            <label>Original Price (₹)</label>
            <input type="number" value={f.originalPrice} onChange={set('originalPrice')} />
          </div>
          <div className="form-group full">
            <label>Description</label>
            <textarea value={f.description} onChange={set('description')} />
          </div>
          <div className="form-group full">
            <label>Image URL</label>
            <input type="text" value={f.image} onChange={set('image')} />
            {f.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="img-preview" src={f.image} alt="" style={{ display: 'block' }}
                   onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            )}
          </div>
          <div className="form-group full">
            <label>Options</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" checked={f.isFeatured} onChange={set('isFeatured')} /> Featured on Home
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={f.isFlashSale} onChange={set('isFlashSale')} /> Flash Sale
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={f.inStock} onChange={set('inStock')} /> In Stock
              </label>
            </div>
          </div>
          {f.isFlashSale && (
            <div className="form-group">
              <label>Flash Discount (%)</label>
              <input type="number" min="0" max="90" value={f.flashSaleDiscount} onChange={set('flashSaleDiscount')} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn btn-dark" onClick={save} disabled={busy}>
            {busy ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
