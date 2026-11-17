import { Router } from "express";
import { createProductController, getProductByIdController, listProductsController } from "../controllers/productController.js";

const router = Router();

router.get('/', listProductsController);
router.post('/', createProductController);
router.get("/:id", getProductByIdController);

export default router;