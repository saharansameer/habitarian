import { z } from "zod/v4";
import {
  emailValidator,
  passwordValidator,
  passwordValidatorLite,
} from "@/zod/validators";

// Signup Schema
export const signupSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  username: z
    .string()
    .min(3, { error: "Username must be 3 characters long" })
    .max(20, { error: "Username must not exceed 20 characters" }),
});

export type SignupSchemaInputs = z.input<typeof signupSchema>;

// Signin Schema
export const signinSchema = z.object({
  email: emailValidator,
  password: passwordValidatorLite,
});

export type SigninSchemaInputs = z.input<typeof signinSchema>;
