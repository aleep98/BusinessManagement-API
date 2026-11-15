import type { Product } from "../types/product.js";


const products: Product[] = [];

export function saveProduct(product: Product): void {
    products.push(product);
}

export function findAllProducts(): Product[] {
    return [...products];
}