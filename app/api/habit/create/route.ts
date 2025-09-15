import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { habits } from "@/lib/db/schema";
import { trimAndClean } from "@/lib/utils";
import { and, eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await getAuthSession(request.headers);

  if (!session) {
    return unauthorized();
  }
  try {
    const { title, category, frequency } = await request.json();

    const trimmedTitle = trimAndClean(title);

    const existingTitle = await db.query.habits.findFirst({
      where: and(
        eq(habits.title, trimmedTitle),
        eq(habits.creator, session.userId)
      ),
      columns: { title: true },
    });

    if (existingTitle) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Habit with same title already exists" },
        { status: 202 }
      );
    }

    const habitDetails = {
      title: trimmedTitle,
      category,
      frequency,
    };

    const [newHabit] = await db.insert(habits).values(habitDetails).returning();

    if (!newHabit) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Failed to create new habit" },
        { status: 400 }
      );
    }

    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "New Habit Created!",
        data: newHabit,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to create new habit" },
      { status: 400 }
    );
  }
}
