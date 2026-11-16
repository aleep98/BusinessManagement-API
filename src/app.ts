import express, { type Express, type Request, type Response } from 'express';
import productRoutes from "./routes/productRoutes.js";

const app: Express = express();
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({status: 'ok'});
});

app.use('/products', productRoutes)


export default app;