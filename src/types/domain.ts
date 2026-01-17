export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  category_id: string | null;
  price_vnd: number;
  discount_percent: number;
  description_html: string;
  image_url: string | null;
  image_path: string | null;
  features: string[] | null;
  created_at: string;
  updated_at: string;
};

export type Settings = {
  id: number;
  zalo_url: string | null;
  telegram_url: string | null;
  gifts_html: string | null;
  updated_at: string;
};

export type Order = {
  id: string;
  customer_name: string;
  supporter_name: string | null;
  account_type: string;
  purchase_date: string;
  expiry_date: string;
  price_vnd: number;
  margin_vnd: number;
  notes: string | null;
  created_at: string;
};

export type TimeEntry = {
  id: string;
  staff_user_id: string;
  check_in_at: string;
  check_out_at: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  display_name: string | null;
  created_at: string;
};

