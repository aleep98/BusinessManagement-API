import type { Product } from "./types/product.js";
import { createProduct } from "./services/productService.js";

let product1: Product = {
  id: "1",
  name: "Notebook Gamer",
  price: 5500.0,
  description: "the most power notebook for gamers",
  quantityInStock: 100,
  category: "peripheral",
  createdAt: new Date(),
  updatedAt: new Date(),
};

function isValidQuantity(quantity: number): boolean {
  if (quantity >= 0) {
    return true;
  } else {
    return false;
  }
}

function registerProduct(quantity: number, price: number): void {
  if (isValidQuantity(quantity) && checkPrice(price)) {
    console.log(`process to be continued`);
  } else {
    console.log(`process failed`);
  }
}

function checkPrice(price: number): boolean {
  if (price > 0) {
    return true;
  } else {
    return false;
  }
}
registerProduct(10, 0);

try {
  const product = createProduct({
    name: "Notebook Gamer",
    description: "Notebook para jogos",
    price: 5500,
    quantityInStock: 10,
    category: "Eletrônicos",
  });

  console.log(product);
} catch (error) {
  console.log(error);
}

