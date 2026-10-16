'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/constants';
import { ProductIcon, IcDiamond } from '@/lib/icons';

function CatCard({ cat }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link href={`/shop?cat=${cat.key}`} className="cat-card">
      <div className="cat-img-wrap">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="cat-img"
            src={`/images/${cat.key}.png`}
            alt={cat.label}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="cat-img-fallback" style={{ display: 'block' }}>
            <ProductIcon category={cat.key} />
          </span>
        )}
      </div>
      <div className="cat-body">
        <span className="cat-name">{cat.label}</span>
      </div>
    </Link>
  );
}

function CatSet() {
  return (
    <div className="cat-set">
      {CATEGORIES.map((c) => <CatCard key={c.key} cat={c} />)}
      <a href="#" className="cat-card" style={{ opacity: 0.5, pointerEvents: 'none' }}>
        <div className="cat-img-wrap">
          <span className="cat-img-fallback" style={{ display: 'block' }}><IcDiamond /></span>
        </div>
        <div className="cat-body">
          <span className="cat-name">Gold</span>
          <span className="cat-count">Coming Soon</span>
        </div>
      </a>
    </div>
  );
}

export default function CategoryMarquee() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="section-label">✦ Browse By Category</p>
        <h2 className="section-title">Shop Our Collections</h2>
      </div>
      <div className="categories-marquee">
        <div className="categories-track">
          {/* 4 sets — seamless infinite scroll ke liye (original jaisa) */}
          <CatSet /><CatSet /><CatSet /><CatSet />
        </div>
      </div>
    </section>
  );
}
