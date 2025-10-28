"use server";

import prisma from "@/app/lib/prisma";
import { auth } from "../auth/auth";

export async function sendPageToDB(data: {
  title: string;
  description: string;
  slug: string;
  content: string | null;
}) {
  try {
    const session = await auth();

    const pageData: any = {
      title: data.title,
      description: data.description,
      slug: data.slug,
      content: data.content ? JSON.parse(data.content) : null,
      author: {
        connect: { id: session?.user?.id },
      },
    };

    if (data.description.length < 10) {
      return {
        success: false,
        message: "Description must be more than 9 symbols",
      };
    }

    if (data.slug.length < 3) {
      return {
        success: false,
        message: "Slug must be more than 3 symbols",
      };
    }

    if (data.title.length < 3) {
      return {
        success: false,
        message: "Title must be more than 3 symbols",
      };
    }

    const existingPage = await prisma.page.findUnique({
      where: { slug: data.slug },
    });

    if (existingPage) {
      return {
        success: false,
        message:
          "Page with same slug has been created ago, try to change ur slug",
      };
    }

    await prisma.page.create({
      data: pageData,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Prisma error:", error);
    return { success: false, error: String(error) };
  }
}
