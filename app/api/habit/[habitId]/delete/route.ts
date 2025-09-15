import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { habits } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { habitId: string } }
) {
  const session = await getAuthSession(request.headers);

  if (!session) {
    return unauthorized();
  }
  try {
    const { habitId } = params;

    const [deletedHabit] = await db
      .delete(habits)
      .where(and(eq(habits.id, habitId), eq(habits.creator, session.userId)))
      .returning();

    if (!deletedHabit) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Failed to remove habit" },
        { status: 400 }
      );
    }

    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Habit Removed",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to remove habit" },
      { status: 400 }
    );
  }
}
