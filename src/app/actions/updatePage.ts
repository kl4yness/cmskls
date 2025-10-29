"use server";

import prisma from "../lib/prisma";

import { auth } from "../auth/auth";
import { JSONContent } from "@tiptap/react";


export async function updatePage(data: {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: JSONContent | null;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const page = await prisma.page.findUnique({
      where: { id: data.id },
      select: { authorId: true },
    });

    if (!page) throw new Error("Page not found");

    if (page.authorId !== session.user.id) {
      return {success: false, message: 'You are not a author of page'}
    }

    const updated = await prisma.page.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content ?? {}, 
      },
    });

    return { success: true, page: updated };
  } catch (error) {
    console.error("❌ Error updating page:", error);
    return { success: false, error: String(error) };
  }
}
