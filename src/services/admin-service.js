import prisma from "@/services/prisma";

export const fetchUsers = async () => {
  return await prisma.user.findMany();
};
