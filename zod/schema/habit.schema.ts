import { z } from "zod/v4";
import { habitCategories, habitFrequencies } from "@/lib/constants";

export const habitSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters" })
    .max(100, { error: "Title must not exceed 100 characters" }),
  category: z.enum(habitCategories, { error: "Select a valid category" }),
  frequency: z.enum(habitFrequencies, { error: "Select a valid frequency" }),
});

export type HabitInputs = z.input<typeof habitSchema>;
