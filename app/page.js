'use client';

import Hero from '@/components/home/Hero';
import CategoryMarquee from '@/components/home/CategoryMarquee';
import NewArrivals from '@/components/home/NewArrivals';
import FlashSale from '@/components/home/FlashSale';
import { WhyUs, CustomDesignCTA, Gifting, Testimonials, Newsletter } from '@/components/home/Sections';
import { useProducts } from '@/lib/useProducts';

export default function HomePage() {
  const { products, loading, isDemo } = useProducts();

  return (
    <>
      <Hero />
      <CategoryMarquee />
      <NewArrivals products={products} loading={loading} isDemo={isDemo} />
      <FlashSale products={products} loading={loading} />
      <WhyUs />
      <CustomDesignCTA />
      <Gifting />
      <Testimonials />
      <Newsletter />
    </>
  );
}
