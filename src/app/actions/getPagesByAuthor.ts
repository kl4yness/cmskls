"use server";

import prisma from "@/app/lib/prisma";

export default async function getPagesByAuthor(id: string) {
  const page = await prisma.page.findMany({
    where: { authorId: id },
  });

  return page;
}
