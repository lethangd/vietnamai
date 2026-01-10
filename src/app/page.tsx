import { HomeHero } from "@/components/home/HomeHero";
import { ProductGridSection } from "@/components/products/ProductGridSection";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <HomeHero />
      <div className="h-10" />
      <ProductGridSection />
    </main>
  );
}

