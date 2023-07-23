import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productSchema = z.object({
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
});

const productResponseSchema = z.object({
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
  id: z.number(),
  createAt: z.string(),
  updateAt: z.string(),
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof productSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    productSchema,
    productResponseSchema,
    productsResponseSchema,
  },
  { $id: "MyProductSchema" }
);
