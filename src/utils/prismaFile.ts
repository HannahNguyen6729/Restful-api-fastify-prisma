import { PrismaClient } from "@prisma/client";

//connect and  send queries to the database with Prisma Client
const prisma = new PrismaClient();

/*
async function main() {}
 main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); */

export default prisma;
