export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  imageUrls: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: { name: string; value: string }[];
  inStock: boolean;
  isNew: boolean;
  isLimited: boolean;
  releaseDate?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  products: Product[];
};

export type LookbookItem = {
  id: string;
  title: string;
  imageUrl: string;
  products: Product[];
};

export type NavigationItem = {
  name: string;
  path: string;
  children?: NavigationItem[];
};