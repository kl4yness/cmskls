"use server";

import { auth } from "../auth/auth";

export default async function getCurrentUser() {
  const session = await auth()
  return session?.user;
}
