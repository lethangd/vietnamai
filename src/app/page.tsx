import { HomeHero } from "@/components/home/HomeHero";
import { ProductGridSection } from "@/components/products/ProductGridSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TrustSection } from "@/components/home/TrustSection";
import { CTASection } from "@/components/home/CTASection";

/**
 * Home Page - UX Optimized
 * Sản phẩm lên sớm hơn (ít cuộn hơn)
 */
export default function Page() {
  return (
    <main>
      {/* Hero Section - WOW trong 3 giây */}
      <HomeHero />

      {/* Sản phẩm ngay sau Hero (ít cuộn hơn) */}
      <ProductGridSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Trust & Social Proof */}
      <TrustSection />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
