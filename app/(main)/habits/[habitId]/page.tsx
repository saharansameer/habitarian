import { HabitForm } from "@/components/index";
import { headers } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Habit | Habitarian",
};

interface PageProps {
  params: Promise<{ habitId?: string }>;
}

async function HabitFormPatch({ params }: PageProps) {
  const { habitId } = await params;

  const headersList = await headers();

  const response = await fetch(`${process.env.BASE_URL}/api/habit/${habitId}`, {
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

  return <HabitForm mode="PATCH" habit={{ ...data }} />;
}

export default function Page(props: PageProps) {
  return (
    <div className="mt-4 space-y-5 mx-auto max-w-xl">
      <h1 className="font-bold text-2xl">Update Habit Details</h1>
      <HabitFormPatch {...props} />
    </div>
  );
}
