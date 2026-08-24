export interface Size {
  id: number;
  name: string;
  number: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ProductColor {
  id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
  sizes: number[];
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  brand: string;
  colors: ProductColor[];
}
