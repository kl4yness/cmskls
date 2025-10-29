"use server";

import prisma from "../lib/prisma";
import hashPassword from "../utils/passwordHash";
import type { FormData } from "../types/formData";

export async function registerUser(formData: FormData) {
  const { username, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    return { success: false, message: "Пароли не совпадают" };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Пароль не должен быть менее 8 символов",
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Пользователь с таким именем уже существует",
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
    console.error("Ошибка при регистрации:", error);

    if (error.code === "P2002") {
      return {
        success: false,
        message: "Такой пользователь уже зарегистрирован",
      };
    }

    return {
      success: false,
      message: "Произошла непредвиденная ошибка при регистрации",
    };
  }
}
