import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { completions, habits } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }
  try {
    const allHabits = await db
      .select({
        id: habits.id,
        title: habits.title,
        streak: habits.streak,
        lastCompletion: sql`MAX(${completions.createdAt})`,
      })
      .from(habits)
      .leftJoin(completions, eq(completions.habitId, habits.id))
      .where(eq(habits.creator, session.userId))
      .groupBy(habits.id, habits.title, habits.streak)
      .orderBy(desc(habits.createdAt));

    return NextResponse.json(
      { success: true, message: "Habits Fetched", data: allHabits },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to fetch habits" },
      { status: 400 }
    );
  }
}
