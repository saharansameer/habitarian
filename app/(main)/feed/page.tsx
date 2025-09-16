import type { Metadata } from "next";
import { headers } from "next/headers";
import { FeedListItem, EmptyState, FollowForm } from "@/components/index";
import { FeedItem } from "@/types";
import { Separator } from "@/components/ui";

export const metadata: Metadata = {
  title: "Feed | Habitarian",
};

async function FeedList() {
  const headersList = await headers();

  const response = await fetch(`${process.env.BASE_URL}/api/feed`, {
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
        title="No Activity Yet"
        message="Follow others to see their progress in your feed"
      />
    );
  }

  return (
    <div className="grid gap-3">
      {(data as FeedItem[]).map((item) => (
        <FeedListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function FeedPage() {
  return (
    <div className="mt-4 space-y-5 mx-auto max-w-xl">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Feed</h1>
        <Separator orientation="horizontal" />
      </div>

      <div className="flex flex-col gap-y-5">
        <FollowForm />
        <Separator orientation="horizontal" />
        <FeedList />
      </div>
    </div>
  );
}
