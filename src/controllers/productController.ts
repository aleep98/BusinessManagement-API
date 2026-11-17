import type { Request, Response } from "express";
import {
  createProduct,
  getProductById,
  listProducts,
} from "../services/productService.js";
import { createProductSchema } from "../schemas/createProductSchema.js";

export function listProductsController(_req: Request, res: Response) {
  res.json(listProducts());
}

export function createProductController(req: Request, res: Response) {
  const result = createProductSchema.safeParse(req.body);
  if (result.success === false) {
    return res.status(400).json({ errors: result.error.issues });
  }
  const newProduct = createProduct(result.data);
  return res.status(201).json(newProduct);
}

export function getProductByIdController(req: Request, res: Response) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
  const product = getProductById(id);
  if (product === undefined) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found!" });
  }
  return res.json(product);
}
