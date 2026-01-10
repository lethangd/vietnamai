export function getPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !key) {
    // Important: app phụ thuộc Supabase; nếu thiếu env thì fail fast để dễ debug.
    throw new Error(
      "Thiếu env Supabase. Hãy tạo .env.local với NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY"
    );
  }

  return { supabaseUrl: url, supabaseKey: key };
}

