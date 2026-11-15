import type { Product, CreateProductInput } from "../types/product.js";
import type { MovementType, StockMovement } from "../types/stockMovement.js";
import { randomUUID } from "node:crypto";
import { saveMovement } from "../repositories/stockMovementRepository.js";
import { saveProduct } from "../repositories/productRepository.js";
import { findAllProducts } from "../repositories/productRepository.js";

export function createProduct(product: CreateProductInput): Product {
  if (product.price <= 0 || product.quantityInStock < 0) {
    throw new Error(
      "The price must be greater than zero, and quantity must be zero or greater",
    );
  }

  const date = new Date();

  const myProduct: Product = {
    id: randomUUID(),
    name: product.name,
    description: product.description,
    price: product.price,
    quantityInStock: product.quantityInStock,
    category: product.category,
    createdAt: date,
    updatedAt: date,
  };
  saveProduct(myProduct)
  return myProduct;
}

export function listProducts(): Product[] {
  return findAllProducts()
}

export function calculateNewStock(
  currentStock: number,
  movementType: MovementType,
  quantity: number,
): number {
  if (quantity <= 0)
    throw new Error("The quantity cannot be less than or equal to zero!");

  if (movementType === "entry") {
    return currentStock + quantity;
  }

  if (quantity > currentStock) {
    throw new Error("The quantity exceeded the stock.");
  } else {
    return currentStock - quantity;
  }
}

export function updateProductStock(
  product: Product,
  movementType: MovementType,
  quantity: number,
): Product {
  const newStock = calculateNewStock(
    product.quantityInStock,
    movementType,
    quantity,
  );
  return {
    ...product,
    quantityInStock: newStock,
    updatedAt: new Date(),
  };
}

export function createStockMovement(
  product: Product,
  movementType: MovementType,
  quantity: number,
): StockMovement {
  return {
    id: randomUUID(),
    productId: product.id,
    quantity: quantity,
    createdAt: new Date(),
    type: movementType
  };
}

export function adjustStock (product: Product, movementType: MovementType, quantity: number ) {
  const updatedProduct = updateProductStock(product, movementType, quantity)
  const movement = createStockMovement(product, movementType, quantity)

  saveMovement(movement)

  return { updatedProduct, movement}
}