'use server'
import { signOut } from "../auth/auth";
export async function signOutFunction() {
  try {
    await signOut({ redirect: false });
    return { success: true, message: "Logout success" };
  } catch (error) {
    return { success: false, message: "Logout false" };
  }
}
