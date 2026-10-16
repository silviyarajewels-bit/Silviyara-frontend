'use client';

import { Suspense, useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/lib/useProducts';
import { CATEGORIES, SHOP_FALLBACK } from '@/lib/constants';
import { IcGridView, IcListView } from '@/lib/icons';

const SORTS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

function ShopContent() {
  const params = useSearchParams();
  const urlCat = params.get('cat');
  // FIX: original navbar /shop?search= par bhejta tha par shop.html ise padhta hi
  // nahi tha — har search unfiltered catalogue par land karta tha.
  const search = (params.get('search') || '').trim().toLowerCase();

  const { products, loading, isDemo } = useProducts(undefined, SHOP_FALLBACK);

  // 'silver' ek asli category nahi hai — nav ka tab hai, isliye 'all' maano
  const initialCat = urlCat && urlCat !== 'silver' ? urlCat : 'all';
  const [cat, setCat] = useState(initialCat);
  const [minP, setMinP] = useState(0);
  const [maxP, setMaxP] = useState(10000);
  const [minInput, setMinInput] = useState('0');
  const [maxInput, setMaxInput] = useState('10000');
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catOk = cat === 'all' || p.category === cat;
      const priceOk = p.price >= minP && p.price <= maxP;
      const searchOk =
        !search ||
        (p.name || '').toLowerCase().includes(search) ||
        (p.category || '').replace(/-/g, ' ').toLowerCase().includes(search) ||
        (p.description || '').toLowerCase().includes(search);
      return catOk && priceOk && searchOk;
    });
    list = [...list];
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return list;
  }, [products, cat, minP, maxP, sort, search]);

  const applyPrice = () => {
    setMinP(parseInt(minInput, 10) || 0);
    setMaxP(parseInt(maxInput, 10) || 999999);
  };

  return (
    <>
      <div className="page-header">
        <p className="breadcrumb"><Link href="/">Home</Link> / Shop</p>
        <h1>{search ? `Search: "${params.get('search')}"` : 'All Collections'}</h1>
        <p>Handpicked sterling silver jewellery</p>
      </div>

      <div className="shop-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <p className="sidebar-title">Categories</p>
            <div className="cat-filter">
              <button
                className={`cat-filter-btn ${cat === 'all' ? 'active' : ''}`}
                onClick={() => setCat('all')}
              >
                All Products
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  className={`cat-filter-btn ${cat === c.key ? 'active' : ''}`}
                  onClick={() => setCat(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">Price Range</p>
            <div className="price-inputs">
              <input
                type="number" className="price-input" placeholder="Min"
                value={minInput} onChange={(e) => setMinInput(e.target.value)}
              />
              <span className="price-sep">—</span>
              <input
                type="number" className="price-input" placeholder="Max"
                value={maxInput} onChange={(e) => setMaxInput(e.target.value)}
              />
            </div>
            <button className="apply-price" onClick={applyPrice}>Apply</button>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">Sort By</p>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </aside>

        <main className="shop-main">
          <div className="mobile-filters">
            <select
              className="sort-select"
              style={{ marginBottom: '.75rem' }}
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div className="shop-toolbar">
            <p className="results-count">
              {loading
                ? 'Loading...'
                : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
            </p>
            <div className="view-toggle">
              <button
                className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')} title="Grid"
              ><IcGridView /></button>
              <button
                className={`view-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')} title="List"
              ><IcListView /></button>
            </div>
          </div>

          <div className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>
            {loading ? (
              <div className="no-products"><p>Loading products...</p></div>
            ) : filtered.length === 0 ? (
              <div className="no-products">
                <p>No products found</p>
                <p style={{ fontSize: '.85rem', marginTop: '.5rem' }}>
                  {search
                    ? 'Try a different search term, category or price range'
                    : 'Try a different category or price range'}
                </p>
              </div>
            ) : (
              filtered.map((p) => <ProductCard key={p._id} product={p} />)
            )}
          </div>

          {isDemo && !loading && (
            <p style={{
              textAlign: 'center', marginTop: '1.5rem', fontSize: '.72rem',
              color: 'var(--text2)', letterSpacing: '.05em', opacity: .7,
            }}>
              Showing sample pieces — live catalogue unavailable
            </p>
          )}
        </main>
      </div>
    </>
  );
}

export default function ShopPage() {
  // useSearchParams ko Suspense chahiye (Next.js requirement)
  return (
    <Suspense fallback={<div className="page-header"><h1>All Collections</h1></div>}>
      <ShopContent />
    </Suspense>
  );
}
