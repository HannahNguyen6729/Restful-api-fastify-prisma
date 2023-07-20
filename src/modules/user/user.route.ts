import { FastifyInstance, FastifyPluginCallback } from "fastify";
import registerUserHandler from "./user.controller";

const userRoutes: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options,
  done
) => {
  fastify.route({
    method: "POST",
    url: "/api/users",
    /*  schema: {
      params: GetUserParamsSchema,
      response: {
        200: UserDataSchema,
        500: GenericApiErrorSchema,
      },
    }, */
    handler: registerUserHandler,
  });

  done();
};

export default userRoutes;
