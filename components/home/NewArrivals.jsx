'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES } from '@/lib/constants';

export default function NewArrivals({ products, loading, isDemo }) {
  const [filter, setFilter] = useState('all');

  const shown =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  return (
    <section className="section products-section">
      <div className="section-header">
        <p className="section-label">✦ Featured</p>
        <h2 className="section-title">New Arrivals</h2>
      </div>

      <div className="filter-row">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {/* FIX: original homepage par hair-accessories ka button missing tha */}
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={`filter-btn ${filter === c.key ? 'active' : ''}`}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text2)', gridColumn: '1/-1' }}>
            <p style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1.2rem' }}>
              Loading products...
            </p>
          </div>
        ) : shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text2)', gridColumn: '1/-1' }}>
            <p style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1.2rem' }}>
              No products in this category yet
            </p>
          </div>
        ) : (
          shown.map((p) => <ProductCard key={p._id} product={p} />)
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
    </section>
  );
}
