import { FeedItem } from "@/types";

export function FeedListItem({ item }: { item: FeedItem }) {
  const created = new Date(item.createdAt);
  const time = created.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const date = created.toLocaleDateString();

  return (
    <div className="w-full rounded-lg border p-3 text-sm flex items-center">
      <p className="text-foreground/80">
        <span className="font-semibold">{item.user.name ?? "User"}</span>{" "}
        completed
        <span className="font-semibold"> {item.habit.title}</span> at {time} on{" "}
        {date} and maintaining their streak at{" "}
        <span className="font-semibold">{item.habit.streak}</span>
      </p>
    </div>
  );
}
