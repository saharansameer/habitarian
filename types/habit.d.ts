import { habitCategories, habitFrequencies } from "@/lib/constants";

export type HabitCategory = (typeof habitCategories)[number];
export type HabitFrequency = (typeof habitFrequencies)[number];

export type HabitListItem = {
  id: string;
  title: string;
  category: HabitCategory | string;
  frequency: HabitFrequency | string;
  streak: number;
  completed: boolean;
  streakAlive: boolean;
};