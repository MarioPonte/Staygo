import prisma from "@/app/libs/prismadb";

export async function getUsers() {
  try {
    const user = await prisma.user.findMany();

    return user;
  } catch (error: any) {
    return null;
  }
}