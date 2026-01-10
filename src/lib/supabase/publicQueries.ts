import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import type { Category, Product, Settings } from "@/types/domain";

export async function fetchPublicCatalog() {
  const supabase = getSupabaseBrowserClient();

  const [categoriesRes, productsRes, settingsRes] = await Promise.all([
    supabase.from("categories").select("id, name, slug, created_at").order("name"),
    supabase
      .from("products")
      .select(
        "id, name, slug, quantity, category_id, price_vnd, discount_percent, description_html, image_url, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("settings")
      .select("id, zalo_url, telegram_url, updated_at")
      .eq("id", 1)
      .maybeSingle()
  ]);

  if (categoriesRes.error) throw categoriesRes.error;
  if (productsRes.error) throw productsRes.error;
  if (settingsRes.error) throw settingsRes.error;

  return {
    categories: (categoriesRes.data as Category[]) ?? [],
    products: (productsRes.data as Product[]) ?? [],
    settings: (settingsRes.data as Settings | null) ?? null
  };
}

export async function fetchProductBySlug(slug: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, quantity, category_id, price_vnd, discount_percent, description_html, image_url, created_at, updated_at"
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Product | null) ?? null;
}

export async function fetchCategoryById(id: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Category | null) ?? null;
}

export async function fetchSettings() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("settings")
    .select("id, zalo_url, telegram_url, updated_at")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return (data as Settings | null) ?? null;
}

