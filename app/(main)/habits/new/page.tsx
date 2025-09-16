import { HabitForm } from "@/components/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Habit | Habitarian",
};

export default function Page() {
  return (
    <div className="mt-4 space-y-5 mx-auto max-w-xl">
      <h1 className="font-bold text-2xl">Create New Habit</h1>
      <HabitForm mode="POST" />
    </div>
  );
}
