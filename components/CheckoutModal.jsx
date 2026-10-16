'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, WHATSAPP_NUMBER } from '@/lib/constants';
import {
  ProductIcon, IcClose, IcCheck, IcTrack, IcRefresh, IcCod, IcCard, IcGift,
  IcOrders, IcProcessing, IcPacked, IcShipped, IcDelivered, IcWhatsApp,
} from '@/lib/icons';

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];

const STEPS = [
  { Dot: IcOrders,     label: 'Order Placed' },
  { Dot: IcProcessing, label: 'Processing' },
  { Dot: IcPacked,     label: 'Packed' },
  { Dot: IcShipped,    label: 'Shipped' },
  { Dot: IcDelivered,  label: 'Delivered' },
];

const EMPTY = {
  name: '', email: '', mobile: '', address: '', landmark: '',
  city: '', pin: '', state: '', giftWrap: false, giftMessage: '',
};

/**
 * Order ki detail ka WhatsApp link.
 *
 * ⚠️ PEHLE KYA HOTA THA (aur kyun badla):
 * Original site har successful order ke baad apne aap `window.open(wa.me/...)`
 * chala deti thi — chahe customer ne "Order via WhatsApp" dabaya ho ya normal
 * COD/Online checkout kiya ho. Do dikkatein thi:
 *
 *   1. Customer ko bina pooche WhatsApp ki nayi tab mein phenk diya jaata tha.
 *      Premium store par ye bahut kharaab lagta hai — aur popup blocker isse
 *      chup-chaap rok bhi deta hai.
 *   2. Wo message *apne aap send nahi hota* — customer ko khud Send dabana
 *      padta hai. Matlab dukaan ki notification customer ke bharose thi.
 *
 * Ab ye function sirf LINK banata hai. Khulta tabhi hai jab customer khud
 * button dabaye. Order ka save hona is link se bilkul alag hai — order pehle
 * hi MongoDB mein chala jaata hai aur admin panel mein dikhta hai, isliye
 * WhatsApp bheja ya nahi, isse order par koi farak nahi padta.
 *
 * NOTE: Is message ke emoji waise ke waise rahenge — WhatsApp plain text leta
 * hai, SVG icon wahan dikh hi nahi sakta.
 */
function orderWhatsAppUrl(order, orderId) {
  try {
    const items = (order.items || [])
      .map((i) => `• ${i.name}${i.sku ? ' (' + i.sku + ')' : ''} × ${i.qty || 1} — ${formatPrice(i.price)}`)
      .join('\n');
    const date = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
    const msg =
      `🛍️ NEW ORDER — Silviyara Jewels\n\n` +
      `👤 ${order.customerName || 'Customer'}\n` +
      `📧 ${order.customerEmail || 'N/A'}\n` +
      `📞 ${order.customerMobile || 'N/A'}\n` +
      `📍 ${order.customerAddress || ''}${order.customerLandmark ? ', ' + order.customerLandmark : ''}\n` +
      `${order.customerCity || ''}${order.customerState ? ', ' + order.customerState : ''} — ${order.customerPin || ''}\n\n` +
      `📦 Items:\n${items}\n\n` +
      `💰 Total: ${formatPrice(order.totalAmount)}\n` +
      `💳 Payment: ${order.paymentMethod || 'COD'}${order.paymentStatus === 'Paid' ? ' (Paid ✓)' : ' (Pending)'}\n\n` +
      `📝 Order ID: ${orderId || 'N/A'}\n🕐 ${date}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  } catch (e) {
    console.log('WA link error:', e);
    return '';
  }
}

// Delivery ETA — aaj se 6 din (original L1567–1572)
function deliveryETA() {
  const d = new Date();
  d.setDate(d.getDate() + 6);
  return `By ${d.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}`;
}

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen } = useUI();
  const { cart, cartTotal, clearCart, syncCart } = useCart();
  const { user, token } = useAuth();

  const [form, setForm] = useState(EMPTY);
  const [payMethod, setPayMethod] = useState('razorpay');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [pane, setPane] = useState('form');        // form | success | failure
  const [success, setSuccess] = useState(null);
  const [failure, setFailure] = useState(null);
  const [eta, setEta] = useState('');

  // Logged-in user ki details apne aap bhar do
  useEffect(() => {
    if (user && checkoutOpen) {
      setForm((f) => ({
        ...f,
        name: f.name || user.name || '',
        email: f.email || user.email || '',
        mobile: f.mobile || user.phone || '',
      }));
    }
  }, [user, checkoutOpen]);

  const close = () => {
    setCheckoutOpen(false);
    setTimeout(() => { setPane('form'); setErr(''); setSuccess(null); setFailure(null); }, 350);
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Original getDeliveryDetails() ki validation — mobile regex bhi wahi
  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address';
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, '').slice(-10)))
      return 'Please enter a valid 10-digit Indian mobile number';
    if (!form.address.trim()) return 'Please enter your delivery address';
    if (!form.city.trim()) return 'Please enter your city';
    if (!/^\d{6}$/.test(form.pin)) return 'Please enter a valid 6-digit PIN code';
    if (!form.state) return 'Please select your state';
    if (!cart.length) return 'Your cart is empty';
    return null;
  };

  const buildOrder = (extra = {}) => ({
    customerId: user?.id || undefined,
    customerName: form.name,
    customerEmail: form.email,
    customerMobile: form.mobile,
    customerAddress: form.address,
    customerLandmark: form.landmark,
    customerCity: form.city,
    customerState: form.state,
    customerPin: form.pin,
    items: cart.map((i) => ({
      name: i.name, price: i.price, qty: i.qty || 1,
      emoji: i.emoji || '💎',              // WhatsApp message ke liye
      category: i.category || '',          // admin panel item ka icon isse
      id: i.id || i._id,
      sku: i.sku || '', image: i.image || '',
    })),
    totalAmount: cartTotal,
    giftWrap: form.giftWrap,
    giftMessage: form.giftMessage,
    ...extra,
  });

  /**
   * Response hamesha JSON nahi hota.
   * Agar backend band ho to Next.js ka proxy HTML ka error page bhejta hai —
   * us par seedha res.json() karne se exception aa jaata tha aur user ko
   * sirf "Could not reach the server" dikhta tha, asli wajah kabhi pata
   * nahi chalti thi. Ab saaf message milta hai.
   */
  const readJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return {
        success: false,
        message:
          res.status >= 500
            ? 'Server abhi jawab nahi de raha. Thodi der baad koshish karein, ya Cash on Delivery chunein.'
            : `Server error (${res.status}). Please try again.`,
      };
    }
  };

  const saveOrder = async (payload) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {}),
      },
      body: JSON.stringify(payload),
    });
    return readJson(res);
  };

  const showSuccess = (data, sent) => {
    const id = data.orderNumber || data.orderId || '';
    // Total aur payment status SERVER ka maano — wahi database mein save hua hai
    // (server daam khud jodta hai aur Razorpay se check karke hi "Paid" lagata hai)
    const order = {
      ...sent,
      totalAmount: data.totalAmount ?? sent.totalAmount,
      paymentStatus: data.paymentStatus ?? sent.paymentStatus,
    };
    // Link sirf bana ke rakh rahe hain — khulega tabhi jab customer khud dabaye
    setSuccess({ id, method: order.paymentMethod, waUrl: order ? orderWhatsAppUrl(order, id) : '' });
    setEta(deliveryETA());
    setPane('success');
    clearCart();
  };

  const showFailure = (message, paymentId) => {
    setFailure({ message, paymentId });
    setPane('failure');
    setBusy(false);
  };

  const placeCOD = async () => {
    const order = buildOrder({ paymentMethod: 'COD', paymentStatus: 'Pending' });
    const data = await saveOrder(order);
    if (data.success) showSuccess(data, order);
    else setErr(data.message || 'Could not place your order. Please try again.');
  };

  const placeRazorpay = async () => {
    // Items bhejte hain, amount nahi — server khud daam jodta hai. Cart mein
    // koi galti ho to yahin ruk jaata hai, customer ke paise katne se PEHLE.
    const createRes = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: buildOrder().items }),
    });
    const created = await readJson(createRes);
    if (!created.success) {
      setErr(created.message || 'Payment gateway unavailable. Please choose Cash on Delivery.');
      setBusy(false);
      return;
    }
    // Screen par jo total dikha, Razorpay bhi wahi maange — warna aage mat badho
    if (created.totalAmount != null && created.totalAmount !== cartTotal) {
      setErr(
        `Cart ka total badal gaya hai (ab ${formatPrice(created.totalAmount)}). ` +
        'Page refresh karke dobara try karein.'
      );
      setBusy(false);
      return;
    }
    if (typeof window.Razorpay === 'undefined') {
      setErr('Payment window failed to load. Please refresh and try again.');
      setBusy(false);
      return;
    }

    const rzp = new window.Razorpay({
      key: created.keyId,
      amount: created.amount,
      currency: created.currency,
      name: 'Silviyara Jewels',
      description: `${cart.length} item(s)`,
      order_id: created.orderId,
      prefill: { name: form.name, email: form.email, contact: form.mobile },
      theme: { color: '#c9a84c' },
      handler: async (response) => {
        try {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verified = await verifyRes.json();
          if (!verified.success) {
            showFailure(
              'We could not verify your payment. If an amount was deducted, please contact us on WhatsApp.',
              response.razorpay_payment_id
            );
            return;
          }
          const order = buildOrder({
            paymentMethod: 'Razorpay',
            paymentStatus: 'Paid',
            paymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          });
          const data = await saveOrder(order);
          if (data.success) showSuccess(data, order);
          else
            showFailure(
              'Payment succeeded but the order could not be saved' +
                (data.message ? ` (${data.message})` : '') +
                '. Please contact us on WhatsApp with this payment ID — your money is safe.',
              response.razorpay_payment_id
            );
        } catch {
          showFailure('Something went wrong after payment. Please contact us on WhatsApp.', response.razorpay_payment_id);
        }
        setBusy(false);
      },
      modal: { ondismiss: () => setBusy(false) },
    });

    // Gateway-side decline — iske bina UI "Processing..." par atak jata tha
    rzp.on('payment.failed', (resp) => {
      showFailure(
        resp?.error?.description || 'Your payment could not be completed. No amount has been deducted from your account.',
        resp?.error?.metadata?.payment_id
      );
    });

    rzp.open();
  };

  const handlePay = async () => {
    const v = validate();
    if (v) { setErr(v); return; }
    setErr(''); setBusy(true);
    try {
      // Pehle cart ke daam live products se milao. Kuch badla ho to customer
      // naya total dekh le, tabhi aage badhe — bina bataye daam nahi badalte.
      const changes = await syncCart();
      if (changes.length) {
        setErr(`Aapke cart mein badlav hua: ${changes.join(' · ')}. Naya total dekh kar dobara dabayein.`);
        setBusy(false);
        return;
      }

      if (payMethod === 'cod') { await placeCOD(); setBusy(false); }
      else await placeRazorpay();
    } catch (e) {
      // yahan tak network hi fail hua hai (backend band / net gaya)
      console.error('Checkout error:', e);
      setErr('Server se connection nahi ho paaya. Internet check karein, ya Cash on Delivery chunein.');
      setBusy(false);
    }
  };

  const backToForm = (method) => {
    setPane('form');
    setFailure(null);
    setPayMethod(method);
    setBusy(false);
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div
        className={`checkout-modal-overlay ${checkoutOpen ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="checkout-modal">
          <div className="checkout-modal-head">
            <h3>
              {pane === 'success' ? 'Order Confirmed' : pane === 'failure' ? 'Payment Failed' : 'Checkout Details'}
            </h3>
            <button className="checkout-modal-close" onClick={close} aria-label="Close"><IcClose /></button>
          </div>

          {/* ─── SUCCESS ─────────────────────────────────────────────── */}
          {pane === 'success' && (
            <div className="checkout-success" style={{ display: 'block' }}>
              <div className="os-wrap">
                <div className="os-icon-ring"><IcCheck /></div>
                <p className="os-eyebrow">✦ Order Confirmed</p>
                <h3 className="os-title">Order Placed Successfully!</h3>
                <p className="os-subtitle">
                  Thank you for shopping with <strong>Silviyara Jewels</strong>. Your order is now
                  being processed.
                </p>
                {success?.id && <p className="os-id">Order ID: {success.id}</p>}

                <div className="os-tracker">
                  <p className="os-tracker-title">Order Status</p>
                  <div className="os-steps">
                    <div className="os-progress-line" style={{ width: '0%' }} />
                    {STEPS.map((s, i) => (
                      <div className={`os-step ${i === 0 ? 'active' : ''}`} key={s.label}>
                        <div className="os-step-dot"><s.Dot /></div>
                        <div className="os-step-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="os-eta">
                  <p>Estimated Delivery</p>
                  <p>{eta || 'Within 5–7 business days'}</p>
                </div>

                {/*
                  .os-foot sticky hai — chhoti screen par bhi "Continue Shopping"
                  hamesha dikhta rahega, content chahe kitna bhi scroll ho.
                */}
                <div className="os-foot">
                  <div className="os-actions">
                    <button className="os-btn-main" onClick={close}>Continue Shopping</button>
                    <Link href="/track" className="os-btn-track" onClick={close}><IcTrack /> Track Order</Link>
                  </div>

                  {/*
                    Pehle ye WhatsApp apne aap khul jaata tha. Ab ek chhota optional
                    link hai — customer chahe to dabaye, na chahe to order phir bhi
                    confirm hai (wo already database mein save ho chuka hai).
                  */}
                  {success?.waUrl && (
                    <p className="os-wa-line">
                      Want a copy on WhatsApp?{' '}
                      <a href={success.waUrl} target="_blank" rel="noopener noreferrer">
                        <IcWhatsApp /> Send order details
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── FAILURE ─────────────────────────────────────────────── */}
          {pane === 'failure' && (
            <div className="checkout-failure" style={{ display: 'block' }}>
              <div className="os-wrap">
                <div
                  className="os-icon-ring"
                  style={{
                    background: 'linear-gradient(135deg,#c0392b,#e74c3c)',
                    boxShadow: '0 8px 24px rgba(231,76,60,0.35)',
                  }}
                >
                  <IcClose />
                </div>
                <p className="os-eyebrow" style={{ color: '#e74c3c' }}>✦ Payment Unsuccessful</p>
                <h3 className="os-title">Payment Failed</h3>
                <p className="os-subtitle">
                  {failure?.message ||
                    'Your payment could not be completed. No amount has been deducted from your account.'}
                </p>
                {failure?.paymentId && (
                  <p className="os-id" style={{ borderColor: 'rgba(231,76,60,0.3)', color: '#e74c3c' }}>
                    Payment ID: {failure.paymentId}
                  </p>
                )}

                <div style={{
                  background: 'linear-gradient(135deg,rgba(231,76,60,0.08),rgba(231,76,60,0.03))',
                  border: '1px solid rgba(231,76,60,0.2)', borderRadius: 4,
                  padding: '.75rem 1rem', marginBottom: '1.25rem', textAlign: 'left',
                }}>
                  <p style={{ fontSize: '.65rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#e74c3c', marginBottom: '.2rem' }}>
                    What can you do?
                  </p>
                  <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                    Try again with a different payment method, or choose Cash on Delivery.
                  </p>
                </div>

                <div className="os-foot">
                  <div className="os-actions">
                    <button
                      className="os-btn-main"
                      style={{ background: 'linear-gradient(135deg,#5a4ff3,#7e6ff8)', color: '#fff' }}
                      onClick={() => backToForm('razorpay')}
                    >
                      <IcRefresh /> Try Again
                    </button>
                    <button
                      className="os-btn-track"
                      style={{ borderColor: 'rgba(39,174,96,0.4)', color: '#27ae60' }}
                      onClick={() => backToForm('cod')}
                    >
                      <IcCod /> Use Cash on Delivery
                    </button>
                  </div>

                  <p className="os-wa-line">
                    Need help?{' '}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! My payment failed. Please help.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── FORM ────────────────────────────────────────────────── */}
          {pane === 'form' && (
            <>
              <div className="checkout-modal-body">
                <div className="co-summary" style={{ maxHeight: 100, overflowY: 'auto' }}>
                  {cart.map((i) => (
                    <div
                      key={i.id || i._id}
                      style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.82rem', padding: '.3rem 0' }}
                    >
                      <span><ProductIcon category={i.category} emoji={i.emoji} /> {i.name} × {i.qty || 1}</span>
                      <span>{formatPrice(i.price * (i.qty || 1))}</span>
                    </div>
                  ))}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', fontWeight: 500,
                    borderTop: '1px solid var(--border)', marginTop: '.5rem', paddingTop: '.5rem',
                  }}>
                    <span>Total</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                </div>

                <p style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '.8rem' }}>
                  Delivery Details
                </p>

                <div className="checkout-form-group">
                  <label>Full Name *</label>
                  <input type="text" className="checkout-input" placeholder="e.g. Aditi Sharma" value={form.name} onChange={set('name')} />
                </div>
                <div className="checkout-form-group">
                  <label>Email Address *</label>
                  <input type="email" className="checkout-input" placeholder="e.g. aditi@gmail.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="checkout-form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" className="checkout-input" placeholder="10-digit mobile number" value={form.mobile} onChange={set('mobile')} />
                </div>
                <div className="checkout-form-group">
                  <label>Delivery Address *</label>
                  <textarea className="checkout-input" placeholder="House/Flat No., Street, Area" rows={2} value={form.address} onChange={set('address')} />
                </div>
                <div className="checkout-form-group">
                  <label>Landmark (Optional)</label>
                  <input type="text" className="checkout-input" placeholder="Near temple, school, etc." value={form.landmark} onChange={set('landmark')} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="checkout-form-group">
                    <label>City *</label>
                    <input type="text" className="checkout-input" value={form.city} onChange={set('city')} />
                  </div>
                  <div className="checkout-form-group">
                    <label>PIN Code *</label>
                    <input type="text" className="checkout-input" maxLength={6} value={form.pin} onChange={set('pin')} />
                  </div>
                </div>

                <div className="checkout-form-group">
                  <label>State *</label>
                  <select className="checkout-input" value={form.state} onChange={set('state')}>
                    <option value="">Select State</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: '.75rem', padding: '1rem',
                    border: `1.5px solid ${form.giftWrap ? 'var(--gold-accent)' : 'var(--border)'}`,
                    borderRadius: 6, cursor: 'pointer', transition: 'all .3s',
                    background: form.giftWrap ? 'rgba(201,168,76,0.06)' : 'var(--bg2)',
                  }}>
                    <input
                      type="checkbox"
                      checked={form.giftWrap}
                      onChange={(e) => setForm({ ...form, giftWrap: e.target.checked })}
                      style={{ width: 18, height: 18, accentColor: '#c9a84c', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontSize: '.85rem', fontWeight: 500 }}>
                        <IcGift /> Add Gift Wrapping{' '}
                        <span style={{ fontSize: '.7rem', color: '#27ae60', fontWeight: 600 }}>FREE</span>
                      </div>
                      <div style={{ fontSize: '.72rem', color: 'var(--text2)', marginTop: '.15rem' }}>
                        Premium silver box + personal message card included
                      </div>
                    </div>
                  </label>
                  {form.giftWrap && (
                    <textarea
                      className="checkout-input"
                      placeholder="Write your personal message (optional)..."
                      rows={2}
                      style={{ resize: 'none', marginTop: '.5rem' }}
                      value={form.giftMessage}
                      onChange={set('giftMessage')}
                    />
                  )}
                </div>

                <p style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--silver)', margin: '1.25rem 0 .8rem' }}>
                  Payment Method
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', marginBottom: '1rem' }}>
                  <div
                    className="pay-method-card"
                    onClick={() => setPayMethod('razorpay')}
                    style={{
                      border: `2px solid ${payMethod === 'razorpay' ? 'var(--gold-accent)' : 'var(--border)'}`,
                      borderRadius: 6, padding: '1rem', cursor: 'pointer', textAlign: 'center', position: 'relative',
                      background: payMethod === 'razorpay' ? 'rgba(201,168,76,0.06)' : 'var(--bg2)',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: -8, right: 8, background: 'var(--gold-accent)',
                      color: '#fff', fontSize: '.55rem', padding: '2px 7px', borderRadius: 20, fontWeight: 500,
                    }}>Recommended</div>
                    <div style={{ fontSize: '1.6rem', marginBottom: '.4rem' }}><IcCard /></div>
                    <div style={{ fontSize: '.78rem', fontWeight: 500, color: 'var(--text)' }}>Pay Online</div>
                    <div style={{ fontSize: '.65rem', color: 'var(--text2)', marginTop: '.15rem' }}>UPI · Card · Wallet</div>
                  </div>

                  <div
                    className="pay-method-card"
                    onClick={() => setPayMethod('cod')}
                    style={{
                      border: `2px solid ${payMethod === 'cod' ? 'var(--gold-accent)' : 'var(--border)'}`,
                      borderRadius: 6, padding: '1rem', cursor: 'pointer', textAlign: 'center',
                      background: payMethod === 'cod' ? 'rgba(201,168,76,0.06)' : 'var(--bg2)',
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', marginBottom: '.4rem' }}><IcCod /></div>
                    <div style={{ fontSize: '.78rem', fontWeight: 500, color: 'var(--text)' }}>Cash on Delivery</div>
                    <div style={{ fontSize: '.65rem', color: 'var(--text2)', marginTop: '.15rem' }}>Pay when delivered</div>
                  </div>
                </div>

                {err && (
                  <p style={{
                    color: '#c0392b', fontSize: '.8rem', marginBottom: '.5rem', padding: '.7rem .9rem',
                    background: 'rgba(192,57,43,.08)', border: '1px solid rgba(192,57,43,.25)', borderRadius: 6,
                  }}>
                    {err}
                  </p>
                )}
              </div>

              {/* Sticky footer — original jaisa, taaki lambi form par button dikhta rahe */}
              <div className="checkout-modal-foot">
                <button
                  className="btn-primary"
                  onClick={handlePay}
                  disabled={busy}
                  style={{
                    width: '100%', padding: 14, fontSize: '0.9rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', border: 'none', fontWeight: 600, cursor: 'pointer',
                    borderRadius: 3, transition: 'all .3s',
                    background: payMethod === 'cod'
                      ? 'transparent'
                      : 'linear-gradient(135deg,#c9a84c,#e6c56a)',
                    color: payMethod === 'cod' ? 'var(--text)' : '#111',
                    boxShadow: payMethod === 'cod' ? 'inset 0 0 0 1.5px var(--border)' : 'none',
                  }}
                >
                  {busy
                    ? 'Processing...'
                    : payMethod === 'cod'
                      ? `Place Order · ${formatPrice(cartTotal)}`
                      : `Pay ${formatPrice(cartTotal)}`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
