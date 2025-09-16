import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { completions, habits } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { evaluateCompletion } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }
  try {
    // Fetch habits with recent most completion
    const habitsWithCompletions = await db
      .select({
        id: habits.id,
        title: habits.title,
        category: habits.category,
        frequency: habits.frequency,
        streak: habits.streak,
        lastCompletion: sql`MAX(${completions.createdAt})`,
      })
      .from(habits)
      .leftJoin(completions, eq(completions.habitId, habits.id))
      .where(eq(habits.creator, session.userId))
      .groupBy(
        habits.id,
        habits.title,
        habits.category,
        habits.frequency,
        habits.streak,
      )
      .orderBy(desc(habits.createdAt));

    if (habitsWithCompletions.length === 0) {
      return NextResponse.json<BaseResponse>(
        { success: true, message: "No habits created yet", data: null },
        { status: 200 }
      );
    }

    // Evaluate completions
    const allHabits = habitsWithCompletions.map((habit) => {
      if (!habit.lastCompletion) {
        return {
          ...habit,
          completed: false,
          streakAlive: false,
        };
      }

      const { completed, streakAlive } = evaluateCompletion(
        habit.lastCompletion as Date,
        habit.frequency
      );

      return {
        ...habit,
        completed,
        streakAlive,
      };
    });

    return NextResponse.json<BaseResponse>(
      { success: true, message: "Habits Fetched", data: allHabits },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to fetch habits" },
      { status: 500 }
    );
  }
}
