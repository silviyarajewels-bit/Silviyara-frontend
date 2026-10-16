'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { WHATSAPP_DISPLAY } from '@/lib/constants';
import { ProductIcon, IcSparkle, IcUser, IcClose, IcRing, IcShipping, IcReturns, IcFlash, IcChat } from '@/lib/icons';

/**
 * Quick reply buttons.
 *  • Icon + label — screen par jo dikhta hai
 *  • text        — jo backend ko bheja jaata hai (bilkul pehle jaisa,
 *                  emoji ke saath, taaki chatbot ka matching na toote)
 */
const QUICK_REPLIES = [
  { Icon: IcRing,     label: 'View collections', text: '💍 View collections' },
  { Icon: IcShipping, label: 'Delivery info',    text: '📦 Delivery info' },
  { Icon: IcReturns,  label: 'Return policy',    text: '↩️ Return policy' },
  { Icon: IcFlash,    label: 'Flash sale',       text: '⚡ Flash sale' },
  { Icon: IcChat,     label: 'Contact us',       text: '💬 Contact us' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const msgsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open || messages.length) return;
    setMessages([
      {
        role: 'bot',
        text: `${getGreeting()}! ✨ Welcome to Silviyara Jewels. I'm here to help you find the perfect piece. What are you looking for today?`,
      },
    ]);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, typing]);

  const openChat = () => { setOpen(true); setUnread(false); };

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;

    const history = messages
      .filter((m) => !m.error)
      .slice(-10)
      .map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', text: m.text }));

    setMessages((m) => [...m, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: data.reply || "I'm sorry, I didn't catch that. Could you try again? ✨",
          product: data.product || null,
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          error: true,
          text: `I'm having a little trouble right now. Please try again or reach us on WhatsApp at ${WHATSAPP_DISPLAY} ✨`,
        },
      ]);
    }
    setTyping(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const lastBot = [...messages].reverse().find((m) => m.role === 'bot' && m.product);

  return (
    <>
      <button
        id="Silviyara-chat-btn"
        className={open ? 'open' : ''}
        aria-label="Open chat assistant"
        title="Chat with Silviyara"
        onClick={() => (open ? setOpen(false) : openChat())}
      >
        <svg className="icon-chat" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.02 2 11c0 2.73 1.28 5.16 3.3 6.82L4 22l4.55-1.97C9.64 20.64 10.79 21 12 21c5.52 0 10-4.02 10-9s-4.48-9-10-9zm1 13H7v-2h6v2zm4-4H7V9h10v2z" />
        </svg>
        <svg className="icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        {unread && <span className="Silviyara-unread-dot" />}
      </button>

      <div
        id="Silviyara-chat-window"
        className={open ? 'open' : ''}
        role="dialog"
        aria-label="Silviyara chat assistant"
      >
        <div className="nch-header">
          <div className="nch-avatar"><IcSparkle /></div>
          <div className="nch-info">
            <div className="nch-name">Silviyara Assistant</div>
            <div className="nch-status">
              <span className="nch-online-dot" />Online — replies instantly
            </div>
          </div>
          <button className="nch-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
            <IcClose />
          </button>
        </div>

        <div className="nch-messages" ref={msgsRef}>
          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div className="nch-bubble-wrap nch-user" key={i}>
                <div className="nch-bubble-avatar"><IcUser /></div>
                <div className="nch-bubble">
                  {m.text.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="nch-bubble-wrap nch-bot" key={i}>
                <div className="nch-bubble-avatar"><IcSparkle /></div>
                <div className="nch-bubble">{m.text}</div>
              </div>
            )
          )}

          {typing && (
            <div className="nch-bubble-wrap nch-bot">
              <div className="nch-bubble-avatar"><IcSparkle /></div>
              <div className="nch-bubble">
                <div className="nch-typing"><span /><span /><span /></div>
              </div>
            </div>
          )}

          {lastBot?.product && (
            <div className="nch-suggestions">
              <Link href="/shop" className="nch-primary-card">
                <span className="nch-primary-emoji">
                  <ProductIcon category={lastBot.product.category} emoji={lastBot.product.emoji} />
                </span>
                <span className="nch-primary-info">
                  <span className="nch-scard-name">{lastBot.product.name}</span>
                  <span className="nch-scard-price">
                    {lastBot.product.price}
                    {lastBot.product.originalPrice && (
                      <span className="nch-scard-orig">{lastBot.product.originalPrice}</span>
                    )}
                  </span>
                </span>
                <span className="nch-primary-arrow">→</span>
              </Link>

              {lastBot.suggestions?.length > 0 && (
                <div className="nch-scards">
                  {lastBot.suggestions.map((s) => (
                    <Link href="/shop" className="nch-scard" key={s.id}>
                      <div className="nch-scard-emoji"><ProductIcon category={s.category} emoji={s.emoji} /></div>
                      <div className="nch-scard-name">{s.name}</div>
                      <div className="nch-scard-price">
                        {s.price}
                        {s.originalPrice && <span className="nch-scard-orig">{s.originalPrice}</span>}
                      </div>
                      <div className="nch-scard-btn">View</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {messages.length <= 1 && !typing && (
            <div className="nch-quick-replies">
              {QUICK_REPLIES.map((q) => (
                <button className="nch-qr" key={q.text} onClick={() => send(q.text)}>
                  <q.Icon /> {q.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nch-input-area">
          <textarea
            ref={inputRef}
            id="Silviyara-chat-input"
            placeholder="Ask me anything about jewellery..."
            rows={1}
            aria-label="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button className="nch-send-btn" onClick={() => send()} disabled={typing} aria-label="Send message">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </button>
        </div>

        <div className="nch-footer">AI Assistant · Silviyara Jewels</div>
      </div>
    </>
  );
}
