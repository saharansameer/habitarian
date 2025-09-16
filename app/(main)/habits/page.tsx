import { HabitCard } from "@/components/index";
import { headers } from "next/headers";
import { HabitListItem } from "@/types";
import type { Metadata } from "next";
import { EmptyState } from "@/components/index";
import Link from "next/link";
import { Button, Separator } from "@/components/ui";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Habits | Habitarian",
};

async function HabitsList() {
  const headersList = await headers();

  const response = await fetch(`${process.env.BASE_URL}/api/habit/get-habits`, {
    headers: {
      cookie: headersList.get("cookie") || "",
      authorization: headersList.get("authorization") || "",
    },
    next: { revalidate: 0 },
  });

  const { success, message, data } = await response.json();

  if (!success) {
    return <div>{message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Habits Created Yet"
        message="Create your first habit now to get started"
      />
    );
  }

  return (
    <div className="grid gap-4">
      {(data as HabitListItem[]).map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}

export default function HabitsPage() {
  return (
    <div className="mt-4 space-y-5 mx-auto max-w-xl">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Habits</h1>
        <Separator orientation="horizontal" />
      </div>

      <div className="flex flex-col gap-y-4">
        <Link href={"/habits/new"}>
          <Button variant={"default"} className="font-semibold cursor-pointer">
            <Plus />
            Add New Habit
          </Button>
        </Link>
        <HabitsList />
      </div>
    </div>
  );
}
