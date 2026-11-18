import * as z from "zod";

export const createStockMovementSchema = z.object ({
    type: z.enum(["entry", "loss"]),
    quantity: z.number().positive(),
})

