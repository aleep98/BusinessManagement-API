import type { Product } from "../types/product.js";

const products: Product[] = [];

export function saveProduct(product: Product): void {
  products.push(product);
}

export function findAllProducts(): Product[] {
  return [...products];
}

export function findProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function replaceProduct(product: Product): boolean {
  const index = products.findIndex(
    (currentProduct) => currentProduct.id === product.id,
  );
  if (index === -1) {
    return false;
  }
  products[index] = product;

  return true;
}
