import { Router } from "express";
import {
  createProductController,
  getProductByIdController,
  listProductsController,
  updateProductController,
} from "../controllers/productController.js";

const router = Router();

router.get("/", listProductsController);
router.post("/", createProductController);
router.get("/:id", getProductByIdController);
router.patch("/:id", updateProductController);

export default router;
