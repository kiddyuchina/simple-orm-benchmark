import { PrismaClient } from '@prisma/client';
import { mySqlConfig } from '../config';

const prismaClientOptions = {
  datasourceUrl: mySqlConfig.connectionLimit
    ? `${process.env.DATABASE_URL}?connection_limit=${mySqlConfig.connectionLimit}`
    : process.env.DATABASE_URL,
};

const prisma = new PrismaClient(prismaClientOptions);

export const prismaMySqlGetUser = async (id: number) => {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const prismaClose = () => prisma.$disconnect();
