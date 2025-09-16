import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import type { HabitFrequency } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { habits } from "@/lib/db/schema";
import { authSchema } from "@/lib/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { habitFrequencies } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const session = await getAuthSession(request.headers);

  if (!session) {
    return unauthorized();
  }

  try {
    // Validate habit frequency
    const freq = request.nextUrl.searchParams.get("freq");
    const isValidFrequency =
      freq !== null && habitFrequencies.includes(freq as Any);

    if (!isValidFrequency) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Invalid or missing habit frequency",
        },
        { status: 400 }
      );
    }

    // Get leaderboard data with user stats, filtered by frequency
    const leaderboard = await db
      .select({
        user: {
          id: authSchema.user.id,
          name: authSchema.user.name,
          createdAt: authSchema.user.createdAt,
        },
        highestStreak: sql<number>`MAX(${habits.streak})`,
        activeHabits: sql<number>`
          COUNT(DISTINCT CASE 
            WHEN ${habits.streak} > 1 THEN ${habits.id} 
            ELSE NULL 
          END)
        `,
      })
      .from(authSchema.user)
      .innerJoin(
        habits,
        and(
          eq(habits.creator, authSchema.user.id),
          eq(habits.frequency, freq as HabitFrequency)
        )
      )
      .groupBy(
        authSchema.user.id,
        authSchema.user.name,
        authSchema.user.createdAt
      )
      .orderBy(
        desc(sql`MAX(${habits.streak})`), // highest streak
        desc(
          sql`COUNT(DISTINCT CASE WHEN ${habits.streak} > 0 THEN ${habits.id} ELSE NULL END)`
        ) // active habits
      );

    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Leaderboard fetched",
        data: leaderboard,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
