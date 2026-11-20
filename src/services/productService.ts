import type { Product, CreateProductInput } from "../types/product.js";
import type { MovementType, StockMovement } from "../types/stockMovement.js";
import { randomUUID } from "node:crypto";
import { findMovementsByProductId, saveMovement } from "../repositories/stockMovementRepository.js";
import { saveProduct, findAllProducts, findProductById, replaceProduct, findProductsByCategory } from "../repositories/productRepository.js";
import type { UpdateProductInput } from "../types/product.js";

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

export function getProductById(productId: string): Product | undefined  {
  return findProductById(productId)
}

export function listProducts(category?: string): Product[] {
  if(category === undefined){
    return findAllProducts()
  }

  return findProductsByCategory(category);
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

export function updateProduct(productId: string, changes: UpdateProductInput): Product | undefined{
   const currentProduct = findProductById(productId);

   if(currentProduct === undefined){
    return undefined
   }

   const updatedProduct: Product = {
    ...currentProduct,
    ...changes,
    updatedAt: new Date(),
   }

   if(!replaceProduct(updatedProduct)) {
    return undefined;
   }

   return updatedProduct;
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
  if(!replaceProduct(updatedProduct)) {
    throw new Error("Product not found.");
  }
  const movement = createStockMovement(product, movementType, quantity)

  saveMovement(movement)

  return { updatedProduct, movement}
}

export function listStockMovementsByProductId(productId: string): StockMovement[] {
  return findMovementsByProductId(productId)
}