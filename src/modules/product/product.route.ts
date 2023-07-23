import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { createProductHandler, getProductsHandler } from "./product.controller";
import { $ref } from "./product.schema";

const productRoutes: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options,
  done
) => {
  fastify.route({
    method: "POST",
    url: "/api/products",
    preHandler: [fastify.authenticate],
    schema: {
      body: $ref("productSchema"),
      response: {
        201: $ref("productResponseSchema"),
      },
    },
    handler: createProductHandler,
  });

  fastify.route({
    method: "GET",
    url: "/api/products",
    schema: {
      response: {
        201: $ref("productsResponseSchema"),
      },
    },
    handler: getProductsHandler,
  });

  done();
};

export default productRoutes;
