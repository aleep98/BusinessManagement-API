import { createProductSchema } from "./createProductSchema.js";

export const updateProductSchema  = createProductSchema.exactPartial();