import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(2),
    price: z.coerce.number().positive(),
    category: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
});