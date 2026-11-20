import { type Request, type Response } from "express";
import {
  createProduct,
  getProductById,
  listLowStockProducts,
  listProducts,
  updateProduct,
} from "../services/productService.js";
import { createProductSchema } from "../schemas/createProductSchema.js";
import { updateProductSchema } from "../schemas/updateProductSchema.js";

export function listProductsController(req: Request, res: Response) {
  const category = req.query.category;

  if (category !== undefined && typeof category !== "string") {
    return res.status(400).json({ message: "Invalid category." });
  }
  return res.json(listProducts(category));
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

export function updateProductController(req: Request, res: Response) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
    });
  }
  const result = updateProductSchema.safeParse(req.body);

  if (result.success === false) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const changes = result.data;

  if (Object.keys(changes).length === 0) {
    return res.status(400).json({
      sucesso: false,
      message: "No valid fields were provided for update.",
    });
  }

  const updatedProduct = updateProduct(id, changes);
  if (updatedProduct === undefined) {
    return res.status(404).json({ errors: "Product not found." });
  }

  return res.json(updatedProduct);
}

export function listLowStockProductsController(req: Request, res: Response) {
  const rawThreshold = req.query.threshold;

  if (typeof rawThreshold !== "string" || rawThreshold.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "The threshold query parameter is required.",
    });
  }

  const threshold = Number(rawThreshold);

  if (!Number.isFinite(threshold) || threshold < 0) {
    return res.status(400).json({
      success: false,
      message: "Threshold must be a number greater than or equal to zero.",
    });
  }

  return res.json(listLowStockProducts(threshold));
}
