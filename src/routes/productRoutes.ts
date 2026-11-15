import { Router } from "express";
import { createProductController, listProductsController } from "../controllers/productController.js";

const router = Router();

router.get('/', listProductsController);
router.post('/', createProductController);

export default router;