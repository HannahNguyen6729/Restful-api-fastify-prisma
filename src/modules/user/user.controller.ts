import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "./user.service";
import { CreateUserInput } from "./user.schema";

const registerUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  try {
    const newUser = await createUser(request.body);
    return reply.code(201).send(newUser);
  } catch (err) {
    console.error(err);
    return reply.code(500);
  }
};

export default registerUserHandler;
