import prisma from "../../utils/prismaFile";
import { CreateUserInput } from "./user.schema";
import { hashPassword } from "../../utils/hash";

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });
};
