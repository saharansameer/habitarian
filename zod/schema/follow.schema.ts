import { z } from "zod/v4";

export const followSchema = z.object({
  username: z
    .string()
    .regex(/^[A-Za-z0-9]+$/, "Only letters and numbers are allowed")
    .min(3, { error: "Invalid Username" })
    .max(20, { error: "Invalid Username" }),
});

export type FollowInputs = z.input<typeof followSchema>;
