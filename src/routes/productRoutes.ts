import { Router } from "express";
import {
  createProductController,
  getProductByIdController,
  listProductsController,
  updateProductController,
} from "../controllers/productController.js";
import { createStockMovementController, listStockMovementsController } from "../controllers/stockMovementController.js";

const router = Router();

router.get("/", listProductsController);
router.post("/", createProductController);
router.get("/:id", getProductByIdController);
router.patch("/:id", updateProductController);
router.post("/:id/stock-movements", createStockMovementController);
router.get("/:id/stock-movements", listStockMovementsController);

export default router;
