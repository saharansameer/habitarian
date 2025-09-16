import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { EmptyState, LeaderboardFrequency } from "@/components/index";
import { LeaderboardItem } from "@/types";
import { Separator } from "@/components/ui";

export const metadata: Metadata = {
  title: "Leaderboard | Habitarian",
};

type PageProps = {
  searchParams: Promise<{ freq?: string }>;
};

async function LeaderboardTable({ searchParams }: PageProps) {
  const { freq } = await searchParams;

  const headersList = await headers();
  const response = await fetch(
    `${process.env.BASE_URL}/api/leaderboard?freq=${freq || "DAILY"}`,
    {
      headers: {
        cookie: headersList.get("cookie") || "",
        authorization: headersList.get("authorization") || "",
      },
      next: { revalidate: 0 },
    }
  );

  const { success, message, data } = await response.json();

  if (!success) {
    return <div className="text-sm text-muted-foreground">{message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="Not Enough Entries"
        message="Once we have enough entries, leaderboard will be live"
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead className="text-center">User</TableHead>
          <TableHead className="text-center">Highest Streak</TableHead>
          <TableHead className="text-center">Active Habits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(data as LeaderboardItem[]).map((row, idx) => (
          <TableRow key={`${freq}-${row.user.id}`}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="text-center">
              {row.user.name ?? "User"}
            </TableCell>
            <TableCell className="text-center">{row.highestStreak}</TableCell>
            <TableCell className="text-center">{row.activeHabits}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function LeaderboardPage(props: PageProps) {
  return (
    <div className="mt-4 space-y-6 mx-auto max-w-2xl">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Leaderboard</h1>
        <Separator orientation="horizontal" />
      </div>

      <LeaderboardFrequency />
      <LeaderboardTable {...props} />
    </div>
  );
}
