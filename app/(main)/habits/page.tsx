import { HabitCard } from "@/components/index";
import { headers } from "next/headers";
import { HabitListItem } from "@/types";
import type { Metadata } from "next";
import { EmptyState } from "@/components/index";

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
      <h1 className="font-bold text-2xl">Your Habits</h1>
      <HabitsList />
    </div>
  );
}
