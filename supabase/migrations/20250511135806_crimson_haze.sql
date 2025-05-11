/*
  # Initial E-commerce Schema Setup

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `original_price` (numeric, nullable)
      - `category` (text)
      - `image_url` (text)
      - `image_urls` (text array)
      - `tags` (text array)
      - `sizes` (text array)
      - `colors` (jsonb)
      - `in_stock` (boolean)
      - `is_new` (boolean)
      - `is_limited` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `collections`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `collection_products` (junction table)
      - `collection_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  original_price numeric CHECK (original_price >= 0),
  category text NOT NULL,
  image_url text NOT NULL,
  image_urls text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  sizes text[] NOT NULL DEFAULT '{}',
  colors jsonb NOT NULL DEFAULT '[]',
  in_stock boolean NOT NULL DEFAULT true,
  is_new boolean NOT NULL DEFAULT false,
  is_limited boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Collection products junction table
CREATE TABLE IF NOT EXISTS collection_products (
  collection_id uuid REFERENCES collections(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (collection_id, product_id)
);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on collections"
  ON collections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on collection_products"
  ON collection_products FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Allow authenticated admin insert on products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin update on products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin delete on products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

-- Repeat similar policies for other tables
CREATE POLICY "Allow authenticated admin insert on categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin update on categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin delete on categories"
  ON categories FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin insert on collections"
  ON collections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin update on collections"
  ON collections FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin delete on collections"
  ON collections FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin insert on collection_products"
  ON collection_products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

CREATE POLICY "Allow authenticated admin delete on collection_products"
  ON collection_products FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));