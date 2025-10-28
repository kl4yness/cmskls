"use server";

import prisma from "@/app/lib/prisma";

export async function getUserFromDb(name: string) {
  return await prisma.user.findFirst({
    where: {
      username: name
    },
  });
}
