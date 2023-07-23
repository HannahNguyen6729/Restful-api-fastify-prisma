import prisma from "../../utils/prismaFile";
import { CreateProductInput } from "./product.schema";

export const createProduct = async (
  input: CreateProductInput & { ownerId: number }
) => {
  const newProduct = await prisma.product.create({
    data: { ...input },
  });
  return newProduct;
};
