import { FastifyInstance, FastifyPluginCallback } from "fastify";
import {
  registerUserHandler,
  loginHandler,
  getUsersHandler,
} from "./user.controller";
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

  fastify.route({
    method: "POST",
    url: "/api/users/login",
    schema: {
      body: $ref("loginSchema"),
      response: {
        201: $ref("loginResponseSchema"),
      },
    },
    handler: loginHandler,
  });

  fastify.route({
    method: "GET",
    url: "/api/users",
    handler: getUsersHandler,
  });

  done();
};

export default userRoutes;
