'use client';

import { useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { IcWhatsApp } from '@/lib/icons';
import FAQ from '@/lib/faqData.json';

export default function FaqPage() {
  // Original accordion: ek waqt mein ek hi answer khula rehta hai
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="faq-hero">
        <p className="section-label">✦ Support &amp; Help</p>
        <h1>Frequently Asked <em>Questions</em></h1>
        <p>Everything you need to know about our silver jewellery, orders, and services.</p>
      </section>

      <section className="faq-section">
        {FAQ.map((cat, ci) => (
          <div className="faq-category" key={cat.title}>
            <h2 className="faq-category-title">{cat.title}</h2>
            {cat.items.map((item, ii) => {
              const key = `${ci}-${ii}`;
              const isOpen = open === key;
              return (
                <div className={`faq-item ${isOpen ? 'active' : ''}`} key={key}>
                  <button
                    className="faq-question"
                    onClick={() => setOpen(isOpen ? null : key)}
                    aria-expanded={isOpen}
                  >
                    {item.q}
                  </button>
                  <div
                    className="faq-answer"
                    style={{ maxHeight: isOpen ? '500px' : '0' }}
                  >
                    <div className="faq-answer-inner">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="faq-cta">
          <h3>Still have questions?</h3>
          <p>Our team is here to help you find the perfect piece.</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
          >
            <IcWhatsApp /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
