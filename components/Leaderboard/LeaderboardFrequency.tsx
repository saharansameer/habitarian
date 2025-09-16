"use client";

import { Button } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { HabitFrequency } from "@/types";
import Link from "next/link";

export function LeaderboardFrequency() {
  const searchParams = useSearchParams();

  const current = (searchParams.get("freq") || "DAILY") as HabitFrequency;

  return (
    <div className="flex items-center gap-2">
      <Link href="/leaderboard?freq=DAILY">
        <Button
          size="sm"
          variant={current === "DAILY" ? "default" : "outline"}
          className="cursor-pointer"
          aria-pressed={current === "DAILY"}
        >
          DAILY
        </Button>
      </Link>

      <Link href="/leaderboard?freq=WEEKLY">
        <Button
          size="sm"
          variant={current === "WEEKLY" ? "default" : "outline"}
          className="cursor-pointer"
          aria-pressed={current === "WEEKLY"}
        >
          WEEKLY
        </Button>
      </Link>
    </div>
  );
}
