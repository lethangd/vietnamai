import { ProductDetailLoader } from "@/components/products/ProductDetailLoader";

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductDetailLoader slug={params.slug} />;
}

