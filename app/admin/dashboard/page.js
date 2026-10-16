'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatsPanel from '@/components/admin/StatsPanel';
import { AddProductPanel, ManageProductsPanel, FlashSalePanel } from '@/components/admin/ProductPanels';
import OrdersPanel from '@/components/admin/OrdersPanel';
import { MessagesPanel, CustomDesignsPanel, EditModal } from '@/components/admin/MiscPanels';
import {
  IcDashboard, IcProducts, IcOrders, IcFlash, IcMail, IcDesign,
  IcDiamond, IcSun, IcMoon,
} from '@/lib/icons';
import { FiPlus } from 'react-icons/fi';

const NAV = [
  { section: 'Overview' },
  { key: 'dashboard',        Icon: IcDashboard, label: 'Dashboard' },
  { section: 'Products' },
  { key: 'add-product',      Icon: FiPlus,      label: 'Add Product' },
  { key: 'manage-products',  Icon: IcProducts,  label: 'Manage Products' },
  { section: 'Sales & Orders' },
  { key: 'orders',           Icon: IcOrders,    label: 'Orders' },
  { key: 'flash-sale',       Icon: IcFlash,     label: 'Flash Sale' },
  { section: 'Messages' },
  { key: 'messages',         Icon: IcMail,      label: 'Contact Messages' },
  { section: 'Services' },
  { key: 'custom-designs',   Icon: IcDesign,    label: 'Custom Designs' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [panel, setPanel] = useState('dashboard');
  const [editing, setEditing] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dark, setDark] = useState(false);

  // Login guard
  useEffect(() => {
    if (!localStorage.getItem('Silviyara_admin_token')) router.replace('/admin');
    else setReady(true);
  }, [router]);

  // Theme — admin ka apna key hai
  useEffect(() => {
    const t = localStorage.getItem('Silviyara_admin_theme') === 'dark';
    setDark(t);
    document.documentElement.setAttribute('data-theme', t ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('Silviyara_admin_theme', next ? 'dark' : 'light');
  };

  const logout = () => {
    localStorage.removeItem('Silviyara_admin_token');
    router.push('/admin');
  };

  if (!ready) return null;

  return (
    <div className="admin-dash-page">
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><IcDiamond /></div>
          <div className="sidebar-logo-text">Silviyara <em>Admin</em></div>
        </div>
        <nav className="sidebar-nav">
          {NAV.map((n, i) =>
            n.section ? (
              <div className="nav-section" key={`s${i}`}>{n.section}</div>
            ) : (
              <button
                key={n.key}
                className={`nav-item ${panel === n.key ? 'active' : ''}`}
                onClick={() => setPanel(n.key)}
              >
                <span className="nav-icon"><n.Icon /></span> {n.label}
              </button>
            )
          )}
        </nav>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-logo">Silviyara <em>Jewels</em></div>
            <span className="topbar-badge">Admin</span>
          </div>
          <div className="topbar-right">
            <button className="theme-btn" onClick={toggleTheme} title="Toggle dark mode">
              {dark ? <IcSun /> : <IcMoon />}
            </button>
            <Link href="/" target="_blank"><button className="btn btn-dark">View Site</button></Link>
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="content">
          <StatsPanel active={panel === 'dashboard'} />
          <AddProductPanel
            active={panel === 'add-product'}
            onSaved={() => setRefreshKey((k) => k + 1)}
          />
          <ManageProductsPanel
            active={panel === 'manage-products'}
            onEdit={setEditing}
            refreshKey={refreshKey}
          />
          <OrdersPanel active={panel === 'orders'} />
          <FlashSalePanel active={panel === 'flash-sale'} refreshKey={refreshKey} />
          <MessagesPanel active={panel === 'messages'} />
          <CustomDesignsPanel active={panel === 'custom-designs'} />
        </div>
      </div>

      <EditModal
        product={editing}
        onClose={() => setEditing(null)}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
