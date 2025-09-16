import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { habits } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { habitId: string } }
) {
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    const { habitId } = params;

    const habit = await db.query.habits.findFirst({
      where: and(eq(habits.id, habitId), eq(habits.creator, session.userId)),
      columns: {
        id: true,
        title: true,
        category: true,
        frequency: true,
      },
    });

    if (!habit) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Habit no longer exist" },
        { status: 404 }
      );
    }

    return NextResponse.json<BaseResponse>(
      { success: true, message: "Habit Fetched", data: habit },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to fetch habit" },
      { status: 500 }
    );
  }
}
