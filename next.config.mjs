/** @type {import('next').NextConfig} */

// Express backend kahan chal raha hai (silviyara-backend folder)
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

const nextConfig = {
  /**
   * ─── Backend proxy ────────────────────────────────────────────────────────
   *
   * Frontend ka saara code `fetch('/api/products')` jaise relative path use
   * karta hai — bilkul jaise purani site mein tha. Next.js un requests ko
   * chupke se Express server par bhej deta hai.
   *
   *   Browser  →  Next.js (:3000)  →  Express (:5000)  →  MongoDB
   *
   * Iska fayda:
   *  • Frontend code mein backend ka URL kahin likha hi nahi — ek jagah badlo, bas
   *  • CORS ki koi dikkat nahi (browser ke liye sab same origin hai)
   *
   * ⚠️ BACKEND_URL `next build` ke waqt padha jaata hai, chalte waqt nahi —
   *    Next.js rewrites ko build ke time hi routes-manifest.json mein likh
   *    deta hai. Value badalne ke baad DOBARA BUILD karna zaroori hai
   *    (Vercel par: redeploy). `npm run dev` mein restart hi kaafi hai.
   */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
