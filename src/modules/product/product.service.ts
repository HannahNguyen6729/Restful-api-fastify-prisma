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

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createAt: true,
      updateAt: true,
      owner: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return products;
};
