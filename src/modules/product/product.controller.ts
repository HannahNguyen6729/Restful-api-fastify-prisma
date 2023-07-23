import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { createProduct, getProducts } from "./product.service";
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

export const getProductsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const products = await getProducts();
    return reply.code(201).send(products);
  } catch (err) {
    console.error(err);
    return reply.code(500);
  }
};
