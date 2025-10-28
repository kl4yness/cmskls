"use server";

import { signIn } from "../auth/auth";

export async function signInWithCredetials(username: string, password: string) {
  try {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, 
    });

    if (!result || result.error) {
      return {
        success: false,
        message: "Неверное имя пользователя или пароль",
      };
    }

    return {
      success: true,
      message: "Вы успешно вошли в систему",
    };
  } catch (error: any) {
    console.error("Ошибка авторизации:", error);

    if (error.message?.includes("CredentialsSignin")) {
      return {
        success: false,
        message: "Неверное имя пользователя или пароль",
      };
    }

    return {
      success: false,
      message: "Произошла ошибка при входе. Попробуйте позже.",
    };
  }
}
