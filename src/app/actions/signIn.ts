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
        message: "Invalid username or password",
      };
    }

    return {
      success: true,
      message: "Вы успешно вошли в систему",
    };
  } catch (error: any) {
    console.error("Authorization error:", error);

    if (error.message?.includes("CredentialsSignin")) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    return {
      success: false,
      message: "An error occurred while logging in. Please try again later.",
    };
  }
}
