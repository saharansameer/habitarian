import { habitCategories, habitFrequencies } from "@/lib/constants";

export type HabitCategory = (typeof habitCategories)[number];
export type HabitFrequency = (typeof habitFrequencies)[number];
