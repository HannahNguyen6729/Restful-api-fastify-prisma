import prisma from "../../utils/prismaFile";

export const createUser = async (input) => {
  const user = await prisma.user.create({
    data: input,
  });
};
