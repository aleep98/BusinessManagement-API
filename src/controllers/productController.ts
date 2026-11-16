import type {  Request,  Response } from 'express';
import { createProduct, listProducts } from '../services/productService.js';
import { createProductSchema } from '../schemas/createProductSchema.js';


export function listProductsController (_req: Request, res: Response) {
    res.json(listProducts())
}

export function createProductController (req: Request, res: Response){
    const result = createProductSchema.safeParse(req.body)
      if(result.success === false) {
        return res.status(400).json({ errors: result.error.issues });
      }
      const newProduct = createProduct(result.data);
      return res.status(201).json(newProduct);
    }
