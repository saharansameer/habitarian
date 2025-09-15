import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { habits, completions } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { evaluateCompletion } from "@/lib/utils";

export async function POST(
  request: NextRequest,
  { params }: { params: { habitId: string } }
) {
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }
  try {
    const { habitId } = params;

    // Find habit by id
    const habit = await db.query.habits.findFirst({
      where: and(eq(habits.id, habitId), eq(habits.creator, session.userId)),
    });

    if (!habit) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Habit no longer exist" },
        { status: 404 }
      );
    }

    // Most recent completion of habit
    const [lastCompletion] = await db.query.completions.findMany({
      where: and(
        eq(completions.habitId, habitId),
        eq(completions.creatorId, session.userId)
      ),
      columns: { createdAt: true },
      orderBy: desc(completions.createdAt),
      limit: 1,
    });

    // First Day of Habit
    if (!lastCompletion || !lastCompletion.createdAt) {
      // Mark completion
      await db.insert(completions).values({
        habitId,
        creatorId: session.userId,
      });

      // Add +1 streak
      await db.update(habits).set({ streak: habit.streak + 1 });

      return NextResponse.json<BaseResponse>(
        { success: true, message: "Marked as Completed!" },
        { status: 201 }
      );
    }

    // Evaluate completion
    const { completed, streakAlive } = evaluateCompletion(
      lastCompletion.createdAt,
      habit.frequency
    );

    // Reset streak
    if (!completed && !streakAlive) {
      await db
        .update(habits)
        .set({ streak: 1 })
        .where(and(eq(habits.id, habitId), eq(habits.creator, session.userId)));

      return NextResponse.json<BaseResponse>(
        { success: true, message: "Streak Reset" },
        { status: 200 }
      );
    }

    if (!completed && streakAlive) {
      // Mark completion
      await db
        .insert(completions)
        .values({
          habitId,
          creatorId: session.userId,
        })
        .returning();

      // Add +1 streak
      await db.update(habits).set({ streak: habit.streak + 1 });

      return NextResponse.json<BaseResponse>(
        { success: true, message: "Marked as Completed!" },
        { status: 201 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Habit already Completed for today" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to mark as completed" },
      { status: 400 }
    );
  }
}
