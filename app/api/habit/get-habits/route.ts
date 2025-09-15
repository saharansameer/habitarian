import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { habits } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }
  try {
    const allHabits = await db.query.habits.findMany({
      where: eq(habits.creator, session.userId),
      orderBy: desc(habits.createdAt),
    });

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
