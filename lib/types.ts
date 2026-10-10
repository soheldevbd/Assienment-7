export type SortMode = "default" | "asc" | "desc";

export interface Category {
  slug: string;
  name: string;
  emoji: string;
}

export interface Market {
  name: string;
  division: string;
  min: number | null;
  max: number | null;
  avg: number | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  category: string;
  categoryName: string;
  unit: string;
  price: number | null;
  prev: number | null;
  change: number;
  changeAmount: number | null;
  min: number | null;
  max: number | null;
  avg: number | null;
  markets: Market[];
  description: string;
  tags: string[];
}

export interface SessionUser {
  name: string;
  email: string;
  image?: string | null;
}
