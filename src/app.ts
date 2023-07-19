import fastify from "fastify";
import fastifyHealthcheck from "fastify-healthcheck";

const server = fastify({
  logger: true,
});

server.register(fastifyHealthcheck);

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
