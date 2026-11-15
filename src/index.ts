import {
  adjustStock,
  calculateNewStock,
  createProduct,
  updateProductStock,
} from "./services/productService.js";

import { findMovementsByProductId } from "./repositories/stockMovementRepository.js";

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
    name: "Mouse Gamer",
    description: "O melhor mouse para jogos da atualidade",
    price: 500,
    quantityInStock: 20,
    category: "Eletrônicos",
  });

  const product2 = createProduct({
    name: "Monitor",
    description: "O monitor da nova era de games",
    price: 1000,
    quantityInStock: 10,
    category: "Eletrônicos",
  });
  const updatedProduct = updateProductStock(product, "loss", 3);
  console.log(product.quantityInStock, updatedProduct.quantityInStock);

  console.log(product.id === product2.id);

  const result = adjustStock(product, "loss", 3);

  console.log(product.quantityInStock); // saldo original: 20
  console.log(result.updatedProduct.quantityInStock); // saldo novo: 17
  console.log(result.movement); // dados da perda registrada

  const secondResult = adjustStock(result.updatedProduct, "entry", 5);
  console.log(secondResult.updatedProduct.quantityInStock);
  const movements = findMovementsByProductId(product.id);
  console.log(movements.length);
  console.log(movements);
} catch (error) {
  console.log(error);
}

try {
  console.log(calculateNewStock(10, "loss", 11));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
