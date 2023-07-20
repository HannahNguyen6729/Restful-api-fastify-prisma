import { FastifyInstance, FastifyPluginCallback } from "fastify";
import registerUserHandler from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options,
  done
) => {
  fastify.route({
    method: "POST",
    url: "/api/users",
    schema: {
      body: $ref("createUserSchema"),
      response: {
        201: $ref("createUserResponseSchema"),
      },
    },
    handler: registerUserHandler,
  });

  done();
};

export default userRoutes;
