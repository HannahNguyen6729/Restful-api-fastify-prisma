import { join } from "path";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyHealthcheck from "fastify-healthcheck";
import autoLoad from "@fastify/autoload";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import fjwt from "@fastify/jwt";

const server = fastify({
  logger: true,
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: number;
      name: string;
      email: string;
    };
  }
}

const main = async () => {
  await server.register(fjwt, {
    secret: "randomsecretpassword",
  });

  await server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.send(err);
      }
    }
  );

  await server.register(fastifyHealthcheck);

  for (const schema of [...userSchemas, ...productSchemas]) {
    await server.addSchema(schema);
  }

  await server.register(autoLoad, {
    dir: join(__dirname, "modules/user"),
    ignorePattern: /.*(test|spec|.controller|.service).(ts|js)/,
  });

  await server.register(autoLoad, {
    dir: join(__dirname, "modules/product"),
    ignorePattern: /.*(test|spec|.controller|.service).(ts|js)/,
  });

  await server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    console.log(`server listening on port ${address}`);
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

main();
