import * as z from "zod";

export const createProductSchema = z.object ({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number().positive(),
    quantityInStock: z.number().nonnegative()
})