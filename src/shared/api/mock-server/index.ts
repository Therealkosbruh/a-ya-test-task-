import type { Category, Product, ProductColor, Size } from "../types";
import { categories, products, sizes } from "./data";

export function getSizes(): Promise<Size[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sizes), 250);
  });
}

export function getSize(id: string | number): Promise<Size> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const size = sizes.find((size) => String(size.id) === String(id));
      if (size) {
        resolve(size);
      } else {
        reject(new Error("getSize: Size not found"));
      }
    }, 250);
  });
}

export function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 250);
  });
}

export function getCategory(id: string | number): Promise<Category> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const category = categories.find(
        (category) => String(category.id) === String(id),
      );
      if (category) {
        resolve(category);
      } else {
        reject(new Error("getCategory: Category not found"));
      }
    }, 250);
  });
}

export function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 250);
  });
}

export function getProduct(id: string | number): Promise<Product> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(
        (product) => String(product.id) === String(id),
      );
      if (product) {
        resolve(product);
      } else {
        reject(new Error("getProduct: Product not found"));
      }
    }, 250);
  });
}

export function getProductColor(
  productID: string | number,
  colorID: string | number,
): Promise<ProductColor> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(
        (product) => String(product.id) === String(productID),
      );

      if (!product) {
        reject(new Error("getProductColor: Product not found"));
        return;
      }

      const color = product.colors.find(
        (color) => String(color.id) === String(colorID),
      );

      if (color) {
        resolve(color);
      } else {
        reject(new Error("getProductColor: Color not found"));
      }
    }, 250);
  });
}
