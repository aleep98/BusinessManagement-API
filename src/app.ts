import express, { type Express, type Request, type Response } from 'express';
import { createProduct, listProducts } from './services/productService.js';
import { createProductSchema } from './schemas/createProductSchema.js';

const app: Express = express();
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({status: 'ok'});
});

app.get('/products', (_req, res) => {
  res.json(listProducts());
});

app.post('/products', (req, res)  => {
  const result = createProductSchema.safeParse(req.body)
  if(result.success === false) {
    return res.status(400).json({ errors: result.error.issues });
  }
  const newProduct = createProduct(result.data);
  return res.status(201).json(newProduct);
})

export default app;