import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserByEmail } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";

const server = fastify({
  logger: true,
});

export const registerUserHandler = async (
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

export const loginHandler = async (
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) => {
  try {
    //find user by email
    const foundUser = await findUserByEmail(request.body);
    if (!foundUser) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }

    //verify password
    const isAuth = verifyPassword(request.body.password, foundUser.password);

    if (isAuth) {
      const { password, salt, ...rest } = foundUser;
      console.log("rest", rest);
      // generate access token
      return { accessToken: request.server.jwt.sign(rest) };
    }

    return reply.code(401).send({
      message: "Invalid email or password",
    });
  } catch (err) {
    console.error(err);
    return reply.code(500);
  }
};
