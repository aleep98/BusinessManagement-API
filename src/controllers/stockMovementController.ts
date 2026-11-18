import type { Request, Response } from "express";
import { createStockMovementSchema } from "../schemas/createStockMovementSchema.js";
import { adjustStock, getProductById, listStockMovementsByProductId } from "../services/productService.js";

export function createStockMovementController(req: Request, res: Response) {
  const id = req.params.id;
  if (typeof id !== "string")
    return res.status(400).json({
      success: false,
    });

  const result = createStockMovementSchema.safeParse(req.body);

  if (result.success === false) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const product = getProductById(id);
  if (product === undefined) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found!" });
  }
  try {
    const adjustment = adjustStock(
      product,
      result.data.type,
      result.data.quantity,
    );
    return res.status(201).json(adjustment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unexpected error.",
    });
  }
}

export function listStockMovementsController(req: Request, res: Response){
    const id = req.params.id;

    if (typeof id !== "string")
    return res.status(400).json({
      success: false,
    });

    const product = getProductById(id);

    if (product === undefined) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found!" });
  }
   const movements = listStockMovementsByProductId(id)
   return res.json(movements)
}