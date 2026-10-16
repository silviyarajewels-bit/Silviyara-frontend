import './admin.css';

export const metadata = {
  title: 'Silviyara Admin',
  robots: { index: false, follow: false },
};

/**
 * Admin ka layout — customer site ka navbar/footer/chatbot yahan nahi aata.
 *
 * Yahan koi wrapper div NAHI hai — kyunki login aur dashboard dono ka
 * apna alag page-level layout hai (.admin-login-page / .admin-dash-page).
 * Beech mein ek extra div daalne se dashboard ka flex layout toot jata tha.
 */
export default function AdminLayout({ children }) {
  return children;
}
