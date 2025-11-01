"use server";

import prisma from "../lib/prisma";
import hashPassword from "../utils/passwordHash";
import type { FormData } from "../types/formData";

export async function registerUser(formData: FormData) {
  const { username, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    return { success: false, message: "Your passwords dont match" };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be more than 8",
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Same username has been registered",
      };
    }

    const pwHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: pwHash,
      },
    });

    return { success: true, user };
  } catch (error: any) {
    console.error("Error:", error);

    if (error.code === "P2002") {
      return {
        success: false,
        message: "Same user have in Data Base",
      };
    }

    return {
      success: false,
      message: "Error",
    };
  }
}
