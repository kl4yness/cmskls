import bcrypt from "bcryptjs";
export default async function hashPassword(password: string) {
  const number = 10;
  return await bcrypt.hash(password, number);
}
