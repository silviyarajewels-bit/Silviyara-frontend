import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { UIProvider } from '@/context/UIContext';
import Chrome from '@/components/Chrome';
import IconProvider from '@/components/IconProvider';

/**
 * Wahi fonts jo purani site mein the — Playfair Display + DM Sans.
 * Farq sirf itna: pehle har page load par Google se download hote the,
 * ab /fonts folder se aate hain (self-hosted).
 *  → dikhne mein bilkul same, par tez load hote hain
 *  → build ke liye internet ki zarurat nahi
 *  → user ka browser Google ko request nahi bhejta (privacy)
 */
const playfair = localFont({
  src: [
    { path: '../fonts/playfair-display-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/playfair-display-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/playfair-display-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/playfair-display-latin-500-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = localFont({
  src: [
    { path: '../fonts/dm-sans-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/dm-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/dm-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-dmsans',
  display: 'swap',
});

export const metadata = {
  title: 'Silviyara Jewels — Silver Jewellery',
  description:
    'Handpicked 925 Sterling Silver Jewellery from Lucknow. Pendants, earrings, rings, anklets, bracelets, necklaces and hair accessories.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Theme ko paint se PEHLE set karta hai — warna page load par white flash dikhta hai
const themeScript = `
(function(){
  try{
    var t = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
  }catch(e){
    document.documentElement.setAttribute('data-theme','light');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <IconProvider>
          <ThemeProvider>
            <AuthProvider>
              <CartProvider>
                <UIProvider>
                  <Chrome>{children}</Chrome>
                </UIProvider>
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </IconProvider>
      </body>
    </html>
  );
}
