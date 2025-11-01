import { object, string } from "zod";

const noCyrillic = /^[^А-Яа-яЁё]+$/;

export const signInSchema = object({
  username: string()
    .min(1, "Username is required")
    .regex(noCyrillic, "Russian characters are not allowed"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(noCyrillic, "The password must not contain Russian characters"),
});
