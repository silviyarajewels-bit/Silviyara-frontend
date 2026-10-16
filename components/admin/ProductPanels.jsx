'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminFetch, adminGet, fmt, CATEGORIES } from '@/lib/adminApi';
import { IcSuccess, IcError, IcRefresh, IcFlash, ProductIcon } from '@/lib/icons';

const EMPTY = {
  name: '', category: '', sku: '', price: '', originalPrice: '', description: '',
  image: '', isFeatured: false, isFlashSale: false, inStock: true, flashSaleDiscount: '',
};

// ─── Add Product ────────────────────────────────────────────────────────────
export function AddProductPanel({ active, onSaved }) {
  const [f, setF] = useState(EMPTY);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) =>
    setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async () => {
    if (!f.name.trim() || !f.category || !f.price) {
      setMsg({ ok: false, text: 'Name, category and price are required.' });
      return;
    }
    setBusy(true); setMsg(null);
    try {
      const res = await adminFetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: f.name, category: f.category, sku: f.sku,
          price: Number(f.price), originalPrice: f.originalPrice ? Number(f.originalPrice) : undefined,
          description: f.description, image: f.image,
          isFeatured: f.isFeatured, isFlashSale: f.isFlashSale, inStock: f.inStock,
          flashSaleDiscount: f.flashSaleDiscount ? Number(f.flashSaleDiscount) : 0,
        }),
      });
      const data = await res.json();
      if (res.ok && (data.success || data._id)) {
        setMsg({ ok: true, text: 'Product added successfully!' });
        setF(EMPTY);
        onSaved?.();
      } else setMsg({ ok: false, text: data.error || data.msg || 'Error adding product.' });
    } catch { setMsg({ ok: false, text: 'Could not reach the server.' }); }
    setBusy(false);
    setTimeout(() => setMsg(null), 6000);
  };

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="panel-head">
        <div className="panel-title">Add Product</div>
        <div className="panel-subtitle">Add a new jewellery item to your store.</div>
      </div>

      {msg && (
        <div className={`alert ${msg.ok ? 'alert-success' : 'alert-error'}`} style={{ display: 'block' }}>
          {msg.ok ? <IcSuccess /> : <IcError />} {msg.text}
        </div>
      )}

      <div className="form-card">
        <div className="form-grid">
          <div className="form-group full">
            <label>Product Name *</label>
            <input type="text" placeholder="e.g. Silver Lotus Pendant" value={f.name} onChange={set('name')} />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select value={f.category} onChange={set('category')}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>SKU (auto-generated)</label>
            <input type="text" placeholder="Auto-generated if empty" style={{ fontFamily: 'monospace' }}
                   value={f.sku} onChange={set('sku')} />
          </div>
          <div className="form-group">
            <label>Sale Price (₹) *</label>
            <input type="number" placeholder="1999" value={f.price} onChange={set('price')} />
          </div>
          <div className="form-group">
            <label>Original Price (₹)</label>
            <input type="number" placeholder="2499" value={f.originalPrice} onChange={set('originalPrice')} />
          </div>
          <div className="form-group full">
            <label>Description</label>
            <textarea placeholder="Describe the product..." value={f.description} onChange={set('description')} />
          </div>
          <div className="form-group full">
            <label>Image URL</label>
            <input type="text" placeholder="https://i.imgur.com/..." value={f.image} onChange={set('image')} />
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
              <input type="number" placeholder="20" min="0" max="90"
                     value={f.flashSaleDiscount} onChange={set('flashSaleDiscount')} />
            </div>
          )}
        </div>
        <button className="btn btn-dark" onClick={submit} disabled={busy}>
          {busy ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </div>
  );
}

// ─── Manage Products ────────────────────────────────────────────────────────
export function ManageProductsPanel({ active, onEdit, refreshKey }) {
  const [rows, setRows] = useState(null);

  const load = useCallback(async () => {
    setRows(null);
    const d = await adminGet('/api/products');
    setRows(Array.isArray(d) ? d : []);
  }, []);

  useEffect(() => { if (active) load(); }, [active, load, refreshKey]);

  const del = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await adminFetch(`/api/products/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="panel-head">
        <div className="panel-title">Manage Products</div>
        <div className="panel-subtitle">Edit, delete or update your products.</div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>All Products</h3>
          <button className="btn btn-outline btn-sm" onClick={load}><IcRefresh /> Refresh</button>
        </div>
        <table>
          <thead>
            <tr><th>Item</th><th>SKU</th><th>Name</th><th>Category</th><th>Price</th><th>Flash</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows === null ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>No products yet.</td></tr>
            ) : rows.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt="" className="table-img"
                         onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : <ProductIcon category={p.category} style={{ fontSize: 22 }} />}
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.sku || '—'}</td>
                <td>{p.name}</td>
                <td>{(p.category || '').replace(/-/g, ' ')}</td>
                <td>
                  {fmt(p.price)}
                  {p.originalPrice > p.price && (
                    <span style={{ color: 'var(--text3)', textDecoration: 'line-through', marginLeft: 6, fontSize: 12 }}>
                      {fmt(p.originalPrice)}
                    </span>
                  )}
                </td>
                <td>{p.isFlashSale ? <><IcFlash /> {p.flashSaleDiscount || 0}%</> : '—'}</td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => onEdit(p)}>Edit</button>{' '}
                  <button className="btn btn-danger btn-sm" onClick={() => del(p._id, p.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Flash Sale ─────────────────────────────────────────────────────────────
export function FlashSalePanel({ active, refreshKey }) {
  const [rows, setRows] = useState(null);

  const load = useCallback(async () => {
    setRows(null);
    const d = await adminGet('/api/products');
    setRows((Array.isArray(d) ? d : []).filter((p) => p.isFlashSale));
  }, []);

  useEffect(() => { if (active) load(); }, [active, load, refreshKey]);

  const remove = async (id) => {
    await adminFetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isFlashSale: false, flashSaleDiscount: 0 }),
    });
    load();
  };

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="panel-head">
        <div className="panel-title">Flash Sale</div>
        <div className="panel-subtitle">Manage flash sale products and discounts.</div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Flash Sale Items</h3>
          <button className="btn btn-outline btn-sm" onClick={load}><IcRefresh /> Refresh</button>
        </div>
        <table>
          <thead><tr><th>Item</th><th>Name</th><th>Price</th><th>Discount</th><th>Actions</th></tr></thead>
          <tbody>
            {rows === null ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text3)', padding: 30 }}>No flash sale items.</td></tr>
            ) : rows.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt="" className="table-img"
                         onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : <ProductIcon category={p.category} style={{ fontSize: 22 }} />}
                </td>
                <td>{p.name}</td>
                <td>{fmt(p.price)}</td>
                <td>{p.flashSaleDiscount || 0}%</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => remove(p._id)}>
                    Remove from Flash
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
