import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { createProduct } from "./product.service";
import { CreateProductInput } from "./product.schema";

export const createProductHandler = async (
  request: FastifyRequest<{ Body: CreateProductInput }>,
  reply: FastifyReply
) => {
  try {
    const newProduct = await createProduct({
      ...request.body,
      ownerId: request.user.id,
    });
    return reply.code(201).send(newProduct);
  } catch (err) {
    console.error(err);
    return reply.code(500);
  }
};
