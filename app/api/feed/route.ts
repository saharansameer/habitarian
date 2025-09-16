import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { completions, habits, follows } from "@/lib/db/schema";
import { authSchema } from "@/lib/db/schema";
import { eq, desc, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getAuthSession(request.headers);
  
  if (!session) {
    return unauthorized();
  }

  try {
    // Get users that the current user follows
    const followingUsers = await db
      .select({
        followee: follows.followee,
      })
      .from(follows)
      .where(eq(follows.follower, session.userId));

    // If user is not following anyone, return empty array
    if (followingUsers.length === 0) {
      return NextResponse.json<BaseResponse>(
        {
          success: true,
          message: "Feed fetched",
          data: [],
        },
        { status: 200 }
      );
    }

    const followingUserIds = followingUsers.map(user => user.followee).filter(Boolean);

    // Get completions from followed users with habit and user details
    const feedCompletions = await db
      .select({
        id: completions.id,
        createdAt: completions.createdAt,
        habit: {
          id: habits.id,
          title: habits.title,
          streak: habits.streak,
        },
        user: {
          id: authSchema.user.id,
          name: authSchema.user.name,
        },
      })
      .from(completions)
      .innerJoin(habits, eq(completions.habitId, habits.id))
      .innerJoin(authSchema.user, eq(completions.creatorId, authSchema.user.id))
      .where(inArray(completions.creatorId, followingUserIds as string[]))
      .orderBy(desc(completions.createdAt));

    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Feed fetched",
        data: feedCompletions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
