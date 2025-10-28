"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removePageAction(slug: string) {
  await prisma.page.delete({ where: { slug } });

  revalidatePath("/pages/profile");
}
