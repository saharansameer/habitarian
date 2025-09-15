import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HabitFrequency } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trimAndClean(val: string) {
  return val.trim().replace(/\s+/g, " ");
}

export function evaluateCompletion(
  lastCompletion: Date,
  frequency: HabitFrequency
) {
  const now = new Date();
  const last = new Date(lastCompletion);

  if (frequency === "DAILY") {
    // normalize to local midnight
    const todayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const yesterdayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );

    if (last >= todayMidnight) {
      return { completed: true, streakAlive: true };
    } else if (last >= yesterdayMidnight && last < todayMidnight) {
      return { completed: false, streakAlive: true };
    } else {
      return { completed: false, streakAlive: false };
    }
  } else {
    // frequency === "WEEKLY"
    const nextPossibleCompletion = new Date(
      last.getFullYear(),
      last.getMonth(),
      last.getDate() + 6
    );
    const tomorrowMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    if (nextPossibleCompletion > now) {
      return { completed: true, streakAlive: true };
    } else if (now >= nextPossibleCompletion && now < tomorrowMidnight) {
      return { completed: false, streakAlive: true };
    } else {
      return { completed: false, streakAlive: false };
    }
  }
}
