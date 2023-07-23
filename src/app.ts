import { join } from "path";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyHealthcheck from "fastify-healthcheck";
import autoLoad from "@fastify/autoload";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import fjwt from "@fastify/jwt";
import fswagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { version } from "../package.json";
import helmet from "@fastify/helmet";

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

  await server.register(helmet);

  await server.register(fswagger, {
    swagger: {
      info: {
        title: "Fastify-prisma",
        description: "Fastify API",
        version,
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: `localhost:3000`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await server.register(swaggerUI, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (_request, _reply, next) {
        next();
      },
      preHandler: function (_request, _reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  await server.register(autoLoad, {
    dir: join(__dirname, "modules/user"),
    ignorePattern: /.*(test|spec|.controller|.service).(ts|js)/,
  });

  await server.register(autoLoad, {
    dir: join(__dirname, "modules/product"),
    ignorePattern: /.*(test|spec|.controller|.service).(ts|js)/,
  });

  await server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    server.swagger();
    console.log(`server listening on port ${address}`);
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

main();
