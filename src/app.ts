import { join } from "path";
import fastify from "fastify";
import fastifyHealthcheck from "fastify-healthcheck";
import autoLoad from "@fastify/autoload";
import { userSchemas } from "./modules//user/user.schema";

const server = fastify({
  logger: true,
});

const main = async () => {
  await server.register(fastifyHealthcheck);

  for (const schema of userSchemas) {
    await server.addSchema(schema);
  }

  await server.register(autoLoad, {
    dir: join(__dirname, "modules/user"),
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
