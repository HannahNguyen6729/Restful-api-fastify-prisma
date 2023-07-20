import { join } from "path";
import fastify from "fastify";
import fastifyHealthcheck from "fastify-healthcheck";
import autoLoad from "@fastify/autoload";

const server = fastify({
  logger: true,
});

server.register(fastifyHealthcheck);
server.register(autoLoad, {
  dir: join(__dirname, "modules/user"),
  ignorePattern: /.*(test|spec|.controller|.service).(ts|js)/,
});

const main = async () => {
  await server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    console.log(`server listening on port ${address}`);
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

main();
