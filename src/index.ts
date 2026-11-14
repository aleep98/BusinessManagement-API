import { createProduct } from "./services/productService.js";

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
  })
  console.log(product === product2);
} catch (error) {
  console.log(error);
}

