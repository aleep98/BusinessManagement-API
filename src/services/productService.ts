import type { Product, CreateProductInput } from "../types/product.js";
import { randomUUID } from "node:crypto";


export function createProduct(product: CreateProductInput): Product{
    if(product.price <= 0 || product.quantityInStock < 0) {
        throw new Error ('The price must be greater than zero, and quantity must be zero or greater')
    }

    const date = new Date()

    const myProduct: Product = {
    id: randomUUID(),
    name: product.name,
    description: product.description,
    price: product.price,
    quantityInStock: product.quantityInStock,
    category: product.category,
    createdAt: date,
    updatedAt: date
    }

    return myProduct
}