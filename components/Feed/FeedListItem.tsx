import { Badge } from "@/components/ui/badge";

type FeedItem = {
  id: string;
  createdAt: string | Date;
  habit: { id: string; title: string; streak: number };
  user: { id: string; name: string | null };
};

export function FeedListItem({ item }: { item: FeedItem }) {
  const created = new Date(item.createdAt);
  const time = created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = created.toLocaleDateString();

  return (
    <div className="w-full rounded-lg border p-3 text-sm flex items-center justify-between">
      <p className="text-foreground/80">
        <span className="font-semibold">{item.user.name ?? "User"}</span> completed
        <span className="font-semibold"> {item.habit.title}</span> at {time} on {date}
      </p>
      <Badge variant="secondary">Streak: {item.habit.streak}</Badge>
    </div>
  );
}
