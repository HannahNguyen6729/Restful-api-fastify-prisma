import prisma from "../../utils/prismaFile";
import { CreateUserInput, LoginInput } from "./user.schema";
import { hashPassword } from "../../utils/hash";

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
};

export const findUserByEmail = async (input: LoginInput) => {
  const { email } = input;
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  return foundUser;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
    },
  });
  return users;
};
