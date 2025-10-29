"use server";

import prisma from "../lib/prisma";


export default async function getPageBySlug(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
  });

  return page;
}
