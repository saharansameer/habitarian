import { BookHeart } from "lucide-react";

export function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 px-6">

      <div className="relative mb-2">
        <div className="text-foreground/70">
          <BookHeart style={{ width: "32px", height: "32px" }} />
        </div>
      </div>

      <div className="space-y-1 mb-2">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground max-w-md leading-relaxed text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
