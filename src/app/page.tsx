import { HomeHero } from "@/components/home/HomeHero";
import { ProductGridSection } from "@/components/products/ProductGridSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TrustSection } from "@/components/home/TrustSection";
import { CTASection } from "@/components/home/CTASection";
import { ScrollToProductButton } from "@/components/ui/ScrollToProductButton";
import { HomeBackground } from "@/components/home/HomeBackground";

/**
 * Home Page - Bán AI giá tốt nhất thị trường
 */
export default function Page() {
  return (
    <>
      <HomeBackground />

      <main className="relative z-10">
        {/* Hero Section - Định vị rõ ràng */}
        <HomeHero />

        {/* Sản phẩm ngay sau Hero */}
        <ProductGridSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Trust & Social Proof */}
        <TrustSection />

        {/* Final CTA */}
        <CTASection />
      </main>

      {/* Scroll button CHỈ HIỆN Ở TRANG HOME */}
      <ScrollToProductButton />
    </>
  );
}
