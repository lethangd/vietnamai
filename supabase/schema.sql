-- VietnamAI - Supabase schema + RLS
-- Chạy file này trong Supabase SQL Editor (theo đúng thứ tự).

-- 1) Extensions
create extension if not exists pgcrypto;

-- 2) Helpers
-- NOTE: Admin không nằm trong DB (admin login bằng ENV). Các thao tác admin chạy qua
-- Supabase Service Role (bypass RLS), nên không cần helper is_admin().

-- 3) Core tables
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  quantity int not null default 0,
  category_id uuid null references public.categories(id) on delete set null,
  price_vnd bigint not null,
  discount_percent int not null default 0 check (discount_percent between 0 and 100),
  description_html text not null default '',
  image_url text null,
  image_path text null,
  features jsonb null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id int primary key check (id = 1),
  zalo_url text null,
  telegram_url text null,
  gifts_html jsonb null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.settings (id) values (1)
on conflict (id) do nothing;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  supporter_name text null,
  account_type text not null,
  purchase_date date not null,
  expiry_date date not null,
  price_vnd bigint not null,
  margin_vnd bigint not null,
  notes text null,
  created_at timestamptz not null default now()
);

create table if not exists public.time_entries (
  id uuid primary key default gen_random_uuid(),
  staff_user_id uuid not null references auth.users(id) on delete cascade,
  check_in_at timestamptz not null,
  check_out_at timestamptz null,
  created_at timestamptz not null default now(),
  constraint check_time_order check (check_out_at is null or check_out_at >= check_in_at)
);

-- 4) Triggers (updated_at)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists trg_settings_updated_at on public.settings;
create trigger trg_settings_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

-- 5) Create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, null)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- 6) RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.settings enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.time_entries enable row level security;

-- categories: public read, admin write
drop policy if exists "categories_select_public" on public.categories;
create policy "categories_select_public"
on public.categories for select
to anon, authenticated
using (true);

-- products: public read, admin write
drop policy if exists "products_select_public" on public.products;
create policy "products_select_public"
on public.products for select
to anon, authenticated
using (true);

-- settings: public read, admin update
drop policy if exists "settings_select_public" on public.settings;
create policy "settings_select_public"
on public.settings for select
to anon, authenticated
using (true);

-- profiles: staff read/update own
drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self"
on public.profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_update_self_name" on public.profiles;
create policy "profiles_update_self_name"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- orders: không tạo policy (staff không truy cập; admin dùng Service Role bypass RLS)

-- time_entries: staff own
drop policy if exists "time_entries_select_self" on public.time_entries;
create policy "time_entries_select_self"
on public.time_entries for select
to authenticated
using (staff_user_id = auth.uid());

drop policy if exists "time_entries_insert_self" on public.time_entries;
create policy "time_entries_insert_self"
on public.time_entries for insert
to authenticated
with check (staff_user_id = auth.uid());

drop policy if exists "time_entries_update_self" on public.time_entries;
create policy "time_entries_update_self"
on public.time_entries for update
to authenticated
using (staff_user_id = auth.uid())
with check (staff_user_id = auth.uid());

